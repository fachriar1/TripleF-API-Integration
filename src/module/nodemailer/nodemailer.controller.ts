import {Body, Controller, Post} from '@nestjs/common';
import {SendMailDTO} from 'src/dto/nodemailer.dto';
import {NodemailerService} from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {
    constructor(
        private nodemailerService: NodemailerService
    ) {}

    @Post("/send")
    sendEmail(@Body() params: SendMailDTO) {
        return this.nodemailerService.sendEmail(params)
    }
}
