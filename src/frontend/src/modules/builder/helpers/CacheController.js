export class CacheController {
  #cacheItems = [];
  #DEFAULT_CACHE_CONFIG = {
    cache: true,
  };

  get items() {
    return this.#cacheItems;
  }

  set items(value) {
    this.#cacheItems = value;
  }

  async run(
    { cache, api, normalize } = {
      ...this.#DEFAULT_CACHE_CONFIG,
      api,
      normalize,
    }
  ) {
    if (cache) {
      if (!this.items.length) {
        this.items = normalize(await api());
      }
    } else {
      this.items = normalize(await api());
    }

    return this.items;
  }
}
