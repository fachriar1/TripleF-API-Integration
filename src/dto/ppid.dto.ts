import { ApiProperty } from '@nestjs/swagger';

export class FilterArticlePPID {
  @ApiProperty({ required: false })
  key?: string;
  @ApiProperty({ required: false })
  categoryId?: number;
  @ApiProperty({ required: false })
  status?: string;
  @ApiProperty({ required: false })
  rowPerPage: number;
  @ApiProperty({ required: false })
  page: number;
}

export class PostObjectionDTO {
  @ApiProperty()
  nama: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  job: string;
  @ApiProperty()
  purpose: string;
  @ApiProperty()
  objection: number[];
}

export class PostRequestPublicDTO {
  @ApiProperty()
  nama: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  detailInformation: string;
  @ApiProperty()
  purposeInformation: string;
  @ApiProperty()
  obtainCopy: string;
}
