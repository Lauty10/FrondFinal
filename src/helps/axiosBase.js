import axios from "axios";

const axiosUrl= axios.create({
    baseURL:`${import.meta.env.VITE_URL_ROCK}`,
})

export const headboard={
    'content-type':'application/json'
    // auth:`Bearer ${token}`
}

export default axiosUrl