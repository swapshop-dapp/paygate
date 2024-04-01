-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "customer_id" VARCHAR(100),
ADD COLUMN     "failure_code" VARCHAR(50),
ADD COLUMN     "failure_message" VARCHAR(500);
