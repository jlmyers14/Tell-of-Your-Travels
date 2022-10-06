import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CreateAccount({ setUser, setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      password,
      profile_image: profileImage,
    };

    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((r) => r.json())
      .then(history.push("/login"))
      .then(alert("Successfully created account"));
  }

  return (
    <div id="login-container">
      <form onSubmit={handleSubmit}>
        <h2 className="card-city-country">Create Account</h2>
        <div className="input-login">
          <label>Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" />
        </div>

        <div className="input-login">
          <label>Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
        </div>

        <div className="input-login">
          <label>Profile Image</label>
          <input
            type="profile_image"
            id="profile_image"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            name="profile_image"
          />
        </div>

        <button className="login-btn" type="submit">
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default CreateAccount;