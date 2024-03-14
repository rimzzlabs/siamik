/*
  Warnings:

  - You are about to drop the column `isActive` on the `Semester` table. All the data in the column will be lost.
  - Added the required column `grade` to the `Semester` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SemesterGrade" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH');

-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "isActive",
ADD COLUMN     "grade" "SemesterGrade" NOT NULL;
