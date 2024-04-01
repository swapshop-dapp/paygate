-- CreateTable
CREATE TABLE "webhook_log" (
    "id" UUID NOT NULL,
    "host_id" VARCHAR(100) NOT NULL,
    "guest_id" VARCHAR(100) NOT NULL,
    "metadata" JSON,
    "type" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webhook_log_pkey" PRIMARY KEY ("id")
);
