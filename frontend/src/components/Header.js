import logo from "../images/LOGO.svg";
import { Link } from "react-router-dom";

function Header({ linkText, userEmail, onClick, route }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      <nav className="header__nav">
        <p className="header__email">{userEmail}</p>
        <Link to={route} onClick={onClick} className={"header__link"}>
          {linkText}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
