import axios from 'axios';
import {
    getToken
} from './token' //*导入获取token方法

//克隆axios
let requestQ = axios.create({
    baseURL: 'http://127.0.0.1/heimamm/public', //!基地址
    // headers: { //请求头
    //     token: getToken()
    // }

});

requestQ.interceptors.request.use(function (config) {

        //给每一次放松请求拦截下来后加一个请求头token
        config.headers.token = getToken();
        return config
    },
    err => {
        return Promise.reject(err)
    })


//用户登录
function login_user(url, data) {

    return requestQ({
        url,
        method: 'post',
        data,
        withCredentials: true
    })
}

function get(url) {

    return requestQ({
        url,
        method: 'get',
    })
}

function get_Parmas(url, parmas) {

    return requestQ({
        url,
        method: 'get',
        parmas
    })
}

function post_Data(url, data) {

    return requestQ({
        url,
        method: 'post',
        data
    })
}
class CloudApi {

    login = data => login_user('/login', data);
    getUser = () => get('/info');

}

const api = new CloudApi();


export default api