-- AlterTable
ALTER TABLE "webhook_log" ALTER COLUMN "host_id" DROP NOT NULL,
ALTER COLUMN "guest_id" DROP NOT NULL;
