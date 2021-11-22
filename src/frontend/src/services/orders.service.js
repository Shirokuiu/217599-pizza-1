import { axios } from "@/plugins";

export class OrdersService {
  #resources;

  constructor(resources) {
    this.#resources = resources;
  }

  async get() {
    const { data } = await axios.get(this.#resources);

    return data;
  }

  async post(body) {
    const { data } = await axios.post(this.#resources, body);

    return data;
  }

  async deleteOrder(id) {
    const { data } = await axios.delete(`${this.#resources}/${id}`);

    return data;
  }
}
