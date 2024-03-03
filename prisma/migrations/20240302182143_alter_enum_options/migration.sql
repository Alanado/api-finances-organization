/*
  Warnings:

  - The values [RECEITA,DESPESA] on the enum `Options` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Options_new" AS ENUM ('REVENUE', 'EXPENSE');
ALTER TABLE "movements" ALTER COLUMN "type" TYPE "Options_new" USING ("type"::text::"Options_new");
ALTER TYPE "Options" RENAME TO "Options_old";
ALTER TYPE "Options_new" RENAME TO "Options";
DROP TYPE "Options_old";
COMMIT;
