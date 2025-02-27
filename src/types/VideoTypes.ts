import {BaseHitInterface, BaseRequestInterface, BaseResponseInterface, VideoType} from "./BasicTypes.ts";

export interface VideoResponseFieldsInterface {
    url: string,
    width: number,
    height: number,
    size: number,
    thumbnail: string
}

export interface VideoRequestInterface extends BaseRequestInterface {
    video_type?: VideoType
}

export interface VideoHitVideosInterface {
    large?: VideoResponseFieldsInterface,
    medium?: VideoResponseFieldsInterface,
    small?: VideoResponseFieldsInterface,
    tiny?: VideoResponseFieldsInterface,
}

export interface VideoHitInterface extends BaseHitInterface {
    type: VideoType,
    tags: string,
    duration: number,
    videos: VideoHitVideosInterface
}

export type VideoResponseInterface = BaseResponseInterface<VideoHitInterface>