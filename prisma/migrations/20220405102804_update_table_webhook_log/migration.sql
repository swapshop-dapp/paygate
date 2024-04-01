/*
  Warnings:

  - You are about to drop the column `guest_id` on the `webhook_log` table. All the data in the column will be lost.
  - You are about to drop the column `host_id` on the `webhook_log` table. All the data in the column will be lost.
  - Added the required column `account` to the `webhook_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "webhook_log" DROP COLUMN "guest_id",
DROP COLUMN "host_id",
ADD COLUMN     "account" VARCHAR(20) NOT NULL;
