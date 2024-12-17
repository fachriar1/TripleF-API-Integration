import { ApiProperty } from '@nestjs/swagger';

export class InquiryDTO {
  @ApiProperty()
  customerId: string;
}

export class PayStatusDTO {
  @ApiProperty()
  tx_id: string;
}

export class PaymentDTO {
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  bank_code: string;
}
