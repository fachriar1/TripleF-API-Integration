import { ApiProperty } from '@nestjs/swagger';

export class NewsListDTO {
  @ApiProperty()
  limit: number;
  @ApiProperty()
  lastId: number;
  @ApiProperty({ required: false })
  page: number;
}

export class GalleryDTO {
  @ApiProperty({ required: false })
  limit: number;
}

export class PrizeDTO {
  @ApiProperty({ required: false })
  id: number;
}

export class MasterDTO {
  @ApiProperty()
  type: number;
}

export class ListUserRankDTO {
  @ApiProperty({ required: false })
  limit: number;
  @ApiProperty({ required: false })
  showMe: number;
}

export class PaginateDTO {
  @ApiProperty()
  page: number;
  @ApiProperty()
  rowPerPage: number;
}
