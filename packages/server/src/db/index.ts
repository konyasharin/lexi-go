import { drizzle } from 'drizzle-orm/postgres-js';

import 'dotenv/config';

import { usersTable } from './schema';

export * from './schema';

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: { usersTable },
});
