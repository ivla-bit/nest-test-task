import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Judge } from 'src/judge/entities/judge.entity';
import { Participant } from 'src/participant/entities/participant.entity';
@Entity()
@Unique(['judge', 'participant', 'round'])
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Judge, (judge) => judge.votes, { eager: true })
  judge: Judge;

  @ManyToOne(() => Participant, (participant) => participant.votes, {
    eager: true,
  })
  participant: Participant;

  @Column()
  score: number;

  @Column()
  round: number;
}
