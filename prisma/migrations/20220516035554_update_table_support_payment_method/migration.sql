/*
  Warnings:

  - You are about to drop the `SupportedPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SupportedPayment";

-- CreateTable
CREATE TABLE "supported_payment" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "key" VARCHAR(20) NOT NULL,
    "symbol" VARCHAR(100),
    "type" VARCHAR(10),
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "changeable" BOOLEAN NOT NULL DEFAULT false,
    "description" VARCHAR(100),
    "currency" VARCHAR(20),
    "icon" VARCHAR(255),
    "order" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supported_payment_pkey" PRIMARY KEY ("id")
);
