export default function guest(router) {
    router.beforeEach(async (to, from, next) => {
        const meta = to.matched.some(record => record.meta.middleware.guest);
        if (localStorage.getItem('token') && meta) {
            next('/');
            return
        }
        next()
    })
}
