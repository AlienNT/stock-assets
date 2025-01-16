import {createRouter, createWebHistory} from "vue-router";
import routes from "@/router/routes.ts";

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
    routes,
})

export default router;