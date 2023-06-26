import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'users',
        component: () => import('../modules/Users/UsersPage.vue')
    },
    {
        path: '/user-info/:id',
        name: 'user-info',
        component: () => import('../modules/Users/UserInformation.vue')
    },
    {
        path: '/user-creation',
        name: 'user-creation',
        component: () => import('../modules/Users/UserCreation.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
  
export default router