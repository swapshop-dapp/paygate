-- CreateTable
CREATE TABLE "stripe_fee_options" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "is_guest_pay_fee" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_fee_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stripe_fee_options_user_id_key" ON "stripe_fee_options"("user_id");
