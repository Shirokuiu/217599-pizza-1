import { axios } from "@/plugins";

export class SaucesService {
  #resources;

  constructor(resources) {
    this.#resources = resources;
  }

  async get() {
    const { data } = await axios.get(this.#resources);

    return data;
  }
}
