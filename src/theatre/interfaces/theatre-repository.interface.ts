import { CreateTheatreDto } from "../dto/create-theatre.dto";
import { UpdateTheatreDto } from "../dto/update-theatre.dto";
import { TheatreEntity } from "../entities/theatre.entity";

export interface ITheatreRepository {
    create(data: CreateTheatreDto): Promise<TheatreEntity>;
    findAll(): Promise<TheatreEntity[]>;
    findOne(id: string): Promise<TheatreEntity>;
    findAllWithEverything(): Promise<TheatreEntity[]>;
    findOneWithEverything(id: string): Promise<TheatreEntity>;
    update(id: string, data: UpdateTheatreDto): Promise<TheatreEntity>;
    remove(id: string): Promise<TheatreEntity>;
}