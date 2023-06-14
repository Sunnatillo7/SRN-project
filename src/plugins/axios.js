import axios from "axios"


const http = axios.create({
    baseURL:"http://vm4415096.25ssd.had.wf"
    // baseURL:process.env.VUE_APP_BASE_URL
});

http.interceptors.request.use(
    (config) =>{
        let token = sessionStorage.getItem("token");
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`
        }
        config.headers["Language"] = sessionStorage.getItem("lang");
        config.headers["Accept"] = "application/json";

        return config
    },
    (error) => Promise.reject(error)
)

export default http