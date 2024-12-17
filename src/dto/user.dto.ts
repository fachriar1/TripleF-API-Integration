import { ApiProperty } from '@nestjs/swagger';
import { string } from 'joi';

export class UserUpdateDTO {
  @ApiProperty()
  field: 'picture' | 'email';
  @ApiProperty()
  dataEdit: string;
}

export class SubmitCodeUniqueDTO {
  @ApiProperty()
  code: string;
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'Files',
  })
  files: Express.Multer.File[];
}

export class PointRedeemDTO {
  @ApiProperty()
  prizeId: number;
  @ApiProperty()
  typeId: number;
  @ApiProperty()
  count: number;
}

export class ListHistoryDTO {
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  key?: string;
  @ApiProperty({ required: false })
  status?: number;
  @ApiProperty({ required: false })
  prizeId?: number;
  @ApiProperty({ required: false })
  rowPerPage?: number;
  @ApiProperty({ required: false })
  coupon?: string;
  @ApiProperty({ required: false })
  rankPeriodeId?: number;
}

export class ImageString {
  @ApiProperty()
  hp: string;
  @ApiProperty()
  text: string;
}
