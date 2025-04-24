-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "cinema-backend-nestjs";

-- CreateEnum
CREATE TYPE "cinema-backend-nestjs"."Row" AS ENUM ('AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M');

-- CreateTable
CREATE TABLE "cinema-backend-nestjs"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cinema-backend-nestjs"."Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cinema-backend-nestjs"."Ticket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refunded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cinema-backend-nestjs"."Seat" (
    "id" TEXT NOT NULL,
    "auditorium" INTEGER NOT NULL,
    "row" "cinema-backend-nestjs"."Row" NOT NULL,
    "number" INTEGER NOT NULL,
    "screeningId" TEXT NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cinema-backend-nestjs"."Screening" (
    "id" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "auditoriumId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Screening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cinema-backend-nestjs"."Theatre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Theatre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cinema-backend-nestjs"."Auditorium" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "theatreId" TEXT NOT NULL,
    "seatMap" JSONB NOT NULL,

    CONSTRAINT "Auditorium_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "cinema-backend-nestjs"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_seatId_key" ON "cinema-backend-nestjs"."Ticket"("seatId");

-- AddForeignKey
ALTER TABLE "cinema-backend-nestjs"."Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "cinema-backend-nestjs"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cinema-backend-nestjs"."Ticket" ADD CONSTRAINT "Ticket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "cinema-backend-nestjs"."Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cinema-backend-nestjs"."Seat" ADD CONSTRAINT "Seat_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "cinema-backend-nestjs"."Screening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cinema-backend-nestjs"."Screening" ADD CONSTRAINT "Screening_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "cinema-backend-nestjs"."Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cinema-backend-nestjs"."Screening" ADD CONSTRAINT "Screening_auditoriumId_fkey" FOREIGN KEY ("auditoriumId") REFERENCES "cinema-backend-nestjs"."Auditorium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cinema-backend-nestjs"."Auditorium" ADD CONSTRAINT "Auditorium_theatreId_fkey" FOREIGN KEY ("theatreId") REFERENCES "cinema-backend-nestjs"."Theatre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

