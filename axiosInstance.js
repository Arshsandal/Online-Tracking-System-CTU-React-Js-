import axios from "axios";
const instance = axios.create({
    baseURL:"http://localhost:5000/",
    timeout:1000,
})
instance.interceptors.request.use(
    async(config) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config
        } catch (error) {
            console.error("Request Error: ", error);
        }
    }
)
instance.interceptors.response.use(
    (response) => {
        console.log("Response Data: ", response);
        return response
    },
    (error) => {
        console.error("Response Error: ", error);
    }
)

export default instance