import { db as drizzleDb } from '@/db';

export class BaseController {
  protected db = drizzleDb;
}
