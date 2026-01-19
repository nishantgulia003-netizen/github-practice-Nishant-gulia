const RecipeApp = (() => {

  const recipes = [
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      time: 25,
      difficulty: "easy",
      description: "A creamy Italian pasta dish.",
      ingredients: ["Spaghetti", "Eggs", "Cheese", "Pepper"],
      steps: [
        "Boil pasta",
        {
          text: "Prepare sauce",
          substeps: [
            "Beat eggs",
            "Add cheese",
            {
              text: "Season",
              substeps: ["Add pepper", "Mix well"]
            }
          ]
        },
        "Combine and serve"
      ]
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      time: 45,
      difficulty: "medium",
      description: "Spiced creamy chicken curry.",
      ingredients: ["Chicken", "Tomato", "Cream", "Spices"],
      steps: ["Cook chicken", "Prepare sauce", "Mix together"]
    },
    {
      id: 3,
      title: "Greek Salad",
      time: 15,
      difficulty: "easy",
      description: "Fresh vegetable salad.",
      ingredients: ["Tomato", "Cucumber", "Feta"],
      steps: ["Chop vegetables", "Add cheese", "Serve"]
    }
  ];

  const recipeContainer = document.querySelector("#recipe-container");

  const renderSteps = (steps, level = 0) => {
    let html = `<ul class="step-level-${level}">`;

    steps.forEach(step => {
      if (typeof step === "string") {
        html += `<li>${step}</li>`;
      } else {
        html += `<li>${step.text}`;
        html += renderSteps(step.substeps, level + 1);
        html += `</li>`;
      }
    });

    html += "</ul>";
    return html;
  };

  const createRecipeCard = (recipe) => `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>

      <div class="recipe-meta">
        <span>⏱ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>

      <p>${recipe.description}</p>

      <button class="toggle-btn" data-toggle="ingredients" data-id="${recipe.id}">
        Show Ingredients
      </button>

      <button class="toggle-btn" data-toggle="steps" data-id="${recipe.id}">
        Show Steps
      </button>

      <div class="ingredients-container" id="ingredients-${recipe.id}">
        <ul>
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>

      <div class="steps-container" id="steps-${recipe.id}">
        ${renderSteps(recipe.steps)}
      </div>
    </div>
  `;

  const renderRecipes = () => {
    recipeContainer.innerHTML = recipes.map(createRecipeCard).join("");
  };

  const handleToggleClick = (e) => {
    if (!e.target.classList.contains("toggle-btn")) return;

    const id = e.target.dataset.id;
    const type = e.target.dataset.toggle;
    const container = document.querySelector(`#${type}-${id}`);

    container.classList.toggle("visible");

    e.target.textContent = container.classList.contains("visible")
      ? `Hide ${type}`
      : `Show ${type}`;
  };

  const init = () => {
    renderRecipes();
    recipeContainer.addEventListener("click", handleToggleClick);
    console.log("RecipeApp ready!");
  };

  return { init };

})();

RecipeApp.init();
