-- AlterTable
ALTER TABLE "currency" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "currency_order_seq";
