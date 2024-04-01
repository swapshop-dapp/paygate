-- AlterTable
ALTER TABLE "stripe_connect" ADD COLUMN     "partner_id" VARCHAR(100);

-- CreateTable
CREATE TABLE "stripe_account" (
    "id" SERIAL NOT NULL,
    "account" VARCHAR(100) NOT NULL,
    "partner_id" VARCHAR(100) NOT NULL,
    "expired_at" INTEGER NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "return_url" VARCHAR(500) NOT NULL,
    "refresh_url" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_account_pkey" PRIMARY KEY ("id")
);
