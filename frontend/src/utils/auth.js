export class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async handleRegistration({ email, password }) {
    const response = await fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this._headers,
      },
      body: JSON.stringify({ email, password }),
    });
    return this._handleResponse(response);
  }

  async handleLogIn({ email, password }) {
    const response = await fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this._headers,
      },
      body: JSON.stringify({ email, password }),
    });
    return this._handleResponse(response);
  }

  async getJwt(jwt) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
    });
    return this._handleResponse(response);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("Произошла ошибка"));
  }
}

const auth = new Auth({
  baseUrl: "api.ryangosling.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
