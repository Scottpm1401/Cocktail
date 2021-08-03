import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

function Cocktail() {
  const { id } = useParams();
  const [drink, setDrink] = useState();

  useEffect(() => {
    Axios.get("https://scott-cocktail.herokuapp.com/cocktail").then(
      (response) => {
        setDrink(response.data.filter((fish) => fish.id === parseInt(id)));
      }
    );
  }, []);

  return drink ? (
    <div className="container">
      <div className="top_drink">
        <Link to="/" className="btn">
          back home
        </Link>
        <h1>{drink[0].name}</h1>
      </div>
      <section className="drink_info">
        <img className="drink_image" src={drink[0].img} alt="" />
        <div className="info">
          <p>
            <span>Name:</span>
            {drink[0].name}
          </p>
          <p>
            <span>Category:</span>
            {drink[0].category}
          </p>
          <p>
            <span>Info:</span>
            {drink[0].info}
          </p>
          <p>
            <span>Glass:</span>
            {drink[0].glass}
          </p>
          <p>
            <span>Instructions:</span>
            {drink[0].instructions}
          </p>
          <p>
            <span>Ingredients:</span>
            {drink[0].ingredients}
          </p>
        </div>
      </section>
    </div>
  ) : (
    <h1 className="loading_error">Loading</h1>
  );
}

export default Cocktail;
