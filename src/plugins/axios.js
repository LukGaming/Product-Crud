import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.insecureHTTPParser = true
axios.defaults.withCredentials = false
Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
    }
})
axios.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('userToken');
        if(token){
            config.headers['Authorization'] = 'Bearer '+token
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
);