import {ApiProperty} from "@nestjs/swagger";

export class MeterReadingPostDTO {
    @ApiProperty()
    image: string
    @ApiProperty()
    noMeter: string
    @ApiProperty()
    customerId: string
    @ApiProperty()
    latitude: string
    @ApiProperty()
    longtitude: string
}

export class MeterReadingListDTO {
    @ApiProperty()
    year: number
    @ApiProperty()
    customerId: number
}

export class RespMeterReadingDTO {
    picture: string
    meterNumber: string
    status: string
    submitDate: string
}