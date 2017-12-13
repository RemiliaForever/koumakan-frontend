const Index = r => import(/* webpackChunkName: "index" */ 'views/index')
const Article = r => import(/* webpackChunkName: "article" */ 'views/article')
const NotFound = r => import(/* webpackChunkName: "notfound" */ 'views/notfound')

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
