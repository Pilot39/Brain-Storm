import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${token}`;

    if (process.env.EMAIL_ENABLED !== 'true') {
      this.logger.log(`[DEV] Password reset link for ${to}: ${resetUrl}`);
      return;
    }

    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Brain Storm" <no-reply@brainstorm.app>',
      to,
      subject: 'Reset your password',
      html: `<p>Click the link below to reset your password. It expires in 1 hour.</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>If you did not request this, ignore this email.</p>`,
    });
  }

  async sendNotificationEmail(userId: string, message: string) {
    if (process.env.EMAIL_ENABLED !== 'true') {
      this.logger.log(`[DEV] Notification for user ${userId}: ${message}`);
      return;
    }
    // In production, resolve user email from user service / pass email directly
    this.logger.log(`Notification email queued for user ${userId}`);
  }

  async sendVerificationEmail(to: string, token: string) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
    const verifyUrl = `${frontendUrl}/auth/verify?token=${token}`;

    if (process.env.EMAIL_ENABLED !== 'true') {
      this.logger.log(`[DEV] Verification link for ${to}: ${verifyUrl}`);
      return;
    }

    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Brain Storm" <no-reply@brainstorm.app>',
      to,
      subject: 'Verify your email',
      html: `<p>Click the link below to verify your email. It expires in 24 hours.</p>
             <a href="${verifyUrl}">${verifyUrl}</a>`,
    });
  }
}
