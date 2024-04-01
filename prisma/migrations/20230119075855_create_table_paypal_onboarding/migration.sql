-- CreateTable
CREATE TABLE "paypal_onboarding" (
    "id" UUID NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,
    "self_url" VARCHAR(500) NOT NULL,
    "action_url" VARCHAR(500) NOT NULL,

    CONSTRAINT "paypal_onboarding_pkey" PRIMARY KEY ("id")
);
