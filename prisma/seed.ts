import { PrismaClient } from '@prisma/client';
import { $Enums } from '@prisma/client';

const prisma = new PrismaClient();

const ROWS: $Enums.Row[] = [
  $Enums.Row.AA, $Enums.Row.A, $Enums.Row.B, $Enums.Row.C, $Enums.Row.D, $Enums.Row.E, $Enums.Row.F,
  $Enums.Row.G, $Enums.Row.H, $Enums.Row.I, $Enums.Row.J, $Enums.Row.K, $Enums.Row.L, $Enums.Row.M
];

async function main() {
  // Seed theatres and auditoriums
  const theatre = await prisma.theatre.create({
    data: {
      name: "Downtown Cinema",
      location: "123 Main Street",
      audiotoriums: {
        create: [
          { number: 1, seatMap: {} },
          { number: 2, seatMap: {} },
        ],
      },
    },
    include: { audiotoriums: true },
  });

  // Seed movies
  const movies = await prisma.movie.createMany({
    data: [
      { title: "Interstellar", description: "Space travel to save humanity.", duration: 169 },
      { title: "Inception", description: "Dream within a dream thriller.", duration: 148 },
      { title: "The Matrix", description: "Hacker discovers reality isn't real.", duration: 136 }
    ]
  });

  const movieList = await prisma.movie.findMany();

  // Seed screenings for each movie in each auditorium at different times
  const now = new Date();
  const screenings: { id: string; movieId: string; auditoriumId: string; startTime: Date }[] = [];
  for (const auditorium of theatre.audiotoriums) {
    for (const movie of movieList) {
      const screening = await prisma.screening.create({
        data: {
          movieId: movie.id,
          auditoriumId: auditorium.id,
          startTime: new Date(now.getTime() + Math.random() * 1e7), // Random future time
        }
      });
      screenings.push(screening);
    }
  }

  // Generate seats for each screening
  for (const screening of screenings) {
    for (const row of ROWS) {
      for (let i = 1; i <= 18; i++) {
        await prisma.seat.create({
          data: {
            auditorium: 1, // Simplification: assuming same layout across auditoriums
            row,
            number: i,
            screeningId: screening.id,
          },
        });
      }
    }
  }

  // Create users
  const users = await prisma.user.createMany({
    data: [
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Smith", email: "bob@example.com" },
      { name: "Charlie Brown", email: "charlie@example.com" },
    ]
  });

  const userList = await prisma.user.findMany();
  const seatList = await prisma.seat.findMany({
    take: 15,
    include: { screening: true },
  });

  // Purchase 15 tickets: 5 per user
  let seatIdx = 0;
  for (const user of userList) {
    for (let i = 0; i < 5; i++) {
      const seat = seatList[seatIdx];
      await prisma.ticket.create({
        data: {
          userId: user.id,
          seatId: seat.id,
        },
      });
      seatIdx++;
    }
  }
}

main()
  .then(() => console.log("Seeding completed."))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
