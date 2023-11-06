import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import GlobalComponent from "./components/my-demo/GlobalComponent.vue"

import './style.css'
import App from './App.vue'


// vue-router

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
const User = { template: '<div>User</div>' }

const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/user/:id",
    component: User
  }

]
//  创建路由实例，并且传递routes配置
const router = createRouter(
  {
    history: createWebHashHistory(),
    routes,
  }
)














// 应用实例
const appInstance = createApp(App);
appInstance.mount("#app");

// 全局组件
appInstance.component("Cust", GlobalComponent);

// 注册VueRouter
appInstance.use(router);


console.log(appInstance);


console.log("main.js run----")
