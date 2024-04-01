-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "property_id" VARCHAR(255);

-- AlterTable
ALTER TABLE "webhook_log" ALTER COLUMN "account" DROP NOT NULL;
