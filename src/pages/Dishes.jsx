import { useEffect, useState } from "react";
import { getAllMeals } from "../services/api";
import RecipeCard from "../componants/RecipeCard";
import "./Dishes.css";

function Dishes() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ Sorting
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMeals();
        setMeals(data);
      } catch (err) {
        setError("Failed to load meals");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedMeals = meals.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(meals.length / itemsPerPage);

  // ✅ Sorting logic
  const sortedMeals = [...selectedMeals].sort((a, b) => {
    if (sortType === "az") {
      return a.title.localeCompare(b.title);
    }
    if (sortType === "za") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  // ✅ UI states
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>

      {/* 🔽 SORT DROPDOWN */}
      <div className="sort-box">
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="az">Name (A-Z)</option>
          <option value="za">Name (Z-A)</option>
        </select>
      </div>

      {/* 🍣 GRID */}
      <div className="grid">
        {sortedMeals.map((meal) => (
          <RecipeCard key={meal.id + meal.source} meal={meal} />
        ))}
      </div>

      {/* 📄 PAGINATION */}
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
    </div>
  );
}

export default Dishes;