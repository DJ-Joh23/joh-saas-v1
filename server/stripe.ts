import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(stripeSecretKey);

export async function createCheckoutSession(
  customerId: string,
  userId: number,
  email: string
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID || "price_1Su3JOHmah1XNqU8ghVpMg9yW2aOoKm4pPgIF1DxPABrkk1jEk39Z232wJVfH7XVsO0ez7cX8rQetmvLi0hx1KKR0007kxBNVI",
        quantity: 1,
      },
    ],
    mode: "subscription",
    subscription_data: {
      trial_period_days: 7,
    },
    success_url: `${process.env.VITE_FRONTEND_URL || "http://localhost:3000"}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.VITE_FRONTEND_URL || "http://localhost:3000"}/dashboard`,
    metadata: {
      userId: userId.toString(),
    },
  });

  return session;
}

export async function createCustomer(email: string, name?: string) {
  const customer = await stripe.customers.create({
    email,
    name,
  });

  return customer;
}

export async function getCustomer(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
}

export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
  return subscription;
}

export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

export async function handleCheckoutSessionCompleted(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"],
  });

  return session;
}
