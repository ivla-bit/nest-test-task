import { Controller, Post, Body, Get } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  vote(
    @Body('accessCode') accessCode: string,
    @Body('participantId') participantId: string,
    @Body('score') score: number,
  ) {
    return this.voteService.createVote(accessCode, participantId, score);
  }

  @Get('averages')
  getAverages() {
    return this.voteService.getAverages();
  }

  @Get('winner')
  getWinner() {
    return this.voteService.getWinner();
  }
}
