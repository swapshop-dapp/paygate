-- AlterTable
ALTER TABLE "host_customers" ALTER COLUMN "host_wallet" DROP NOT NULL;

-- AlterTable
ALTER TABLE "stripe_connect" ALTER COLUMN "wallet_id" DROP NOT NULL;
