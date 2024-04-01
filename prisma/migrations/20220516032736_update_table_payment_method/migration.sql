-- AlterTable
ALTER TABLE "payment_method" ADD COLUMN     "changeable" BOOLEAN DEFAULT false,
ADD COLUMN     "order" INTEGER;

-- CreateTable
CREATE TABLE "SupportedPayment" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "key" VARCHAR(20) NOT NULL,
    "symbol" VARCHAR(100) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "changeable" BOOLEAN NOT NULL DEFAULT false,
    "description" VARCHAR(100) NOT NULL,
    "currency" VARCHAR(20),
    "icon" VARCHAR(255),
    "order" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupportedPayment_pkey" PRIMARY KEY ("id")
);
