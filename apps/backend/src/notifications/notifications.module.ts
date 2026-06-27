import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Notification } from './notification.entity';
import { NotificationPreference } from './notification-preference.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsEvents } from './notifications.events';
import { NotificationRouterService } from './notification-router.service';
import { NotificationPreferencesController } from './notification-preferences.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationPreference]),
    EventEmitterModule.forRoot(),
    MailModule,
  ],
  controllers: [NotificationsController, NotificationPreferencesController],
  providers: [NotificationsService, NotificationsEvents, NotificationRouterService],
  exports: [NotificationsService, NotificationRouterService],
})
export class NotificationsModule {}
