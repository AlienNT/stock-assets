export interface AppConfigInterface {
    MOBILE_SCREEN_WIDTH: number,
    IMAGE_LIST_COLUMNS_MAX: number,
    IMAGE_LIST_COLUMNS_MIN: number,
    IMAGE_LIST_GAP: number,
    IMAGE_REQUEST_PER_PAGE: number,
    VIDEO_LIST_COLUMNS_MAX: number,
    VIDEO_LIST_COLUMNS_MIN: number,
    VIDEO_LIST_GAP: number,
    VIDEO_REQUEST_PER_PAGE: number,
}

const appConfig: AppConfigInterface = {
    MOBILE_SCREEN_WIDTH: 768,
    IMAGE_LIST_COLUMNS_MAX: 4,
    IMAGE_LIST_COLUMNS_MIN: 1,
    IMAGE_LIST_GAP: 15,
    IMAGE_REQUEST_PER_PAGE: 20,
    VIDEO_LIST_COLUMNS_MAX: 3,
    VIDEO_LIST_COLUMNS_MIN: 1,
    VIDEO_LIST_GAP: 15,
    VIDEO_REQUEST_PER_PAGE: 10,

}
export default appConfig