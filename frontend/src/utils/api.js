export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
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

  async changeCardLikeStatus(cardId, isLiked) {
    try {
      const token = localStorage.getItem("jwt");
      const method = isLiked ? "PUT" : "DELETE";
      const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: method,
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      });
      return this._checkResponse(response);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCurrentUserInfo() {
    const token = localStorage.getItem("jwt");
    const url = `${this._baseUrl}/users/me`;
    const options = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    };
    return await this._request(url, options);
  }

  async getInitialCards() {
    const token = localStorage.getItem("jwt");
    const url = `${this._baseUrl}/cards`;
    const options = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    };
    return await this._request(url, options);
  }

  async setUserInfo(data) {
    const token = localStorage.getItem("jwt");
    const url = `${this._baseUrl}/users/me`;
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
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
    const token = localStorage.getItem("jwt");
    const url = `${this._baseUrl}/cards`;
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    return await this._request(url, options);
  }

  async deleteCard(cardId) {
    const token = localStorage.getItem("jwt");
    const url = `${this._baseUrl}/cards/${cardId}`;
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    };
    return await this._request(url, options);
  }

  async setUserAvatar(data) {
    const token = localStorage.getItem("jwt");
    const url = `${this._baseUrl}/users/me/avatar`;
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    };
    return await this._request(url, options);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  // baseUrl: "https://api.ryangosling.nomoredomains.rocks",
});

export default api;
