import { inArray } from "drizzle-orm";

import { BaseService } from "@/utils";

import {
  modulesToVocabulariesTable,
  TransactionType,
  vocabulariesTable,
} from "@/db";

import {
  AttachVocabulariesToModuleSchemaInfer,
  CreateVocabulariesSchemaInfer,
  CreateVocabulariesWithAttachSchemaInfer,
  DeleteVocabulariesSchemaInfer,
  GetModuleVocabulariesSchemaInfer,
} from "./vocabularies.schemas";

export class VocabulariesService extends BaseService {
  public async create(
    data: CreateVocabulariesSchemaInfer,
    tx?: TransactionType,
  ) {
    return this.client
      .get(tx)
      .insert(vocabulariesTable)
      .values(data)
      .returning();
  }

  public async delete(
    data: DeleteVocabulariesSchemaInfer,
    tx?: TransactionType,
  ) {
    return this.client
      .get(tx)
      .delete(vocabulariesTable)
      .where(inArray(vocabulariesTable.id, data.vocabulariesId));
  }

  public async attachToModule(
    data: AttachVocabulariesToModuleSchemaInfer,
    tx?: TransactionType,
  ) {
    return this.client
      .get(tx)
      .insert(modulesToVocabulariesTable)
      .values(
        data.vocabulariesId.map((vocabularyId) => ({
          vocabularyId,
          moduleId: data.moduleId,
        })),
      );
  }

  public async createWithAttach(
    data: CreateVocabulariesWithAttachSchemaInfer,
    tx?: TransactionType,
  ) {
    const newVocabularies = await this.create(data.vocabularies, tx);
    await this.attachToModule(
      {
        moduleId: data.moduleId,
        vocabulariesId: newVocabularies.map((v) => v.id),
      },
      tx,
    );

    return newVocabularies;
  }

  public async getModuleVocabularies(data: GetModuleVocabulariesSchemaInfer) {
    const vocabulariesId = (
      await this.client.db.query.modulesToVocabulariesTable.findMany({
        where: (pair, { eq }) => eq(pair.moduleId, data.moduleId),
      })
    ).map((pair) => pair.vocabularyId);

    return this.client.db.query.vocabulariesTable.findMany({
      where: (vocabulary, { inArray }) =>
        inArray(vocabulary.id, vocabulariesId),
    });
  }
}
