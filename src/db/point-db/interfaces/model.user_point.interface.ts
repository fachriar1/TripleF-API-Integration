import {Model} from "mongoose";
import {UserPoint} from "../models/user_point.entity";

export interface UserPointModel {
    UserPoint: Model<UserPoint>;
}