import {ApiProperty} from "@nestjs/swagger";

export class AddCustomerDTO {
    @ApiProperty()
    customerId: string
    @ApiProperty()
    email: string
}