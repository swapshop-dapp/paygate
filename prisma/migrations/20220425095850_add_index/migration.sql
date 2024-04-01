-- CreateIndex
CREATE INDEX "transaction_booking_id_idx" ON "transaction"("booking_id");

-- CreateIndex
CREATE INDEX "transaction_gateway_idx" ON "transaction"("gateway");

-- CreateIndex
CREATE INDEX "transaction_type_idx" ON "transaction"("type");

-- CreateIndex
CREATE INDEX "transaction_status_idx" ON "transaction"("status");
