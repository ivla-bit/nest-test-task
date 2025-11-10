import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgeService } from './judge.service';
import { JudgeController } from './judge.controller';
import { Judge } from './entities/judge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Judge])],
  controllers: [JudgeController],
  providers: [JudgeService],
})
export class JudgeModule {}
