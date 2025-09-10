import { inArray } from "drizzle-orm";

import { BaseService } from "@/utils";

import { modulesToTagsTable, tagsTable, TransactionType } from "@/db";

import {
  AttachTagsToModuleSchemaInfer,
  CreateTagsSchema,
  CreateTagsWithAttachSchemaInfer,
  DeleteTagsSchemaInfer,
  GetModuleTagsSchemaInfer,
  GetNotAttachedUserTagsInfer,
  GetUserTagsSchemaInfer,
  TagSchemaInfer,
} from "./tags.schemas";

export class TagsService extends BaseService {
  public async create(data: CreateTagsSchema, tx?: TransactionType) {
    return this.client
      .get(tx)
      .insert(tagsTable)
      .values(data.tags.map((tag) => ({ ...tag, userId: data.userId })))
      .returning();
  }

  public async delete(data: DeleteTagsSchemaInfer, tx?: TransactionType) {
    return this.client
      .get(tx)
      .delete(tagsTable)
      .where(inArray(tagsTable.id, data.tagsId));
  }

  public async attachToModule(
    data: AttachTagsToModuleSchemaInfer,
    tx?: TransactionType,
  ) {
    return this.client
      .get(tx)
      .insert(modulesToTagsTable)
      .values(data.tagsId.map((tagId) => ({ moduleId: data.moduleId, tagId })));
  }

  public async createWithAttach(
    data: CreateTagsWithAttachSchemaInfer,
    tx?: TransactionType,
  ) {
    const newTags: TagSchemaInfer[] = [];

    if (data.newTags.length > 0) {
      newTags.concat(
        await this.create({ userId: data.userId, tags: data.newTags }, tx),
      );
    }

    const tagsToAttach = [
      ...newTags.map((tag) => tag.id),
      ...data.userTags.map((tag) => tag.id),
    ];
    if (tagsToAttach.length > 0) {
      await this.attachToModule(
        {
          moduleId: data.moduleId,
          tagsId: tagsToAttach,
        },
        tx,
      );
    }

    return newTags;
  }

  public async getUserTags(data: GetUserTagsSchemaInfer) {
    return this.client.db.query.tagsTable.findMany({
      where: (tag, { eq }) => eq(tag.userId, data.userId),
    });
  }

  public async getModuleTags(data: GetModuleTagsSchemaInfer) {
    const tagsId = (
      await this.client.db.query.modulesToTagsTable.findMany({
        where: (pair, { eq }) => eq(pair.moduleId, data.moduleId),
      })
    ).map((pair) => pair.tagId);

    return this.client.db.query.tagsTable.findMany({
      where: (tag, { inArray }) => inArray(tag.id, tagsId),
    });
  }

  public async getNotAttachedUserTags(data: GetNotAttachedUserTagsInfer) {
    const userTags = await this.getUserTags(data);

    const attachedTagsPairs =
      await this.client.db.query.modulesToTagsTable.findMany({
        where: (pair, { inArray, and, not }) =>
          and(
            inArray(
              pair.tagId,
              userTags.map((userTag) => userTag.id),
            ),
            not(inArray(pair.moduleId, data.excludeModulesId ?? [])),
          ),
      });
    console.log(attachedTagsPairs);

    return userTags
      .filter((tag) => !attachedTagsPairs.some((pair) => pair.tagId === tag.id))
      .map((tag) => tag.id);
  }
}
