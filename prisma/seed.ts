import { PrismaClient, Row, Type } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Theatres
  const theatres = await Promise.all([
    prisma.theatre.create({
      data: {
        name: 'Downtown Cinema',
        location: '123 Main St, Toronto, ON',
        phone: '416-555-1234',
        email: 'info@downtowncinema.ca',
      },
    }),
    prisma.theatre.create({
      data: {
        name: 'Uptown Theatre',
        location: '456 King St, Toronto, ON',
        phone: '416-555-5678',
        email: 'contact@uptowntheatre.ca',
      },
    }),
  ])

  // Create Auditoriums
  const auditoriums = await Promise.all([
    prisma.auditorium.create({
      data: {
        number: 1,
        type: 'IMAX',
        theatreId: theatres[0].id,
      },
    }),
    prisma.auditorium.create({
      data: {
        number: 2,
        type: 'STANDARD',
        theatreId: theatres[0].id,
      },
    }),
    prisma.auditorium.create({
      data: {
        number: 1,
        type: 'DOLBY_3D',
        theatreId: theatres[1].id,
      },
    }),
  ])

  // Generate Seats for each auditorium
  const seatPromises = auditoriums.flatMap((auditorium) => {
    return Object.values(Row).flatMap((row) =>
      Array.from({ length: 18 }).map((_, index) => {
        return prisma.seat.create({
          data: {
            auditoriumId: auditorium.id,
            row,
            number: index + 1,
          },
        })
      })
    )
  })
  await Promise.all(seatPromises)

  // Create Movies
  const movies = await Promise.all([
    prisma.movie.create({
      data: {
        title: 'The Grand Adventure',
        description: 'A journey through unknown lands.',
        tags: ['adventure', 'fantasy'],
        duration: 130,
      },
    }),
    prisma.movie.create({
      data: {
        title: 'Sci-Fi Saga',
        description: 'A battle beyond the stars.',
        tags: ['sci-fi', 'action'],
        duration: 145,
      },
    }),
    prisma.movie.create({
      data: {
        title: 'Romantic Escape',
        description: 'Two lovers on the run.',
        tags: ['romance', 'drama'],
        duration: 115,
      },
    }),
    prisma.movie.create({
      data: {
        title: 'Haunted Halls',
        description: 'A chilling story set in an old mansion.',
        tags: ['horror', 'thriller'],
        duration: 102,
      },
    }),
  ])

  const now = new Date()
  const screenings = await Promise.all([
    prisma.screening.create({
      data: {
        movieId: movies[0].id,
        auditoriumId: auditoriums[0].id,
        startTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.screening.create({
      data: {
        movieId: movies[1].id,
        auditoriumId: auditoriums[1].id,
        startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.screening.create({
      data: {
        movieId: movies[2].id,
        auditoriumId: auditoriums[2].id,
        startTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000),
      },
    }),
    prisma.screening.create({
      data: {
        movieId: movies[3].id,
        auditoriumId: auditoriums[0].id,
        startTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 + 22 * 60 * 60 * 1000),
      },
    }),
  ])

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice@example.com',
        name: 'Alice',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob@example.com',
        name: 'Bob',
        password: 'securepass',
      },
    }),
    prisma.user.create({
      data: {
        email: 'charlie@example.com',
        name: 'Charlie',
        password: 'hunter2',
      },
    }),
  ])

  // Fetch specific seats
  const seat1 = await prisma.seat.findFirst({
    where: { auditoriumId: auditoriums[0].id, row: 'A', number: 1 },
  })

  const seat2 = await prisma.seat.findFirst({
    where: { auditoriumId: auditoriums[1].id, row: 'B', number: 2 },
  })

  const seat3 = await prisma.seat.findFirst({
    where: { auditoriumId: auditoriums[2].id, row: 'C', number: 5 },
  })

  // Create Tickets
  if (seat1 && seat2 && seat3) {
    await prisma.ticket.create({
      data: {
        userId: users[0].id,
        seatId: seat1.id,
        screeningId: screenings[0].id,
      },
    })

    await prisma.ticket.create({
      data: {
        userId: users[1].id,
        seatId: seat2.id,
        screeningId: screenings[1].id,
      },
    })

    await prisma.ticket.create({
      data: {
        userId: users[2].id,
        seatId: seat3.id,
        screeningId: screenings[2].id,
      },
    })
  }

  console.log('Database seeded! ✅')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
