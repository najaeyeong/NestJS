/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CatRequestDto } from './dto/cats.request.dto';
import { Types } from 'mongoose';
import { Cat } from './cats.schema';
import { CatsRepository } from './cats.repository';
import * as dayjs from 'dayjs';
export declare class CatsService {
    private readonly catsRepository;
    constructor(catsRepository: CatsRepository);
    signUp(body: CatRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: import("../comments/comments.schema").Comments[];
        key: string;
    }>;
    uploadImg(cat: Cat, imgUrl: string, key: string): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: import("../comments/comments.schema").Comments[];
        key: string;
    }>;
    getAllCats(): Promise<Omit<import("mongoose").Document<unknown, {}, Cat> & Omit<Cat & {
        _id: Types.ObjectId;
    }, never>, never>[]>;
    getOneCat(id: string | Types.ObjectId): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: import("../comments/comments.schema").Comments[];
        key: string;
    }>;
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
