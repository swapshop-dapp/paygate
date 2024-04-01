-- CreateTable
CREATE TABLE "heartbeat" (
    "id" INTEGER NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "heartbeat_pkey" PRIMARY KEY ("id")
);
