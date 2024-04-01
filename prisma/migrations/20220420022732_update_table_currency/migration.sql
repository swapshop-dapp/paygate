/*
  Warnings:

  - You are about to drop the `Currency` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Currency";

-- CreateTable
CREATE TABLE "currency" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "key" VARCHAR(10) NOT NULL,
    "symbol" VARCHAR(100) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "source" VARCHAR(100) NOT NULL,
    "rate" DECIMAL(19,8) NOT NULL DEFAULT 0,
    "visibility" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "currency_symbol_name_type_key_visibility_idx" ON "currency"("symbol", "name", "type", "key", "visibility");

-- CreateIndex
CREATE UNIQUE INDEX "currency_key_key" ON "currency"("key");
