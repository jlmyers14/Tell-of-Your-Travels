import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Account({ user, setUser }) {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    user_id: user.id,
    country_id: "",
    content: "",
    category: null,
    city: "",
  });

  const [countries, setCountries] = useState([]);

  const [profileUpdates, setProfileUpdates] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    fetch("/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  useEffect(() => {
    fetch("/all_countries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(setCountries);
  }, []);

  function handleDelete(id) {
    fetch(`/remove?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(setPosts(posts.filter((p) => p.id !== id)));
  }

  function addNewPost(newPost) {
    setPosts([...posts, newPost]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((post) => addNewPost(post));
    setForm({
      user_id: user.id,
      country_id: "",
      content: "",
      category: null,
      city: "",
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleProfileSubmit(e) {
    e.preventDefault();
    fetch(`/update_profile?id=${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileUpdates),
    })
      .then((r) => r.json())
      .then(setUser);
    setProfileUpdates({
      username: "",
      password: "",
    });
  }

  function handleProfileChange(e) {
    setProfileUpdates({ ...profileUpdates, [e.target.name]: e.target.value });
  }

  const renderPostsToAccount = posts.map((post) => {
    if (post.user.id === user.id) {
      return (
        <div post={post} key={post.id}>
          <div className="post-container">
            <div className="account-post-card">
              <h2 className="post-user-name">{user.username}</h2>
              <p>{post.content}</p>
              <h1 className="card-city-country">
                {post.city}, {post.country.name}
              </h1>
              <button className="card-edit-btn" onClick={() => handleDelete(post.id)}>
                DELETE
              </button>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <div>
      <div className="post-form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="card-city-country">Create Post:</h2>
          <div className="input">
            <label className="form">Country:</label>
            <br></br>
            <select onChange={handleChange} value={form.country_id} className="select-country" name="country_id">
              <option value="0">Select</option>
              {countries.map((d) => (
                <option value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <br></br>
          <div className="input">
            <label className="form">Travel Highlights:</label>
            <br></br>
            <input onChange={handleChange} value={form.content} name="content" />
          </div>
          <br></br>
          <div className="input">
            <label className="form">Favorite City Visited:</label>
            <br></br>
            <input onChange={handleChange} value={form.city} name="city" />
          </div>
          <br></br>
          <div className="input">
            <label className="form">Category:</label>
            <br></br>
            <select onChange={handleChange} value={form.category} className="select-country" name="category">
              <option value="null">Select</option>
              <option value="experiences">Travel Review</option>
            </select>
          </div>
          <br></br>
          <button className="login-btn" type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h2 className="card-city-country">Your Posts:</h2>
        <div className="post-container">{renderPostsToAccount}</div>
        <div className="post-form-container">
          <form onSubmit={handleProfileSubmit}>
            <h2 className="card-city-country">Profile Changes:</h2>
            <div className="input">
              <label className="form">Username:</label>
              <br></br>
              <input onChange={handleProfileChange} value={profileUpdates.username} name="username" />
            </div>
            <br></br>
            <div className="input">
              <label className="form">Password:</label>
              <br></br>
              <input onChange={handleProfileChange} value={profileUpdates.password} name="password" />
            </div>
            <br></br>
            <button className="login-btn" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;