-- CreateTable
CREATE TABLE "fraud_blocked" (
    "id" SERIAL NOT NULL,
    "customer" VARCHAR(50) NOT NULL,
    "listing_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fraud_blocked_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fraud_blocked_customer_listing_id_expired_at_idx" ON "fraud_blocked"("customer", "listing_id", "expired_at");
