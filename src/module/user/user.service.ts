import { AppConfigService } from '@common/config/api/config.service';
import { CommonService } from '@common/services/common.service';
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/user/user.repository';
import {
  ImageString,
  ListHistoryDTO,
  PointRedeemDTO,
  SubmitCodeUniqueDTO,
  UserUpdateDTO,
} from 'src/dto/user.dto';
import axios from 'axios';
import * as moment from 'moment';
import * as fs from 'fs';

import { custom } from 'joi';
import { path as appRoot } from 'app-root-path';

import { PeriodeRepository } from 'src/models/periode/periode.repository';
import { WhiteListRepository } from 'src/models/white_list/white_list.repository';
import { ScriptConfigService } from '@common/config/script/config.service';
import { MainDbConfigService } from '@common/config/db/config.service';
import { GeneralParameterRepository } from 'src/models/general_parameter/general_parameter.repository';
import { Users } from 'src/models/user/user.entity';
import { Entries } from 'src/models/entries/entries.entity';
import { Attachment } from 'src/models/attachment/attachment.entity';
import { CouponDbService } from 'src/db/coupon-db/coupon-db.service';
import { runInThisContext } from 'vm';
import e, { query } from 'express';
import { EntriesRepository } from 'src/models/entries/entries.repository';
import { CouponRepository } from 'src/models/coupon/coupon.repository';

import { CouponDBModel } from 'src/db/coupon-db/interfaces/model.interface';
import { CouponVariantRepository } from 'src/models/coupon_variant/coupon_variant.repository';
import { PrizeRepository } from 'src/models/prize/prize.repository';
import { Voucher } from 'src/models/eVoucher/eVoucher.entity';
import { WinnerRepository } from 'src/models/winner/winner.repository';
import { HistoryRepository } from 'src/models/history/history.repository';
import { PointDBModel } from 'src/db/point-db/interfaces/model.interface';
import { PointDbService } from 'src/db/point-db/point-db.service';
import { UserRank } from 'src/db/point-db/models/point_rank.entity';
import { History } from 'src/models/history/history.entity';
import { Winner } from 'src/models/winner/winner.entity';
import { Coupon } from 'src/models/coupon/coupon.entity';
import { NotificationRepository } from 'src/models/notification/notification.repository';
import { Notification } from 'src/models/notification/notification.entity';
import { IsNull, Not } from 'typeorm';
import { ScriptRepository } from 'src/models/script/script.repository';

import * as Jimp from 'jimp';
import { HistoryDetailRepository } from 'src/models/history_detail/history_detail.repository';
import { VoucherRepository } from 'src/models/eVoucher/eVoucher.repository';
import { UserRankRepository } from 'src/models/user_rank/user-rank.repository';
import { UserRankPeriodeRepository } from 'src/models/user_rank_periode/user-rank_periode.repository';
import { createCanvas, loadImage, registerFont } from 'canvas';

@Injectable()
export class UserService {
  private readonly couponDBModel: CouponDBModel;
  private readonly pointDBModel: PointDBModel;

  constructor(
    private readonly commonService: CommonService,
    private readonly appConfigService: AppConfigService,
    private readonly scriptService: ScriptConfigService,
    private readonly couponDBService: CouponDbService,
    private readonly pointDBService: PointDbService,
    private readonly mainDbConfigService: MainDbConfigService,
  ) {
    this.couponDBModel = this.couponDBService.getCouponDbModels();
    this.pointDBModel = this.pointDBService.getPointDbModels();
  }

  @InjectRepository(UserRepository)
  private UserRepository: UserRepository;

  @InjectRepository(PeriodeRepository)
  private periodeRepository: PeriodeRepository;

  @InjectRepository(WhiteListRepository)
  private whiteListRepository: WhiteListRepository;

  @InjectRepository(EntriesRepository)
  private entriesRepositry: EntriesRepository;

  @InjectRepository(CouponVariantRepository)
  private couponVariantRepository: CouponVariantRepository;

  @InjectRepository(PrizeRepository)
  private prizeRepository: PrizeRepository;

  @InjectRepository(WinnerRepository)
  private winnerRepository: WinnerRepository;

  @InjectRepository(HistoryRepository)
  private historyRepository: HistoryRepository;

  @InjectRepository(CouponRepository)
  private couponRepository: CouponRepository;

  @InjectRepository(NotificationRepository)
  private notificationRepository: NotificationRepository;

  @InjectRepository(ScriptRepository)
  private scriptRepository: ScriptRepository;

  @InjectRepository(HistoryDetailRepository)
  private historyDetailRepository: HistoryDetailRepository;

  @InjectRepository(VoucherRepository)
  private voucherRepository: VoucherRepository;

  @InjectRepository(UserRankRepository)
  private userRankRepository: UserRankRepository;

  @InjectRepository(UserRankPeriodeRepository)
  private userRankPeriodeRepository: UserRankPeriodeRepository;

  private _prizeWhere(prizeId: number) {
    return prizeId == 1 ? ` AND history."winnerId" notnull` : '';
  }

  private _keyWhere(prizeId: number, status: number, key: string) {
    let keyCode = '';

    if (prizeId == 1 && key) {
      keyCode += ` AND prize.name ILIKE '%${key}%' `;
    }

    if (status == 1 && key) {
      keyCode += ` AND entries.coupon ILIKE '%${key}%' `;
    }

    if (prizeId != 1 && status != 1 && key) {
      keyCode = ` AND (prize.name ILIKE '%${key}%' OR entries.coupon ILIKE '%${key}%')`;
    }

    return keyCode;
  }

  private _whereStatus(status: number) {
    return status == 1
      ? ` AND (entries.is_valid = 1 or entries.is_valid = 0)`
      : '';
  }

  private _whereYearMonth(yearmonth: string) {
    return yearmonth === ''
      ? ''
      : ` AND to_char(history.created_at,'YYYYMM') = '${yearmonth}'`;
  }

  private _wherePeriodeId(periodeId: number) {
    return periodeId === 0 ? '' : ` AND "userRankPeriodeId" = ${periodeId}`;
  }

  private async _scriptText(type: number, name: string) {
    return this.scriptRepository.findOne({
      where: { status: 1, type, name },
    });
  }

  private _whereCoupon(coupon: string) {
    coupon = coupon.toUpperCase();
    return coupon === '' ? '' : ` AND UPPER(prize.name) LIKE '%${coupon}%'`;
  }

  async validateFileType(
    file: Express.Multer.File,
    tempFilePath: string,
    filename: string,
  ): Promise<void> {
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    const fileSize = file.size;

    let script = await this.scriptService;
    const { allowedImage, maxFileSize, scriptSubmit } =
      await this.commonService.generalParameter();
    //extensionFile
    const resExtensionFile = await this._scriptText(
      scriptSubmit,
      'extensionFile',
    );

    //maximumFile
    const resMaximumFile = await this._scriptText(scriptSubmit, 'maximumFile');

    return new Promise(async (resolve, reject) => {
      //check file extension

      if (!allowedImage.includes(fileExtension)) {
        fs.unlinkSync(tempFilePath);
        return reject(
          new BadRequestException({
            statusCode: 400,
            error: 'Bad Request',
            message: `${resExtensionFile.messageBody}`,
            data: {
              title: `${resExtensionFile.title}`,
              message: `${resExtensionFile.messageBody}`,
            },
          }),
        );
      }

      //check file size
      if (fileSize > maxFileSize) {
        fs.unlinkSync(tempFilePath);
        return reject(
          new BadRequestException({
            statusCode: 400,
            error: 'Bad Request',
            message: `${resMaximumFile.messageBody}`,
            data: {
              title: `${resMaximumFile.title}`,
              message: `${resMaximumFile.messageBody}`,
            },
          }),
        );
      }

      resolve();
    });
  }

  async getMe(user) {
    return user;
  }

  async submitCode(
    param: SubmitCodeUniqueDTO,
    files: Express.Multer.File[],
    user,
  ) {
    let isValid = 0;
    const { code } = param;
    const upperCaseCode = code.toUpperCase();
    const { urlImage, scriptSubmit } =
      await this.commonService.generalParameter();

    const nowYM = moment().format('YYYY-MM');

    const getUserRankPeriode = await this.userRankPeriodeRepository
      .createQueryBuilder('user_rank_periode')
      .where(
        "TO_CHAR(user_rank_periode.periode, 'YYYY-MM') <= :time AND TO_CHAR(user_rank_periode.periode_end,'YYYY-MM') >= :time AND status = 1",
        {
          time: nowYM,
        },
      )
      .getOne();
    //belumDimulai
    const resBelumDimulai = await this._scriptText(
      scriptSubmit,
      'belumDimulai',
    );

    //berakhir
    const resBerakhir = await this._scriptText(scriptSubmit, 'berakhir');
    //wrongCode
    const resWrongCode = await this._scriptText(scriptSubmit, 'wrongCode');
    //codeUsed
    const resCodeUsed = await this._scriptText(scriptSubmit, 'codeUsed');
    //correct
    let resCorrect = await this._scriptText(scriptSubmit, 'correct');

    const tempPath = `${appRoot}/../temp/file`;
    const tempFilePath = `${tempPath}/${files[0].filename}`;

    const dataSource = await this.mainDbConfigService.dbConnection();
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let script = await this.scriptService;
    const now = moment().format('YYYY-MM-DD HH24:MI:SS');
    const periodeStart = await this.periodeRepository
      .createQueryBuilder('periode')
      .where(
        "TO_CHAR(periode.periode_start, 'YYYY-MM-DD HH24:MI:SS') <= :time",
        {
          time: now,
        },
      )
      .getOne();

    const periodeEnd = await this.periodeRepository
      .createQueryBuilder('periode')
      .where("TO_CHAR(periode.periode_end, 'YYYY-MM-DD HH24:MI:SS') > :time", {
        time: now,
      })
      .getOne();

    const whiteList = await this.whiteListRepository
      .createQueryBuilder('white_list')
      .innerJoin('users', 'users', 'white_list.sender = users.hp')
      .where('white_list.sender = :sender', {
        sender: user.hp,
      })
      .getOne();

    if (!periodeStart && !whiteList) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resBelumDimulai.messageBody}`,
        data: {
          title: `${resBelumDimulai.title}`,
          message: `${resBelumDimulai.messageBody}`,
          footer: `${resBelumDimulai.footer}`,
        },
      });
    }

    if (!periodeEnd) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: `${resBerakhir.messageBody}`,
        data: {
          title: `${resBerakhir.title}`,
          message: `${resBerakhir.messageBody}`,
        },
      });
    }

    await this.validateFileType(files[0], tempFilePath, files[0].filename);

    let userPoint = await this.UserRepository.findOne({
      where: { id: user.id },
      select: ['id', 'point'],
    });

    let existCode = await this.couponDBModel.Coupon.Coupon.findOne({
      coupon: upperCaseCode,
    });

    let usedCode = await this.couponDBModel.Coupon.Coupon.findOne({
      coupon: upperCaseCode,
      status: 1,
    });

    let userRankPoint = await this.userRankRepository.findOne({
      where: { userId: user.id },
      select: ['id', 'point', 'rank'],
    });

    let variantPoint = 0;

    let users: Users = null;
    let userRank: UserRank = null;
    let entries: Entries = null;
    let attachment: Attachment = null;
    let history: History = null;
    let winner: Winner = null;
    if (userPoint) {
      if (usedCode) {
        entries = await queryRunner.manager
          .insert(Entries, {
            userId: user.id,
            hp: user.hp,
            sender: user.hp,
            mediaId: 4,
            rcvd_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            invalidReasonId: 14,
            coupon: upperCaseCode,
            is_valid: 0,
            status: 1,
            totalPoint: 0,
            message: '`Kode Unik Sudah digunakan',
          })
          .then((v: any) => v.generatedMaps[0]);

        await queryRunner.commitTransaction();
        fs.unlinkSync(tempFilePath);

        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `${resCodeUsed.messageBody}`,
          data: {
            title: `${resCodeUsed.title}`,
            message: `${resCodeUsed.messageBody}`,
          },
        });
      }
      if (existCode) {
        const variant = await this.couponVariantRepository.findOne({
          where: { id: existCode.variantId },
        });
        variantPoint = variant ? variant.point : 0;
        users = await this.UserRepository.createQueryBuilder('users')
          .update()
          .setQueryRunner(queryRunner)
          .set({
            point: +userPoint.point + variantPoint,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          })
          .where('id = :id', { id: user.id })
          .returning(['id', 'point'])
          .execute()
          .then((v: any) => {
            return v.raw[0];
          });

        userRank = await this.userRankRepository
          .createQueryBuilder('user_rank')
          .update()
          .setQueryRunner(queryRunner)
          .set({
            point: +userRankPoint.point + variantPoint,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          })
          .where('userId = :userId', { userId: user.id })
          .andWhere('userRankPeriodeId = :userRankPeriodeId', {
            userRankPeriodeId: getUserRankPeriode.id,
          })
          .returning(['id', 'point', 'rank'])
          .execute()
          .then((v: any) => {
            return v.raw[0];
          });

        entries = await queryRunner.manager
          .insert(Entries, {
            userId: user.id,
            hp: user.hp,
            sender: user.hp,
            mediaId: 4,
            rcvd_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            is_valid: 1,
            status: 1,
            couponVariantId: existCode.variantId,
            coupon: upperCaseCode,
            totalPoint: variantPoint,
            message: 'Submit Kode Unik Valid',
          })
          .then((v: any) => v.generatedMaps[0]);

        attachment = await queryRunner.manager
          .insert(Attachment, {
            entriesId: entries.id,
            mediaId: 4,
            userId: user.id,
            sender: user.hp,
            url: `${urlImage}/${files[0].filename}`,
          })
          .then((v: any) => v.generatedMaps[0]);

        winner = await queryRunner.manager
          .insert(Winner, {
            type: 4,
            entriesId: entries.id,
            userId: user.id,
            account_number: user.hp,
            status: 2,
            total: 1,
            masterBrandId: '66b71d06-d996-4cf0-83d1-522de2c6a3a9',
            code_topup: '',
            is_approved: 0,
          })
          .then((v: any) => v.generatedMaps[0]);

        history = await queryRunner.manager
          .insert(History, {
            coupon: upperCaseCode,
            entriesId: entries.id,
            winnerId: null,
            point: variantPoint,
            type: 1,
            userId: user.id,
            desc: `${resCorrect.messageBody}\n${resCorrect.footer}`,
            userRankPeriodeId: getUserRankPeriode.id || null,
            status: 1,
          })
          .then((v: any) => v.generatedMaps[0]);

        if (users.id) {
          await this.couponDBModel.Coupon.Coupon.updateOne(
            { coupon: upperCaseCode },
            { status: 1, use_date: moment().format('YYYY-MM-DD HH:mm:ss') },
          );
        }

        await this.couponVariantRepository
          .createQueryBuilder('coupon_variant')
          .update()
          .setQueryRunner(queryRunner)
          .set({
            quantity: () => `quantity - ${1}`,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          })
          .where('id = :id', { id: existCode.variantId })
          .returning(['id', 'point'])
          .execute();

        resCorrect.title = resCorrect.title.replace(
          '{{1}}',
          `${variantPoint.toLocaleString()}`,
        );

        await this.notificationRepository
          .createQueryBuilder('notification')
          .insert()
          .setQueryRunner(queryRunner)
          .values({
            userId: user.id, // Use the id from the saved user
            title: 'Submit Kode Unik',
            prizeId: null,
            content: `Congrats Sob!\n\n${resCorrect.title}\n\n${resCorrect.messageBody}\n\n${resCorrect.footer}`,
            data: '',
          })
          .execute();

        isValid = 1;
      } else {
        entries = await queryRunner.manager
          .insert(Entries, {
            userId: user.id,
            hp: user.hp,
            sender: user.hp,
            rcvd_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            mediaId: 4,
            is_valid: 0,
            coupon: upperCaseCode,
            invalidReasonId: 13,
            status: 1,
            totalPoint: 0,
            message: 'Kode unik tidak terdaftar',
          })
          .then((v: any) => v.generatedMaps[0]);

        await queryRunner.commitTransaction();
        fs.unlinkSync(tempFilePath);

        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `${resWrongCode.messageBody}`,
          data: {
            title: `${resWrongCode.title}`,
            message: `${resWrongCode.messageBody}`,
          },
        });
      }
    }

    if (isValid == 1) {
      await this.commonService.uploadToS3(tempFilePath, files[0].filename);
    }

    await queryRunner.commitTransaction();
    resCorrect.title = resCorrect.title.replace('{{1}}', `${variantPoint}`);
    return {
      title: `${resCorrect.title}`,
      message: `${resCorrect.messageBody}`,
      footer: `${resCorrect.footer}`,
    };
  }

  async getHistorySubmit(user) {
    const findHistory = await this.entriesRepositry.find({
      where: { userId: user.id, message: 'Submit Kode Unik' },
      select: ['id', 'created_at', 'coupon', 'status', 'totalPoint'],
    });
    const formattedHistory = findHistory.map((entry) => ({
      ...entry,
      created_at: moment(entry.created_at).format('YYYY-MM-DD HH:mm:ss'),
    }));
    return formattedHistory;
  }

  async listHistory(params: ListHistoryDTO, user) {
    let { coupon, prizeId, status, rowPerPage, key, page, rankPeriodeId } =
      params;

    // yearmonth = yearmonth?.toString() || '';
    coupon = coupon?.toString() || '';
    // limit = +limit || 0;
    page = +page || 0;
    status = +status >= 0 ? +status : -1;
    prizeId = +prizeId || 0;
    rowPerPage = +rowPerPage || 0;
    rankPeriodeId = +rankPeriodeId || 0;

    const firstData = rowPerPage * page;
    let count = await this.historyRepository
      .createQueryBuilder('history')
      .leftJoin('history.entries', 'entries')
      .leftJoin('history.winner', 'winner')
      .leftJoin('winner.prize', 'prize')
      .where(
        `(history.type = 1 OR history.type = 3 OR history.type = 4) AND history."userId" = ${
          user.id
        }${this._whereCoupon(coupon)}${this._prizeWhere(
          prizeId,
        )}${this._whereStatus(status)}${this._keyWhere(prizeId, status, key)}`,
      )
      .getCount();
    const pagination = await this.commonService.pagination(
      page,
      rowPerPage,
      count,
    );
    let history = await this.historyRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.entries', 'entries')
      .leftJoinAndSelect('history.winner', 'winner')
      .leftJoinAndSelect('winner.prize', 'prize')
      .select(
        "(CASE WHEN entries.coupon IS NULL THEN '' ELSE entries.coupon END)",
        'coupon',
      )
      .addSelect('entries.is_valid', 'status')
      .addSelect('history.id', 'id')
      .addSelect('winner.id', 'winnerId')
      .addSelect('entries.id', 'entriesId')
      .addSelect(
        '(CASE WHEN entries.id IS NULL THEN history.created_at ELSE entries.rcvd_time END)',
        'date',
      )
      .addSelect('history.type', 'type')
      .addSelect(
        "(CASE WHEN prize.id IS NULL THEN '' ELSE prize.name END)",
        'prize',
      )
      .addSelect('history.point', 'point')
      .addSelect(
        "(CASE WHEN prize.id IS NULL THEN '' ELSE prize.picture END)",
        'picture',
      )
      .addSelect('history.desc', 'historyDesc')
      .addSelect(
        '(CASE WHEN entries."invalidReasonId" IS NOT NULL THEN 0 WHEN winner.id IS NULL THEN 2 ELSE winner.status  END)',
        'prizeStatus',
      )
      .where(
        `(history.type = 1 OR history.type = 3 OR history.type = 4) AND history."userId" = ${
          user.id
        }${this._whereCoupon(coupon)}${this._prizeWhere(
          prizeId,
        )}${this._wherePeriodeId(rankPeriodeId)}${this._whereStatus(
          status,
        )}${this._keyWhere(prizeId, status, key)}`,
      )
      .orderBy('history.id', 'DESC')
      .limit(rowPerPage)
      .offset(firstData)
      .getRawMany();

    history = history.map((v) => {
      v.date = moment(v.date).locale('ID').format('DD MMMM YYYY || HH:mm');
      v.prizeStatusMessage =
        v.prizeStatus == 0
          ? 'Gagal'
          : v.prizeStatus == 1
          ? 'Sedang diproses'
          : v.prizeStatus == 2
          ? 'Sukses'
          : v.prizeStatus == 3
          ? 'Dalam pengiriman'
          : v.prizeStatus == 4
          ? 'Diterima'
          : '-';
      return v;
    });

    const query = this.historyRepository
      .createQueryBuilder('history')
      .select('SUM(history.point)', 'total')
      .where('history.userId = :userId', { userId: user.id });

    // Menambahkan kondisi berdasarkan status
    if (status === 1) {
      query.andWhere('history.type = :type', { type: 1 });
    } else {
      query.andWhere('history.type <> :type', { type: 1 });
    }

    // Menambahkan kondisi jika userRankPeriode ada
    if (rankPeriodeId) {
      query.andWhere('history.userRankPeriodeId = :userRankPeriodeId', {
        userRankPeriodeId: rankPeriodeId,
      });
    }

    // Eksekusi query
    const totalBerry = await query.getRawOne();

    return {
      data: {
        totalBerry: +totalBerry.total,
        data: history,
        totalData: pagination.totalData,
        totalPage: pagination.totalPage,
        dataPerPage: pagination.dataPerPage,
      },
    };
  }

  async listHistoryDetail(id: number, user) {
    const getHistory = await this.historyRepository.findOne({
      where: { id },
      select: ['winnerId', 'entriesId', 'desc', 'coupon'],
    });
    let data = {};
    let detailPrize = [];
    const { winnerId, entriesId, desc, coupon } = getHistory;
    if (winnerId) {
      const getWinner = await this.winnerRepository.findOne({
        where: { id: winnerId },
      });
      const getPrize = await this.prizeRepository.findOne({
        where: { id: getWinner.prizeId },
      });
      data = {
        prize: getPrize.textUrl,
        picture: getPrize.picture,
        date: moment(getWinner.created_at)
          .locale('ID')
          .format('DD MMMM YYYY || HH:mm'),
      };
      if (getPrize.typeId == 1 || (getPrize.typeId == 3 && getPrize.id == 5)) {
        let getHistoryDetail = await this.historyDetailRepository.find({
          where: { historyId: id },
          select: ['description', 'updated_at', 'status'],
          order: { updated_at: 'ASC' },
        });

        getHistoryDetail = getHistoryDetail.map((v) => {
          v.updated_at = v.updated_at
            ? moment(v.updated_at).locale('ID').format('DD MMMM YYYY || HH:mm')
            : '-';

          return v;
        });

        data = { ...data, dataPrize: getHistoryDetail };
      }

      if (getPrize.typeId == 2) {
        const getCouponUndian = await this.couponRepository.findOne({
          where: { id: getWinner.couponId },
        });
        data = {
          ...data,
          dataPrize: { code: getCouponUndian.code, url: getCouponUndian.url },
        };
      }

      if (getPrize.typeId == 3 && getPrize.id == 4) {
        const getVoucher = await this.voucherRepository.findOne({
          where: { id: getWinner.voucherId },
        });
        data = { ...data, dataPrize: { code: getVoucher?.code || '-' } };
      }
    }

    return { data: data };
  }

  async getHistorySubmitDetail(id: number, user) {
    const findHistory = await this.entriesRepositry.find({
      where: { id: id },
      select: ['id', 'created_at', 'coupon', 'status', 'totalPoint'],
    });
    const formattedHistory = findHistory.map((entry) => ({
      ...entry,
      created_at: moment(entry.created_at).format('YYYY-MM-DD HH:mm:ss'),
    }));
    return formattedHistory;
  }

  async pointRedeem(body: PointRedeemDTO, user) {
    const { prizeId, typeId, count } = body;
    const { scriptRedeem } = await this.commonService.generalParameter();

    //success
    let resSuccess = await this._scriptText(scriptRedeem, 'redeem');
    const dataSource = await this.mainDbConfigService.dbConnection();
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    let script = await this.scriptService;
    await queryRunner.startTransaction();

    const historyDetailFisik = ['Dalam Proses', 'Dalam Pengiriman', 'Diterima'];
    const historyDetailGopay = ['Dalam Proses', 'Sukses'];

    const nowYM = moment().format('YYYY-MM');

    const getUserRankPeriode = await this.userRankPeriodeRepository
      .createQueryBuilder('user_rank_periode')
      .where(
        "TO_CHAR(user_rank_periode.periode, 'YYYY-MM') <= :time AND TO_CHAR(user_rank_periode.periode_end,'YYYY-MM') >= :time AND status = 1",
        {
          time: nowYM,
        },
      )
      .getOne();

    try {
      let prize = await this.prizeRepository
        .createQueryBuilder('prize')
        .leftJoinAndSelect('prize.voucher', 'voucher')
        .where('prize.id = :prizeId AND prize.typeId = :typeId', {
          prizeId,
          typeId,
        })
        .setQueryRunner(queryRunner)
        .select([
          'prize.amount',
          'prize.name',
          'prize.isTopup',
          'prize.categoryId',
          'prize.voucherId',
          'prize.history_desc',
          'prize.topupType',
          'prize.point',
          'prize.textUrl',
          'prize.picture',
          'voucher.code',
        ])
        .getOne();
      let voucher: Voucher = null;
      let isApproved = 0;
      let content = '';

      // check my point
      let {
        amount,
        isTopup,
        voucherId,
        history_desc,
        topupType,
        point,
        picture,
        textUrl,
      } = prize;
      const totalPointWillRedeem = point * count;
      const users = await this.UserRepository.createQueryBuilder('user')
        .where('user.point >= :totalPoint AND id = :userId', {
          totalPoint: totalPointWillRedeem,
          userId: user.id,
        })
        .setQueryRunner(queryRunner)
        .select(['user.point'])
        .getOne();

      if (!users) {
        throw new BadRequestException('Point Tidak Cukup');
      }
      const updatedPoint = await this.UserRepository.createQueryBuilder('user')
        .update()
        .set({ point: () => `point-${totalPointWillRedeem}` })
        .setQueryRunner(queryRunner)
        .where('point >= :totalPoint AND id = :userId', {
          totalPoint: totalPointWillRedeem,
          userId: user.id,
        })
        .execute();

      if (updatedPoint.affected < 1) {
        throw new BadRequestException('Point Tidak Cukup');
      }

      await this.userRankRepository
        .createQueryBuilder('user_rank')
        .update()
        .set({ point: () => `point-${totalPointWillRedeem}` })
        .setQueryRunner(queryRunner)
        .where(
          'point >= :totalPoint AND userId = :userId AND userRankPeriodeId = :userRankPeriodeId',
          {
            totalPoint: totalPointWillRedeem,
            userId: user.id,
            userRankPeriodeId: getUserRankPeriode.id,
          },
        )
        .execute();

      if (typeId != 2) {
        const updatePrizeQuantity = await this.prizeRepository
          .createQueryBuilder('prize')
          .update()
          .set({ quantity: () => `quantity - ${count}` })
          .where('prize.id = :prizeId AND quantity >= :quantity', {
            prizeId,
            quantity: count,
          })
          .setQueryRunner(queryRunner)
          .execute();

        if (updatePrizeQuantity.affected < 1) {
          throw new BadRequestException('Quantity Tidak Mencukupi');
        }

        const winner = await this.winnerRepository
          .createQueryBuilder('winner')
          .insert()
          .values({
            prizeId,
            type: topupType,
            amount,
            voucherId,
            userId: user.id,
            account_number: user.hp,
            status: 1,
            total: count,
            masterBrandId: '66b71d06-d996-4cf0-83d1-522de2c6a3a9',
            code_topup: prize?.voucher?.code || '',
            is_approved: isApproved,
            // ktp_image: ktpImg,
            // kk_image: kkImg,
          })
          .setQueryRunner(queryRunner)
          .execute();

        let voucherName =
          voucher?.code?.split(',')?.[0]?.replace(/[0-9]/g, '') || '';

        if (typeId == 1) {
          const tukarBerryResult = await script.tukarBerry(
            prize.point.toLocaleString(),
            prize.name,
          );
          content = tukarBerryResult.gimmickFisik; // Fisik
        } else if (typeId == 3 && prizeId == 4) {
          const tukarBerryResult = await script.tukarBerry(
            prize.point.toLocaleString(),
            prize.name,
            voucherName,
          );
          content = tukarBerryResult.gimmickGooglePlay; // Google Play
        } else {
          const tukarBerryResult = await script.tukarBerry(
            prize.point.toLocaleString(),
            prize.name,
          );
          content = tukarBerryResult.gimmickGopay; // Gopay
        }

        const history = await this.historyRepository
          .createQueryBuilder('history')
          .insert()
          .setQueryRunner(queryRunner)
          .values({
            coupon: '',
            entriesId: null,
            winnerId: winner.generatedMaps[0].id,
            point: -totalPointWillRedeem,
            type: 3,
            userId: user.id,
            desc: history_desc,
            userRankPeriodeId: getUserRankPeriode.id,
            status: 1,
          })
          .setQueryRunner(queryRunner)
          .execute();

        if (typeId == 1) {
          for (let index = 0; index < historyDetailFisik.length; index++) {
            const element = historyDetailFisik[index];

            await this.historyDetailRepository
              .createQueryBuilder('historyDetail')
              .insert()
              .setQueryRunner(queryRunner)
              .values({
                historyId: history.generatedMaps[0].id,
                description: element,
                updated_at:
                  index == 0
                    ? moment().format('YYYY-MM-DD HH:mm:ss.SSS')
                    : null,
                status: index == 0 ? 1 : 0,
              })
              .execute();
          }
        }

        if (typeId == 3 && prizeId == 5) {
          for (let index = 0; index < historyDetailGopay.length; index++) {
            const element = historyDetailGopay[index];

            await this.historyDetailRepository
              .createQueryBuilder('historyDetail')
              .insert()
              .setQueryRunner(queryRunner)
              .values({
                historyId: history.generatedMaps[0].id,
                description: element,
                updated_at:
                  index == 0
                    ? moment().format('YYYY-MM-DD HH:mm:ss.SSS')
                    : null,
                status: index == 0 ? 1 : 0,
              })
              .execute();
          }
        }

        await this.notificationRepository
          .createQueryBuilder('notification')
          .insert()
          .setQueryRunner(queryRunner)
          .values({
            userId: user.id,
            title: prize.name,
            prizeId: prizeId,
            content: content,
            data: '',
          })
          .setQueryRunner(queryRunner)
          .execute();
        await queryRunner.commitTransaction();
        resSuccess.title = resSuccess.title.replace(
          '{{1}}',
          `${prize.point.toLocaleString()}`,
        );
        resSuccess.messageBody = resSuccess.messageBody.replace(
          '{{1}}',
          `${prize.picture}`,
        );
        resSuccess.footer = resSuccess.footer.replace(
          '{{1}}',
          `${prize.textUrl}`,
        );

        return {
          data: {
            title: resSuccess.title,
            message: resSuccess.messageBody,
            footer: resSuccess.footer,
          },
        };
      } else {
        const { prefix } = await this.commonService.generalParameter();
        let couponUndian = '';
        let uniqueCoupon = true;

        while (uniqueCoupon) {
          couponUndian = await this.commonService.randString(
            5,
            '1234567890',
            '',
          );
          uniqueCoupon = (await this.couponRepository.findOne({
            where: { code: `${prefix + couponUndian}` },
            select: ['id'],
          }))
            ? true
            : false;
        }

        let coupon: Coupon = null;
        let winner: Winner = null;
        let history: History = null;
        let notification: Notification = null;

        const getImageKupon = await this.images({
          hp: user.hp,
          text: prefix + couponUndian,
        });

        coupon = await queryRunner.manager
          .insert(Coupon, {
            code: `${prefix + couponUndian}`,
            serial_number: `${user.hp + '-' + couponUndian}`,
            url: getImageKupon,
          })
          .then((v: any) => v.generatedMaps[0]);

        content = (
          await script.tukarBerry(
            prize.point.toLocaleString(),
            prize.name,
            coupon.url,
          )
        ).kuponUndian;

        if (coupon) {
          await this.UserRepository.createQueryBuilder('users')
            .update()
            .setQueryRunner(queryRunner)
            .set({
              coupon: () => `coupon + ${1}`,
              updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .where('id = :id', { id: user.id })
            .execute();
        }

        winner = await queryRunner.manager
          .insert(Winner, {
            prizeId: prizeId,
            masterBrandId: '66b71d06-d996-4cf0-83d1-522de2c6a3a9',
            account_number: user.hp,
            userId: user.id,
            type: 5,
            code_topup: '',
            couponId: coupon.id,
            status: 2,
          })
          .then((v: any) => v.generatedMaps[0]);

        history = await queryRunner.manager
          .insert(History, {
            coupon: coupon.code,
            entriesId: null,
            winnerId: winner.id,
            point: -totalPointWillRedeem,
            type: 4,
            userId: user.id,
            userRankPeriodeId: getUserRankPeriode.id,
            desc: history_desc,
            status: 1,
          })
          .then((v: any) => v.generatedMaps[0]);

        notification = await queryRunner.manager
          .insert(Notification, {
            userId: user.id,
            title: prize.name,
            prizeId: prizeId,
            content: content,
            data: '',
          })
          .then((v: any) => v.generatedMaps[0]);

        resSuccess.title = resSuccess.title.replace(
          '{{1}}',
          `${prize.point.toLocaleString()}`,
        );
        resSuccess.messageBody = resSuccess.messageBody.replace(
          '{{1}}',
          `${prize.picture}`,
        );
        resSuccess.footer = resSuccess.footer.replace(
          '{{1}}',
          `${prize.textUrl}`,
        );
        await queryRunner.commitTransaction();
        return {
          data: {
            title: resSuccess.title,
            message: resSuccess.messageBody,
            footer: resSuccess.footer,
          },
        };
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (!error?.response || !error?.status) {
        throw new InternalServerErrorException('Internal Server Error');
      }
      throw new HttpException(error?.response, error?.status);
    } finally {
      await queryRunner.release();
    }
  }

  async getHistoryRedeem(user) {}

  async myCoupon(user) {
    const mineCoupon = `select COUNT(1) from winner w where w."userId" = ${user.id} and "couponId" notnull`;
    const execute = await this.winnerRepository.query(mineCoupon, []);

    return {
      data: {
        count: parseInt(execute[0].count),
      },
    };
  }

  async updateUser(params: UserUpdateDTO, user) {
    const { dataEdit, field } = params;
    if (field === 'picture') {
      const filename = `${moment().unix()}${await this.commonService.randString(
        10,
        '1234567890QWERTYUIOPLKJHGFDSAZXCVBNM',
        '',
      )}.jpg`;
      let picture = await this.commonService.base64ToFile(
        dataEdit,
        `/profilepic/${user.hp}`,
        filename,
      );
      await this.UserRepository.update({ id: user.id }, { picture });
    }
  }

  async images(param: ImageString) {
    try {
      // Generate string acak untuk nama file
      const { urlCoupon, kuponUndian } =
        await this.commonService.generalParameter();

      const image = await loadImage(kuponUndian);

      const canvas = createCanvas(image.width, image.height);
      const context = canvas.getContext('2d');

      // Gambar gambar asli di canvas
      context.drawImage(image, 0, 0);

      // Atur font (Helvetica)
      context.font = '190px Helvetica';
      context.fillStyle = 'black'; // Warna teks
      context.textAlign = 'center'; // Teks rata tengah

      // Posisi teks di tengah gambar
      const x = 2880;
      const y = 1800;

      // Tambahkan teks
      context.fillText(param.text, x, y);

      // Simpan hasil ke file
      const buffer = canvas.toBuffer('image/jpeg');
      const urlPath = `${urlCoupon}/${param.hp}-${param.text}.jpg`;
      fs.writeFileSync(
        `${appRoot}/../public/coupon/${param.hp}-${param.text}.jpg`,
        buffer,
      );

      console.log('Teks berhasil ditambahkan dengan font Helvetica!');
      return urlPath;
    } catch (error) {
      console.error('Gagal menambahkan teks ke gambar:', error);
    }
  }
}
