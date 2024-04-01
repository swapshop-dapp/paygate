-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "key" VARCHAR(10) NOT NULL,
    "symbol" VARCHAR(100) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "source" VARCHAR(100) NOT NULL,
    "rate" DECIMAL(19,8) NOT NULL DEFAULT 0,
    "visibility" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_key_key" ON "Currency"("key");
