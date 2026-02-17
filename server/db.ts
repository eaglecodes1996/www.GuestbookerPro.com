import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Connection pool configuration for Railway stability
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Timeout after 10 seconds of trying to connect
  allowExitOnIdle: false, // Keep pool alive even if all clients are idle
});

// Handle pool errors gracefully
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  // Don't exit the process, just log the error
  // The pool will automatically remove the failed client and create a new one
});

// Handle pool connection events for debugging
pool.on('connect', (client) => {
  console.log('🔌 New PostgreSQL client connected');
});

pool.on('remove', (client) => {
  console.log('🔌 PostgreSQL client removed from pool');
});

export const db = drizzle(pool, { schema });
