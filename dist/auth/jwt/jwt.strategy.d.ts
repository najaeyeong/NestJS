import { PayloadType } from './jwt.payload';
import { CatsRepository } from 'src/cats2/cats.repository';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly catsRepository;
    constructor(catsRepository: CatsRepository);
    validate(payload: PayloadType): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: import("../../comments/comments.schema").Comments[];
        key: string;
    }>;
}
export {};
