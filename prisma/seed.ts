import { PrismaClient } from '@prisma/client';
import { add, set } from 'date-fns';
import { auditoriums, movies } from './seed-constants';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old screenings...');
  await prisma.screening.deleteMany();

  const today = new Date();

  const timeSlots = [9, 13, 17, 21, 1]; // 9AM–1AM (last is technically next day)

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const baseDate = add(today, { days: dayOffset });

    for (const auditorium of auditoriums) {
      for (const hour of timeSlots) {
        const isNextDay = hour < 9;
        const date = set(baseDate, {
          hours: hour,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        });
        const startTime = isNextDay ? add(date, { days: 1 }) : date;

        const movie = movies[Math.floor(Math.random() * movies.length)];

        await prisma.screening.create({
          data: {
            movieId: movie.id,
            auditoriumId: auditorium.id,
            startTime,
          },
        });
      }
    }
  }

  console.log('✅ Seeded 7 days of screenings.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
