import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from './entities/participant.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  async create(createParticipantDto: CreateParticipantDto) {
    const participant = this.participantRepository.create(createParticipantDto);
    return this.participantRepository.save(participant);
  }

  async findAll() {
    return this.participantRepository.find();
  }

  async findOne(id: string) {
    const participant = await this.participantRepository.findOne({
      where: { id },
    });
    if (!participant) throw new NotFoundException('Participant not found');
    return participant;
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    const participant = await this.participantRepository.preload({
      id,
      ...updateParticipantDto,
    });
    if (!participant) throw new NotFoundException('Participant not found');
    return this.participantRepository.save(participant);
  }

  async remove(id: string) {
    const participant = await this.participantRepository.findOne({
      where: { id },
    });
    if (!participant) throw new NotFoundException('Participant not found');
    await this.participantRepository.remove(participant);
    return { deleted: true };
  }
}
