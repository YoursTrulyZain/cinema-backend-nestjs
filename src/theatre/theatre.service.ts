import { Inject, Injectable } from '@nestjs/common';
import { CreateTheatreDto } from './dto/create-theatre.dto';
import { UpdateTheatreDto } from './dto/update-theatre.dto';
import { ITheatreRepository } from './interfaces/theatre-repository.interface';

@Injectable()
export class TheatreService {

  constructor(@Inject('ITheatreRepository') private readonly theatreRepository: ITheatreRepository) {}

  create(createTheatreDto: CreateTheatreDto) {
    return this.theatreRepository.create(createTheatreDto);
  }

  findAll() {
    return this.theatreRepository.findAll();
  }

  findOne(id: string) {
    return this.theatreRepository.findOne(id);
  }

  findAllWithEverything() {
    return this.theatreRepository.findAllWithEverything();
  }

  findOneWithEverything(id: string) {
    return this.theatreRepository.findOneWithEverything(id);
  }

  update(id: string, updateTheatreDto: UpdateTheatreDto) {
    return this.theatreRepository.update(id, updateTheatreDto);
  }

  remove(id: string) {
    return this.theatreRepository.remove(id);
  }
}
