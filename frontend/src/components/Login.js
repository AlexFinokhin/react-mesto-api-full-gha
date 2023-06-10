import { useState, useCallback } from "react";

function Login({ onSignIn }) {
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");

  const handleLoginFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSignIn({
        email,
        password,
      });
    },
    [email, password, onSignIn]
  );

  const handleEmailInputChange = useCallback((event) => {
    setUserEmail(event.target.value);
  }, []);

  const handlePasswordInputChange = useCallback((event) => {
    setUserPassword(event.target.value);
  }, []);

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleLoginFormSubmit}>
        <input
          className="login__input"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          autoComplete="on"
          onChange={handleEmailInputChange}
          required
        ></input>
        <input
          className="login__input"
          placeholder="Пароль"
          type="password"
          name="password"
          minLength="6"
          maxLength="30"
          value={password}
          autoComplete="on"
          onChange={handlePasswordInputChange}
          required
        ></input>
        <button className="login__button">Войти</button>
      </form>
    </section>
  );
}

export default Login;
