import Vue from 'vue'
import Router from 'vue-router'
import config from 'app/app.json'

let routes = [];

// 创建tab页面子路由列表
let tabBar = [];
config.barPages.forEach(page => {
  tabBar.push({
    path: page.router,
    name: page.router,
    component: require(`app/${page.path}`).default
  })
});

// 创建tab页面路由
let tabRouter = {
  path: '/',
  component: require(`../components/TabCon`).default ,
  redirect: tabBar[0].path,
  children: tabBar
}

// 添加tab页面路由到路由配置列表
routes.push(tabRouter);

// 添加其他页面路由
let pages = config.pages.concat([config.commonPage])
pages.forEach(page => {
  routes.push({
    path: page.router,
    name: page.router,
    component: require(`app/${page.path}`).default
  })
});

Vue.use(Router)

export default new Router({
  routes: routes
})
