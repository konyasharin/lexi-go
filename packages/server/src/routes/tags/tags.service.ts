import { BaseService } from "@/utils";

import { tagsTable, TransactionType } from "@/db";

import { CreateOnlyNewTagsSchemaInfer, CreateTagsSchema } from "./tags.schemas";

export class TagsService extends BaseService {
  public async getUserTags(userId: number) {
    return this.db.query.tagsTable.findMany({
      where: (tag, { eq }) => eq(tag.userId, userId),
    });
  }

  public async create(data: CreateTagsSchema, tx?: TransactionType) {
    return this.getClient(tx)
      .insert(tagsTable)
      .values(data.tags.map((tag) => ({ ...tag, userId: data.userId })))
      .returning();
  }

  public async createOnlyNew(
    data: CreateOnlyNewTagsSchemaInfer,
    tx?: TransactionType,
  ) {
    const alreadyCreatedTags = await this.getUserTags(data.userId);
    const tagsToCreate = data.tags.filter(
      (tag) =>
        !alreadyCreatedTags.some((createdTag) => createdTag.name === tag.name),
    );
    if (tagsToCreate.length > 0)
      return this.create({ tags: tagsToCreate, userId: data.userId }, tx);
  }
}
