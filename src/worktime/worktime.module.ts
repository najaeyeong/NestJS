import { Module, forwardRef } from '@nestjs/common';
import { WorktimeController } from './worktime.controller';
import { WorktimeService } from './worktime.service';
import { AuthModule } from 'src/auth/auth.module';
import { AWSModule } from 'src/aws/aws.module';

@Module({
  imports: [],
  controllers: [WorktimeController],
  providers: [WorktimeService],
})
export class WorktimeModule {}
