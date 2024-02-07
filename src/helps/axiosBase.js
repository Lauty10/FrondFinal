import axios from "axios";

const token=JSON.parse(sessionStorage.getItem("token"))||"";
const axiosUrl= axios.create({
    baseURL:`${import.meta.env.VITE_URL_ROCK}`,
});

export const configToken = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  


export default axiosUrl