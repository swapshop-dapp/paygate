-- AlterTable
ALTER TABLE "stripe_connect" ADD COLUMN     "reason" JSON;

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "net" DECIMAL(19,8),
ADD COLUMN     "platform_fee" DECIMAL(19,8),
ADD COLUMN     "refund_amount" DECIMAL(19,8) DEFAULT 0;

-- CreateIndex
CREATE INDEX "transaction_external_tx_id_booking_id_host_wallet_host_id_g_idx" ON "transaction"("external_tx_id", "booking_id", "host_wallet", "host_id", "gateway");
