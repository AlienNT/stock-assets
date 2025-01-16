import {RouteRecordRaw} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Images',
        component: () => import('@/pages/ImagesPage.vue')
    },
    {
        path: '/Images/:id',
        name: 'Image',
        component: () => import('@/pages/ImageDetailPage.vue')
    },
    {
        path: '/videos',
        name: 'Videos',
        component: () => import('@/pages/VideosPage.vue'),
    },
    {
        path: '/videos/:id',
        name: 'Video',
        component: () => import('@/pages/VideoDetailPage.vue')
    },
] as RouteRecordRaw[]

export default routes