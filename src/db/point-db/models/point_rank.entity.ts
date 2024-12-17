import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {number, object} from 'joi';
import {Document} from 'mongoose';


export type PointRankDocument = PointRank & Document;


export class User {
    id: number
    name: string
    sender: string
    ktp: string
    image: string
    city: string
}
let user = {
    id: {type: Number},
    name: {type: String},
    sender: {type: String},
    ktp: {type: String},
    image: {type: String},
    city: {type: String},
}

export class UserRank {
    rankNumber: string
    point: number
    user: User
}

let userRank = {
    rankNumber: {type: String},
    point: {type: Number},
    user: {type: user}

}

@Schema({collection: "point_rank", timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
export class PointRank {
    @Prop({default: 0})
    status: number;

    @Prop({default: ""})
    year_month: string

    @Prop({type: [userRank], default: []})
    user_rank: UserRank[]

    @Prop({default: 0})
    is_delete: number;

    @Prop({default: 0})
    deleted_at: Date;

    @Prop({default: null})
    created_at: Date;

    @Prop({default: null})
    updated_at: Date;
}

export const PointRankSchema = SchemaFactory.createForClass(PointRank)
