import { IsNotEmpty, IsString } from 'class-validator';
export class CreateJudgeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  accessCode: string;
}
