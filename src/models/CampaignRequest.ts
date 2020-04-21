import {Document, model, Schema, Types} from 'mongoose';

export interface IEntity {
    title: string;
    requestedAmount: number;
    availedAmount: number;
    currentPrice: string;
    status: string;
}

export interface IDonationEntity {
    title: string;
    amount: number;
}

export interface IThumbnail {
    url: string;
    type: string;
}

export type CampaignRequestModel = Document & {
    title: string;
    subTitle: string;
    entities: IEntity[];
    status: string,
    createdAt: string;
    updatedAt: string;
    creatorId: Types.ObjectId;
    donerIds: Types.ObjectId[];
    groupMemberIds: Types.ObjectId[];
    thumbnails: IThumbnail[];
    description: string;
};

export const entityStatus = {
    INITIATED: 'Initiated',
    AVAILED: 'Availed',
};

export const thumbnailType = {
    IMAGE: 'Image',
    VIDEO: 'Video',
}

export const campaignRequestStatus = {
    INITIATED: 'Initiated',
    AVAILED: 'Availed',
    COMPLETED: 'Completed',
};

export const imageTypes = ['jpeg', 'jpg', 'png', 'gif', 'tiff'];

export const thumbnail = {
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: '',
    },
};

const entity = {
    title: {
        type: String,
        required: true,
    },
    requestedAmount: {
        type: Number,
        required: true,
    },
    availedAmount: {
        type: Number,
        default: 0,
    },
    currentPrice: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: entityStatus.INITIATED,
    },
};

const userRef = {
    type: Schema.Types.ObjectId,
    ref: 'User',
};

const campaignRequestSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        default: '',
    },
    entities: {
        type: [entity],
        default: [],
    },
    status: {
        type: String,
        default: campaignRequestStatus.INITIATED,
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    donerIds: {
        type: [userRef],
        default: [],
    },
    groupMemberIds: {
        type: [userRef],
        default: [],
    },
    thumbnails: {
        type: [thumbnail],
        default: [],
    },
    description: {
        type: String,
        default: '',
    },
}, {timestamps: true});

const CampaignRequest = model<CampaignRequestModel>('CampaignRequest', campaignRequestSchema);

export default CampaignRequest;
