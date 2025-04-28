import { Inject, Injectable } from '@nestjs/common';
import { CreateTheatreDto } from './dto/create-theatre.dto';
import { UpdateTheatreDto } from './dto/update-theatre.dto';
import { ITheatreRepository } from './interfaces/theatre-repository.interface';

@Injectable()
export class TheatreService {

  constructor(@Inject('ITheatreRepository') private readonly theatreRepository: ITheatreRepository) {}

  create(createTheatreDto: CreateTheatreDto) {
    return 'This action adds a new theatre';
  }

  findAll() {
    return `This action returns all theatre`;
  }

  findOne(id: string) {
    return `This action returns a #${id} theatre`;
  }

  findAllWithEverything() {
    return this.theatreRepository.findAllWithEverything();
  }

  findOneWithEverything(id: string) {
    return this.theatreRepository.findOneWithEverything(id);
  }

  update(id: string, updateTheatreDto: UpdateTheatreDto) {
    return `This action updates a #${id} theatre`;
  }

  remove(id: string) {
    return `This action removes a #${id} theatre`;
  }
}
