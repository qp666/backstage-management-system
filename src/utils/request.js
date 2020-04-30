import axios from 'axios';
import {
    getToken
} from './token' //*导入获取token方法

//克隆axios
let requestQ = axios.create({
    baseURL: process.env.VUE_APP_URL, //!基地址
    // headers: { //请求头
    //     token: getToken()
    // }
    withCredentials: true //在vue中加这段话解决跨域

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
// function login_user(url, data) {

//     return requestQ({
//         url,
//         method: 'post',
//         data,

//     })
// }

function get(url) {

    return requestQ({
        url,
        method: 'get',
    })
}

function get_Params(url, params) {

    return requestQ({
        url,
        method: 'get',
        params
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

    //登录
    login = data => post_Data('/login', data);
    //获取用户信息
    getUser = () => get('/info');
    //注册
    register = data => post_Data('/register', data);
    //获取注册验证码
    register_note = data => post_Data('/sendsms', data);
    //获取学科列表
    subject_list = params => get_Params('/subject/list', params);

}

const api = new CloudApi();


export default api