export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async fetch(path, options = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        ...this.headers,
        ...options.headers,
      },
      ...options,
    });
    return this.checkResponse(res);
  }

  async checkResponse(res) {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      const error = new Error(`API error: ${data.message || res.statusText}`);
      throw error;
    }
  }

  getUserInfo() {
    return this.fetch("/users/me");
  }

  getInitialCards() {
    return this.fetch("/cards");
  }

  setUserInfo(data) {
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    };
    return this.fetch("/users/me", options);
  }

  addCard(data) {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
    };
    return this.fetch("/cards", options);
  }

  deleteCard(cardId) {
    const options = {
      method: "DELETE",
    };
    return this.fetch(`/cards/${cardId}`, options);
  }

  setLike(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    const options = {
      method: method,
    };
    return this.fetch(`/cards/${cardId}/likes`, options);
  }

  setUserAvatar(data) {
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    };
    return this.fetch("/users/me/avatar", options);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "71809042-8d48-4365-9054-51d9ac130004",
    "Content-Type": "application/json",
  },
});

export default api;
