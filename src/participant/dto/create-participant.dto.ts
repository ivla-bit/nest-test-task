import { IsNotEmpty, IsString } from 'class-validator';
export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
