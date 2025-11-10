import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { Judge } from 'src/judge/entities/judge.entity';
import { Participant } from 'src/participant/entities/participant.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    @InjectRepository(Judge) private judgeRepository: Repository<Judge>,
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  async createVote(createVoteDto: CreateVoteDto) {
    const { accessCode, participantId, score } = createVoteDto;

    const judge = await this.judgeRepository.findOne({ where: { accessCode } });
    if (!judge) throw new BadRequestException('Invalid access code');

    const participant = await this.participantRepository.findOne({
      where: { id: participantId },
    });

    if (!participant) throw new BadRequestException('Invalid participant ID');

    const count = await this.voteRepository.count({
      where: { judge: { id: judge.id } },
    });

    if (count >= 3)
      throw new BadRequestException('Vote limit reached for this judge');

    const vote = this.voteRepository.create({
      judge,
      participant,
      score,
      round: count + 1,
    });

    return await this.voteRepository.save(vote);
  }

  async getAverages() {
    const votes: Vote[] = await this.voteRepository.find({
      relations: ['participant'],
    });

    const stats: Record<
      string,
      { name: string; total: number; count: number }
    > = {};

    for (const v of votes) {
      const participant = v.participant;
      if (!participant) continue;

      const id = String(participant.id);

      if (!stats[id]) {
        stats[id] = { name: participant.name, total: 0, count: 0 };
      }

      const participantStats = stats[id];

      const score = typeof v.score === 'number' ? v.score : 0;
      participantStats.total += score;
      participantStats.count += 1;
    }

    return Object.values(stats).map((s) => ({
      name: s.name,
      average: s.count > 0 ? s.total / s.count : 0,
    }));
  }

  async getWinner() {
    const averages = await this.getAverages();
    averages.sort((a, b) => b.average - a.average);
    return averages[0];
  }
}
