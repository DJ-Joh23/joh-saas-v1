import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getSubscription,
  createSubscription,
  updateSubscription,
  getTodayUsage,
  incrementUsage,
  canUseFeature,
  getUserStats,
} from "./db";
import {
  createCheckoutSession,
  createCustomer,
  handleCheckoutSessionCompleted,
} from "./stripe";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  subscription: router({
    getStatus: protectedProcedure.query(async ({ ctx }) => {
      const subscription = await getSubscription(ctx.user.id);
      if (!subscription) {
        await createSubscription(ctx.user.id);
        return { plan: "free", status: "active" };
      }
      return { plan: subscription.plan, status: subscription.status };
    }),

    getStats: protectedProcedure.query(async ({ ctx }) => {
      return await getUserStats(ctx.user.id);
    }),

    createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
      let subscription = await getSubscription(ctx.user.id);

      if (!subscription) {
        await createSubscription(ctx.user.id);
        subscription = await getSubscription(ctx.user.id);
      }

      let customerId = subscription?.stripeCustomerId;

      if (!customerId) {
        const customer = await createCustomer(
          ctx.user.email || "noemail@example.com",
          ctx.user.name || undefined
        );
        customerId = customer.id;
        await updateSubscription(ctx.user.id, {
          stripeCustomerId: customerId,
        });
      }

      const session = await createCheckoutSession(
        customerId,
        ctx.user.id,
        ctx.user.email || "noemail@example.com"
      );

      return { sessionId: session.id, url: session.url };
    }),

    handleCheckoutSuccess: protectedProcedure
      .input(z.object({ sessionId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const session = await handleCheckoutSessionCompleted(input.sessionId);

        if (session.subscription && typeof session.subscription !== "string") {
          const subscription = session.subscription as any;
          await updateSubscription(ctx.user.id, {
            plan: "pro",
            stripeSubscriptionId: subscription.id,
            status: "active",
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          });
        }

        return { success: true };
      }),
  }),

  usage: router({
    canUse: protectedProcedure.query(async ({ ctx }) => {
      const can = await canUseFeature(ctx.user.id);
      return { canUse: can };
    }),

    increment: protectedProcedure.mutation(async ({ ctx }) => {
      const can = await canUseFeature(ctx.user.id);
      if (!can) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Usage limit exceeded. Please upgrade to Pro.",
        });
      }

      await incrementUsage(ctx.user.id);
      const stats = await getUserStats(ctx.user.id);
      return stats;
    }),

    getStats: protectedProcedure.query(async ({ ctx }) => {
      return await getUserStats(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
