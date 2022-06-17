import { createRouter, createWebHistory } from 'vue-router'
import base from '@/router/base'

const routes = [
    base, {
        path: '/:pathMatch(.*)*'
            // redirect: '/error/404'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    base: process.env.BASE_URL,
    routes
})

export default router