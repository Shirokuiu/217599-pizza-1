import axios from "src/plugins/axios";

export default class AddressApiService {
  #resources;

  constructor(resources) {
    this.#resources = resources;
  }

  addAddress(body) {
    return axios.post(this.#resources, body);
  }

  async getAddresses() {
    const { data } = await axios.get(this.#resources);

    return data;
  }
}
