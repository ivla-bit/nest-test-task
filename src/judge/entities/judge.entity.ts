import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vote } from 'src/vote/entities/vote.entity';

@Entity()
export class Judge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  accessCode: string;

  @OneToMany(() => Vote, (vote) => vote.judge)
  votes: Vote[];
}
