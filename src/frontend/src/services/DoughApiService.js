import axios from "src/plugins/axios";

export default class DoughApiService {
  #resource;

  constructor(resource) {
    this.#resource = resource;
  }

  async getDoughs() {
    const { data } = await axios.get(this.#resource);

    return data;
  }
}
