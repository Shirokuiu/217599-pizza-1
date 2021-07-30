import axios from "src/plugins/axios";
import JWTService from "src/services/JWTService";

export default class AuthApiService {
  setAuthHeader() {
    const token = JWTService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(body) {
    const { data } = await axios.post("/login", body);

    return data;
  }

  async logout() {
    const { data } = await axios.delete("/logout");

    return data;
  }

  async getMe() {
    const { data } = await axios.get("/whoAmI");

    return data;
  }
}
