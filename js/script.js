document.getElementById('nutrition-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const foodItem = document.getElementById('food-item').value;
    const apiKey = 'YOUR_API_KEY'; // Get from Nutritionix
    const apiUrl = `https://api.nutritionix.com/v1_1/search/${foodItem}?results=0:1&fields=item_name,nf_calories&appId=YOUR_APP_ID&appKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const result = data.hits[0];
            const nutritionInfo = `
                <h2>${result.fields.item_name}</h2>
                <p>Calories: ${result.fields.nf_calories}</p>
            `;
            document.getElementById('nutrition-results').innerHTML = nutritionInfo;
        })
        .catch(error => console.error('Error:', error));
});
