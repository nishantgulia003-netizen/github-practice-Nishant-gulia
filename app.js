const recipes = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    time: 25,
    difficulty: "easy",
    description: "A creamy Italian pasta dish made with eggs and cheese.",
    category: "pasta"
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    time: 45,
    difficulty: "medium",
    description: "Tender chicken in a creamy spiced tomato sauce.",
    category: "curry"
  },
  {
    id: 3,
    title: "Homemade Croissants",
    time: 180,
    difficulty: "hard",
    description: "Buttery, flaky French pastries.",
    category: "baking"
  },
  {
    id: 4,
    title: "Greek Salad",
    time: 15,
    difficulty: "easy",
    description: "Fresh vegetables with feta and olives.",
    category: "salad"
  },
  {
    id: 5,
    title: "Beef Wellington",
    time: 120,
    difficulty: "hard",
    description: "Beef fillet wrapped in pastry.",
    category: "meat"
  },
  {
    id: 6,
    title: "Vegetable Stir Fry",
    time: 20,
    difficulty: "easy",
    description: "Quick fried mixed vegetables.",
    category: "vegetarian"
  },
  {
    id: 7,
    title: "Pad Thai",
    time: 30,
    difficulty: "medium",
    description: "Thai stir-fried rice noodles.",
    category: "noodles"
  },
  {
    id: 8,
    title: "Margherita Pizza",
    time: 60,
    difficulty: "medium",
    description: "Classic pizza with mozzarella and basil.",
    category: "pizza"
  }
];

const recipeContainer = document.querySelector("#recipe-container");

const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

const renderRecipes = (recipesToRender) => {
  recipeContainer.innerHTML = recipesToRender
    .map(createRecipeCard)
    .join("");
};

renderRecipes(recipes);
