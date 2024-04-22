/*
  Warnings:

  - You are about to drop the column `userId` on the `UserHealthIssue` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `UserHealthIssue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserHealthIssue" DROP CONSTRAINT "UserHealthIssue_userId_fkey";

-- AlterTable
ALTER TABLE "UserHealthIssue" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserHealthIssue" ADD CONSTRAINT "UserHealthIssue_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
