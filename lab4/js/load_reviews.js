document.addEventListener('DOMContentLoaded', async function () {
    const reviewsContainer = document.getElementById('reviewsContainer');

    if (reviewsContainer) {
        try {
            // Отправляем GET-запрос для получения отзывов
            const response = await fetch('http://127.0.0.1:8000/reviews', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Получаем данные из ответа
                const reviews = await response.json();

                // Проверяем, есть ли отзывы
                if (reviews.length > 0) {
                    // Рендерим отзывы в контейнер
                    reviewsContainer.innerHTML = reviews
                        .map(
                            (review) => `
                                <div class="review">
                                    <p><strong>${review.email}:</strong></p>
                                    <p>${review.text}</p>
                                </div>
                            `
                        )
                        .join('');
                } else {
                    reviewsContainer.innerHTML = '<p>Отзывов пока нет. Будьте первым!</p>';
                }
            } else {
                console.error('Ошибка загрузки отзывов:', response.statusText);
                reviewsContainer.innerHTML = '<p>Не удалось загрузить отзывы.</p>';
            }
        } catch (error) {
            console.error('Ошибка соединения с сервером:', error);
            reviewsContainer.innerHTML = '<p>Ошибка при загрузке отзывов.</p>';
        }
    } else {
        console.error("Контейнер для отзывов с ID 'reviewsContainer' не найден.");
    }
});
