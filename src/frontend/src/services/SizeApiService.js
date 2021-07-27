import axios from "src/plugins/axios";

export default class SizeApiService {
  #resourse;

  constructor(resourse) {
    this.#resourse = resourse;
  }

  async getSizes() {
    const { data } = await axios.get(this.#resourse);

    return data;
  }
}
