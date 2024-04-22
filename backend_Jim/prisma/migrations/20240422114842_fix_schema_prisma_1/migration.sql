/*
  Warnings:

  - The values [right_arm,left_arm,right_leg,left_leg,muscle_soreness] on the enum `Health` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Equipements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `equipement_description` on the `Equipements` table. All the data in the column will be lost.
  - You are about to drop the column `equipement_id` on the `Equipements` table. All the data in the column will be lost.
  - You are about to drop the column `equipement_photo_url` on the `Equipements` table. All the data in the column will be lost.
  - You are about to drop the column `exercice_id` on the `ExerciseXMuscles` table. All the data in the column will be lost.
  - You are about to drop the column `muscle_id` on the `ExerciseXMuscles` table. All the data in the column will be lost.
  - The primary key for the `Levels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `level_description` on the `Levels` table. All the data in the column will be lost.
  - You are about to drop the column `level_id` on the `Levels` table. All the data in the column will be lost.
  - The primary key for the `Muscles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `muscle_description` on the `Muscles` table. All the data in the column will be lost.
  - You are about to drop the column `muscle_id` on the `Muscles` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `body_height` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_inscriptionDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_sex` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `UserHealthIssue` table. All the data in the column will be lost.
  - You are about to drop the column `infrastructure_availability` on the `WeekPlan` table. All the data in the column will be lost.
  - You are about to drop the column `program_data` on the `WeekPlan` table. All the data in the column will be lost.
  - You are about to drop the column `program_owner_id` on the `WeekPlan` table. All the data in the column will be lost.
  - You are about to drop the column `program_user_id` on the `WeekPlan` table. All the data in the column will be lost.
  - You are about to drop the column `current_date` on the `WorkoutSession` table. All the data in the column will be lost.
  - You are about to drop the column `health_issues` on the `WorkoutSession` table. All the data in the column will be lost.
  - You are about to drop the column `session_data` on the `WorkoutSession` table. All the data in the column will be lost.
  - You are about to drop the column `week_plan_id` on the `WorkoutSession` table. All the data in the column will be lost.
  - You are about to drop the `ExerciceXMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exercices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Body` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[equipementId]` on the table `Equipements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[equipementDescription]` on the table `Equipements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[equipementPhotoUrl]` on the table `Equipements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[levelId]` on the table `Levels` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[levelDescription]` on the table `Levels` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[muscleId]` on the table `Muscles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[muscleDescription]` on the table `Muscles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `equipementDescription` to the `Equipements` table without a default value. This is not possible if the table is not empty.
  - The required column `equipementId` was added to the `Equipements` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `exerciseId` to the `ExerciseXMuscles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscleId` to the `ExerciseXMuscles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelDescription` to the `Levels` table without a default value. This is not possible if the table is not empty.
  - The required column `levelId` was added to the `Levels` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `muscleDescription` to the `Muscles` table without a default value. This is not possible if the table is not empty.
  - The required column `muscleId` was added to the `Muscles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `bodyHeight` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `UserHealthIssue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programData` to the `WeekPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programOwnerId` to the `WeekPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentDate` to the `WorkoutSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthIssues` to the `WorkoutSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionData` to the `WorkoutSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekPlanId` to the `WorkoutSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Health_new" AS ENUM ('none', 'heart', 'back', 'rightArm', 'leftArm', 'rightLeg', 'leftLeg', 'muscleSoreness');
ALTER TABLE "UserHealthIssue" ALTER COLUMN "healthIssue" TYPE "Health_new" USING ("healthIssue"::text::"Health_new");
ALTER TABLE "WorkoutSession" ALTER COLUMN "healthIssues" TYPE "Health_new" USING ("healthIssues"::text::"Health_new");
ALTER TYPE "Health" RENAME TO "Health_old";
ALTER TYPE "Health_new" RENAME TO "Health";
DROP TYPE "Health_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ExerciceXMedia" DROP CONSTRAINT "ExerciceXMedia_exercice_id_fkey";

-- DropForeignKey
ALTER TABLE "Exercices" DROP CONSTRAINT "Exercices_level_id_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseXMuscles" DROP CONSTRAINT "ExerciseXMuscles_exercice_id_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseXMuscles" DROP CONSTRAINT "ExerciseXMuscles_muscle_id_fkey";

-- DropForeignKey
ALTER TABLE "UserHealthIssue" DROP CONSTRAINT "UserHealthIssue_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Body" DROP CONSTRAINT "User_Body_user_id_fkey";

-- DropForeignKey
ALTER TABLE "WeekPlan" DROP CONSTRAINT "WeekPlan_program_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "WeekPlan" DROP CONSTRAINT "WeekPlan_program_user_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSession" DROP CONSTRAINT "WorkoutSession_week_plan_id_fkey";

-- DropIndex
DROP INDEX "Equipements_equipement_description_key";

-- DropIndex
DROP INDEX "Equipements_equipement_id_key";

-- DropIndex
DROP INDEX "Equipements_equipement_photo_url_key";

-- DropIndex
DROP INDEX "Levels_level_description_key";

-- DropIndex
DROP INDEX "Levels_level_id_key";

-- DropIndex
DROP INDEX "Muscles_muscle_description_key";

-- DropIndex
DROP INDEX "Muscles_muscle_id_key";

-- DropIndex
DROP INDEX "User_user_id_key";

-- AlterTable
ALTER TABLE "Equipements" DROP CONSTRAINT "Equipements_pkey",
DROP COLUMN "equipement_description",
DROP COLUMN "equipement_id",
DROP COLUMN "equipement_photo_url",
ADD COLUMN     "equipementDescription" TEXT NOT NULL,
ADD COLUMN     "equipementId" TEXT NOT NULL,
ADD COLUMN     "equipementPhotoUrl" TEXT,
ADD CONSTRAINT "Equipements_pkey" PRIMARY KEY ("equipementId");

-- AlterTable
ALTER TABLE "ExerciseXMuscles" DROP COLUMN "exercice_id",
DROP COLUMN "muscle_id",
ADD COLUMN     "exerciseId" TEXT NOT NULL,
ADD COLUMN     "muscleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Levels" DROP CONSTRAINT "Levels_pkey",
DROP COLUMN "level_description",
DROP COLUMN "level_id",
ADD COLUMN     "levelDescription" TEXT NOT NULL,
ADD COLUMN     "levelId" TEXT NOT NULL,
ADD CONSTRAINT "Levels_pkey" PRIMARY KEY ("levelId");

-- AlterTable
ALTER TABLE "Muscles" DROP CONSTRAINT "Muscles_pkey",
DROP COLUMN "muscle_description",
DROP COLUMN "muscle_id",
ADD COLUMN     "muscleDescription" TEXT NOT NULL,
ADD COLUMN     "muscleId" TEXT NOT NULL,
ADD CONSTRAINT "Muscles_pkey" PRIMARY KEY ("muscleId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "body_height",
DROP COLUMN "user_birthDate",
DROP COLUMN "user_id",
DROP COLUMN "user_inscriptionDate",
DROP COLUMN "user_sex",
ADD COLUMN     "bodyHeight" TEXT NOT NULL,
ADD COLUMN     "userBirthDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "userInscriptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userSex" "Sex" NOT NULL DEFAULT 'O',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "UserHealthIssue" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WeekPlan" DROP COLUMN "infrastructure_availability",
DROP COLUMN "program_data",
DROP COLUMN "program_owner_id",
DROP COLUMN "program_user_id",
ADD COLUMN     "infrastructureAvailability" "Infrastructure",
ADD COLUMN     "programData" JSONB NOT NULL,
ADD COLUMN     "programOwnerId" TEXT NOT NULL,
ADD COLUMN     "programUserId" TEXT;

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "current_date",
DROP COLUMN "health_issues",
DROP COLUMN "session_data",
DROP COLUMN "week_plan_id",
ADD COLUMN     "currentDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "healthIssues" "Health" NOT NULL,
ADD COLUMN     "sessionData" JSONB NOT NULL,
ADD COLUMN     "weekPlanId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ExerciceXMedia";

-- DropTable
DROP TABLE "Exercices";

-- DropTable
DROP TABLE "User_Body";

-- CreateTable
CREATE TABLE "Exercises" (
    "exerciseId" TEXT NOT NULL,
    "exerciseInstruction" TEXT NOT NULL,
    "exerciseIntensities" "Intensities" NOT NULL DEFAULT 'medium',
    "levelId" TEXT NOT NULL,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("exerciseId")
);

-- CreateTable
CREATE TABLE "ExerciseXMedia" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,

    CONSTRAINT "ExerciseXMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBody" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bodyWeight" DOUBLE PRECISION NOT NULL,
    "measuringDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBody_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercises_exerciseId_key" ON "Exercises"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseXMedia_id_key" ON "ExerciseXMedia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserBody_id_key" ON "UserBody"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Equipements_equipementId_key" ON "Equipements"("equipementId");

-- CreateIndex
CREATE UNIQUE INDEX "Equipements_equipementDescription_key" ON "Equipements"("equipementDescription");

-- CreateIndex
CREATE UNIQUE INDEX "Equipements_equipementPhotoUrl_key" ON "Equipements"("equipementPhotoUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Levels_levelId_key" ON "Levels"("levelId");

-- CreateIndex
CREATE UNIQUE INDEX "Levels_levelDescription_key" ON "Levels"("levelDescription");

-- CreateIndex
CREATE UNIQUE INDEX "Muscles_muscleId_key" ON "Muscles"("muscleId");

-- CreateIndex
CREATE UNIQUE INDEX "Muscles_muscleDescription_key" ON "Muscles"("muscleDescription");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "UserHealthIssue" ADD CONSTRAINT "UserHealthIssue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("levelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseXMedia" ADD CONSTRAINT "ExerciseXMedia_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("exerciseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseXMuscles" ADD CONSTRAINT "ExerciseXMuscles_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("exerciseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseXMuscles" ADD CONSTRAINT "ExerciseXMuscles_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "Muscles"("muscleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekPlan" ADD CONSTRAINT "WeekPlan_programOwnerId_fkey" FOREIGN KEY ("programOwnerId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekPlan" ADD CONSTRAINT "WeekPlan_programUserId_fkey" FOREIGN KEY ("programUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_weekPlanId_fkey" FOREIGN KEY ("weekPlanId") REFERENCES "WeekPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBody" ADD CONSTRAINT "UserBody_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
