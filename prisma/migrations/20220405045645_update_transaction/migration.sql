-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "booking_id" VARCHAR(255),
ALTER COLUMN "user_id" DROP NOT NULL;
