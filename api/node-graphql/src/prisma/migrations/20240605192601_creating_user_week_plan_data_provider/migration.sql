/*
  Warnings:

  - Added the required column `dataProviding` to the `WeekPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeekPlan" ADD COLUMN     "dataProviding" JSONB NOT NULL;
