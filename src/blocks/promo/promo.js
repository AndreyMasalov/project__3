// Обращение к элементам
const promoCatalogLink = document.querySelector('.promo__catalog-link');

// Главная функция
function scroll() {

    promoCatalogLink.addEventListener('click', event => {
        event.preventDefault();
        // Переменная, которая храни значение атрибута элемента
        let valueAttribute = promoCatalogLink.getAttribute('href');

        // Если элемент существует на странице
        if (document.querySelector(valueAttribute)) {
            document.querySelector(valueAttribute).scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    });
}

// Экспорт функции
export { scroll };