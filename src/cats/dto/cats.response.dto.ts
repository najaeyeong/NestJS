import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';
//PickType(스키마,[필드]) - 선택한것만 상송
export class CatResponseDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '3234234',
    description: 'id',
  })
  id: string;
}
