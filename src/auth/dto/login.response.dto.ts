import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats2/cats.schema';

export class LoginResponseDto {
  @ApiProperty({
    example: 'a9ace025c90c0da216slgnslkgns232345fgd776',
    description: 'token',
  })
  token: string;
}
