import {
    BaseHitInterface,
    BaseRequestInterface,
    BaseResponseInterface,
    ColorsType,
    ImageType
} from "./BasicTypes.ts";


export interface ImageRequestInterface extends BaseRequestInterface{
    image_type?: ImageType,
    orientation?: OrientationType,
    colors?: ColorsType,

}

export interface ImageHitInterface extends BaseHitInterface{
    previewURL?: string,
    webformatURL?: string,
    largeImageURL?: string,
    previewWidth?: number,
    previewHeight?: number,
    webformatHeight?: number,
    webformatWidth?: number,
    imageWidth?: number,
    imageHeight?: number,
    imageSize?: number
}
export type ImageResponseInterface = BaseResponseInterface<ImageHitInterface>