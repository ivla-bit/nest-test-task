# Nest Test Task

Lightweight NestJS application for a small voting/contest system. This repository contains three main modules: judges, participants and votes. It's built with NestJS + TypeORM and uses PostgreSQL as the persistence layer.

## Key features

- REST endpoints for managing judges and participants
- Vote submission and aggregate helpers (averages and winner)
- TypeORM auto-loaded entities and a small seed script

## Tech stack

- Node.js + NestJS (TypeScript)
- TypeORM
- PostgreSQL

## Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn)
- PostgreSQL (or Docker)

## Environment variables

The app reads database configuration from environment variables (used by src/config/typeorm.config.ts):

- POSTGRES_HOST (e.g. localhost)
- POSTGRES_PORT (e.g. 5432)
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DB
- PORT

Create a .env file in the project root or supply these values in your environment. Example .env:

`env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nest_test
PORT=5432
`

## Quick start (local Postgres)

1. Start a local PostgreSQL instance and set the environment variables above.
2. Install dependencies and run:

`powershell
npm install
npm run seed
npm run start:dev
`

## Available scripts

- pm run start start the app (production mode using
  est start)
- pm run start:dev start in watch mode
- pm run start:prod run built app (
  ode dist/main)
- pm run build compile TypeScript (
  est build)

pm run seed run the seed script (src/seed/seed.ts)

## API summary

This project exposes the following REST endpoints (default base host: http://localhost:3000):

- Judges
  - POST /judge create judge
  - GET /judge list judges
  - GET /judge/:id get judge
  - PATCH /judge/:id update judge
  - DELETE /judge/:id delete judge

- Participants
  - POST /participant create participant
  - GET /participant list participants
  - GET /participant/:id get participant
  - PATCH /participant/:id update participant
  - DELETE /participant/:id delete participant

- Votes
  - POST /votes submit a vote (see src/vote/dto/create-vote.dto.ts for request shape)
  - GET /votes/averages get average scores per participant
  - GET /votes/winner get the winner (by implemented logic)

## Seeding

The repository includes src/seed/seed.ts. Run the seed script to populate sample data:

`powershell
npm run seed
`
