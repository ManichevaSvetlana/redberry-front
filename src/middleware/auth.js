export default function auth(router) {
    router.beforeEach(async (to, from, next) => {
        const meta = to.matched.some(record => record.meta.middleware.auth);
        if (!localStorage.getItem('token') && meta) {
            next({name: 'login'});
            return
        }

        next()

    })
}
