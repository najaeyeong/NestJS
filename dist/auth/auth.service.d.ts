import { CatsRepository } from 'src/cats2/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly catsRepository;
    private jwtService;
    constructor(catsRepository: CatsRepository, jwtService: JwtService);
    JwtLogIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
}
