import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
import { ScreeningEntity } from './entities/screening.entity';
import { IScreeningRepository } from './interfaces/screening-repository.interface';

@Injectable()
export class ScreeningService {

  constructor(private readonly screeningRepository: IScreeningRepository){}

  async create(createScreeningDto: CreateScreeningDto): Promise<ScreeningEntity> {
    return this.screeningRepository.create(createScreeningDto);
  }

  async findAll(): Promise<ScreeningEntity[]> {
    return this.screeningRepository.findAll();
  }

  async findOne(id: string): Promise<ScreeningEntity> {
    return this.screeningRepository.findOne(id);
  }

  async update(id: string, updateScreeningDto: UpdateScreeningDto): Promise<ScreeningEntity> {
    return this.screeningRepository.update(id, updateScreeningDto);
  }

  async remove(id: string): Promise<ScreeningEntity> {
    return this.screeningRepository.remove(id);
  }
}
