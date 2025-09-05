import { db as drizzleDb, TransactionType } from "@/db";

export class Client {
  public readonly db = drizzleDb;

  public get(tx?: TransactionType) {
    return tx ?? this.db;
  }
}
