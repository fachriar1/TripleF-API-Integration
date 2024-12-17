import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppConfigModule } from '@common/config/api/config.module';
import { AppConfigService } from '@common/config/api/config.service';
import { NodemailerController } from './nodemailer.controller';
import { BullModule } from '@nestjs/bull';
import { SendMailProcessor } from './nodemailer.process';

@Module({
  providers: [NodemailerService, SendMailProcessor],
  imports: [
    BullModule.registerQueue({
      name: 'send_mail',
    }),
    AppConfigModule,
    MailerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => {
        return {
          transport: {
            host: 'mail.redboxdigital.id',
            port: 465,
            secure: true,
            auth: {
              user: config.MAIL_USER,
              pass: config.MAIL_PASS,
            },
            // tls: {
            //   rejectUnauthorized: false,
            // },
          },
          defaults: {
            from: `"No Reply" <${config.MAIL_USER}>`,
          },
        };
      },
    }),
  ],
  controllers: [NodemailerController],
  exports: [NodemailerService],
})
export class NodemailerModule {}
