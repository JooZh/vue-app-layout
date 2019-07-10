import VnodeCache from './vnode-cache.js'
function install (Vue,bus,tabbar){
  // vnode-cache 组件
  Vue.component('vnode-cache', VnodeCache(bus, tabbar))

  Vue.prototype.$vueAppEffect = {
    on: (event, callback) => {
      bus.$on(event, callback)
    },
    back: ()=>{
      window.$VueAppEffect.paths.pop()
      window.vm.$router.replace({
        name: window.$VueAppEffect.paths.concat([]).pop()
      })
    },
    backTo: (options)=>{
      //
    },
    next: (options)=>{
      let newPath = options.path
      let routeName = '/'+ newPath.split('/')[1]
      // console.log(routeName)
      // 找出匹配的重复使用组件
      let route = window.vm.$router.options.routes.find(item => {
        return item.path === routeName
      })
      let newRoute = [{
        path: newPath,
        name: newPath,
        component: {extends: route.component}
      }]

      // 判断路由是否存在
      let find = window.vm.$router.options.routes.findIndex(item => {
        return item.path === newPath
      })
      // 不存在 添加一个新路由
      if (find === -1) {
        window.vm.$router.options.routes.push(newRoute[0])
        window.vm.$router.addRoutes(newRoute)
      }
      // 然后跳转
      window.vm.$router.replace({
        name: newPath,
        params: options.params
      })
    }
  }
}

export default install
