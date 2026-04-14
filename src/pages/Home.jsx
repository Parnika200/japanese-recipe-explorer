import { useEffect, useState } from "react";
import { getAllMeals } from "../services/api";
import RecipeCard from "../componants/RecipeCard";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMeals();
      setMeals(data.slice(0, 4));
    };
    fetchData();
  }, []);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">Japanese Cuisine</span>
          <h1>
            Cook Authentic <br />
            <span className="hero-accent">Japanese Recipes</span>
          </h1>
          <p>
            Discover handpicked recipes, save your favorites, and bring
            the taste of Japan to your kitchen.
          </p>
          <div className="hero-buttons">
            <Link to="/dishes">
              <button className="primary">Explore Dishes</button>
            </Link>
            <Link to="/search">
              <button className="secondary">Search Recipes</button>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-item">
          <h3>200+</h3>
          <p>Recipes</p>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <h3>50+</h3>
          <p>Categories</p>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <h3>100%</h3>
          <p>Authentic</p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <div className="section-header">
          <div>
            <h2>Featured Recipes</h2>
            <p>Handpicked dishes to get you started</p>
          </div>
          <Link to="/dishes" className="view-all">View all →</Link>
        </div>
        <div className="grid">
          {meals.map((meal) => (
            <RecipeCard key={meal.id + meal.source} meal={meal} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <h2>Save Your Favorite Recipes</h2>
          <p>Build your personal collection and access it anytime, anywhere.</p>
          <Link to="/favorites">
            <button className="cta-btn">Go to Favorites</button>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;