/*
  Warnings:

  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Report";

-- DropEnum
DROP TYPE "ReportStatus";

-- CreateTable
CREATE TABLE "Lecturer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Lecturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LecturerToSemester" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LecturerCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Lecturer_email_key" ON "Lecturer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_LecturerToSemester_AB_unique" ON "_LecturerToSemester"("A", "B");

-- CreateIndex
CREATE INDEX "_LecturerToSemester_B_index" ON "_LecturerToSemester"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LecturerCourses_AB_unique" ON "_LecturerCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_LecturerCourses_B_index" ON "_LecturerCourses"("B");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LecturerToSemester" ADD CONSTRAINT "_LecturerToSemester_A_fkey" FOREIGN KEY ("A") REFERENCES "Lecturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LecturerToSemester" ADD CONSTRAINT "_LecturerToSemester_B_fkey" FOREIGN KEY ("B") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LecturerCourses" ADD CONSTRAINT "_LecturerCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LecturerCourses" ADD CONSTRAINT "_LecturerCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "Lecturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
