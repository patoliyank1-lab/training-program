-- CreateIndex
CREATE INDEX "user_sessions_userId_ipAddress_deviceType_idx" ON "user_sessions"("userId", "ipAddress", "deviceType");
