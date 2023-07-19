/// <reference types="multer" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { Cat } from './cats.schema';
import { AWSService } from 'src/aws/aws.service';
import { CommentsRepository } from 'src/comments/comments.repository';
export declare class CatsController {
    private readonly awsService;
    private readonly catsService;
    private readonly authService;
    private readonly commentsRepository;
    constructor(awsService: AWSService, catsService: CatsService, authService: AuthService, commentsRepository: CommentsRepository);
    getCurrentCat(cat: any): any;
    signUp(body: CatRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: import("../comments/comments.schema").Comments[];
        key: string;
    }>;
    login(body: LoginRequestDto): Promise<{
        token: string;
    }>;
    uploadImage(files: Express.Multer.File, cat: Cat): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: import("../comments/comments.schema").Comments[];
        key: string;
    }>;
    getAllCats(): Promise<Omit<import("mongoose").Document<unknown, {}, Cat> & Omit<Cat & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
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
    getTotalDayWorkTimeList(body: {
        근무시간: {
            출근시간: string;
            퇴근시간: string;
        };
        휴식시간목록: {
            시작시간: string;
            종료시간: string;
        }[];
    }): Promise<{
        총근무시간: number;
        총휴식시간: number;
        일일소정근로시간: number;
        연장근로시간: number;
        야간근로시간: number;
        연장야간근로시간: number;
    }>;
}
