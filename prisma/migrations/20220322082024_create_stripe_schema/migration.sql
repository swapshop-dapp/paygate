-- CreateTable
CREATE TABLE "stripe_connect" (
    "id" UUID NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "token_type" VARCHAR(10) NOT NULL,
    "stripe_publishable_key" VARCHAR(255) NOT NULL,
    "scope" VARCHAR(20) NOT NULL,
    "liveMode" BOOLEAN NOT NULL,
    "stripe_user_id" VARCHAR(100) NOT NULL,
    "refresh_token" VARCHAR(255) NOT NULL,
    "access_token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_connect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_connect_authorization_code" (
    "id" UUID NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,
    "authorization_code" VARCHAR(100) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stripe_connect_authorization_code_pkey" PRIMARY KEY ("id")
);
