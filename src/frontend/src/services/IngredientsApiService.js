import axios from "src/plugins/axios";

export default class IngredientsApiService {
  #resource;

  constructor(resource) {
    this.#resource = resource;
  }

  async getIngredients() {
    const { data } = await axios.get(this.#resource);

    return data;
  }
}
