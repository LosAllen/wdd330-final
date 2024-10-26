document.addEventListener('DOMContentLoaded', () => {
    loadMeals();
});

function createNewCard() {
    const mealTitle = document.getElementById('meal-title').value;
    const mealDescription = document.getElementById('meal-description').value;
    const selectedDay = document.getElementById('meal-day').value;
    const selectedMealType = document.getElementById('meal-type').value;

    if (mealTitle.trim() === "" || mealDescription.trim() === "") {
        alert("Please fill out both the meal title and description.");
        return;
    }

    const mealCard = document.createElement('div');
    mealCard.className = 'meal-card';
    mealCard.innerHTML = `<strong>${mealTitle}</strong><p>${mealDescription}</p>`;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => deleteMealCard(mealCard, selectedDay, selectedMealType);
    mealCard.appendChild(deleteButton);

    // Find the correct section for the selected day and meal type
    const targetSection = document.getElementById(`${selectedDay}-${selectedMealType}`);
    if (targetSection) {
        targetSection.appendChild(mealCard);
        saveToLocalStorage();
    } else {
        alert("Error: Unable to find the selected meal section.");
    }

    // Clear input fields
    document.getElementById('meal-title').value = '';
    document.getElementById('meal-description').value = '';
}

function deleteMealCard(mealCard, day, mealType) {
    mealCard.remove();
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const data = {};
    const days = document.querySelectorAll('.day');

    days.forEach(dayDiv => {
        const day = dayDiv.getAttribute('data-day');
        const mealSections = dayDiv.querySelectorAll('.meal-section');

        data[day] = {};

        mealSections.forEach(section => {
            const mealType = section.getAttribute('data-meal');
            const meals = Array.from(section.querySelectorAll('.meal-card')).map(card => {
                return {
                    title: card.querySelector('strong').textContent,
                    description: card.querySelector('p').textContent
                };
            });
            data[day][mealType] = meals;
        });
    });

    localStorage.setItem('mealPlannerData', JSON.stringify(data));
}

function loadMeals() {
    const storedData = JSON.parse(localStorage.getItem('mealPlannerData')) || {};

    Object.keys(storedData).forEach(day => {
        const mealData = storedData[day];

        Object.keys(mealData).forEach(mealType => {
            const meals = mealData[mealType];

            meals.forEach(meal => {
                const mealCard = document.createElement('div');
                mealCard.className = 'meal-card';
                mealCard.innerHTML = `<strong>${meal.title}</strong><p>${meal.description}</p>`;

                // Add delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-btn';
                deleteButton.onclick = () => deleteMealCard(mealCard, day, mealType);
                mealCard.appendChild(deleteButton);

                const targetSection = document.getElementById(`${day}-${mealType}`);
                if (targetSection) {
                    targetSection.appendChild(mealCard);
                }
            });
        });
    });
}
