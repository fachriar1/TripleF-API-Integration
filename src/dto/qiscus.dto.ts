import { ApiProperty } from "@nestjs/swagger";

export interface IQiscusCred {
    qiscussChannelId: number;
    qiscusAppId: string;
    qiscusSecretKey: string;
}

export class IQiscusBody {
    app_code: string;
    channel_id:	number;
    contacts: IContact[];
    display_phone_number: string;
    messages: IMessage[]
    phone_number_id: string;
    statuses: IStatus[]
}

class IContact {
    profile: {
        name: string;
    }
    wa_id: string
}

class IMessage {
    from: string;
    id: string;
    text: {
        body: string;
    }
    image: IImage;
    timestamp: string;
    type: string;
}

class IImage {
    id: string;
    mime_type: string;
    sha256: string;
    caption: string;
}

class IStatus {
    conversation: {
        expiration_timestamp: string;
        id: string;
    };
    origin: {
        type: string;
    };
    id: string;
    pricing: {
        billable: boolean;
        category: string;
        pricing_model: string;
    };
    recipient_id: string;
    status: string;
    timestamp: string;
}

export interface IPushReply {
    template: string;
    text: string;
    to: string;
    messageId: string;
    from: number;
}

export interface IIncomingMessageQueue {
    sender: string;
    message: string;
    timestamp: string;
    photo: string;
    messageType: string;
    messageId: string;
    display_phone_number: number;
    mediaId: string;
    waName: string;
}

export interface IResultIncomingMessageQueue {
    messageId: string;
    senderFrom: number;
    sender: string;
    media: number;
    timestamp: string;
    message: string;
    reply: string;
}

class IHeader {
    @ApiProperty()
    type: "text" | "document" | "video" | "image"
    @ApiProperty()
    replacementText: string
    @ApiProperty()
    link: string
}

class IBody {
    @ApiProperty()
    replacementText: string
}


export class IPushTemplateParams {
    @ApiProperty()
    to: string
    @ApiProperty()
    templateNameSpace: string
    @ApiProperty()
    templateName: string
    @ApiProperty({type: [IHeader]})
    header: IHeader[]
    @ApiProperty({type: [IBody]})
    body: IBody[]
}

interface IImage {
    link: string
}

interface IVideo {
    link: string
}

interface IDocument {
    link: string
}

interface IParameter {
    type: "text" | "document" | "video" | "image"
    document?: IDocument
    video?: IVideo
    image?: IImage
    text?: string
}

export interface IComponents {
    type: "header" | "body" | "button",
    parameters: IParameter[]
}

export interface IPushTemplateProcessParams {
    to: string
    components: IComponents[]
    templateNameSpace: string
    templateName: string
}
