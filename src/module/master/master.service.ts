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

import * as moment from 'moment';
import { ScriptConfigService } from '@common/config/script/config.service';
import { MainDbConfigService } from '@common/config/db/config.service';
import { CouponDbService } from 'src/db/coupon-db/coupon-db.service';

import { CouponDBModel } from 'src/db/coupon-db/interfaces/model.interface';
import { PrizeRepository } from 'src/models/prize/prize.repository';
import { HistoryRepository } from 'src/models/history/history.repository';
import { FaqRepository } from 'src/models/faq/faq.repository';
import { NewsRepository } from 'src/models/news/news.repository';
import { TncRepository } from 'src/models/tnc/tnc.repository';
import { PointDBModel } from 'src/db/point-db/interfaces/model.interface';
import { PointDbService } from 'src/db/point-db/point-db.service';
import { UserRank } from 'src/db/point-db/models/point_rank.entity';
import { NotificationRepository } from 'src/models/notification/notification.repository';
import {
  ListUserRankDTO,
  MasterDTO,
  PaginateDTO,
  PrizeDTO,
} from 'src/dto/master.dto';
import { UserRankPeriodeRepository } from 'src/models/user_rank_periode/user-rank_periode.repository';
import { Not } from 'typeorm';
import { UserRankRepository } from 'src/models/user_rank/user-rank.repository';
import { CacheService } from '../cache/cache.service';
import { UserRankPeriode } from 'src/models/user_rank_periode/user-rank_periode.entity';
import { TopicRepository } from 'src/models/topic/topic.repository';

@Injectable()
export class MasterService {
  private readonly couponDBModel: CouponDBModel;
  private readonly pointDBModel: PointDBModel;

  constructor(
    private readonly commonService: CommonService,
    private readonly appConfigService: AppConfigService,
    private readonly scriptService: ScriptConfigService,
    private readonly couponDBService: CouponDbService,
    private readonly pointDBService: PointDbService,
    private readonly mainDbConfigService: MainDbConfigService,
    private cacheService: CacheService,
  ) {
    this.couponDBModel = this.couponDBService.getCouponDbModels();
    this.pointDBModel = this.pointDBService.getPointDbModels();
  }

  @InjectRepository(FaqRepository)
  private faqRepository: FaqRepository;

  @InjectRepository(NewsRepository)
  private newsRepository: NewsRepository;

  @InjectRepository(TncRepository)
  private tncRepository: TncRepository;

  @InjectRepository(HistoryRepository)
  private historyRepository: HistoryRepository;

  @InjectRepository(NotificationRepository)
  private notificationRepository: NotificationRepository;

  @InjectRepository(PrizeRepository)
  private prizeRepository: PrizeRepository;

  @InjectRepository(UserRepository)
  private userRepository: UserRepository;

  @InjectRepository(UserRankPeriodeRepository)
  private userRankPeriodeRepository: UserRankPeriodeRepository;

  @InjectRepository(UserRankRepository)
  private userRankRepository: UserRankRepository;

  @InjectRepository(TopicRepository)
  private topicRepository: TopicRepository;

  private sesorName(name: string) {
    return name
      .split('')
      .map((v, i) => {
        if (i % 2 !== 0 && v !== ' ') {
          v = '*';
        }
        return v;
      })
      .join('');
  }

  async faq(param: MasterDTO) {
    return this.faqRepository.find({ where: { type: param.type, status: 1 } });
  }

  async news() {
    let berita: any = await this.newsRepository.find({
      where: { status: 1 },
      order: { sort: 'ASC' },
    });

    berita = berita.map((v) => {
      v.created_at = moment(v.created_at)
        .locale('ID')
        .format('DD MMMM YYYY || HH:mm');

      return v;
    });

    return berita;
  }

  async newsDetail(id: number) {
    let berita: any = await this.newsRepository.findOne({
      where: { status: 1, id },
    });

    berita.created_at = moment(berita.created_at)
      .locale('ID')
      .format('DD MMMM YYYY || HH:mm');

    return berita;
  }

  async tnc(param: MasterDTO) {
    return this.tncRepository.find({ where: { status: 1, type: param.type } });
  }

  async periode() {
    return this.userRankPeriodeRepository
      .createQueryBuilder('user_rank_periode')
      .select([
        'user_rank_periode.description AS label',
        'user_rank_periode.id AS value',
      ])
      .getRawMany();
  }

  async generateUserRank() {
    const dateSub = moment().subtract(1, 'day').endOf('month').endOf('day');
    const yearMonth = dateSub.format('YYYYMM');
    const rcvdTime = dateSub.format('YYYY-MM-DD');
    const existUserRank = await this.pointDBModel.PointRank.PointRank.findOne({
      year_month: yearMonth,
    });
    if (!existUserRank) {
      const histories = await this.historyRepository
        .createQueryBuilder('history')
        .innerJoin('history.user', 'user')
        .innerJoin('history.entries', 'entries')
        .select('SUM(history.point)', 'point')
        .addSelect('user.fullname', 'fullname')
        .addSelect('user.picture', 'image')
        .addSelect('user.hp', 'hp')
        .addSelect('user.identity', 'ktp')
        .addSelect('user.regency_ktp', 'regency')
        .addSelect('user.id', 'userId')
        .where("to_char(entries.rcvd_time,'YYYY-MM-DD')<= :rcvdTime", {
          rcvdTime,
        })
        .groupBy('user.id')
        .orderBy('point', 'DESC')
        .getRawMany();
      let userRank: UserRank[] = [];
      for (let index = 0; index < histories.length; index++) {
        let { point, fullname, hp, ktp, userId, image, regency } =
          histories[index];
        point = +point || 0;
        userRank.push({
          rankNumber: `${index + 1}`,
          user: {
            id: userId,
            image,
            ktp,
            name: fullname,
            sender: hp,
            city: regency,
          },
          point,
        });
        // this.userRepository.update({id: userId}, {point})
      }

      await this.pointDBModel.PointRank.PointRank.insertMany([
        {
          status: 0,
          user_rank: userRank,
          year_month: yearMonth,
          is_delete: 0,
        },
      ]);
    }
  }

  async notification(user, param: PaginateDTO) {
    let { page, rowPerPage } = param;

    const getCountAll = await this.notificationRepository.count({
      where: { userId: user.id },
    });
    const pagination = await this.commonService.pagination(
      page,
      rowPerPage,
      getCountAll,
    );
    const getNotification = await this.notificationRepository.query(
      `SELECT * from notification where "userId" = ${user.id} ORDER BY created_at desc ${pagination.query} `,
      [],
    );

    const count = await this.notificationRepository.count({
      where: { status: 0, userId: user.id },
    });
    return {
      data: {
        data: getNotification,
        totalData: pagination.totalData,
        totalPage: pagination.totalPage,
        dataPerPage: pagination.dataPerPage,
        countUnread: count,
      },
    };
  }

  async notificationDetail(user, id: number) {
    return this.notificationRepository.findOne({
      where: { id, userId: user.id },
    });
  }

  async listRank(user, param: ListUserRankDTO) {
    let { limit, showMe } = param;
    showMe = +showMe || 0;
    limit = +limit || 5;
    const topFivePointRank =
      await this.pointDBModel.PointRank.PointRank.findOne(
        { status: 0 },
        { year_month: 1, updated_at: 1, user_rank: { $slice: limit } },
        { sort: { year_month: -1 } },
      );
    const yearMonthLast = topFivePointRank?.year_month || '';
    let userRankLastMonth = topFivePointRank?.user_rank || [];
    const yourLastRank = await this.pointDBModel.PointRank.PointRank.findOne(
      { status: 1, year_month: yearMonthLast },
      { year_month: 1, user_rank: { $elemMatch: { 'user.id': user.id } } },
    );

    const yourCurrentRank = await this.pointDBModel.PointRank.PointRank.findOne(
      { year_month: yearMonthLast },
      { user_rank: { $elemMatch: { 'user.id': user.id } } },
    );

    const userRankNumber = +yourLastRank?.user_rank?.[0]?.rankNumber || 0;
    const yourRank = yourLastRank?.user_rank?.[0];
    if (userRankNumber > 0 && userRankNumber <= limit) {
      userRankLastMonth[userRankNumber - 1].user.name = 'Kamu';
    }

    if (yourLastRank && showMe === 1 && userRankNumber > limit) {
      userRankLastMonth.push({
        rankNumber: userRankNumber > 99 ? '>99' : `${userRankNumber}`,
        user: {
          id: user.id,
          image: user.picture,
          ktp: user.identity,
          name: 'Kamu',
          sender: user.hp,
          city: user.regency,
        },
        point: yourRank.point,
      });
    }
    for (let index = 0; index < userRankLastMonth.length; index++) {
      userRankLastMonth[index].rankNumber =
        userRankLastMonth[index].rankNumber.toString();
      userRankLastMonth[index].user.image = user.picture || '';
      userRankLastMonth[index].user.name =
        userRankLastMonth[index].user.id === user.id
          ? userRankLastMonth[index].user.name
          : this.sesorName(userRankLastMonth[index].user.name);
    }

    return {
      year: moment(yearMonthLast, 'YYYYMM').isValid()
        ? moment(yearMonthLast, 'YYYYMM').format('YYYY')
        : moment().format('YYYY'),
      month: moment(yearMonthLast, 'YYYYMM').isValid()
        ? moment(yearMonthLast, 'YYYYMM').locale('ID').format('MMMM')
        : moment().locale('ID').format('MMMM'),
      lastUpdate: topFivePointRank
        ? moment(topFivePointRank?.updated_at)
            .locale('ID')
            .format('DD MMMM YYYY | HH:mm')
        : '',
      userRank: userRankLastMonth,
      yourRank: yourCurrentRank.user_rank[0].rankNumber,
    };
  }

  async listRank2(user, param: ListUserRankDTO) {
    let { limit, showMe } = param;
    let yourRankNumber = 0;
    let userRankLastMonth: UserRank[] = [];
    let lastPeriode = '';
    showMe = +showMe || 0;
    limit = +limit || 5;

    const nowYM = moment().format('YYYY-MM');

    let userRankPeriode: UserRankPeriode;
    const cacheKeyPeriode = 'userRankPeriode';
    await this.cacheService.delete(cacheKeyPeriode);
    const cachePeriodeData = await this.cacheService.get(cacheKeyPeriode);
    if (cachePeriodeData && cachePeriodeData.length > 2) {
      userRankPeriode = JSON.parse(cachePeriodeData);
    }

    if (!cachePeriodeData || cachePeriodeData.length === 2) {
      userRankPeriode = await this.userRankPeriodeRepository
        .createQueryBuilder('user_rank_periode')
        .select(['user_rank_periode.id', 'user_rank_periode.periode'])
        .where(
          `TO_CHAR(CAST(user_rank_periode.periode AS DATE), 'YYYY-MM') <= :time 
     AND TO_CHAR(CAST(user_rank_periode.periode_end AS DATE), 'YYYY-MM') >= :time 
     AND user_rank_periode.status = 1`,
          {
            time: nowYM,
          },
        )
        .orderBy('user_rank_periode.periode', 'DESC')
        .limit(1)
        .getOne();

      if (userRankPeriode) {
        await this.cacheService.set(
          cacheKeyPeriode,
          JSON.stringify(userRankPeriode),
          86400,
        );
      }
    }

    let allUserRank: any;
    const cacheKey = 'userRank';
    await this.cacheService.delete(cacheKey);
    const cachedData = await this.cacheService.get(cacheKey);
    if (cachedData && cachedData.length > 2) {
      allUserRank = JSON.parse(cachedData);
    }

    if (!cachedData || cachedData.length == 2) {
      allUserRank = await this.userRankRepository
        .createQueryBuilder('userRank')
        .innerJoin('userRank.user', 'users')
        .innerJoin('userRank.userRankPeriode', 'userRankPeriode')
        .where(
          'userRank.userRankPeriodeId = :periodeId AND userRankPeriode.status = 1',
          {
            periodeId: userRankPeriode?.id || 0,
          },
        )
        .select('userRank.point', 'point')
        .addSelect('userRank.rank', 'rank')
        .addSelect('users.regency_ktp', 'regency')
        .addSelect('users.id', 'userId')
        .addSelect('users.identity', 'identity')
        .addSelect('users.fullname', 'fullname')
        .addSelect('users.hp', 'hp')
        .addSelect('users.picture', 'picture')
        .limit(limit)
        .orderBy('userRank.rank', 'ASC')
        .getRawMany();

      await this.cacheService.set(cacheKey, JSON.stringify(allUserRank), 86400);
    }
    const userRank = allUserRank.slice(0, limit);
    lastPeriode = userRankPeriode?.periode || '';

    const yourLastRank = await this.userRankRepository
      .createQueryBuilder('userRank')
      .innerJoin('userRank.user', 'users')
      .where(
        'userRank.userRankPeriodeId = :periodeId AND userRank.userId = :userId',
        {
          periodeId: userRankPeriode?.id || 0,
          userId: user.id,
        },
      )
      .select('userRank.point', 'point')
      .addSelect('userRank.rank', 'rank')
      .addSelect('users.regency', 'regency')
      .addSelect('users.id', 'userId')
      .addSelect('users.identity', 'identity')
      .addSelect('users.fullname', 'fullname')
      .addSelect('users.hp', 'hp')
      .addSelect('users.picture', 'picture')
      .getRawOne();
    // const yourLastRank = allUserRank.find((v) => v.userId === user.id);

    yourRankNumber = +yourLastRank?.rank || 0;
    // if (yourRankNumber > 0 && yourRankNumber <= limit) {
    //   userRank[yourRankNumber - 1].fullname = 'Kamu';
    // }

    if (yourLastRank && showMe === 1 && yourRankNumber > limit) {
      userRank.push({
        ...yourLastRank,
        // user: {
        //   ...yourLastRank.user,
        // },
      });
    }

    for (let index = 0; index < userRank.length; index++) {
      const { point, rank } = userRank[index];
      const rankUser = userRank[index];
      userRankLastMonth.push({
        point,
        rankNumber: `${rank > 99 ? '>99' : rank}`,
        user: {
          city: rankUser.regency,
          id: rankUser.userId,
          image: rankUser.picture,
          ktp: rankUser.identity,
          name:
            user.id === rankUser.userId
              ? rankUser.fullname
              : this.sesorName(rankUser.fullname),
          sender: rankUser.hp,
        },
      });
    }

    return {
      year: moment(lastPeriode, 'YYYY-MM').isValid()
        ? moment(lastPeriode, 'YYYY-MM').format('YYYY')
        : moment().format('YYYY'),
      month: moment(lastPeriode, 'YYYY-MM').isValid()
        ? moment(lastPeriode, 'YYYY-MM').locale('ID').format('MMMM')
        : moment().locale('ID').format('MMMM'),
      lastUpdate: userRankPeriode
        ? moment(lastPeriode, 'YYYY-MM')
            .endOf('months')
            .endOf('day')
            .locale('ID')
            .format('DD MMMM YYYY | HH:mm')
        : '',
      userRank: userRankLastMonth,
      yourRank: userRankLastMonth.length > 0 ? yourLastRank.rank : '',
    };
  }

  async updateRank() {
    // Step 1: Fetch all active user ranks
    const users = await this.userRankRepository.find({
      where: { status: 1, is_deleted: 0 },
      select: ['id', 'point', 'rank'],
    });

    // Step 2: Sort users by points in descending order
    const sortedUsers = users.sort((a, b) => b.point - a.point);

    // Step 3: Reassign ranks based on sorted position
    for (let i = 0; i < sortedUsers.length; i++) {
      sortedUsers[i].rank = i + 1; // Rank starts from 1
    }

    // Step 4: Update the database
    await Promise.all(
      sortedUsers.map((user) =>
        this.userRankRepository.update(user.id, { rank: user.rank }),
      ),
    );

    console.log('Ranks updated successfully');
  }

  async prize(param: PrizeDTO) {
    const conditions: any = { status: 1 };

    // If id is provided, add it to the conditions
    if (param.id) {
      conditions.id = param.id;
    }

    return this.prizeRepository.find({
      where: conditions,
      order: { id: 'ASC' },
    });
  }

  async notificationRead(user, id: number) {
    const exist = await this.notificationRepository.findOne({
      where: { status: 0, id: id },
    });
    if (!exist) {
      throw new BadRequestException(`Notification tidak dapat ditemukan`);
    }

    return this.notificationRepository.update(
      { id: id },
      { status: 1, updatedById: user.id },
    );
  }

  async pointGenerateV2() {
    const lastUserRank = await this.userRankPeriodeRepository
      .find({ order: { periode: 'DESC' }, take: 1 })
      .then((v) => v?.[0] || null);
    const dateSub = lastUserRank
      ? moment(lastUserRank?.periode, 'YYYY-MM').add(1, 'month').endOf('month')
      : moment('2024-10', 'YYYY-MM').endOf('month');
    const yearMonth = dateSub.format('YYYY-MM');
    const rcvdTime = dateSub.format('YYYY-MM-DD');
    const startDate = dateSub.startOf('month').format('YYYY-MM-DD');
    const existUserRank = await this.userRankPeriodeRepository.findOne({
      where: { periode: yearMonth },
    });
    if (!existUserRank) {
      const userRankPeriode = await this.userRankPeriodeRepository
        .insert({ periode: yearMonth, status: 0 })
        .then((v) => v.generatedMaps[0]);
      let userRank: UserRank[] = [];
      const users = await this.userRepository.find({
        select: ['id', 'point', 'fullname', 'regency', 'identity', 'hp'],
      });
      for (let index = 0; index < users.length; index++) {
        const { id, fullname, regency, identity, hp } = users[index];
        const totalPoint = await this.historyRepository
          .createQueryBuilder('history')
          .select('SUM(history.point)', 'point')
          .where('history.userId = :userId', { userId: id })
          .getRawOne()
          .then((v) => +v?.point || 0);
        const pointCutOf = await this.historyRepository
          .createQueryBuilder('history')
          .innerJoin('history.entries', 'entries')
          .select('SUM(history.point)', 'point')
          .where(
            "history.userId = :userId AND (to_char(entries.rcvd_time,'YYYY-MM-DD') BETWEEN :startDate AND :endDate)",
            { userId: id, endDate: rcvdTime, startDate },
          )
          .getRawOne()
          .then((v) => +v?.point || 0);
        if (totalPoint > 0) {
          this.userRepository.update(
            { id, point: Not(totalPoint) },
            { point: totalPoint },
          );
        }
        if (pointCutOf > 0) {
          userRank.push({
            rankNumber: ``,
            user: {
              id,
              image: '',
              ktp: identity,
              name: fullname,
              sender: hp,
              city: regency,
            },
            point: pointCutOf,
          });
        }
      }
      userRank = userRank
        .sort((a, b) => b.point - a.point)
        .map((v, idx) => {
          return { ...v, rankNumber: `${idx + 1}` };
        });
      for (let index = 0; index < userRank.length; index++) {
        const { point, rankNumber, user } = userRank[index];
        await this.userRankRepository.insert({
          rank: +rankNumber,
          userId: user.id,
          point,
          userRankPeriodeId: userRankPeriode?.id || null,
        });
      }
    }
  }

  async topic() {
    return this.topicRepository
      .createQueryBuilder('topic')
      .select(['topic.id AS id', 'topic.title AS name'])
      .getRawMany();
  }
}
