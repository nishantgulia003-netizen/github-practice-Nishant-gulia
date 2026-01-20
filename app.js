const RecipeApp = (() => {
  'use strict';

  // ============================================
  // DATA
  // ============================================
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

  // ============================================
  // STATE
  // ============================================
  let searchQuery = '';
  let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
  let debounceTimer;

  // ============================================
  // DOM
  // ============================================
  const recipeContainer = document.querySelector('#recipe-container');
  const searchInput = document.querySelector('#search-input');
  const clearSearchBtn = document.querySelector('#clear-search');
  const recipeCountDisplay = document.querySelector('#recipe-count');

  // ============================================
  // RENDER STEPS (RECURSION)
  // ============================================
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

  // ============================================
  // CREATE CARD
  // ============================================
  const createRecipeCard = (recipe) => {
    const isFavorited = favorites.includes(recipe.id);
    const heart = isFavorited ? '❤️' : '🤍';

    return `
      <div class="recipe-card">
        <button class="favorite-btn ${isFavorited ? 'favorited' : ''}"
                data-id="${recipe.id}">
          ${heart}
        </button>

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
  };

  // ============================================
  // RENDER
  // ============================================
  const renderRecipes = (list) => {
    recipeContainer.innerHTML = list.map(createRecipeCard).join('');
    updateRecipeCounter(list.length, recipes.length);
  };

  // ============================================
  // SEARCH
  // ============================================
  const filterBySearch = (list, query) => {
    if (!query.trim()) return list;
    const q = query.toLowerCase();

    return list.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.ingredients.some(i => i.toLowerCase().includes(q))
    );
  };

  // ============================================
  // FAVORITES
  // ============================================
  const saveFavorites = () => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  };

  const toggleFavorite = (id) => {
    id = Number(id);
    favorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];

    saveFavorites();
    updateDisplay();
  };

  // ============================================
  // UI HELPERS
  // ============================================
  const updateRecipeCounter = (showing, total) => {
    if (recipeCountDisplay) {
      recipeCountDisplay.textContent = `Showing ${showing} of ${total} recipes`;
    }
  };

  // ============================================
  // EVENTS
  // ============================================
  const handleToggleClick = (e) => {
    if (e.target.classList.contains('toggle-btn')) {
      const id = e.target.dataset.id;
      const type = e.target.dataset.toggle;
      const box = document.querySelector(`#${type}-${id}`);
      box.classList.toggle('visible');

      e.target.textContent =
        box.classList.contains('visible')
          ? `Hide ${type}`
          : `Show ${type}`;
    }

    if (e.target.classList.contains('favorite-btn')) {
      toggleFavorite(e.target.dataset.id);
    }
  };

  const handleSearchInput = (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = e.target.value;
      updateDisplay();
    }, 300);
  };

  // ============================================
  // UPDATE DISPLAY
  // ============================================
  const updateDisplay = () => {
    let list = filterBySearch(recipes, searchQuery);
    renderRecipes(list);
  };

  // ============================================
  // INIT
  // ============================================
  const init = () => {
    recipeContainer.addEventListener('click', handleToggleClick);
    if (searchInput) searchInput.addEventListener('input', handleSearchInput);
    updateDisplay();
    console.log('✅ RecipeApp ready');
  };

  return { init };
})();

RecipeApp.init();
