import Vue from 'vue'
import Router from 'vue-router'

// Lazy Loading
const Dashboard = resolve => require(['@/components/Dashboard'], resolve)
const DomainList = resolve => require(['@/components/DomainList'], resolve)
const Help = resolve => require(['@/components/Help'], resolve)
const E404 = resolve => require(['@/components/404'], resolve)

Vue.use(Router)

let mRoutes = []
mRoutes.push({ path: '/', name: 'Dashboard Home', component: Dashboard })
mRoutes.push({ path: '/domains', name: 'Domain List', component: DomainList })
mRoutes.push({ path: '/help', name: 'VPS Panel Help & Support', component: Help })
mRoutes.push({ path: '*', name: 'Error 404', component: E404 })

// create the router
let mRouter = new Router({
  routes: mRoutes,
  mode: 'history'
})

mRouter.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})

// FINALLY EXPORT THE ROUTER WHITH ROUTES
export default mRouter
