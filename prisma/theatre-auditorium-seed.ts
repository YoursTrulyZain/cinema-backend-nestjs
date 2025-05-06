// prisma/seed.ts
import { PrismaClient, Row, Type } from '@prisma/client';

const prisma = new PrismaClient();

const theatres = [
  {
    name: 'South Keys Cinema',
    location: 'Bank Street, Ottawa, ON',
  },
  {
    name: 'Lansdowne Cinema',
    location: 'Marche Way, Unit 107, Ottawa, ON',
  },
  {
    name: 'Scotiabank Theatre',
    location: 'City Park Drive, Ottawa, ON',
  },
  {
    name: 'Ottawa Cinema',
    location: 'Carling Avenue, Ottawa, ON',
  },
];

const allRows = Object.values(Row); // ['AA', 'A', 'B', ..., 'M']
const auditoriumTypes = Object.values(Type); // Cycle through these types

async function main() {
  console.log('Seeding theatres, auditoriums, and seats...');

  for (const theatreData of theatres) {
    const theatre = await prisma.theatre.create({
      data: {
        name: theatreData.name,
        location: theatreData.location,
      },
    });

    for (let i = 1; i <= 9; i++) {
      const type = auditoriumTypes[(i - 1) % auditoriumTypes.length];

      const auditorium = await prisma.auditorium.create({
        data: {
          number: i,
          type,
          theatreId: theatre.id,
        },
      });

      let seatCounter = 1;

      for (const row of allRows) {
        for (let seatNum = 1; seatNum <= 18; seatNum++) {
          await prisma.seat.create({
            data: {
              auditoriumId: auditorium.id,
              row,
              number: seatNum,
            },
          });
          seatCounter++;
        }
      }
    }
  }

  console.log('✅ Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
