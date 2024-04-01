/*
  Warnings:

  - Added the required column `wallet_id` to the `payment_method` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_id` to the `stripe_connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_id` to the `stripe_connect_authorization_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_method" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "wallet_id" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "stripe_connect" ADD COLUMN     "wallet_id" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "stripe_connect_authorization_code" ADD COLUMN     "wallet_id" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "transaction" (
    "id" UUID NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,
    "wallet_id" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(19,8) NOT NULL,
    "currency" VARCHAR(5) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "external_tx_id" VARCHAR(255) NOT NULL,
    "gateway" VARCHAR(20) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "metadata" JSON,
    "external_metadata" JSON,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);
