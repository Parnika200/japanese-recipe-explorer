const MEALDB_URL = "https://www.themealdb.com/api/json/v1/1";
const SPOON_URL = "https://api.spoonacular.com/recipes";


const API_KEY = "ad6ff2f589f24eb89d492b625fde150f";

// MealDB
export const getMealDBMeals = async () => {
  const res = await fetch(`${MEALDB_URL}/filter.php?a=Japanese`);
  const data = await res.json();

  return data.meals.map((meal) => ({
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    source: "mealdb"
  }));
};

// Spoonacular
export const getSpoonMeals = async () => {
  const res = await fetch(
    `${SPOON_URL}/complexSearch?query=japanese&number=20&apiKey=${API_KEY}`
  );
  const data = await res.json();

  return data.results.map((meal) => ({
    id: meal.id,
    title: meal.title,
    image: meal.image,
    source: "spoon"
  }));
};


export const getAllMeals = async () => {
  const [mealdb, spoon] = await Promise.all([
    getMealDBMeals(),
    getSpoonMeals()
  ]);

  return [...mealdb, ...spoon];
};


//details

// MealDB details
export const getMealDetails = async (id) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  return data.meals[0];
};

// Spoonacular details
export const getSpoonDetails = async (id) => {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
  const data = await res.json();
  return data;
};


export const searchMealDB = async (query) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await res.json();

  if (!data.meals) return [];

  return data.meals.map((meal) => ({
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    source: "mealdb"
  }));
};

export const searchSpoon = async (query) => {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
    );
    const data = await res.json();

    if (!data.results) return [];

    return data.results.map((meal) => ({
      id: meal.id,
      title: meal.title,
      image: meal.image,
      source: "spoon"
    }));
  } catch {
    return [];
  }
};

// combine search
export const searchAllMeals = async (query) => {
  const [mealdb, spoon] = await Promise.all([
    searchMealDB(query),
    searchSpoon(query)
  ]);

  return [...mealdb, ...spoon];
};