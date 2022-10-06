import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Country({ country }) {
  const location = useLocation();
  const [countryPosts, setCountryPosts] = useState([]);
  const [filter, setFilter] = useState("");
  const [countryId, setCountryId] = useState();

  const countryCode = location.state.countryCode;
  // console.log(countryCode);

  const filteredPosts = countryPosts.filter((post) => {
    console.log(filter)
    switch (filter) {
      case "food":
        return post.category === "food";
      case "experiences":
        return post.category === "experiences";
      default:
        return post;
    }
  });

  const renderImages = countryPosts.map((post) => {
    // return <img className="images" src={post.image} alt="header_image" />;
  });

  useEffect(() => {
    fetch(`/country_code?code=${countryCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj);
        setCountryId(obj[0].id)});
  }, []);

  useEffect(() => {
    fetch(`/posts_by_country?id=${countryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(setCountryPosts);
  }, [countryId]);

  const renderPostsToCountry = filteredPosts.map((post) => {
    return (
      <div post={post} key={post.id}>
        <div className="post-container">
          <div className="post-card">
            <h2 className="post-user-name">{post.user.username}</h2>
            <p>{post.content}</p>
            <h1 className="card-city-country">
              {post.city}, {post.country.name}
            </h1>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="country-header" onClick={() => setFilter("")}>
        {location.state.country.toUpperCase()}
      </div>
      <div className="images-container">{renderImages}</div>
      <div className="filter-posts-buttons-container">
        <br></br>
        <button className="filter-btn" onClick={() => filter === "experiences" ? setFilter("food") : setFilter("experiences")} name="experiences">
          TRAVEL REVIEWS
        </button>
      </div>
      <br></br>
      <div className="post-container">{renderPostsToCountry}</div>
    </div>
  );
}

export default Country;