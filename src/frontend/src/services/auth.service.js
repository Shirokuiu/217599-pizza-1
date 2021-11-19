import { axios } from "@/plugins";
import { JWT } from "@/services/";

export class AuthService {
  setAuthHeader() {
    const token = JWT.getToken();

    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(body) {
    const { data } = await axios.post("login", body);

    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");

    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");

    return data;
  }
}
