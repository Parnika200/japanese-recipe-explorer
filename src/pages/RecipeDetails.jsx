import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMealDetails, getSpoonDetails } from "../services/api";
import "./RecipeDetails.css"
function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  // get source
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");

  useEffect(() => {
    const fetchDetails = async () => {
      let data;

      if (source === "mealdb") {
        data = await getMealDetails(id);
      } else {
        data = await getSpoonDetails(id);
      }

      setMeal(data);
      setLoading(false);
    };

    fetchDetails();
  }, [id, source]);

  if (loading) return <h2>Loading...</h2>;

 
  const getIngredients = (meal) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }

    return ingredients;
  };

  
  if (source === "mealdb") {
    return (
      <div className="details">
        <h1>{meal.strMeal}</h1>

        <img src={meal.strMealThumb} alt={meal.strMeal} />

        <p><strong>Category:</strong> {meal.strCategory}</p>
        <p><strong>Cuisine:</strong> {meal.strArea}</p>

        <h3>Ingredients</h3>
        <ul>
          {getIngredients(meal).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Steps</h3>
        <ol>
          {meal.strInstructions.split(".").map((step, index) => (
            step.trim() && <li key={index}>{step}</li>
          ))}
        </ol>

        {meal.strYoutube && (
          <a href={meal.strYoutube} target="_blank" rel="noreferrer">
            ▶ Watch Cooking Video
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="details">
      <h1>{meal.title}</h1>

      <img src={meal.image} alt={meal.title} />

      <p><strong>Ready in:</strong> {meal.readyInMinutes} mins</p>
      <p><strong>Servings:</strong> {meal.servings}</p>

      <h3>Ingredients</h3>
      <ul>
        {meal.extendedIngredients.map((item) => (
          <li key={item.id}>{item.original}</li>
        ))}
      </ul>

      <h3>Steps</h3>
      <ol>
        {meal.analyzedInstructions?.[0]?.steps?.map((step) => (
          <li key={step.number}>{step.step}</li>
        )) || <p>No steps available</p>}
      </ol>

      <h3>Summary</h3>
      <p dangerouslySetInnerHTML={{ __html: meal.summary }} />
    </div>
  );
}

export default RecipeDetails;