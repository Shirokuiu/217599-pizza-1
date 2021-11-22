import { axios } from "@/plugins";

export class AddressService {
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

  async edit(id, body) {
    const { data } = await axios.put(`${this.#resources}/${id}`, body);

    return data;
  }

  async deleteAddress(id) {
    await axios.delete(`${this.#resources}/${id}`);
  }
}
