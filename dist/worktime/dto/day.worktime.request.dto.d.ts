export declare class DayWorkTimeRequestDto {
    근무시간: {
        출근시간: string;
        퇴근시간: string;
    };
    휴식시간목록: {
        시작시간: string;
        종료시간: string;
    }[];
}
