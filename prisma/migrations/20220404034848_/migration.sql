-- CreateTable
CREATE TABLE "payment_method" (
    "id" UUID NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(50),
    "key" VARCHAR(50),
    "type" VARCHAR(20),
    "status" BOOLEAN DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_method_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_method_user_id_key_key" ON "payment_method"("user_id", "key");
