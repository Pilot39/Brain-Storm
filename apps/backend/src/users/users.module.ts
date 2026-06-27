import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController, AdminUsersController } from './users.controller';
import { GdprRetentionService } from './gdpr-retention.service';
import { GdprController } from './gdpr.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ScheduleModule.forRoot()],
  controllers: [UsersController, AdminUsersController, GdprController],
  providers: [UsersService, GdprRetentionService],
  exports: [UsersService, GdprRetentionService],
})
export class UsersModule {}
