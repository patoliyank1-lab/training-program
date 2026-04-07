/*
  Warnings:

  - A unique constraint covering the columns `[userId,ipAddress,deviceType]` on the table `user_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_sessions_userId_ipAddress_deviceType_idx";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "searchVec" tsvector;

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_userId_ipAddress_deviceType_key" ON "user_sessions"("userId", "ipAddress", "deviceType");
