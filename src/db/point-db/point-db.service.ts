import {Injectable, Inject} from '@nestjs/common';
import {PointDBModel} from './interfaces/model.interface';
import {PointRankModel} from './interfaces/model.point_rank.interface';
import {UserPointModel} from './interfaces/model.user_point.interface';

@Injectable()
export class PointDbService {
    constructor(
        @Inject("USER_POINT_MODEL") private userPointModel: UserPointModel,
        @Inject("POINT_RANK_MODEL") private pointRankModel: PointRankModel,
    ) {}

    getPointDbModels(): PointDBModel {
        return {
            UserPoint: this.userPointModel,
            PointRank: this.pointRankModel
        }
    }
}
