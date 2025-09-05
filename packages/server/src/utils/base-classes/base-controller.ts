import { db as drizzleDb } from "@/db";

export abstract class BaseController {
  protected db = drizzleDb;
}
