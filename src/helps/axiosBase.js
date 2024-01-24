import axios from "axios";

const token=sessionStorage.getItem('token')||[]
console.log(token)
const axiosUrl= axios.create({
    baseURL:`${import.meta.env.VITE_URL_ROCK}`,
});

axios.defaults.headers.common['auth']=`Bearer ${token}`

export const headboard={
    'content-type':'application/json',
};

export default axiosUrl