import { ApiProperty } from '@nestjs/swagger';

export class DayWorkTimeResponseDto {
  @ApiProperty()
  총근무시간: number;

  @ApiProperty()
  총휴식시간: number;
  @ApiProperty()
  일일소정근로시간: number;
  @ApiProperty()
  연장근로시간: number;
  @ApiProperty()
  야간근로시간: number;

  @ApiProperty()
  장야간근로시간: number;
}
