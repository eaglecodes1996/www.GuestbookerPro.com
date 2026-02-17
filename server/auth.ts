import { Request, Response, NextFunction } from "express";
import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { User } from "@shared/schema";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
    interface Session {
      userId?: string;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, req.session.userId),
    });

    if (!user) {
      req.session.userId = undefined;
      res.status(401).json({ error: "User not found" });
      return;
    }

    // Reset monthly quotas if needed (monthly reset)
    const now = new Date();
    const lastReset = user.lastResetAt ? new Date(user.lastResetAt) : new Date(0);
    const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceReset >= 30) {
      await db
        .update(users)
        .set({
          discoveryUsedThisMonth: 0,
          emailsUsedThisMonth: 0,
          lastResetAt: now,
        })
        .where(eq(users.id, user.id));
      
      user.discoveryUsedThisMonth = 0;
      user.emailsUsedThisMonth = 0;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    
    // Check if response was already sent
    if (!res.headersSent) {
      res.status(500).json({ error: "Authentication failed" });
    }
    // Don't call next() - stop the request chain here
  }
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    next();
    return;
  }

  db.query.users
    .findFirst({
      where: eq(users.id, req.session.userId),
    })
    .then((user: User | undefined) => {
      if (user) {
        req.user = user;
      }
      next();
    })
    .catch((error: any) => {
      console.error("Optional auth error:", error);
      next();
    });
}
