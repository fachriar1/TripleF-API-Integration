import {ApiProperty} from "@nestjs/swagger";

export class SendMessageDTO {
    @ApiProperty()
    sender: string
    @ApiProperty()
    message: string
}

export class SendTemplateDTO {
    @ApiProperty()
    sender: string
    @ApiProperty()
    templateId: string
    @ApiProperty()
    params: string[]
}

export class PushOTPQiscusDTO {
    userId: number;
    month: string;
    type: number;
    customer_code: string;
    name: string;
    hp: string;
    otp: {
        otpId: number;
        otp: string;
        expired: string;
    }
}