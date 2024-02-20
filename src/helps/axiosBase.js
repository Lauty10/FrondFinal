
import axios from "axios";


const axiosUrl= axios.create({
    baseURL:`${import.meta.env.VITE_URL_ROCK}`,
});

export const configToken = (token) => {
  if (!token) {
    return {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } else {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    };
  }
};



export default axiosUrl