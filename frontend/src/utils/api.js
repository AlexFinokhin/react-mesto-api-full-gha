export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _request(url, options) {
    const response = await fetch(url, options);
    return this._checkResponse(response);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Произошла ошибка");
  }

  // проблемный лайк
  async changeLikeCardStatus(isLiked, cardId) {
    const method = isLiked ? "DELETE" : "PUT";
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...this._headers,
      },
    };
    return await this._request(url, options);
  }

  async getCurrentUserInfo() {
    const url = `${this._baseUrl}/users/me`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        ...this._headers,
      },
    };
    return await this._request(url, options);
  }

  async getInitialCards() {
    const url = `${this._baseUrl}/cards`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        ...this._headers,
      },
    };
    return await this._request(url, options);
  }

  async setUserInfo(data) {
    const url = `${this._baseUrl}/users/me`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...this._headers,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        email: data.email,
      }),
    };
    return await this._request(url, options);
  }

  async addCard(data) {
    const url = `${this._baseUrl}/cards`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this._headers,
      },
      body: JSON.stringify(data),
    };
    return await this._request(url, options);
  }

  async deleteCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...this._headers,
      },
    };
    return await this._request(url, options);
  }

  async setUserAvatar(data) {
    const url = `${this._baseUrl}/users/me/avatar`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...this._headers,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    };
    return await this._request(url, options);
  }
}

const jwtToken = localStorage.getItem("jwt");
const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwtToken}`,
  },
});

export default api;
