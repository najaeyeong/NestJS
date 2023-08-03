import { Body, Controller, Post } from '@nestjs/common';
import { WorktimeService } from './worktime.service';
import { AWSService } from 'aws-sdk/clients/auditmanager';
import { AuthService } from 'src/auth/auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DayWorkTimeResponseDto } from './dto/day.worktime.response.dto';
import { DayWorkTimeRequestDto } from './dto/day.worktime.request.dto';

@Controller('worktime')
export class WorktimeController {
  constructor(private readonly worktimeService: WorktimeService) {}
  @Post('separateTime')
  async separateTime(
    @Body()
    body: {
      근무시간: { 출근시간: string; 퇴근시간: string };
      휴식시간목록: { 시작시간: string; 종료시간: string }[];
    },
  ) {
    return this.worktimeService.separateTime(body.근무시간, body.휴식시간목록);
  }

  @Post('TimeList')
  async getKindOfWorkTimeList(
    @Body()
    body: {
      시작시간: string;
      종료시간: string;
      일일소정근로시간: number;
    },
  ) {
    const { 시작시간, 종료시간, 일일소정근로시간 } = body;
    return this.worktimeService.getKindOfWorkTimeList(
      시작시간,
      종료시간,
      일일소정근로시간,
    );
  }
  @ApiOperation({ summary: '일일 근로시간 종류별 정리' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: DayWorkTimeResponseDto,
  })
  @Post('DayWorkTimeList')
  async getTotalDayWorkTimeList(
    @Body()
    body: DayWorkTimeRequestDto,
  ) {
    console.log(body.근무시간, body.휴식시간목록);
    return this.worktimeService.getTotalDayWorkTimeList(
      body.근무시간,
      body.휴식시간목록,
    );
  }
}
