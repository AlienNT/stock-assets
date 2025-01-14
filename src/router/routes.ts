import {RouteRecordRaw} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/ImagesPage.vue')
    },
    {
        path: '/videos',
        name: 'Videos',
        component: () => import('@/pages/VideosPage.vue')
    }
] as RouteRecordRaw[]

export default routes