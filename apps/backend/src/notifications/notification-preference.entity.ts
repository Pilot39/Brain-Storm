import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum NotificationChannel {
  IN_APP = 'in_app',
  EMAIL = 'email',
  PUSH = 'push',
  WEBHOOK = 'webhook',
}

@Entity('notification_preferences')
export class NotificationPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userId: string;

  /** Enabled channels */
  @Column({ type: 'simple-array', default: 'in_app' })
  channels: NotificationChannel[];

  /** Quiet hours: "HH:MM-HH:MM" in user's locale, e.g. "22:00-08:00" */
  @Column({ nullable: true })
  quietHours: string;

  /** IANA timezone, e.g. "America/New_York" */
  @Column({ default: 'UTC' })
  timezone: string;

  /** User locale for templated content, e.g. "en-US" */
  @Column({ default: 'en' })
  locale: string;

  /** VAPID push subscription JSON */
  @Column({ type: 'text', nullable: true })
  pushSubscription: string;

  /** Webhook URL */
  @Column({ nullable: true })
  webhookUrl: string;
}
