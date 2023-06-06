// Для работы с API создайте класс Api.
// Все запросы должны быть методами этого класса.
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Err: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  async getCurrentUserInfo() {
    return await this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  // Загрузка карточек с сервера
  async getInitialCards() {
    return await this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  // Редактирование профиля
  async setUserInfo(data) {
    return await this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        email: data.email,
      }),
    });
  }

  // Добавление новой карточки
  async addCard(data) {
    return await this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  // Удаление карточки с сервера
  async deleteCard(cardId) {
    return await this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  async changeLikeCardStatus(isLiked, cardId) {
    const url = isLiked ? `${this._baseUrl}/cards/${cardId}/likes` : `${this._baseUrl}/cards/${cardId}/likes`;
    const headers = {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    };
    return fetch(url, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: headers,
    })
  }

  


  // Обновление аватара пользователя:
  async setUserAvatar(data) {
    return await this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default api;
