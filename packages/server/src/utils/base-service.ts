import { db as drizzleDb, TransactionType } from "@/db";

export class BaseService {
  protected db = drizzleDb;

  protected getClient(tx?: TransactionType) {
    return tx ?? this.db;
  }
}
