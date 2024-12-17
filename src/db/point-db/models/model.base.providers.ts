import {Connection} from 'mongoose';
import {PointRankSchema} from './point_rank.entity';
import {UserPointSchema} from './user_point.entity';

export const baseModelProviders = [
    {
        provide: "USER_POINT_MODEL",
        useFactory: (connection: Connection) => {
            return {
                UserPoint: connection.model("UserPoint", UserPointSchema),
            };
        },
        inject: ["POINT_DB_CONNECTION"],
    },
    {
        provide: "POINT_RANK_MODEL",
        useFactory: (connection: Connection) => {
            return {
                PointRank: connection.model("PointRank", PointRankSchema),
            };
        },
        inject: ["POINT_DB_CONNECTION"],
    }
]