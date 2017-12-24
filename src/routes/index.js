const Index = r => import(/* webpackChunkName: "index" */ 'views/index')
const Article = r => import(/* webpackChunkName: "article" */ 'views/article')
const NotFound = r => import(/* webpackChunkName: "notfound" */ 'views/notfound')
const Admin = r => import(/* webpackChunkName: "admin" */ 'views/admin')

// 根目录
const rootPath = ''

// 页面路由
const routes = [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'home', component: Index},
    {path: '/category/:value', name: 'category', component: Index},
    {path: '/label/:value', name: 'label', component: Index},
    {path: '/archive/:value', name: 'archive', component: Index},
    {path: '/search/:value', name: 'search', component: Index},
    {path: '/article/:id', name: 'article', component: Article},
    {path: '/article/10080', component: Index, alias: '/friends'},
    {path: '/article/10081', component: Index, alias: '/about'},
    {path: '/article/10082', component: Index, alias: '/rss'},
    {path: '/admin', component: Admin},
    {path: '/notfound', component: NotFound}
].map(route => {
    route.path = rootPath + route.path
    return route
})

// 404 页
routes.push({path: '*', redirect: '/notfound'})

export default routes
