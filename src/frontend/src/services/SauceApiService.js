import axios from "src/plugins/axios";

export default class SauceApiService {
  #resource;

  constructor(resource) {
    this.#resource = resource;
  }

  async getSauces() {
    const { data } = await axios.get(this.#resource);

    return data;
  }
}
