const ID_TOKEN_KEY = "token";

export class JWT {
  static getToken() {
    return window.localStorage.getItem(ID_TOKEN_KEY);
  }

  static saveToken(token) {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
  }

  static destroyToken() {
    window.localStorage.removeItem(ID_TOKEN_KEY);
  }
}
