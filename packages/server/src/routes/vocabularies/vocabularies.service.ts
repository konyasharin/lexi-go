import { IdSchemaInfer } from "@repo/entities/shared";
import {
  AttachVocabulariesToModuleDataSchemaInfer,
  CreateVocabulariesDataSchemaInfer,
  CreateVocabulariesWithAttachDataSchemaInfer,
  DeleteVocabulariesDataSchemaInfer,
} from "@repo/entities/vocabulary";
import { inArray } from "drizzle-orm";

import { BaseService } from "@/utils";

import {
  modulesToVocabulariesTable,
  TransactionType,
  vocabulariesTable,
} from "@/db";

export class VocabulariesService extends BaseService {
  public async create(
    data: CreateVocabulariesDataSchemaInfer,
    tx?: TransactionType,
  ) {
    return this.client
      .get(tx)
      .insert(vocabulariesTable)
      .values(data)
      .returning();
  }

  public async delete(
    data: DeleteVocabulariesDataSchemaInfer,
    tx?: TransactionType,
  ) {
    return this.client
      .get(tx)
      .delete(vocabulariesTable)
      .where(inArray(vocabulariesTable.id, data.vocabulariesId));
  }

  public async attachToModule(
    data: AttachVocabulariesToModuleDataSchemaInfer,
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
    data: CreateVocabulariesWithAttachDataSchemaInfer,
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

  public async getModuleVocabularies(data: IdSchemaInfer) {
    const vocabulariesId = (
      await this.client.db.query.modulesToVocabulariesTable.findMany({
        where: (pair, { eq }) => eq(pair.moduleId, data.id),
      })
    ).map((pair) => pair.vocabularyId);

    return this.client.db.query.vocabulariesTable.findMany({
      where: (vocabulary, { inArray }) =>
        inArray(vocabulary.id, vocabulariesId),
    });
  }
}
