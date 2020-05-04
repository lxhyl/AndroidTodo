import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//登陆
import login from '../components/login.vue'
//主页
import home from '../components/home.vue'
//全部任务
import task from "../components/task.vue"
// 宠物
import pet from "../components/pet.vue"
// 龙
import drag from "../components/drag.vue"
//商店
import shop from "../components/shop.vue"
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'hash',
  
    routes: [
        {
            path:'/',
            name:'login',
            component:login
        },
        {
            path:'/home',
            name:'home',
            component:home
        },
        {
            path:'/task',
            name:'task',
            component:task
        },
        {
            path:'/pet',
            name:'pet',
            component:pet
        },
        {
            path:'/drag',
            name:'drag',
            component:drag
        },
        {
            path:'/shop',
            name:'shop',
            component:shop
        }
    ],

})