import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats2/cats.schema';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
