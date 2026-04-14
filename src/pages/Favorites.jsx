import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import RecipeCard from "../componants/RecipeCard";

function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  if (!favorites || favorites.length === 0) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40vh",
        gap: "12px"
      }}>
        <span style={{ fontSize: "40px" }}>♡</span>
        <h2 style={{ color: "#111111", fontWeight: "600", fontSize: "20px", margin: 0 }}>
          No favorites yet
        </h2>
        <p style={{ color: "#6b7280", fontSize: "15px", margin: 0 }}>
          Start adding recipes you love!
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "30px auto", padding: "0 20px" }}>
      <div style={{ marginBottom: "24px", borderBottom: "1px solid #e5e7eb", paddingBottom: "16px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "600", color: "#b96565", margin: 0 }}>
          Your Favorites
        </h1>
        <p style={{ color: "#6b7280", fontSize: "18px", marginTop: "6px" }}>
          {favorites.length} {favorites.length === 1 ? "recipe" : "recipes"} saved
        </p>
      </div>

      <div className="grid">
        {favorites.map((meal) => (
          <RecipeCard key={meal.id + meal.source} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;