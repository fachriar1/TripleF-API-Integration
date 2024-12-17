import {PointRankModel} from "./model.point_rank.interface";
import {UserPointModel} from "./model.user_point.interface"

export interface PointDBModel {
    UserPoint: UserPointModel
    PointRank: PointRankModel
}