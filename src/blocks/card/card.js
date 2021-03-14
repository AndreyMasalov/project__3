// Обращение к элементам
const cardHeaders = document.querySelectorAll('.card__header');
const cardLinks = document.querySelectorAll('.card__link');

// Главная функция
function card() {

    cardLinks.forEach((link, index) => {
        // Получение индекса элемента, исходя из того, что у каждого элемента по 2 ссылки
        let cardIndex = Number((index / 2).toString().replace('.5', ''));

        link.addEventListener('click', event => {
            // Отключение стандартного поведения ссылки
            event.preventDefault();
            cardHeaders[cardIndex].classList.toggle('card__header_changed');
        });
    });
}

// Экспорт функции
export { card };