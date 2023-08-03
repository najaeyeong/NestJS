import { Cat } from '../cats.schema';
import { Types } from 'mongoose';
declare const CatResponseDto_base: import("@nestjs/common").Type<Pick<Cat, "name" | "email" | "imgUrl">>;
export declare class CatResponseDto extends CatResponseDto_base {
    id: string | Types.ObjectId;
}
export {};
