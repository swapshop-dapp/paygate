-- CreateTable
CREATE TABLE "paypal_connect" (
    "id" UUID NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,
    "status" BOOLEAN,
    "merchant_id" VARCHAR(100) NOT NULL,
    "tracking_id" VARCHAR(255),
    "payments_receivable" BOOLEAN,
    "primary_email_confirmed" BOOLEAN NOT NULL,
    "oauth_integrations" JSONB,
    "wallet_id" VARCHAR(255),
    "reason" JSON,
    "partner_id" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paypal_connect_pkey" PRIMARY KEY ("id")
);
