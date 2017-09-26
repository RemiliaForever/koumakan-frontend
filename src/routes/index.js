const Index = r => require(['views/index'], r)
const Article = r => require(['views/article'], r)
const NotFound = r => require(['views/notfound'], r)

// 根目录
const rootPath = ''

// 页面路由
const routes = [
    {path: '/', component: Index},
    {path: '/article/:id', component: Article},
    {path: '/:typestring/:param', component: Index},
    {path: '/notfound', component: NotFound}
].map(route => {
    route.path = rootPath + route.path
    return route
})

// 404 页
routes.push({path: '*', redirect: '/notfound'})

export default routes
