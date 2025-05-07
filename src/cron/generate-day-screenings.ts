import { PrismaClient } from '@prisma/client';
import { add, set, startOfDay, endOfDay } from 'date-fns';

const prisma = new PrismaClient();

// Movies (id + duration in minutes)

export const movies = [
  { id: 'cmabhg75p000bupyk3eel2c5v', duration: 153 },
  { id: 'cmabhftxu000aupykflzrbqhu', duration: 169 },
  { id: 'cmabhff420009upykwg5wuwey', duration: 156 },
  { id: 'cmabhelrr0008upykizr6q9c7', duration: 201 },
  { id: 'cmabhe1um0007upyk9mokpmmm', duration: 127 },
  { id: 'cmabhdaok0006upykv5uvl04l', duration: 149 },
  { id: 'cmabhcqjn0005upyk29a41w0n', duration: 98 },
  { id: 'cmabhc5ef0004upykeuvjspvr', duration: 140 },
  { id: 'cmabhbg1a0003upykh41agodn', duration: 169 },
  { id: 'cmabhb0hw0002upykmwju5xv4', duration: 136 },
  { id: 'cmabhag860001upyk4v04j211', duration: 148 },
  { id: 'cmabh861j0000upyk6x0a13b7', duration: 175 },
];

export const auditoriums = [
  { id: 'cmabjhzzk0002upoos3ki8g96' },
  { id: 'cmabji83f00e4upoo10tmjuv2' },
  { id: 'cmabjigdx00s6upooa9n27h3s' },
  { id: 'cmabjiniv0168upooltexx3cm' },
  { id: 'cmabjivoa01kaupoo2qmf9tpx' },
  { id: 'cmabjj3xf01ycupooh351d9yf' },
  { id: 'cmabjjc1402ceupooysrbl0m8' },
  { id: 'cmabjjj5x02qgupoonl4kbzbt' },
  { id: 'cmabjjr5g034iupoomy9bquyz' },
  { id: 'cmabjjz7803ilupoop7rq2s36' },
  { id: 'cmabjk6hz03wnupoo04xwbc21' },
  { id: 'cmabjkekt04apupool8gwoa9l' },
  { id: 'cmabjkmsv04orupoo82xvn909' },
  { id: 'cmabjktwj052tupoo5nl620ej' },
  { id: 'cmabjl22u05gvupooi8nioven' },
  { id: 'cmabjla3705uxupooan13bfh5' },
  { id: 'cmabjlh5q068zupook2bwwejp' },
  { id: 'cmabjlp6h06n1upoolpjcze8m' },
  { id: 'cmabjlxfm0714upooohlxx42y' },
  { id: 'cmabjm4kl07f6upooblz3o8fd' },
  { id: 'cmabjmcn307t8upoo6tci7toe' },
  { id: 'cmabjmkqd087aupoontttdqy9' },
  { id: 'cmabjms1w08lcupoovejhv9ez' },
  { id: 'cmabjn0a508zeupoozdxxrqbk' },
  { id: 'cmabjn8fb09dgupoociadmfd6' },
  { id: 'cmabjnfmw09riupooby1hspul' },
  { id: 'cmabjnnui0a5kupoofghauzsm' },
  { id: 'cmabjnvvt0ajnupoo7xbg9zxj' },
  { id: 'cmabjo32e0axpupooexshqv86' },
  { id: 'cmabjobkt0bbrupooutaqj0y1' },
  { id: 'cmabjojxm0bptupoosqtyntoh' },
  { id: 'cmabjor1i0c3vupoohplbbqi1' },
  { id: 'cmabjoz4n0chxupookimc2659' },
  { id: 'cmabjp7ae0cvzupoovklz4igl' },
  { id: 'cmabjpefb0da1upoofymzvxh3' },
  { id: 'cmabjpmtb0do3upooxxzs9ypi' },
];

async function main() {
  console.log('🔍 Checking for existing screenings on the 7th day...');

  const today = new Date();
  const targetDate = add(today, { days: 7 });
  const start = startOfDay(targetDate);
  const end = endOfDay(targetDate);

  const existing = await prisma.screening.findFirst({
    where: {
      startTime: {
        gte: start,
        lte: end,
      },
    },
  });

  if (existing) {
    console.log('⚠️ Screenings already exist for the 7th day. Aborting.');
    return;
  }

  console.log(
    '✅ No existing screenings found for the 7th day. Proceeding to create...',
  );

  const timeSlots = [9, 13, 17, 21, 1]; // 9AM–1AM next day

  for (const auditorium of auditoriums) {
    for (const hour of timeSlots) {
      const isNextDay = hour < 9;
      const baseDate = set(targetDate, {
        hours: hour,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      const startTime = isNextDay ? add(baseDate, { days: 1 }) : baseDate;

      const movie = movies[Math.floor(Math.random() * movies.length)];

      await prisma.screening.create({
        data: {
          movieId: movie.id,
          auditoriumId: auditorium.id,
          startTime,
        },
      });

      console.log(
        `🎬 Created screening: Movie ${movie.id} in Auditorium ${auditorium.id} at ${startTime}`,
      );
    }
  }

  console.log('✅ Finished seeding screenings for the new 7th day.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
