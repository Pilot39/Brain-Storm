import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CourseAnalytics } from './course-analytics.entity';
import { AnalyticsEvent } from './analytics-event.entity';
import { PlatformAnalytics } from './platform-analytics.entity';
import { InstructorAnalytics } from './instructor-analytics.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { Progress } from '../progress/progress.entity';
import { Review } from '../courses/review.entity';
import { Course } from '../courses/course.entity';
import { User } from '../users/user.entity';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { EventsService } from './events.service';
import { PlatformAnalyticsService } from './platform-analytics.service';
import { PlatformAnalyticsController } from './platform-analytics.controller';
import { InstructorAnalyticsService } from './instructor-analytics.service';
import { InstructorAnalyticsController } from './instructor-analytics.controller';
import { AdminAnalyticsService } from './admin-analytics.service';
import { AdminAnalyticsController } from './admin-analytics.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      CourseAnalytics,
      Enrollment,
      Progress,
      Review,
      AnalyticsEvent,
      PlatformAnalytics,
      InstructorAnalytics,
      Course,
      User,
    ]),
  ],
  providers: [AnalyticsService, EventsService, PlatformAnalyticsService, InstructorAnalyticsService, AdminAnalyticsService],
  controllers: [AnalyticsController, PlatformAnalyticsController, InstructorAnalyticsController, AdminAnalyticsController],
  exports: [AnalyticsService, EventsService, PlatformAnalyticsService, InstructorAnalyticsService, AdminAnalyticsService],
})
export class AnalyticsModule {}
