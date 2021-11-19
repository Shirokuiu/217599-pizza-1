import axiosInstance from "axios";

const axios = axiosInstance.create({
  baseURL: "http://localhost:3000/",
});

axios.interceptors.response.use(
  (res) => res,
  (e) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";

    console.error(e?.response?.data?.error?.message || defaultMessage);

    return Promise.reject(e?.response);
  }
);

export { axios };
