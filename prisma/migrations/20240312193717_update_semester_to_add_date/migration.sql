/*
  Warnings:

  - You are about to drop the column `year` on the `Semester` table. All the data in the column will be lost.
  - Added the required column `date` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Semester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "year",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
