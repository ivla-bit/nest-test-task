import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { Vote } from './entities/vote.entity';
import { Judge } from 'src/judge/entities/judge.entity';
import { Participant } from 'src/participant/entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Judge, Participant])],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
