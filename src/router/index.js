import { createRouter, createWebHashHistory } from "vue-router";

//路由配置 
const router = createRouter({
    //选择hash路由
    history: createWebHashHistory(),
    routes: [
        {
            //默认的根路径跳转至home page
            path: '/',
            redirect: '/home',
        },
        {
            path: '/adminLogin',
            component: ()=> import('../views/AdminLogin.vue') 
        },
        {
            path: '/userLogin',
            component: ()=> import('../views/UserLogin.vue')
        },
        {
            path: '/home',
            component: ()=> import('../views/Home.vue')
        },
        {
            path: '/player',
            component: ()=> import('../views/Player.vue')
        },
        {
            path: '/adminPage',
            component: ()=> import('../views/AdminPage.vue')
        }
    ]
})

export default router;