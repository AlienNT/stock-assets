import {createRouter, createWebHashHistory} from "vue-router";
import routes from "@/router/routes.ts";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_URL || '/'),
    routes,
    scrollBehavior: (to, from, savedPosition) => {
        if (import.meta.env.DEV) {
            console.log({ to, from, savedPosition });
        }
        if (savedPosition) {
            setTimeout(() => scrollTo({
                behavior: "smooth",
                top: savedPosition.top,
                left: savedPosition.left
            }), 0)
        }
    },
})
export default router;