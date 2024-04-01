-- AlterTable
ALTER TABLE "stripe_connect" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "token_type" DROP NOT NULL,
ALTER COLUMN "stripe_publishable_key" DROP NOT NULL,
ALTER COLUMN "scope" DROP NOT NULL,
ALTER COLUMN "liveMode" DROP NOT NULL,
ALTER COLUMN "refresh_token" DROP NOT NULL,
ALTER COLUMN "access_token" DROP NOT NULL;
