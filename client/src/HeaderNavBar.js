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
    <nav className="navbar">
      <NavLink exact to="/" style={{ textDecoration: "none" }}>
        <h1>Tell of Your Travels!</h1>
      </NavLink>
      {isAuthenticated ? (
        <NavLink to="/account" style={{ textDecoration: "none" }}>
          <h3 style={{ textDecoration: "none" }} className="navbar-username-welcome">
            Welcome {user.username}, Let's Go On An Adventure!
          </h3>
        </NavLink>
      ) : null}

      {isAuthenticated ? (
        <button onClick={handleLogout} className="login-nav-btn">LOG OUT</button>
      ) : (
        <NavLink to="/login">
          <button className="login-nav-btn">LOG IN / SIGN UP</button>{" "}
        </NavLink>
      )}
      <h4>About This Project</h4>
      <p>This application is meant to help inspire others to get out and explore the world. There are so many wonderful 
        places around the globe to visit, but sometimes the hardest part is taking a leap and traveling somewhere that is out
        of your comfort zone. A place with different traditions, languages and culture than you are used to. The hope is that 
        by having people share their adventure stories on this site, it will motivate others to travel and spread the joy
        of meeting others and making connections!</p>
    </nav>
  );
}

export default HeaderNavBar;