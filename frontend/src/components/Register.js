import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

function Register({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistrationFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSignUp({
        email,
        password,
      });
    },
    [email, onSignUp, password]
  );

  const handleEmailInputChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordInputChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleRegistrationFormSubmit}>
        <input
          className="login__input"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          autoComplete="on"
          onChange={handleEmailInputChange}
          required
        />
        <input
          className="login__input"
          placeholder="Пароль"
          type="password"
          name="email"
          minLength="6"
          maxLength="30"
          value={password}
          autoComplete="on"
          onChange={handlePasswordInputChange}
          required
        />
        <button className="login__button">Зарегистрироваться</button>
      </form>
      <p className="login__text">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="login__text-link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
