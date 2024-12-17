import { BadRequestException, Injectable } from '@nestjs/common';
import { AppConfigService } from '@common/config/api/config.service';
import { CommonService } from '@common/services/common.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/user/user.repository';
import { LoginSessionRepository } from 'src/models/login_session/login_session.repository';
import { DistrictRepository } from 'src/models/district/district.repository';
import { Users } from 'src/models/user/user.entity';
import * as moment from 'moment';
import {
  TokenPayloadDto,
  LoginDto,
  DevicesDto,
  ChangePassDTO,
  RegisterDTO,
  forgotPasswordDto,
} from 'src/dto/auth.dto';
import axios from 'axios';
import { LessThanOrEqual, MoreThan, Not } from 'typeorm';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { OtpRepository } from 'src/models/otp/otp.repository';
import { ScriptConfigService } from '@common/config/script/config.service';
import { MainDbConfigService } from '@common/config/db/config.service';
import { Entries } from 'src/models/entries/entries.entity';
import { ScriptRepository } from 'src/models/script/script.repository';
import { GeneralParameterRepository } from 'src/models/general_parameter/general_parameter.repository';
import { NotificationRepository } from 'src/models/notification/notification.repository';
import { UserRankRepository } from 'src/models/user_rank/user-rank.repository';
import { UserRankPeriodeRepository } from 'src/models/user_rank_periode/user-rank_periode.repository';
@Injectable()
export class AuthService {
  constructor(
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
    private nodemailerService: NodemailerService,
    private readonly mainDbConfigService: MainDbConfigService,

    private scriptService: ScriptConfigService,
  ) {}

  @InjectRepository(UserRepository)
  private UserRepository: UserRepository;

  @InjectRepository(LoginSessionRepository)
  private loginSessionRepository: LoginSessionRepository;

  @InjectRepository(DistrictRepository)
  private districtRepository: DistrictRepository;

  @InjectRepository(OtpRepository)
  private otpRepository: OtpRepository;

  @InjectRepository(ScriptRepository)
  private scriptRepository: ScriptRepository;

  @InjectRepository(NotificationRepository)
  private notificationRepository: NotificationRepository;

  @InjectRepository(UserRankRepository)
  private userRankRepository: UserRankRepository;

  @InjectRepository(UserRankPeriodeRepository)
  private userRankPeriodeRepository: UserRankPeriodeRepository;

  private async _getCookie(user: Users): Promise<string> {
    const { COOKIES_EXPIRATION_DAY } =
      await this.commonService.generalParameter();
    const expiredDate = moment()
      .add(+COOKIES_EXPIRATION_DAY || 0, 'day')
      .unix()
      .toString();
    const curentDate = moment().unix().toString();
    const subDate = moment().subtract(7, 'day').unix().toString();
    let loginSession = await this.loginSessionRepository
      .createQueryBuilder('loginSession')
      .where(
        'loginSession.user.id = :userId AND loginSession.expired >= :curentDate',
        { curentDate, userId: user.id },
      )
      .innerJoin('loginSession.user', 'users')
      .getOne();
    if (loginSession) {
      await this.loginSessionRepository.update(
        { id: loginSession.id },
        { expired: subDate },
      );
    }

    loginSession = await this.loginSessionRepository.save({
      expired: expiredDate,
      mediaId: user.mediaId,
      user,
    });
    const strPayload = JSON.stringify({ session: loginSession.sessionId });
    const hashPayload = await this.commonService.cryptoEncrypt(strPayload);
    const payload: TokenPayloadDto = { token: hashPayload };
    const token = this.jwtService.sign(payload, {
      secret: this.appConfigService.CRYPTO_SECRET,
    });
    return token;
  }

  private async _scriptText(type: number, name: string) {
    return this.scriptRepository.findOne({
      where: { status: 1, type, name },
    });
  }

  async profile(user) {
    const users = await this.UserRepository.findOne({
      where: { id: user.id },
      select: ['fullname', 'hp', 'identity', 'regency_ktp', 'point', 'picture'],
    });
    return users;
  }
  async generateOtp(hp, user) {
    let { otpExpired } = await this.commonService.generalParameter();
    otpExpired = +otpExpired || 0;
    let otp = '';
    let uniqueOtp = true;
    await this.otpRepository.update({ hp, status: 0 }, { status: 1 });
    const expiredTime = moment().add(otpExpired, 'minute').unix();
    while (uniqueOtp) {
      otp = await this.commonService.randString(4, '1234567890', '');
      uniqueOtp = (await this.otpRepository.findOne({
        where: { otpCode: otp },
        select: ['id'],
      }))
        ? true
        : false;
    }
    const createOtp = await this.otpRepository.save({
      otpCode: otp,
      hp,
      expired: expiredTime,
      userId: user?.id || null,
    });
    return { otp, otpExpired, otpId: createOtp.id };
  }

  async validasiOTP(otp: string) {
    let script = await this.scriptService;
    const { scriptForgot } = await this.commonService.generalParameter();
    //success
    const resForgotSuccess = await this._scriptText(scriptForgot, 'success');
    //invalidOtp
    const resForgotInvalidOtp = await this._scriptText(
      scriptForgot,
      'invalidOtp',
    );
    const currentime = moment().unix();
    let user: Users = null;
    const validasiOtp = await this.otpRepository.findOne({
      where: { otpCode: otp, status: 0, expired: MoreThan(currentime) },
      select: ['id', 'userId'],
    });
    if (validasiOtp) {
      await this.otpRepository.update(
        { id: validasiOtp.id },
        { status: 1, read_at: moment().format('YYYY-MM-DD HH:mm:ss') },
      );
      if (validasiOtp.userId) {
        user = await this.UserRepository.findOne({
          where: { id: validasiOtp.userId },
        });
      }
      if (user && user.status === 0) {
        await this.UserRepository.update({ id: user.id }, { status: 1 });
      }
      await this.notificationRepository.save({
        userId: user.id,
        title: 'Lupa Kata Sandi',
        prizeId: null,
        content: `${resForgotSuccess.title}\n\n${resForgotSuccess.messageBody}`,
        data: '',
      });
    }
    return {
      result: validasiOtp ? true : false,
      title: validasiOtp
        ? `${resForgotSuccess.title}`
        : `${resForgotInvalidOtp.title}`,
      message: `${
        validasiOtp
          ? `${resForgotSuccess.messageBody}`
          : `${resForgotInvalidOtp.messageBody}`
      }`,
    };
  }

  async forgotPassword(param: forgotPasswordDto, user) {
    let script = await this.scriptService;
    let users: Users = null;
    users = await this.UserRepository.findOne({
      where: { id: user.id },
      select: ['email'],
    });
    let { newPassword, reNewPassword } = param;
    const { scriptForgot } = await this.commonService.generalParameter();
    //invalidPassword
    const resPassword = await this._scriptText(scriptForgot, 'invalidPassword');
    //invalidReType
    const resReType = await this._scriptText(scriptForgot, 'invalidReType');
    //success
    const resSuccess = await this._scriptText(scriptForgot, 'success');
    if (newPassword.length < 8) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resPassword.messageBody}`,
        data: {
          title: `${resPassword.title}`,
          message: `${resPassword.messageBody}`,
        },
      });
    }
    if (reNewPassword !== newPassword) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resReType.messageBody}`,
        data: {
          title: `${resReType.title}`,
          message: `${resReType.messageBody}`,
        },
      });
    }
    reNewPassword = await this.commonService.bcriptSign(reNewPassword);
    await this.UserRepository.update(
      { id: user.id },
      { password: reNewPassword },
    );
    await this.sendOtp(users.email, '1');
    return {
      title: `${resSuccess.title}`,
      message: `${resSuccess.messageBody}`,
    };
  }

  async validasiEmail(email: string) {
    let hp = '';
    let token = '';
    const { scriptForgot } = await this.commonService.generalParameter();
    //invalidEmail
    const resInvalidEmail = await this._scriptText(
      scriptForgot,
      'invalidEmail',
    );
    let user: Users = null;
    user = await this.UserRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resInvalidEmail.messageBody}`,
        data: {
          title: `${resInvalidEmail.title}`,
          message: `${resInvalidEmail.messageBody}`,
        },
      });
    }
    hp = user.hp;
    token = user ? await this._getCookie(user) : null;

    return {
      message: 'Email anda valid',
      token,
      result: token ? true : false,
    };
  }

  async sendOtp(email: string, register: string) {
    const isRegistered = +register || 0;
    let hp = '';
    let token = '';
    let script = await this.scriptService;
    const { scriptForgot } = await this.commonService.generalParameter();
    //invalidEmail

    let user: Users = null;
    if (isRegistered === 1) {
      user = await this.UserRepository.findOne({
        where: { email },
      });

      hp = user.hp;
    }
    const { otp, otpExpired, otpId } = await this.generateOtp(hp, user);

    if (email !== '') {
      await this.nodemailerService.sendEmail({
        email,

        subject: 'OTP Nanonano',
        text: `Silahkan masukan kode OTP ini untuk melanjutkan proses Lupa Password.
                
                ${otp}
                Kode ini berlaku selama ${otpExpired} menit
                
                Terima kasih.`,
      });
    }
    return {
      message: 'Silahkan lihat email anda',
    };
  }

  async logout(sessionId: string) {
    const subDate = moment().subtract(7, 'day').unix().toString();
    await this.loginSessionRepository.update(
      { sessionId },
      { expired: subDate },
    );
  }

  async changePassword(param: ChangePassDTO, user) {
    let { password, retype } = param;

    const { scriptForgot } = await this.commonService.generalParameter();
    //invalidPassword
    const resPassword = await this._scriptText(scriptForgot, 'invalidPassword');
    //invalidReType
    const resReType = await this._scriptText(scriptForgot, 'invalidReType');
    //success
    const resSuccess = await this._scriptText(scriptForgot, 'success');
    if (password.length < 8) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resPassword.messageBody}`,
        data: {
          title: `${resPassword.title}`,
          message: `${resPassword.messageBody}`,
        },
      });
    }
    if (retype !== password) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resReType.messageBody}`,
        data: {
          title: `${resReType.title}`,
          message: `${resReType.messageBody}`,
        },
      });
    }

    password = await this.commonService.bcriptSign(password);

    await this.UserRepository.update({ id: user.id }, { password });
    await this.notificationRepository.save({
      userId: user.id,
      title: 'Ubah Kata Sandi',
      prizeId: null,
      content: `${resSuccess.title}`,
      data: '',
    });
    return { message: `${resSuccess.title}` };
  }

  async validasiPassword(user, password: string) {
    const users = await this.UserRepository.findOne({ where: { id: user.id } });
    const passwordHash = users.password;
    const decryptedPass = await this.commonService.cryptoDecrypt(passwordHash);
    if (password === decryptedPass) {
      return true;
    }
    throw new BadRequestException('Passoword not valid');
  }

  async login(param: LoginDto) {
    let { password, hp } = param;
    let newHp = '';
    const { scriptLogin } = await this.commonService.generalParameter();
    //success
    const resSuccess = await this._scriptText(scriptLogin, 'success');
    //unregister
    const resUnregister = await this._scriptText(scriptLogin, 'unregister');
    //wrongPass
    const resWrongPass = await this._scriptText(scriptLogin, 'wrongPass');
    let script = await this.scriptService;
    newHp = this.commonService.changePhone(hp, '62');
    const user = await this.UserRepository.createQueryBuilder('user')
      .where('user.hp = :newHp', { newHp })
      .andWhere('user.status = :status', { status: 1 })
      .orWhere('user.email = :email', { email: hp })
      .getOne();
    if (!user) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resUnregister.messageBody}`,
        data: {
          title: `${resUnregister.title}`,
          message: `${resUnregister.messageBody}`,
          type: 1,
        },
      });
    }
    const comparePass = await this.commonService.bcriptCompare(
      password,
      user.password,
    );
    if (!comparePass) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resWrongPass.messageBody}`,
        data: {
          title: `${resWrongPass.title}`,
          message: `${resWrongPass.messageBody}`,
        },
      });
    }

    const token = await this._getCookie(user);
    return {
      message: `${resSuccess.title}`,
      data: { token },
    };
  }

  async register(param: RegisterDTO) {
    let { hp, email, name, city, tnc, ktp, password } = param;
    hp = this.commonService.changePhone(hp, '62');

    const now = moment().format('YYYY-MM');

    const generalParameter = await this.commonService.generalParameter();
    const { minimumAge, scriptRegister } = generalParameter;
    //alredyPhoneKtpEmail
    const resAlreadyPhoneKtpEmail = await this._scriptText(
      scriptRegister,
      'alreadyPhoneKtpEmail',
    );

    //invalidKtp
    const resInvalidKtp = await this._scriptText(scriptRegister, 'invalidKtp');

    //invalidAge
    const resInvalidAge = await this._scriptText(scriptRegister, 'invalidAge');

    //invalidPasswordLength
    const resPasswordInvalid = await this._scriptText(
      scriptRegister,
      'minPass',
    );
    //success
    const resSuccess = await this._scriptText(scriptRegister, 'success');

    const validasiKtp = await this._validasiKtp(ktp);
    let entries: Entries = null;
    const dataSource = await this.mainDbConfigService.dbConnection();
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const ktpDuplicate = await this.UserRepository.findOne({
      where: { identity: ktp },
    });

    const hpDuplicate = await this.UserRepository.findOne({
      where: { hp: hp },
    });

    const emailDuplicate = await this.UserRepository.findOne({
      where: { email },
    });

    const checkPeriode = await this.userRankPeriodeRepository
      .createQueryBuilder('user_rank_periode')
      .where(
        "TO_CHAR(user_rank_periode.periode, 'YYYY-MM') <= :time AND TO_CHAR(user_rank_periode.periode_end,'YYYY-MM') >= :time AND status = 1",
        {
          time: now,
        },
      )
      .getOne();

    if (
      (ktpDuplicate && ktp) ||
      (hpDuplicate && hp) ||
      (emailDuplicate && email)
    ) {
      entries = await queryRunner.manager
        .insert(Entries, {
          hp: hp,
          sender: hp,
          rcvd_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          mediaId: 4,
          is_valid: 0,
          invalidReasonId: 33,
          status: 2,
          message: 'Registrasi Invalid',
        })
        .then((v: any) => v.generatedMaps[0]);
      await queryRunner.commitTransaction();

      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resAlreadyPhoneKtpEmail.messageBody}`,
        data: {
          title: `${resAlreadyPhoneKtpEmail.title}`,
          message: `${resAlreadyPhoneKtpEmail.messageBody}`,
        },
      });
    }

    if (validasiKtp.isValid == 0) {
      entries = await queryRunner.manager
        .insert(Entries, {
          hp: hp,
          sender: hp,
          mediaId: 4,
          rcvd_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          is_valid: 0,
          invalidReasonId: 24,
          status: 2,
          message: 'Registrasi Invalid',
        })
        .then((v: any) => v.generatedMaps[0]);
      await queryRunner.commitTransaction();

      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resInvalidKtp.messageBody}`,
        data: {
          title: `${resInvalidKtp.title}`,
          message: `${resInvalidKtp.messageBody}`,
        },
      });
    }

    if (parseInt(validasiKtp.age) < minimumAge) {
      entries = await queryRunner.manager
        .insert(Entries, {
          hp: hp,
          sender: hp,
          mediaId: 4,
          rcvd_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          is_valid: 0,
          invalidReasonId: 25,
          status: 2,
          message: 'Registrasi Invalid',
        })
        .then((v: any) => v.generatedMaps[0]);
      await queryRunner.commitTransaction();

      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resInvalidAge.messageBody}`,
        data: {
          title: `${resInvalidAge.title}`,
          message: `${resInvalidAge.messageBody}`,
        },
      });
    }

    if (password.length < 8) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resPasswordInvalid.messageBody}`,
        data: {
          title: `${resPasswordInvalid.title}`,
          message: `${resPasswordInvalid.messageBody}`,
        },
      });
    }

    password = await this.commonService.bcriptSign(password);

    const savedUser = await this.UserRepository.save({
      status: 1,
      mediaId: 4,
      fullname: name,
      identity: ktp,
      birthdate: validasiKtp.birthDate,
      gender: validasiKtp.gender,
      age: validasiKtp.age,
      hp: hp,
      is_agree: tnc == true ? 1 : 0,
      regency_ktp: city,
      password: password,
      email: email,
    });

    if (checkPeriode) {
      // Step 1: Fetch the maximum rank from the table for the specified period
      const lastRank = await this.userRankRepository
        .createQueryBuilder('user_rank')
        .select('MAX(user_rank.rank)', 'maxRank')
        .where('user_rank.userRankPeriodeId = :periodeId', {
          periodeId: checkPeriode.id,
        })
        .getRawOne();

      // Step 2: Calculate the new rank (maxRank + 1 or default to 1 if no rank exists)
      const newRank = (lastRank?.maxRank ?? 0) + 1;
      await this.userRankRepository.insert({
        userId: savedUser.id,
        userRankPeriodeId: checkPeriode.id,
        point: +0,
        rank: +newRank,
      });
    }

    // Second insert: insert the notification using the userId from the savedUser
    await this.notificationRepository
      .createQueryBuilder('notification')
      .insert()
      .setQueryRunner(queryRunner)
      .values({
        userId: savedUser.id, // Use the id from the saved user
        title: 'Registrasi',
        prizeId: null,
        content: `Registrasi Lo berhasil!\n\n${resSuccess.title}`,
        data: '',
      })
      .execute();

    await queryRunner.commitTransaction();

    return {
      message: `${resSuccess.title}`,
    };
  }

  async _validasiKtp(ktp) {
    ktp = +ktp || 0;
    ktp = ktp.toString();
    const codeProvince = ktp.substring(0, 2);
    const codeRegency = ktp.substring(0, 4);
    const codeDistrict = ktp.substring(0, 6);
    const bornDate =
      parseInt(ktp.substring(6, 8)) > 40
        ? parseInt(ktp.substring(6, 8)) - 40
        : ktp.substring(6, 8);
    const gender =
      ktp == ''
        ? ''
        : parseInt(ktp.substring(6, 8)) > 40
        ? 'F'
        : parseInt(ktp.substring(6, 8)) < 40
        ? 'M'
        : '';
    const yearNow = String(new Date().getFullYear()).substring(2, 4);
    const bornYear =
      parseInt(ktp.substring(10, 12)) > parseInt(yearNow) ? 19 : 20;
    let birthDate =
      ktp.length < 16 || parseInt(ktp.substring(8, 10)) > 12 || bornDate > 31
        ? '0000-00-00'
        : bornYear +
          ktp.substring(10, 12) +
          '-' +
          ktp.substring(8, 10) +
          '-' +
          bornDate;
    birthDate = moment(birthDate).isValid() ? birthDate : '0000-00-00';
    const ages = moment(birthDate).isValid()
      ? moment().diff(birthDate, 'years', false).toString()
      : 'Invalid date';
    const age =
      ages === 'Invalid date'
        ? '0'
        : ages.length > 2
        ? '0'
        : birthDate == null
        ? '0'
        : ages;

    const findArea = await this.districtRepository
      .createQueryBuilder('district')
      .where('district.code = :codeDistrict AND district.status = :status', {
        codeDistrict,
        status: 1,
      })
      .innerJoinAndSelect('district.city', 'city')
      .innerJoinAndSelect('city.province', 'province')
      .getOne();
    const area = {
      province: {
        name: findArea?.city?.province?.name || '',
        code: findArea?.city?.province?.code || '0',
      },
      city: {
        name: findArea?.city?.name || '',
        code: findArea?.city?.code || '0',
      },
      district: {
        name: findArea?.name || '',
        code: findArea?.code || '0',
      },
    };
    const isValid =
      area.province.name === '' ||
      area.city.name === '' ||
      area.district.name === '' ||
      age === '0' ||
      gender === '' ||
      birthDate === '0000-00-00'
        ? 0
        : 1;
    return {
      area,
      birthDate,
      codeDistrict,
      codeProvince,
      codeRegency,
      gender,
      isValid,
      age,
    };
  }
}
