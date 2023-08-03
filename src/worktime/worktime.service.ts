import { BadRequestException, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class WorktimeService {
  //근무시간-휴식시간  전체 근무시간 정리  Date 타입
  getTotalDayWorkTimeList(
    근무시간: { 출근시간: string; 퇴근시간: string },
    휴식시간목록: { 시작시간: string; 종료시간: string }[],
  ) {
    //근무시간에 포함된 휴식시간목록
    const 포함된휴식시간목록: { 시작시간: string; 종료시간: string }[] =
      this.getIncludedRestTimeList(근무시간, 휴식시간목록);
    //총휴식시간 구하기
    let 총휴식시간 = 0;
    포함된휴식시간목록.map((times) => {
      총휴식시간 =
        총휴식시간 +
        dayjs(times.종료시간).diff(dayjs(times.시작시간), 'm') / 60;
    });
    //총근무시간
    const 총근무시간 =
      dayjs(근무시간.퇴근시간).diff(dayjs(근무시간.출근시간), 'm') / 60;
    // (new Date(근무시간.퇴근시간).getTime() -
    //   new Date(근무시간.출근시간).getTime()) /
    // (1000 * 60 * 60);

    const timeList = this.separateTime(근무시간, 포함된휴식시간목록);
    let 일일소정근로시간 = 0;
    let 연장근로시간 = 0;
    let 야간근로시간 = 0;
    let 연장야간근로시간 = 0;
    timeList.map((time) => {
      const kindOfWorkTime = this.getKindOfWorkTimeList(
        time.시작시간,
        time.종료시간,
        일일소정근로시간,
      );

      일일소정근로시간 = kindOfWorkTime.일일소정근로시간;
      연장근로시간 = 연장근로시간 + kindOfWorkTime.연장근로시간;
      야간근로시간 = 야간근로시간 + kindOfWorkTime.야간근로시간;
      연장야간근로시간 = 연장야간근로시간 + kindOfWorkTime.연장야간근로시간;
    });
    return {
      총근무시간,
      총휴식시간,
      일일소정근로시간,
      연장근로시간,
      야간근로시간,
      연장야간근로시간,
    };
  }

  // 근무시간에 포함된 휴식시간목록만 반환
  getIncludedRestTimeList(
    근무시간: { 출근시간: string; 퇴근시간: string },
    휴식시간목록: { 시작시간: string; 종료시간: string }[],
  ) {
    const 출근_Date = dayjs(근무시간.출근시간);
    const 퇴근_Date = dayjs(근무시간.퇴근시간);
    const 포함된휴식시간목록 = [];
    휴식시간목록.map((times, index) => {
      if (dayjs(times.시작시간).isBefore(출근_Date)) {
        //출근시간 이전에 있는 휴식시간
        if (dayjs(times.종료시간).isBefore(출근_Date)) {
          //출근시간 이전에 끝나는 휴식시간
          //휴식시간목록.splice(index); //삭제
        } else {
          //출근시간 이전에 시작해서 출근시간 이후에 끝나는 휴식시간
          times.시작시간 = 근무시간.출근시간;
          포함된휴식시간목록.push(times);
        }
      } else if (퇴근_Date.isBefore(dayjs(times.종료시간))) {
        //퇴근시간 이후에 종료되는 휴식시간
        if (퇴근_Date.isBefore(dayjs(times.시작시간))) {
          //퇴근 이후에 시작되는 휴식시간
          //휴식시간목록.splice(index); //삭제
        } else {
          //퇴근시간 이전에 시작되서 퇴근시간 이후에 시작되는 휴식시간
          times.종료시간 = 근무시간.퇴근시간;
          포함된휴식시간목록.push(times);
        }
      } else {
        포함된휴식시간목록.push(times);
      }
    });
    return 포함된휴식시간목록;
  }

  //근무시간에 휴식시간 대입해서 토막난근무시간 리스트 반환  시간 Date type으로 들어옴
  separateTime(
    근무시간: { 출근시간: string; 퇴근시간: string },
    휴식시간목록: { 시작시간: string; 종료시간: string }[],
  ) {
    const { 출근시간, 퇴근시간 } = 근무시간;
    const 근무시간목록: { 시작시간: string; 종료시간: string }[] = [];
    const timeList = [];

    timeList.push(new Date(출근시간).getTime());
    휴식시간목록.forEach((time) => {
      timeList.push(new Date(time.시작시간).getTime());
      timeList.push(new Date(time.종료시간).getTime());
    });
    timeList.push(new Date(퇴근시간).getTime());

    timeList.sort(function (a, b) {
      if (a > b) return 1;
      if (a === b) return 0;
      if (a < b) return -1;
    });
    timeList.map((time) => {
      if (
        time < new Date(출근시간).getTime() ||
        time > new Date(퇴근시간).getTime()
      ) {
        throw new BadRequestException('잘못된 근무시간-휴식시간 타입입니다.');
      }
    });
    timeList.map((time, index) => {
      const t = { 시작시간: '', 종료시간: '' };
      if (index % 2 === 1) {
        t.시작시간 = timeList[index - 1];
        t.종료시간 = time;
        근무시간목록.push(t);
      }
    });
    return 근무시간목록;
  }

  //근무시간토막 근무시간 정리
  getKindOfWorkTimeList(
    시작시간: string,
    종료시간: string,
    일일소정근로시간: number,
  ) {
    const 시작시간_Date = dayjs(시작시간);
    const 종료시간_Date = dayjs(종료시간);
    const 시작년도 = 시작시간_Date.get('year');
    const 시작월 = 시작시간_Date.get('month') + 1;
    const 시작일 = 시작시간_Date.get('date');
    const 오전야간종료 = dayjs(`${시작년도}-${시작월}-${시작일} 06:00:00`);
    const 오후야간시작 = dayjs(`${시작년도}-${시작월}-${시작일} 22:00:00`);
    const 익일오전야간시작 = 오후야간시작.add(2, 'hour');
    const 익일오전야간종료 = 오전야간종료.add(24, 'hour');
    const 익일오후야간시작 = 익일오전야간종료.add(24, 'hour');
    const 근로시간 = 종료시간_Date.diff(시작시간_Date, 'm') / 60;
    const 남은소정근로시간 = 8 - 일일소정근로시간;

    //새벽야간시간 일시작
    if (시작시간_Date.isBefore(오전야간종료)) {
      //새벽야간시간 일시작 새벽야간시간 일종료
      if (종료시간_Date.isBefore(오전야간종료)) {
        console.log('새벽야간시간 일시작 새벽야간시간 일종료', 오전야간종료);
        //소정근로시간 8시간  연장근무일때
        return this.getKindOfNightTimeWork(
          시작시간_Date,
          종료시간_Date,
          일일소정근로시간,
        );
        //새벽야간시간 일시작 오휴야간시간 이전에 일종료
      } else if (종료시간_Date.isBefore(오후야간시작)) {
        console.log('새벽야간시간 일시작 오휴야간시간 이전에 일종료');
        const night = this.getKindOfNightTimeWork(
          시작시간_Date,
          오전야간종료,
          일일소정근로시간,
        );
        const day = this.getKindOfDayTimeWork(
          오전야간종료,
          종료시간_Date,
          night.일일소정근로시간,
        );
        return {
          일일소정근로시간: day.일일소정근로시간,
          연장근로시간: night.연장근로시간 + day.연장근로시간,
          야간근로시간: night.야간근로시간,
          연장야간근로시간: night.연장야간근로시간,
        };
        //새벽야간시간 일시작 오후야간시간 중에 일 종료
      } else if (
        오후야간시작.isBefore(종료시간_Date) &&
        종료시간_Date.isBefore(익일오전야간시작)
      ) {
        console.log('새벽야간시간 일시작 오후야간시간 중에 일 종료');
        const preNight = this.getKindOfNightTimeWork(
          시작시간_Date,
          오전야간종료,
          일일소정근로시간,
        );
        const day = this.getKindOfDayTimeWork(
          오전야간종료,
          오후야간시작,
          preNight.일일소정근로시간,
        );
        const Night = this.getKindOfNightTimeWork(
          오후야간시작,
          종료시간_Date,
          day.일일소정근로시간,
        );
        return {
          일일소정근로시간: Night.일일소정근로시간,
          연장근로시간:
            preNight.야간근로시간 + day.연장근로시간 + Night.야간근로시간,
          야간근로시간: preNight.야간근로시간 + Night.야간근로시간,
          연장야간근로시간: preNight.야간근로시간 + Night.연장야간근로시간,
        };
      }
      //새벽야간종료시간 이후 일시작
    } else if (시작시간_Date.isBefore(오후야간시작)) {
      //새벽야간종료시간 이후 일시작 오후야간시작 이전 일 종료
      if (종료시간_Date.isBefore(오후야간시작)) {
        console.log('새벽야간종료시간 이후 일시작 오후야간시작 이전 일 종료');
        return this.getKindOfDayTimeWork(
          시작시간_Date,
          종료시간_Date,
          일일소정근로시간,
        );
        //새벽야간종료시간 이후 일시작 오후야간시작 이후 익일오전야간종료 이전 일 종료
      } else if (종료시간_Date.isBefore(익일오전야간종료)) {
        console.log(
          '새벽야간종료시간 이후 일시작 오후야간시작 이후 익일오전야간종료 이전 일 종료',
        );
        const Day = this.getKindOfDayTimeWork(
          시작시간_Date,
          오후야간시작,
          일일소정근로시간,
        );
        const Night = this.getKindOfNightTimeWork(
          오후야간시작,
          종료시간_Date,
          Day.일일소정근로시간,
        );
        return {
          일일소정근로시간: Night.일일소정근로시간,
          야간근로시간: Night.야간근로시간,
          연장근로시간: Night.연장근로시간 + Day.연장근로시간,
          연장야간근로시간: Day.연장야간근로시간 + Night.연장야간근로시간,
        };
        //새벽야간종료시간 이후 일시작  익일오전야간종료 이후 일 종료
      } else if (
        익일오전야간종료.isBefore(종료시간_Date) &&
        종료시간_Date.isBefore(익일오후야간시작)
      ) {
        console.log(
          '새벽야간종료시간 이후 일시작  익일오전야간종료 이후 일 종료',
        );
        const Day = this.getKindOfDayTimeWork(
          시작시간_Date,
          오후야간시작,
          일일소정근로시간,
        );
        const Night = this.getKindOfNightTimeWork(
          오후야간시작,
          익일오전야간종료,
          Day.일일소정근로시간,
        );
        const NextDay = this.getKindOfDayTimeWork(
          익일오전야간종료,
          종료시간_Date,
          Night.일일소정근로시간,
        );
        return {
          일일소정근로시간: NextDay.일일소정근로시간,
          야간근로시간: Night.야간근로시간,
          연장근로시간:
            Night.연장근로시간 + Day.연장근로시간 + NextDay.연장근로시간,
          연장야간근로시간: Night.연장야간근로시간,
        };
      }

      //오후야간시간이후에 일시작
    } else {
      //오후야간에 일 시작 다음날 오전야간 중 일 종료
      if (종료시간_Date.isBefore(익일오전야간종료)) {
        return this.getKindOfNightTimeWork(
          시작시간_Date,
          종료시간_Date,
          일일소정근로시간,
        );
        //오후야간에 일 시작 다음날 오전야간 이후 일 종료
      } else if (종료시간_Date.isBefore(익일오후야간시작)) {
        const Night = this.getKindOfNightTimeWork(
          시작시간_Date,
          익일오전야간종료,
          일일소정근로시간,
        );
        const Day = this.getKindOfDayTimeWork(
          익일오전야간종료,
          종료시간_Date,
          Night.일일소정근로시간,
        );
        return {
          일일소정근로시간: Day.일일소정근로시간,
          야간근로시간: Night.야간근로시간,
          연장근로시간: Night.연장근로시간 + Day.연장근로시간,
          연장야간근로시간: Night.연장야간근로시간,
        };
      }
    }
  }
  //야간근무 근무시간정리
  getKindOfNightTimeWork(
    시작시간: dayjs.Dayjs,
    종료시간: dayjs.Dayjs,
    일일소정근로시간: number,
  ) {
    const 근로시간 = dayjs(종료시간).diff(시작시간, 'm') / 60;
    const 남은소정근로시간 = 8 - 일일소정근로시간;
    let 연장근로시간 = 0;
    let 야간근로시간 = 0;
    let 연장야간근로시간 = 0;
    //console.log(근로시간, 남은소정근로시간);
    //이미 소정근로시간 8시간 초과라 연장근무일때
    if (남은소정근로시간 === 0) {
      연장근로시간 = 근로시간;
      연장야간근로시간 = 연장근로시간; //* 0.5;
      //소정근로시간 8시간 미만
    } else {
      //근무시간 포함해서 소정근로8시간 초과 나머지 연장근무 일때
      if (일일소정근로시간 + 근로시간 > 8) {
        야간근로시간 = 8 - 일일소정근로시간; //* 0.5;
        연장근로시간 = 근로시간 - (8 - 일일소정근로시간);
        연장야간근로시간 = 연장근로시간; //* 0.5;
        일일소정근로시간 = 8;
        //근무시간 포함해서 소정근로시간 8시간 미만일때
      } else {
        일일소정근로시간 = 일일소정근로시간 + 근로시간;
        야간근로시간 = 근로시간; //* 0.5;
      }
    }
    console.log(시작시간.format(), 종료시간.format(), 일일소정근로시간);
    return {
      일일소정근로시간,
      연장근로시간,
      야간근로시간,
      연장야간근로시간,
    };
  }

  //주간근무 근무시간 정리
  getKindOfDayTimeWork(
    시작시간: dayjs.Dayjs,
    종료시간: dayjs.Dayjs,
    일일소정근로시간: number,
  ) {
    const 근로시간 = 종료시간.diff(시작시간, 'm') / 60;
    const 남은소정근로시간 = 8 - 일일소정근로시간;
    let 연장근로시간 = 0;
    const 야간근로시간 = 0;
    const 연장야간근로시간 = 0;
    //이미 소정근로시간 8시간 초과라 연장근무일때
    if (남은소정근로시간 === 0) {
      연장근로시간 = 근로시간;
      //소정근로시간 8시간 미만
    } else {
      //근무시간 포함해서 소정근로8시간 초과 나머지 연장근무 일때
      if (일일소정근로시간 + 근로시간 > 8) {
        연장근로시간 = 근로시간 - (8 - 일일소정근로시간);
        일일소정근로시간 = 8;
        //근무시간 포함해서 소정근로시간 8시간 미만일때
      } else {
        일일소정근로시간 = 일일소정근로시간 + 근로시간;
      }
    }
    console.log(시작시간.format(), 종료시간.format(), 일일소정근로시간);
    return {
      일일소정근로시간,
      연장근로시간,
      야간근로시간,
      연장야간근로시간,
    };
  }

  monthWorkTimeList(
    year: number,
    month: number,
    출퇴기록: { 출근시간: Date; 퇴근시간: Date }[],
    근무타입: any,
    휴일목록: any,
  ) {
    //마지막 날짜 가져오기
    const lastDay = new Date(year, month, 0).getDate();
    const 근무일 = [];
    const 휴일 = [];

    return;
  }
}
