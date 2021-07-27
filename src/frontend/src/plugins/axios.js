import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
    console.error(e?.response?.data?.error?.message || defaultMessage);
    throw new Error(e);
  }
);

export default axiosInstance;
