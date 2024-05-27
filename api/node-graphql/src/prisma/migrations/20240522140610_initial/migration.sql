-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "Intensities" AS ENUM ('low', 'medium', 'high', 'super');

-- CreateEnum
CREATE TYPE "Infrastructure" AS ENUM ('home', 'gym', 'outdoor');

-- CreateEnum
CREATE TYPE "Health" AS ENUM ('none', 'heart', 'back', 'rightArm', 'leftArm', 'rightLeg', 'leftLeg', 'muscleSoreness');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userBirthDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userInscriptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userSex" "Sex" NOT NULL DEFAULT 'O',
    "bodyHeight" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserHealthIssue" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "healthIssue" "Health" NOT NULL,

    CONSTRAINT "UserHealthIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Levels" (
    "levelId" TEXT NOT NULL,
    "levelDescription" TEXT NOT NULL,

    CONSTRAINT "Levels_pkey" PRIMARY KEY ("levelId")
);

-- CreateTable
CREATE TABLE "Muscles" (
    "muscleId" TEXT NOT NULL,
    "muscleDescription" TEXT NOT NULL,

    CONSTRAINT "Muscles_pkey" PRIMARY KEY ("muscleId")
);

-- CreateTable
CREATE TABLE "Equipements" (
    "equipementId" TEXT NOT NULL,
    "equipementDescription" TEXT NOT NULL,
    "equipementPhotoUrl" TEXT,

    CONSTRAINT "Equipements_pkey" PRIMARY KEY ("equipementId")
);

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
CREATE TABLE "ExerciseXMuscles" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "muscleId" TEXT NOT NULL,

    CONSTRAINT "ExerciseXMuscles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeekPlan" (
    "id" TEXT NOT NULL,
    "programOwnerId" TEXT NOT NULL,
    "programUserId" TEXT,
    "infrastructureAvailability" "Infrastructure",
    "programData" JSONB NOT NULL,

    CONSTRAINT "WeekPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" TEXT NOT NULL,
    "weekPlanId" TEXT NOT NULL,
    "sessionData" JSONB NOT NULL,
    "healthIssues" "Health" NOT NULL,
    "currentDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserHealthIssue_id_key" ON "UserHealthIssue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Levels_levelId_key" ON "Levels"("levelId");

-- CreateIndex
CREATE UNIQUE INDEX "Levels_levelDescription_key" ON "Levels"("levelDescription");

-- CreateIndex
CREATE UNIQUE INDEX "Muscles_muscleId_key" ON "Muscles"("muscleId");

-- CreateIndex
CREATE UNIQUE INDEX "Muscles_muscleDescription_key" ON "Muscles"("muscleDescription");

-- CreateIndex
CREATE UNIQUE INDEX "Equipements_equipementId_key" ON "Equipements"("equipementId");

-- CreateIndex
CREATE UNIQUE INDEX "Equipements_equipementDescription_key" ON "Equipements"("equipementDescription");

-- CreateIndex
CREATE UNIQUE INDEX "Equipements_equipementPhotoUrl_key" ON "Equipements"("equipementPhotoUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Exercises_exerciseId_key" ON "Exercises"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseXMedia_id_key" ON "ExerciseXMedia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseXMuscles_id_key" ON "ExerciseXMuscles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WeekPlan_id_key" ON "WeekPlan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutSession_id_key" ON "WorkoutSession"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserBody_id_key" ON "UserBody"("id");

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
