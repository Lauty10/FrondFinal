import axios from "axios";

const axiosUrl= axios.create({
    baseURL:`${import.meta.env.VITE_URL_ROCK}`,
})

export default axiosUrl