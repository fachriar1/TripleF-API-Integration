import {Model} from "mongoose";
import {PointRank} from "../models/point_rank.entity";

export interface PointRankModel {
    PointRank: Model<PointRank>;
}