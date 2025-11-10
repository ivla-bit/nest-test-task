import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
export class CreateVoteDto {
  @IsString()
  @IsNotEmpty()
  accessCode: string;

  @IsString()
  @IsNotEmpty()
  participantId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  score: number;
}
