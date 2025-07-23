import { db as drizzleDb } from '@/db';

export class BaseService {
  protected db = drizzleDb;
}
