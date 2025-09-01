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
} from "./vocabularies.schemas";

export class VocabulariesService extends BaseService {
  public async create(
    data: CreateVocabulariesSchemaInfer,
    tx?: TransactionType,
  ) {
    return this.getClient(tx)
      .insert(vocabulariesTable)
      .values(data)
      .returning();
  }

  public async attachToModule(
    data: AttachVocabulariesToModuleSchemaInfer,
    tx?: TransactionType,
  ) {
    return this.getClient(tx)
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
}
