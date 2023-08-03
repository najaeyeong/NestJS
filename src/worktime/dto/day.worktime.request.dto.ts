import { ApiProperty } from '@nestjs/swagger';

export class DayWorkTimeRequestDto {
  @ApiProperty({
    example: {
      출근시간: '2023-07-16T09:00:00.000Z',
      퇴근시간: '2023-07-16T18:00:00.000Z',
    },
    description: '근무시간',
  })
  근무시간: { 출근시간: string; 퇴근시간: string };

  @ApiProperty({
    example: [
      {
        시작시간: '2023-07-16T12:00:00.000Z',
        종료시간: '2023-07-16T13:00:00.000Z',
      },
      {
        시작시간: '2023-07-13T18:00:00.000Z',
        종료시간: '2023-07-13T18:30:00.000Z',
      },
      {
        시작시간: '2023-07-13T23:30:00.000Z',
        종료시간: '2023-07-14T00:30:00.000Z',
      },
    ],
    description: '휴식시간목록',
  })
  휴식시간목록: { 시작시간: string; 종료시간: string }[];
}
