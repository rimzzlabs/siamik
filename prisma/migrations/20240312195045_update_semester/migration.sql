/*
  Warnings:

  - You are about to drop the column `date` on the `Semester` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Semester` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[grade]` on the table `Semester` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "date",
DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "Semester_grade_key" ON "Semester"("grade");
