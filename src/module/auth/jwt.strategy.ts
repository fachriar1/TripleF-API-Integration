import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenPayloadDto } from 'src/dto/auth.dto';
import { CommonService } from '@common/services/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginSessionRepository } from 'src/models/login_session/login_session.repository';
import * as moment from 'moment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly commonService: CommonService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.headers?.authentication?.toString() || null;
        },
      ]),
      secretOrKey: process.env.CRYPTO_SECRET,
    });
  }

  @InjectRepository(LoginSessionRepository)
  private loginSessionRepository: LoginSessionRepository;

  async validate(payload: TokenPayloadDto) {
    const curDate = moment().unix().toString();
    const decryptedToken = await this.commonService.cryptoDecrypt(
      payload.token,
    );
    const { session } = JSON.parse(decryptedToken);
    const user = await this.loginSessionRepository
      .createQueryBuilder('loginSession')
      .where(
        'loginSession.sessionId = :session AND loginSession.expired >= :curDate',
        { session, curDate },
      )
      .leftJoinAndSelect('loginSession.media', 'media')
      .leftJoinAndSelect('loginSession.user', 'users')
      .getOne();
    if (!user) {
      return false;
    }

    // const customer = user?.user?.customers[0]
    return {
      media: {
        name: user.media.name,
        code: user.media.code,
        id: user.media.id,
      },
      picture: user.user.picture,
      identity: user.user.identity,
      regency: user.user.regency_ktp,
      id: user.user.id || 0,
      name: user.user.fullname || '',
      hp: user.user.hp || '',
      sessionId: session || '',
      password: user.user.password ? true : false,
    };
  }
}
