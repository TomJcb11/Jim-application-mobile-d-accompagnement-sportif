/*
  Warnings:

  - You are about to drop the column `exerciseInstruction` on the `Exercises` table. All the data in the column will be lost.
  - The `bodyHeight` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `charge` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipementId` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciceName` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseDescription` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kind` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reps` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rest` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sets` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xpRequired` to the `Levels` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Kind" AS ENUM ('strengh', 'cardio', 'flexibility');

-- AlterTable
ALTER TABLE "Exercises" DROP COLUMN "exerciseInstruction",
ADD COLUMN     "charge" TEXT NOT NULL,
ADD COLUMN     "equipementId" TEXT NOT NULL,
ADD COLUMN     "exerciceName" TEXT NOT NULL,
ADD COLUMN     "exerciseDescription" TEXT NOT NULL,
ADD COLUMN     "kind" "Kind" NOT NULL,
ADD COLUMN     "reps" TEXT NOT NULL,
ADD COLUMN     "rest" TEXT NOT NULL,
ADD COLUMN     "sets" TEXT NOT NULL,
ADD COLUMN     "xpGain" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "Levels" ADD COLUMN     "chargeMultiplier" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "repsMultiplier" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "xpRequired" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userLevel" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "userXp" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "bodyHeight",
ADD COLUMN     "bodyHeight" DOUBLE PRECISION NOT NULL DEFAULT 150.0;

-- CreateTable
CREATE TABLE "Instructions" (
    "instructionId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "lowerValue" INTEGER NOT NULL,
    "upperValue" INTEGER NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,
    "instructionDescription" TEXT NOT NULL,

    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("instructionId")
);

-- CreateTable
CREATE TABLE "_LevelsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Instructions_instructionId_key" ON "Instructions"("instructionId");

-- CreateIndex
CREATE UNIQUE INDEX "_LevelsToUser_AB_unique" ON "_LevelsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LevelsToUser_B_index" ON "_LevelsToUser"("B");

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_equipementId_fkey" FOREIGN KEY ("equipementId") REFERENCES "Equipements"("equipementId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("levelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelsToUser" ADD CONSTRAINT "_LevelsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Levels"("levelId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelsToUser" ADD CONSTRAINT "_LevelsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
