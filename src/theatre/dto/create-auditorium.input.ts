import { IsIn, IsInt, IsString } from 'class-validator'
import { ALL_AUDITORIUM_TYPES, AuditoriumType } from 'src/constants/auditorium'

export class CreateAuditoriumInput {
    @IsString()
    id?: string

    @IsInt()
    number: number

    @IsIn(ALL_AUDITORIUM_TYPES)
    type: AuditoriumType

    @IsString()
    theatreId: string
}
