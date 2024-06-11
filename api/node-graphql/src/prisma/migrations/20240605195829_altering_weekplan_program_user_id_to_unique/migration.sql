/*
  Warnings:

  - A unique constraint covering the columns `[programUserId]` on the table `WeekPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeekPlan_programUserId_key" ON "WeekPlan"("programUserId");
