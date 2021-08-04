import axios from "src/plugins/axios";

export default class OrdersApiService {
  #resources;

  constructor(resources) {
    this.#resources = resources;
  }

  async addOrder(body) {
    return await axios.post(this.#resources, body);
  }
}
