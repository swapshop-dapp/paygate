/*
  Warnings:

  - You are about to drop the column `user_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_id` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "user_id",
DROP COLUMN "wallet_id",
ADD COLUMN     "guest_id" VARCHAR(100),
ADD COLUMN     "guest_wallet" VARCHAR(255),
ADD COLUMN     "host_id" VARCHAR(100),
ADD COLUMN     "host_wallet" VARCHAR(255),
ALTER COLUMN "external_tx_id" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
