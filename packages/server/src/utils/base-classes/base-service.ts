import { Client } from "../client";

export abstract class BaseService {
  protected client = new Client();
}
