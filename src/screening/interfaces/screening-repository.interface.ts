import { CreateScreeningDto } from "../dto/create-screening.dto";
import { UpdateScreeningDto } from "../dto/update-screening.dto";
import { ScreeningEntity } from "../entities/screening.entity";

export interface IScreeningRepository {
  create(data: CreateScreeningDto): Promise<ScreeningEntity>;
  findAll(): Promise<ScreeningEntity[]>;
  findOne(id: string): Promise<ScreeningEntity>;
  update(id: string, data: UpdateScreeningDto): Promise<ScreeningEntity>;
  remove(id: string): Promise<ScreeningEntity>;
}
