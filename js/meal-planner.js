document.addEventListener('DOMContentLoaded', () => {
    loadMeals();
    setupDropZones();
});

function createNewCard() {
    const title = document.getElementById('meal-title').value;
    const description = document.getElementById('meal-description').value;
    const day = document.getElementById('meal-day').value;
    const mealType = document.getElementById('meal-type').value;

    if (title === "" || description === "") {
        alert("Please fill in both title and description.");
        return;
    }

    const mealCard = document.createElement('div');
    mealCard.className = 'meal-card';
    mealCard.draggable = true;  // Make the card draggable
    mealCard.innerHTML = `<strong>${title}</strong><p>${description}</p>`;
    mealCard.id = `meal-${Date.now()}`; // Unique ID for each card

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteMealCard(mealCard);
    mealCard.appendChild(deleteButton);

    // Add drag event listeners to the card
    setupDraggableCard(mealCard);

    document.getElementById(`${day}-${mealType}`).appendChild(mealCard);
    saveToLocalStorage();
}

function setupDraggableCard(mealCard) {
    mealCard.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
}

function setupDropZones() {
    const days = document.querySelectorAll('.day .meal-section');

    days.forEach(daySection => {
        // Highlight on dragover
        daySection.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow dropping
            daySection.classList.add('highlight-dropzone'); // Add highlight
        });

        // Remove highlight when leaving the drop zone
        daySection.addEventListener('dragleave', () => {
            daySection.classList.remove('highlight-dropzone');
        });

        daySection.addEventListener('drop', (e) => {
            e.preventDefault();
            daySection.classList.remove('highlight-dropzone'); // Remove highlight on drop
            const mealCardId = e.dataTransfer.getData('text/plain');
            const draggedCard = document.getElementById(mealCardId);
            if (draggedCard) {
                daySection.appendChild(draggedCard);
                saveToLocalStorage();
            }
        });
    });
}


function deleteMealCard(card) {
    card.remove();
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const data = {};
    document.querySelectorAll('.day').forEach(dayDiv => {
        const day = dayDiv.dataset.day;
        data[day] = {};
        dayDiv.querySelectorAll('.meal-section').forEach(section => {
            const mealType = section.dataset.meal;
            const meals = Array.from(section.querySelectorAll('.meal-card')).map(card => ({
                title: card.querySelector('strong').textContent,
                description: card.querySelector('p').textContent
            }));
            data[day][mealType] = meals;
        });
    });
    localStorage.setItem('mealPlannerData', JSON.stringify(data));
}

function loadMeals() {
    const storedData = JSON.parse(localStorage.getItem('mealPlannerData')) || {};
    Object.keys(storedData).forEach(day => {
        Object.keys(storedData[day]).forEach(mealType => {
            storedData[day][mealType].forEach(meal => {
                const mealCard = document.createElement('div');
                mealCard.className = 'meal-card';
                mealCard.draggable = true;
                mealCard.id = `meal-${Date.now()}`;
                mealCard.innerHTML = `<strong>${meal.title}</strong><p>${meal.description}</p>`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => deleteMealCard(mealCard);
                mealCard.appendChild(deleteButton);

                document.getElementById(`${day}-${mealType}`).appendChild(mealCard);
                setupDraggableCard(mealCard);
            });
        });
    });
}
