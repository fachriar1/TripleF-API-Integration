import {Injectable} from '@nestjs/common';
import {SendMailDTO} from 'src/dto/nodemailer.dto';
import {InjectQueue} from '@nestjs/bull';
import {Queue} from 'bull';

@Injectable()
export class NodemailerService {
    constructor(
        @InjectQueue("send_mail") private sendMailQueue: Queue<SendMailDTO>,
    ) {}

    async sendEmail(params: SendMailDTO) {
        return this.sendMailQueue.add(params)
    }
}
