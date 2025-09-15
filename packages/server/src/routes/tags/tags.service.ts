import { IdSchemaInfer } from "@repo/entities/shared";
import {
  AttachTagsToModuleDataSchemaInfer,
  CreateTagsDataSchemaInfer,
  CreateTagsWithAttachDataSchemaInfer,
  DeleteTagsDataSchemaInfer,
  GetNotAttachedTagsDataInfer,
  TagSchemaInfer,
  tagToModuleFormat,
} from "@repo/entities/tag";
import { inArray } from "drizzle-orm";

import { BaseService } from "@/utils";

import { modulesToTagsTable, tagsTable, TransactionType } from "@/db";

export class TagsService extends BaseService {
  public async create(data: CreateTagsDataSchemaInfer, tx?: TransactionType) {
    return this.client
      .get(tx)
      .insert(tagsTable)
      .values(data.tags.map((tag) => ({ ...tag, userId: data.userId })))
      .returning();
  }

  public async delete(data: DeleteTagsDataSchemaInfer, tx?: TransactionType) {
    return this.client
      .get(tx)
      .delete(tagsTable)
      .where(inArray(tagsTable.id, data.tagsId));
  }

  public async attachToModule(
    data: AttachTagsToModuleDataSchemaInfer,
    tx?: TransactionType,
  ) {
    return this.client
      .get(tx)
      .insert(modulesToTagsTable)
      .values(data.tagsId.map((tagId) => ({ moduleId: data.moduleId, tagId })));
  }

  public async createWithAttach(
    data: CreateTagsWithAttachDataSchemaInfer,
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

  public async getUserTags(data: IdSchemaInfer) {
    const userTags = await this.client.db.query.tagsTable.findMany({
      where: (tag, { eq }) => eq(tag.userId, data.id),
    });

    return userTags.map((tag) => tagToModuleFormat(tag));
  }

  public async getModuleTags(data: IdSchemaInfer) {
    const tagsId = (
      await this.client.db.query.modulesToTagsTable.findMany({
        where: (pair, { eq }) => eq(pair.moduleId, data.id),
      })
    ).map((pair) => pair.tagId);

    return this.client.db.query.tagsTable.findMany({
      where: (tag, { inArray }) => inArray(tag.id, tagsId),
    });
  }

  public async getNotAttachedUserTags(data: GetNotAttachedTagsDataInfer) {
    const userTags = await this.getUserTags({ id: data.userId });

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
