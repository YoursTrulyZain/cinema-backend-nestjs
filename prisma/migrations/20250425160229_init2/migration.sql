/*
  Warnings:

  - You are about to drop the column `screeningId` on the `Seat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seatId,screeningId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Auditorium` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Theatre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Theatre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screeningId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('IMAX', 'STANDARD', 'CC', 'DBOX', 'SCREENX', 'DOLBY_ATMOS', 'DOLBY_3D');

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_screeningId_fkey";

-- DropIndex
DROP INDEX "Ticket_seatId_key";

-- AlterTable
ALTER TABLE "Auditorium" ADD COLUMN     "type" "Type" NOT NULL;

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "screeningId";

-- AlterTable
ALTER TABLE "Theatre" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "screeningId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_seatId_screeningId_key" ON "Ticket"("seatId", "screeningId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
