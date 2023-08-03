import * as dayjs from 'dayjs';
export declare class WorktimeService {
    getTotalDayWorkTimeList(근무시간: {
        출근시간: string;
        퇴근시간: string;
    }, 휴식시간목록: {
        시작시간: string;
        종료시간: string;
    }[]): {
        총근무시간: number;
        총휴식시간: number;
        일일소정근로시간: number;
        연장근로시간: number;
        야간근로시간: number;
        연장야간근로시간: number;
    };
    getIncludedRestTimeList(근무시간: {
        출근시간: string;
        퇴근시간: string;
    }, 휴식시간목록: {
        시작시간: string;
        종료시간: string;
    }[]): any[];
    separateTime(근무시간: {
        출근시간: string;
        퇴근시간: string;
    }, 휴식시간목록: {
        시작시간: string;
        종료시간: string;
    }[]): {
        시작시간: string;
        종료시간: string;
    }[];
    getKindOfWorkTimeList(시작시간: string, 종료시간: string, 일일소정근로시간: number): {
        일일소정근로시간: number;
        연장근로시간: number;
        야간근로시간: number;
        연장야간근로시간: number;
    };
    getKindOfNightTimeWork(시작시간: dayjs.Dayjs, 종료시간: dayjs.Dayjs, 일일소정근로시간: number): {
        일일소정근로시간: number;
        연장근로시간: number;
        야간근로시간: number;
        연장야간근로시간: number;
    };
    getKindOfDayTimeWork(시작시간: dayjs.Dayjs, 종료시간: dayjs.Dayjs, 일일소정근로시간: number): {
        일일소정근로시간: number;
        연장근로시간: number;
        야간근로시간: number;
        연장야간근로시간: number;
    };
    monthWorkTimeList(year: number, month: number, 출퇴기록: {
        출근시간: Date;
        퇴근시간: Date;
    }[], 근무타입: any, 휴일목록: any): void;
}
