import { ApiProperty } from '@nestjs/swagger';

export class PostVisitorDTO {
  @ApiProperty({ required: false })
  ip: string;
  @ApiProperty({ required: false })
  browser: string;
}
export class FilterNewsDTO {
  @ApiProperty({ required: false })
  rowPerPage: number;
  @ApiProperty({ required: false })
  page: number;
}

export class FilterProductOfLawDTO {
  @ApiProperty({ required: false })
  category?: string;
  @ApiProperty({ required: false })
  number?: string;
  @ApiProperty({ required: false })
  year?: string;
  @ApiProperty({ required: false })
  status?: string;
  @ApiProperty({ required: false })
  about?: string;
  @ApiProperty({ required: false })
  rowPerPage: number;
  @ApiProperty({ required: false })
  page: number;
}

export class PostNewsDTO {
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false })
  picture?: string;
  @ApiProperty()
  status: number;
}

export class SendSuggestionDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  satisfaction: string;
  @ApiProperty()
  suggestion: string;
}
export class SendConsultationDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  suggestion: string;
}

export class ResponseConsultationDTO {
  @ApiProperty()
  responseId?: number;
  @ApiProperty()
  responseDescription: string;
}
