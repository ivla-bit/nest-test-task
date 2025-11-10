import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Judge } from './entities/judge.entity';
import { CreateJudgeDto } from './dto/create-judge.dto';
import { UpdateJudgeDto } from './dto/update-judge.dto';

@Injectable()
export class JudgeService {
  constructor(
    @InjectRepository(Judge)
    private judgeRepository: Repository<Judge>,
  ) {}

  async create(createJudgeDto: CreateJudgeDto) {
    const judge = this.judgeRepository.create(createJudgeDto);
    return this.judgeRepository.save(judge);
  }

  async findAll() {
    return this.judgeRepository.find();
  }

  async findOne(id: string) {
    const judge = await this.judgeRepository.findOne({ where: { id } });
    if (!judge) throw new NotFoundException('Judge not found');
    return judge;
  }

  async update(id: string, updateJudgeDto: UpdateJudgeDto) {
    const judge = await this.judgeRepository.preload({ id, ...updateJudgeDto });
    if (!judge) throw new NotFoundException('Judge not found');
    return this.judgeRepository.save(judge);
  }

  async remove(id: string) {
    const judge = await this.judgeRepository.findOne({ where: { id } });
    if (!judge) throw new NotFoundException('Judge not found');
    await this.judgeRepository.remove(judge);
    return { deleted: true };
  }
}
