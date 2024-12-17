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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  ImageString,
  ListHistoryDTO,
  PointRedeemDTO,
  SubmitCodeUniqueDTO,
  UserUpdateDTO,
} from 'src/dto/user.dto';
import { UserUpdatePipe } from './user.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@common/config/multer';
import { AppId } from '@common/decorators/param.app.decorator';

@Controller('api/user')
@ApiTags('User')
@ApiSecurity('auth')
@UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMe(@User() user) {
    return await this.userService.getMe(user);
  }

  @Post('/submitCode')
  @UseInterceptors(FilesInterceptor('files', 15, multerOptions('file')))
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: SubmitCodeUniqueDTO,
    description: 'Upload File',
    required: true,
  })
  @ApiConsumes('multipart/form-data')
  submit(
    @Body() param: SubmitCodeUniqueDTO,
    @UploadedFiles() files: Express.Multer.File[],
    @User() user,
  ) {
    return this.userService.submitCode(param, files, user);
  }

  @Get('/historySubmit')
  @UseGuards(JwtAuthGuard)
  async history(@User() user) {
    return this.userService.getHistorySubmit(user);
  }

  @Get('/historySubmit/:id')
  @UseGuards(JwtAuthGuard)
  async historyId(@Param('id') id: number, @User() user) {
    return this.userService.getHistorySubmitDetail(id, user);
  }

  @Post('/pointRedeem')
  @UseGuards(JwtAuthGuard)
  async pointRedeem(@Body() body: PointRedeemDTO, @User() user) {
    return this.userService.pointRedeem(body, user);
  }

  @Get('/listHistory')
  @UseGuards(JwtAuthGuard)
  async listHistory(@Query() body: ListHistoryDTO, @User() user) {
    return this.userService.listHistory(body, user);
  }

  @Get('/listHistory/:id')
  @UseGuards(JwtAuthGuard)
  async detailListHistory(@Param('id') id: number, @User() user) {
    return this.userService.listHistoryDetail(id, user);
  }

  @Get('/myCoupon')
  @UseGuards(JwtAuthGuard)
  async myCoupon(@User() user) {
    return this.userService.myCoupon(user);
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard)
  updateUser(@User() user, @Body(UserUpdatePipe) params: UserUpdateDTO) {
    return this.userService.updateUser(params, user);
  }

  @Get('/image')
  generateKuponUndian(@Query() param: ImageString) {
    return this.userService.images(param);
  }
}
