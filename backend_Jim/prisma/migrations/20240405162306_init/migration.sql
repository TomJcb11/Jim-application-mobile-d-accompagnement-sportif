/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `body_height` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "Intensities" AS ENUM ('low', 'medium', 'high', 'super');

-- CreateEnum
CREATE TYPE "Infrastructure" AS ENUM ('home', 'gym', 'outdoor');

-- CreateEnum
CREATE TYPE "Health" AS ENUM ('none', 'heart', 'back', 'right_arm', 'left_arm', 'right_leg', 'left_leg', 'muscle_soreness');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "body_height" TEXT NOT NULL,
ADD COLUMN     "user_birthDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "user_inscriptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_sex" "Sex" NOT NULL DEFAULT 'O',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "UserHealthIssue" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "healthIssue" "Health" NOT NULL,

    CONSTRAINT "UserHealthIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Levels" (
    "level_id" TEXT NOT NULL,
    "level_description" TEXT NOT NULL,

    CONSTRAINT "Levels_pkey" PRIMARY KEY ("level_id")
);

-- CreateTable
CREATE TABLE "Muscles" (
    "muscle_id" TEXT NOT NULL,
    "muscle_description" TEXT NOT NULL,

    CONSTRAINT "Muscles_pkey" PRIMARY KEY ("muscle_id")
);

-- CreateTable
CREATE TABLE "Equipements" (
    "equipement_id" TEXT NOT NULL,
    "equipement_description" TEXT NOT NULL,
    "equipement_photo_url" TEXT,

    CONSTRAINT "Equipements_pkey" PRIMARY KEY ("equipement_id")
);

-- CreateTable
CREATE TABLE "Exercices" (
    "exercise_id" TEXT NOT NULL,
    "exercise_instruction" TEXT NOT NULL,
    "exercise_intensities" "Intensities" NOT NULL DEFAULT 'medium',
    "level_id" TEXT NOT NULL,

    CONSTRAINT "Exercices_pkey" PRIMARY KEY ("exercise_id")
);

-- CreateTable
CREATE TABLE "ExerciceXMedia" (
    "id" TEXT NOT NULL,
    "exercice_id" TEXT NOT NULL,
    "media_url" TEXT NOT NULL,

    CONSTRAINT "ExerciceXMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseXMuscles" (
    "id" TEXT NOT NULL,
    "exercice_id" TEXT NOT NULL,
    "muscle_id" TEXT NOT NULL,

    CONSTRAINT "ExerciseXMuscles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeekPlan" (
    "id" TEXT NOT NULL,
    "program_owner_id" TEXT NOT NULL,
    "program_user_id" TEXT,
    "infrastructure_availability" "Infrastructure",
    "program_data" JSONB NOT NULL,

    CONSTRAINT "WeekPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" TEXT NOT NULL,
    "week_plan_id" TEXT NOT NULL,
    "session_data" JSONB NOT NULL,
    "health_issues" "Health" NOT NULL,
    "current_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Body" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "body_weight" DOUBLE PRECISION NOT NULL,
    "measuring_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Body_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserHealthIssue_id_key" ON "UserHealthIssue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Levels_level_id_key" ON "Levels"("level_id");

-- CreateIndex
CREATE UNIQUE INDEX "Levels_level_description_key" ON "Levels"("level_description");

-- CreateIndex
CREATE UNIQUE INDEX "Muscles_muscle_id_key" ON "Muscles"("muscle_id");

-- CreateIndex
CREATE UNIQUE INDEX "Muscles_muscle_description_key" ON "Muscles"("muscle_description");

-- CreateIndex
CREATE UNIQUE INDEX "Equipements_equipement_id_key" ON "Equipements"("equipement_id");

-- CreateIndex
CREATE UNIQUE INDEX "Equipements_equipement_description_key" ON "Equipements"("equipement_description");

-- CreateIndex
CREATE UNIQUE INDEX "Equipements_equipement_photo_url_key" ON "Equipements"("equipement_photo_url");

-- CreateIndex
CREATE UNIQUE INDEX "Exercices_exercise_id_key" ON "Exercices"("exercise_id");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciceXMedia_id_key" ON "ExerciceXMedia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseXMuscles_id_key" ON "ExerciseXMuscles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WeekPlan_id_key" ON "WeekPlan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutSession_id_key" ON "WorkoutSession"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Body_id_key" ON "User_Body"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- AddForeignKey
ALTER TABLE "UserHealthIssue" ADD CONSTRAINT "UserHealthIssue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercices" ADD CONSTRAINT "Exercices_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Levels"("level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciceXMedia" ADD CONSTRAINT "ExerciceXMedia_exercice_id_fkey" FOREIGN KEY ("exercice_id") REFERENCES "Exercices"("exercise_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseXMuscles" ADD CONSTRAINT "ExerciseXMuscles_exercice_id_fkey" FOREIGN KEY ("exercice_id") REFERENCES "Exercices"("exercise_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseXMuscles" ADD CONSTRAINT "ExerciseXMuscles_muscle_id_fkey" FOREIGN KEY ("muscle_id") REFERENCES "Muscles"("muscle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekPlan" ADD CONSTRAINT "WeekPlan_program_owner_id_fkey" FOREIGN KEY ("program_owner_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekPlan" ADD CONSTRAINT "WeekPlan_program_user_id_fkey" FOREIGN KEY ("program_user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_week_plan_id_fkey" FOREIGN KEY ("week_plan_id") REFERENCES "WeekPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Body" ADD CONSTRAINT "User_Body_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
