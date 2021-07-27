import axios from "src/plugins/axios";

export default class MiscApiService {
  #resource;

  constructor(resource) {
    this.#resource = resource;
  }

  async getMisc() {
    const { data } = await axios.get(this.#resource);

    return data;
  }
}
