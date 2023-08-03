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
import { CommentsRepository } from '../comments.repository';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { Types } from 'mongoose';
import { CatsRepository } from 'src/cats2/cats.repository';
export declare class CommentsService {
    private readonly commentsRepository;
    private readonly catsRepository;
    constructor(commentsRepository: CommentsRepository, catsRepository: CatsRepository);
    getAllComments(): Promise<import("../comments.schema").Comments[]>;
    createComment(id: string, body: CommentsCreateDto): Promise<import("mongoose").Document<unknown, {}, import("../comments.schema").Comments> & Omit<import("../comments.schema").Comments & {
        _id: Types.ObjectId;
    }, never>>;
    plusLike(id: string | Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, import("../comments.schema").Comments> & Omit<import("../comments.schema").Comments & {
        _id: Types.ObjectId;
    }, never>>;
}
