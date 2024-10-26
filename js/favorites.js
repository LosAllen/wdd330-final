document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    loadPopularFoods();
});

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteList = document.getElementById('favorite-list');
    favoriteList.innerHTML = favorites.map(food => `<li>${food}</li>`).join('');
}

function loadPopularFoods() {
    const mealCount = JSON.parse(localStorage.getItem('meals')) || {};
    const popularList = document.getElementById('popular-list');

    const sortedFoods = Object.keys(mealCount).sort((a, b) => mealCount[b] - mealCount[a]);
    popularList.innerHTML = sortedFoods.map(food => `<li>${food} - used ${mealCount[food]} times</li>`).join('');
}
