import './RecipeCard.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

function RecipeCard({ meal }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.some((item) => item.id === meal.id);

  return (
    <div className="card">
      <img src={meal.image} alt={meal.title} />
      <h3>{meal.title}</h3>

      <button
        onClick={() =>
          isFavorite ? removeFavorite(meal.id) : addFavorite(meal)
        }
      >
        {isFavorite ? "❤️" : "♡"}
      </button>

      <Link to={`/recipe/${meal.id}?source=${meal.source}`}>
        View Details
      </Link>
    </div>
  );
}

export default RecipeCard;