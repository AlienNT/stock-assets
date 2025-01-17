const path = import.meta.env.BASE_URL;
console.log('path:' + path);
export default {
    BACK: path + 'public/svg/back.svg',
    SEARCH: path + 'public/svg/search-svgrepo-com.svg',
    PLAY: path + 'public/svg/play-svgrepo-com.svg',
    SAVE: path + 'public/svg/diskette-svgrepo-com.svg',
    USER: path + 'public/svg/user-svgrepo-com.svg',
    LIKE: path + 'public/svg/like-svgrepo-com.svg',
    EXPAND: path + 'public/svg/expand1-svgrepo-com.svg',
    DOWNLOAD: path + 'public/svg/download-svgrepo-com.svg',
    VIEWS: path + 'public/svg/look-svgrepo-com.svg'
}