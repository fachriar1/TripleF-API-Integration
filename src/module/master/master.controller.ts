import { User } from '@common/decorators/param.user.decorator';
import JwtAuthGuard from '@common/guards/JwtAuth.guards';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  ListUserRankDTO,
  MasterDTO,
  PaginateDTO,
  PrizeDTO,
} from 'src/dto/master.dto';
import { MasterService } from './master.service';
@ApiSecurity('auth')
@ApiTags('Master')
@Controller('api/master')
@UseInterceptors(TransformInterceptor)
export class MasterController {
  constructor(private masterService: MasterService) {}

  @Get('/faq')
  async faq(@Query() param: MasterDTO) {
    return this.masterService.faq(param);
  }

  @Get('/tnc')
  async tnc(@Query() param: MasterDTO) {
    return this.masterService.tnc(param);
  }

  @Get('/news')
  async news() {
    return this.masterService.news();
  }

  @Get('/news/:id')
  async newsDetail(@Param('id') id: number) {
    return this.masterService.newsDetail(id);
  }

  @Get('/topic')
  topic() {
    return this.masterService.topic();
  }

  @Get('/periode')
  periode() {
    return this.masterService.periode();
  }

  // @ApiExcludeEndpoint()
  @Get('/point/rank/generate')
  generatePointRank() {
    return this.masterService.pointGenerateV2();
    // return this.masterService.generateUserRank();
  }

  @Get('/notification')
  @UseGuards(JwtAuthGuard)
  notification(@User() user, @Query() param: PaginateDTO) {
    return this.masterService.notification(user, param);
  }

  @Get('/notification/:id')
  @UseGuards(JwtAuthGuard)
  notificationId(@User() user, @Param('id') id: number) {
    return this.masterService.notificationDetail(user, id);
  }

  @Get('/prize') // The '?' makes the 'id' parameter optional
  prize(@Query() param: PrizeDTO) {
    return this.masterService.prize(param);
  }

  @Post('/notificationRead/:id')
  @UseGuards(JwtAuthGuard)
  readNotification(@User() user, @Param('id') id: number) {
    return this.masterService.notificationRead(user, id);
  }

  @Get('/list/rank')
  @UseGuards(JwtAuthGuard)
  listRank(@User() user, @Query() param: ListUserRankDTO) {
    return this.masterService.listRank2(user, param);
  }

  @Get('/updateRank')
  updateRank() {
    return this.masterService.updateRank();
  }
}
