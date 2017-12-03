const Index = r => import(/* webpackChunkName: "index" */ 'views/index')
const Article = r => import(/* webpackChunkName: "article" */ 'views/article')
const NotFound = r => import(/* webpackChunkName: "notfound" */ 'views/notfound')

// 根目录
const rootPath = ''

// 页面路由
const routes = [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Index},
    {path: '/category/:param', component: Index},
    {path: '/label/:param', component: Index},
    {path: '/archive/:param', component: Index},
    {path: '/search', component: Index},
    {path: '/search/:param', component: Index},
    {path: '/article/:id', component: Article},
    {path: '/admin', component: Index, children: [
        {path: '', component: Index},
        {path: 'login', component: Index}
    ]},
    {path: '/notfound', component: NotFound}
].map(route => {
    route.path = rootPath + route.path
    return route
})

// 404 页
routes.push({path: '*', redirect: '/notfound'})

export default routes
