import axios from "axios";
import * as dotenv from 'dotenv' 
dotenv.config()
const axiosInstance = axios.create({
   baseURL: 'http://localhost/Food-delivery-app-backend/Api',
});

export default axiosInstance;