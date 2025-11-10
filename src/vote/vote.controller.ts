import { Controller, Post, Body, Get } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  vote(@Body() createVoteDto: CreateVoteDto) {
    console.log('Request body:', createVoteDto);
    return this.voteService.createVote(createVoteDto);
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
