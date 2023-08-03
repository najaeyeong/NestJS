import { Cat } from './cats.schema';
import mongoose, { Model, Types } from 'mongoose';
import { CatRequestDto } from './dto/cats.request.dto';
import { Comments } from 'src/comments/comments.schema';
export declare class CatsRepository {
    private readonly catModel;
    private readonly commentsModel;
    constructor(catModel: Model<Cat>, commentsModel: Model<Comments>);
    existsByEmail(_email: string): Promise<{
        _id: any;
    }>;
    findCatByEmail(email: string): Promise<mongoose.Document<unknown, {}, Cat> & Omit<Cat & {
        _id: Types.ObjectId;
    }, never>>;
    findCatByIdWithdoutPassword(id: string | Types.ObjectId): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: Comments[];
        key: string;
    }>;
    create(cat: CatRequestDto): Promise<mongoose.Document<unknown, {}, Cat> & Omit<Cat & {
        _id: Types.ObjectId;
    }, never>>;
    findByIdAndUpdateImg(id: string | Types.ObjectId, imgUrl: string, key: string): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: Comments[];
        key: string;
    }>;
    findAll(): Promise<Omit<mongoose.Document<unknown, {}, Cat> & Omit<Cat & {
        _id: Types.ObjectId;
    }, never>, never>[]>;
}
