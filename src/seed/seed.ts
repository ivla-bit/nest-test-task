import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Judge } from 'src/judge/entities/judge.entity';
import { Participant } from 'src/participant/entities/participant.entity';
import { Vote } from 'src/vote/entities/vote.entity';
import { config } from 'dotenv';
config();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [Judge, Participant, Vote],
});

async function seed() {
  await AppDataSource.initialize();

  const judgeRepo = AppDataSource.getRepository(Judge);
  const participantRepo = AppDataSource.getRepository(Participant);

  await AppDataSource.query(
    'TRUNCATE TABLE vote, judge, participant RESTART IDENTITY CASCADE',
  );

  const judges = [
    { name: 'judge1', accessCode: 'JUDGE123' },
    { name: 'judge2', accessCode: 'JUDGE456' },
    { name: 'judge3', accessCode: 'JUDGE789' },
  ];

  await judgeRepo.save(judges);

  const participants = [
    { name: 'participant1' },
    { name: 'participant2' },
    { name: 'participant3' },
  ];

  await participantRepo.save(participants);

  console.log('Data added successfully!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error seeding data:', err);
  process.exit(1);
});
