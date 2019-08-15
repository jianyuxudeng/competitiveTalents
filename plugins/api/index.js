import axios from 'axios';
import { async } from 'q';

const netWork = (()=>{
    const update = (obj) => {
        const  instance = axios.create({
            baseURL: 'http://api.es-career.com/api/',
            timeout:20000,
            withCredentials: true
        });
        instance.interceptors.request.use((request)=>{
            // 在发送请求之前做些什么
            return request;
        }, (error) => {
            // 对请求错误做些什么
            console.log(error)
        });
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            if(response.data.retcode===409){
                window.location.href='/login';
            }
            return response;
          }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
          });
        return instance;
    };
    return{
        post: async (url,data,obj)=>{
            try{
                const res = await update(obj).post(url,data);
                if(!res.data.retcode){
                    return res.data
                }else{
                    return res.data
                }
            }catch(error) {
                console.log(error);
            };
        },
        get: async (url,params,obj)=>{
            try{
                const res = await update(obj).get(url,{params});
                if(!res.data.retcode){
                    return res.data
                }else{
                    return res.data
                }
            }catch(error) {
                console.log(error);
            };
        },
        put: async (url,data,obj)=>{
            try{
                const res = await update(obj).put(url,data);
                if(!res.data.retcode){
                    return res.data
                }else{
                    return res.data
                }
            }catch(error) {
                console.log(error);
            };
        },
        delete: async (url,params,obj)=>{
            try{
                const res = await update(obj).delete(url,{params});
                if(!res.data.retcode){
                    return res.data
                }else{
                    return res.data
                }
            }catch(error) {
                console.log(error);
            };
        },
        snatch: async (url,method,data,obj)=>{
            try{
                const res = await update(obj)({
                    method,
                    url,
                    data
                });
                if(!res.retcode){
                    return res
                }else{
                }
            }catch(error) {
                console.log(error);
            };
        }
    } 
})();

export default netWork;