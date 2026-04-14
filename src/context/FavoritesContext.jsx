import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // ✅ Load from localStorage (SAFE)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");

      if (stored) {
        const parsed = JSON.parse(stored);

        // extra safety check
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        } else {
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.log("Error loading favorites:", error);
      setFavorites([]);
    }
  }, []);

  // ✅ Save to localStorage (SAFE)
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.log("Error saving favorites:", error);
    }
  }, [favorites]);

  // ✅ Add favorite (no duplicates)
  const addFavorite = (meal) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === meal.id);
      if (exists) return prev;

      return [...prev, meal];
    });
  };

  // ✅ Remove favorite
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;