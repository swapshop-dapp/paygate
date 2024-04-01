-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "guest_email" VARCHAR(100),
    "customer_id" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "host_customers" (
    "id" SERIAL NOT NULL,
    "guest_email" VARCHAR(100) NOT NULL,
    "host_id" VARCHAR(100) NOT NULL,
    "host_wallet" VARCHAR(20) NOT NULL,
    "customer_id" VARCHAR(255) NOT NULL,
    "host_customer_id" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "host_customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_guest_email_key" ON "customers"("guest_email");

-- CreateIndex
CREATE UNIQUE INDEX "host_customers_guest_email_host_id_host_wallet_key" ON "host_customers"("guest_email", "host_id", "host_wallet");
