document.getElementById('nutrition-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const foodItem = document.getElementById('food-item').value;
    const apiKey = '77cb904adcc5424c8f35fd881fdba26c';  // Replace with your Spoonacular API Key
    const apiUrl = `https://api.spoonacular.com/food/products/search?query=${foodItem}&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.products && data.products.length > 0) {
                const product = data.products[0];
                const nutritionInfo = `
                    <h2>${product.title}</h2>
                    <img src="${product.image}" alt="${product.title}" style="width:100px; height:100px;">
                    <p>Brand: ${product.brand}</p>
                    <p>Calories: ${product.nutrition ? product.nutrition.calories : 'N/A'}</p>
                `;
                document.getElementById('nutrition-results').innerHTML = nutritionInfo;
            } else {
                document.getElementById('nutrition-results').innerHTML = "<p>No results found. Please try a different food item.</p>";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('nutrition-results').innerHTML = "<p>An error occurred. Please try again later.</p>";
        });
});
