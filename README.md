<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# Cinema Backend API

A robust backend API for a cinema management system built with NestJS, providing comprehensive functionality for managing movies, theatres, screenings, tickets, and user authentication.

## Features

- **User Management**

  - User registration and authentication
  - JWT-based authentication
  - User profile management
  - Role-based access control (Admin/User)

- **Movie Management**

  - CRUD operations for movies
  - Movie details including title, description, duration, and tags
  - Movie poster management

- **Theatre Management**

  - Theatre creation and management
  - Multiple auditorium support per theatre
  - Different auditorium types (REGULAR, IMAX, CC, DBOX, SCREENX, DOLBY_ATMOS, DOLBY_3D, LASERPROJECTION)

- **Screening Management**

  - Schedule movie screenings
  - Manage screening times and auditorium assignments
  - View available screenings

- **Seat Management**

  - Seat layout management per auditorium
  - Row and number-based seat organization
  - Seat availability tracking

- **Ticket Management**
  - Ticket booking system
  - Ticket history per user
  - Ticket refund functionality
  - Seat reservation system

## Technologies Used

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator, class-transformer
- **Testing**: Jest
- **Package Manager**: pnpm

## Database Schema

```mermaid
erDiagram
    User {
        string id PK
        string email UK
        string name
        string password
        string phone
        boolean isAdmin
        datetime createdAt
    }

    Movie {
        string id PK
        string title
        string description
        string[] tags
        int duration
        string posterUrl
    }

    Theatre {
        string id PK
        string name
        string location
    }

    Auditorium {
        string id PK
        int number
        enum type
        string theatreId FK
    }

    Seat {
        string id PK
        string auditoriumId FK
        enum row
        int number
    }

    Screening {
        string id PK
        string movieId FK
        string auditoriumId FK
        datetime startTime
    }

    Ticket {
        string id PK
        string userId FK
        string seatId FK
        string screeningId FK
        datetime purchasedAt
        boolean refunded
    }

    User ||--o{ Ticket : "has"
    Movie ||--o{ Screening : "has"
    Theatre ||--o{ Auditorium : "has"
    Auditorium ||--o{ Seat : "has"
    Auditorium ||--o{ Screening : "hosts"
    Seat ||--o{ Ticket : "reserved in"
    Screening ||--o{ Ticket : "has"
```

The diagram above shows the relationships between different entities in the database:

- **User**: Stores user information and authentication details
- **Movie**: Contains movie details and metadata
- **Theatre**: Represents cinema locations
- **Auditorium**: Different screening rooms within theatres
- **Seat**: Individual seats in auditoriums
- **Screening**: Movie showings in specific auditoriums
- **Ticket**: Booking records linking users, seats, and screenings

Key relationships:

- A User can have multiple Tickets
- A Movie can have multiple Screenings
- A Theatre can have multiple Auditoriums
- An Auditorium can have multiple Seats and Screenings
- A Seat can be reserved in multiple Tickets
- A Screening can have multiple Tickets

## Project Setup

```bash
# Install dependencies
$ pnpm install

# Generate Prisma client
$ pnpm prisma generate

# Run database migrations
$ pnpm prisma migrate dev

# Start development server
$ pnpm run start:dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cinema_db"
JWT_SECRET="your-jwt-secret"
PORT=8080
```

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
