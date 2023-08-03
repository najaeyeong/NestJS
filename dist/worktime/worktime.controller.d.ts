import { WorktimeService } from './worktime.service';
import { DayWorkTimeRequestDto } from './dto/day.worktime.request.dto';
export declare class WorktimeController {
    private readonly worktimeService;
    constructor(worktimeService: WorktimeService);
    separateTime(body: {
        근무시간: {
            출근시간: string;
            퇴근시간: string;
        };
        휴식시간목록: {
            시작시간: string;
            종료시간: string;
        }[];
    }): Promise<{
        시작시간: string;
        종료시간: string;
    }[]>;
    getKindOfWorkTimeList(body: {
        시작시간: string;
        종료시간: string;
        일일소정근로시간: number;
    }): Promise<{
        일일소정근로시간: number;
        연장근로시간: number;
        야간근로시간: number;
        연장야간근로시간: number;
    }>;
    getTotalDayWorkTimeList(body: DayWorkTimeRequestDto): Promise<{
        총근무시간: number;
        총휴식시간: number;
        일일소정근로시간: number;
        연장근로시간: number;
        야간근로시간: number;
        연장야간근로시간: number;
    }>;
}
