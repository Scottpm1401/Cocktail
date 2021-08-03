import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const handleSearch = (e) => {
    var newDrink = [];
    for (var i of data) {
      if (i.name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) {
        newDrink.push(i);
      }
    }
    setDrinks(newDrink);
  };

  useEffect(() => {
    Axios.get("https://scott-cocktail.herokuapp.com/cocktail").then(
      (response) => {
        setData(response.data);
        setDrinks(response.data);
      }
    );
  }, []);

  return data.length > 0 ? (
    <div className="container">
      <div className="top">
        <div className="search_crl">
          <form className="search_form">
            <label htmlFor="search">search your favorite cocktail</label>
            <input id="search" type="text" onKeyUp={(e) => handleSearch(e)} />
          </form>
        </div>
        <h1>Cocktails</h1>
      </div>
      <section className="menu">
        {drinks.length > 0 ? (
          drinks.map((drink) => {
            const { id, img, name, glass, info } = drink;

            return (
              <article className="drink" key={id}>
                <img className="image" src={img} alt={id} />
                <div className="content">
                  <h1>{name}</h1>
                  <h3>{glass}</h3>
                  <p>{info}</p>
                  <Link className="btn" to={"/cocktail/" + id}>
                    details
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <>
            <span></span>
            <h1 className="loading_error">No Cocktail Found</h1>
            <span></span>
          </>
        )}
      </section>
    </div>
  ) : (
    <h1 className="loading_error">Loading...</h1>
  );
}

export default Home;
