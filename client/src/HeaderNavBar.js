import { NavLink, useHistory } from "react-router-dom";

function HeaderNavBar({ user, isAuthenticated, setIsAuthenticated }) {
  const history = useHistory();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setIsAuthenticated(false);
      history.push("/");
    });
  }

  return (
    <nav className="nav-container">
      <NavLink exact to="/" style={{ textDecoration: "none" }}>
        <h1>plannit</h1>
      </NavLink>
      {isAuthenticated ? (
        <NavLink to="/account" style={{ textDecoration: "none" }}>
          <h3 style={{ textDecoration: "none" }} className="navbar-username-welcome">
            Hello {user.username}
          </h3>
          <img className="navbar-image-thumbnail" src={user.profile_image} />
        </NavLink>
      ) : null}

      {isAuthenticated ? (
        <button onClick={handleLogout} className="login-nav-btn">
          LOG OUT
        </button>
      ) : (
        <NavLink to="/login">
          <button className="login-nav-btn">LOG IN</button>{" "}
        </NavLink>
      )}
    </nav>
  );
}

export default HeaderNavBar;