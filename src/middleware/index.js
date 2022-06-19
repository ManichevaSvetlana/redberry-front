import auth from './auth'
import guest from './guest'

export default (router) => {
    auth(router);
    guest(router);
}
