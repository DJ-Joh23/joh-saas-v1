import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, InsertSubscription, users, subscriptions, usageLog } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getSubscription(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createSubscription(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .insert(subscriptions)
    .values({
      userId,
      plan: "free",
      status: "active",
    });

  return result;
}

export async function updateSubscription(
  userId: number,
  data: Partial<InsertSubscription>
) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .update(subscriptions)
    .set(data)
    .where(eq(subscriptions.userId, userId));

  return result;
}

export async function getTodayUsage(userId: number) {
  const db = await getDb();
  if (!db) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db
    .select()
    .from(usageLog)
    .where(
      and(
        eq(usageLog.userId, userId),
        eq(usageLog.date, today)
      )
    )
    .limit(1);

  return result.length > 0 ? result[0].count : 0;
}

export async function incrementUsage(userId: number) {
  const db = await getDb();
  if (!db) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await db
    .select()
    .from(usageLog)
    .where(
      and(
        eq(usageLog.userId, userId),
        eq(usageLog.date, today)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(usageLog)
      .set({ count: existing[0].count + 1 })
      .where(eq(usageLog.id, existing[0].id));
  } else {
    await db.insert(usageLog).values({
      userId,
      date: today,
      count: 1,
    });
  }

  return true;
}

export async function canUseFeature(userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const subscription = await getSubscription(userId);
  if (!subscription) return false;

  // Pro users have unlimited usage
  if (subscription.plan === "pro") {
    return true;
  }

  // Free users can use 10 times per day
  const todayUsage = await getTodayUsage(userId);
  return todayUsage < 10;
}

export async function getUserStats(userId: number) {
  const subscription = await getSubscription(userId);
  const todayUsage = await getTodayUsage(userId);
  const limit = subscription?.plan === "pro" ? Infinity : 10;
  const remaining = Math.max(0, limit - todayUsage);

  return {
    plan: subscription?.plan || "free",
    todayUsage,
    limit,
    remaining,
    status: subscription?.status || "active",
  };
}

// TODO: add feature queries here as your schema grows.
