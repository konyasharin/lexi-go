ALTER TABLE "modules_to_tags" DROP CONSTRAINT "modules_to_tags_module_id_modules_id_fk";
--> statement-breakpoint
ALTER TABLE "modules_to_tags" DROP CONSTRAINT "modules_to_tags_tag_id_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "modules_to_vocabularies" DROP CONSTRAINT "modules_to_vocabularies_module_id_modules_id_fk";
--> statement-breakpoint
ALTER TABLE "modules_to_vocabularies" DROP CONSTRAINT "modules_to_vocabularies_vocabulary_id_vocabularies_id_fk";
--> statement-breakpoint
ALTER TABLE "modules_to_tags" ADD CONSTRAINT "modules_to_tags_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modules_to_tags" ADD CONSTRAINT "modules_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modules_to_vocabularies" ADD CONSTRAINT "modules_to_vocabularies_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modules_to_vocabularies" ADD CONSTRAINT "modules_to_vocabularies_vocabulary_id_vocabularies_id_fk" FOREIGN KEY ("vocabulary_id") REFERENCES "public"."vocabularies"("id") ON DELETE cascade ON UPDATE no action;