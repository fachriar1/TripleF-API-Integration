import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendMailDTO } from 'src/dto/nodemailer.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('send_mail')
export class SendMailProcessor {
  constructor(private mailerService: MailerService) {}

  @Process()
  async sendMail(job: Job<SendMailDTO>) {
    let { email, subject, text } = job.data;
    return this.mailerService.sendMail({
      to: email,
      subject,
      text,
    });
  }
}
