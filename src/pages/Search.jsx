import { useState } from "react";
import { searchAllMeals } from "../services/api";
import RecipeCard from "../componants/RecipeCard";
import "./Search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    const data = await searchAllMeals(query);
    setMeals(data);
    setCurrentPage(1); // ✅ reset to page 1 on new search
    setLoading(false);
  };

  // ✅ Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedMeals = meals.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(meals.length / itemsPerPage);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Search Recipes</h1>

      {/* Search Input */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search sushi, ramen..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Loading */}
      {loading && <h2>Loading...</h2>}

      {/* Results */}
      <div className="grid">
        {selectedMeals.map((meal) => (
          <RecipeCard key={meal.id + meal.source} meal={meal} />
        ))}
      </div>

      {/* Pagination */}
      {!loading && meals.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;