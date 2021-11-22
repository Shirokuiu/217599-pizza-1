import { axios } from "@/plugins";

export class IngredientsService {
  #resources;

  constructor(resources) {
    this.#resources = resources;
  }

  async get() {
    const { data } = await axios(this.#resources);

    return data;
  }
}
