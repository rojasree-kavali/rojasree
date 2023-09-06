// Get DOM elements
const searchInput = document.getElementById('searchInput');
const mealList = document.getElementById('mealList');

// Function to fetch meals based on search term
const fetchMeals = (searchTerm) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const meals = data.meals || [];
            displayMeals(meals);
        })
        .catch((error) => {
            console.error('Error fetching meals:', error);
        });
};

// Function to display meals in the UI
const displayMeals = (meals) => {
    mealList.innerHTML = '';

    meals.forEach((meal) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strInstructions}</p>
        `;
        mealList.appendChild(li);
    });
};

// Event listener for search input
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    fetchMeals(searchTerm);
});
