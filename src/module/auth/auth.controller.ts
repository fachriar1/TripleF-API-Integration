import {
  Controller,
  UseInterceptors,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { User } from '@common/decorators/param.user.decorator';
import { AuthService } from './auth.service';
import JwtAuthGuard from '@common/guards/JwtAuth.guards';
import {
  ChangePassDTO,
  forgotPasswordDto,
  LoginDto,
  RegisterDTO,
  ValidasiPassDTO,
} from 'src/dto/auth.dto';
import { LoginPipe, RegisterPipe } from './auth.pipe';
import { response } from 'express';

@ApiSecurity('auth')
@ApiTags('Auth')
@UseInterceptors(TransformInterceptor)
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body(LoginPipe) params: LoginDto, @Res() response) {
    const token = await this.authService.login(params);
    response.header({ Authentication: token.data.token });
    return response.send({
      statusCode: 200,
      message: 'Success',
      data: { message: token.message },
    });
  }

  @Post('/register')
  async register(@Body(RegisterPipe) params: RegisterDTO) {
    return await this.authService.register(params);
  }

  @Get('/validasiEmail/:email')
  async validasiEmail(@Param('email') email: string, @Res() response) {
    const validasiEmail = await this.authService.validasiEmail(email);
    validasiEmail.token
      ? response.header({ Authentication: validasiEmail.token })
      : null;
    const statusCode = validasiEmail.result ? 201 : 400;

    return response.status(statusCode).send({
      statusCode,
      message: validasiEmail.message === '' ? 'success' : validasiEmail.message,
      data: {
        result: validasiEmail.result,
        message:
          validasiEmail.message === '' ? 'success' : validasiEmail.message,
      },
    });
  }

  @Get('/send/otp/:email')
  async sendOTP(
    @Param('email') email: string,
    @Query('register') register: string,
  ) {
    return this.authService.sendOtp(email, register);
  }

  @Get('/validasiOtp/:otp')
  async validasiOTP(@Param('otp') otp: string, @Res() response) {
    const validasiOTP = await this.authService.validasiOTP(otp);

    const statusCode = validasiOTP.result ? 201 : 400;
    return response.status(statusCode).send({
      statusCode,
      message: validasiOTP.message === '' ? 'success' : validasiOTP.message,
      data: {
        type: validasiOTP.result ? 2 : 0,
        title: validasiOTP.title,
        result: validasiOTP.result,
        message: validasiOTP.message === '' ? 'success' : validasiOTP.message,
      },
    });
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async profile(@User() user) {
    return this.authService.profile(user);
  }

  @Post('/changePassword')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() param: ChangePassDTO, @User() user) {
    return this.authService.changePassword(param, user);
  }

  @Post('/forgotPassword')
  @UseGuards(JwtAuthGuard)
  async forgotPassword(@Body() param: forgotPasswordDto, @User() user) {
    return this.authService.forgotPassword(param, user);
  }

  @Post('/password')
  @UseGuards(JwtAuthGuard)
  async checkPass(@Body() password: ValidasiPassDTO, @User() user) {
    return this.authService.validasiPassword(user, password.password);
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@User() user) {
    return this.authService.logout(user.sessionId);
  }
}
