import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vote } from 'src/vote/entities/vote.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Vote, (vote) => vote.participant)
  votes: Vote[];
}
