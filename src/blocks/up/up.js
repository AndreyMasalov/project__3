// Обращение к элементам
const upBlock = document.querySelector('.up');
const upLink = document.querySelector('.up__link');

// Главная функция
function up() {
    
    // Подписаться на событие 'scroll'
    window.addEventListener('scroll', () => {
        // Получение значения смещения страницы в px по оси Y
        let scrolled = window.pageYOffset;
        // Получение значения высоты окна
        let coordinate = document.documentElement.clientHeight;

        // Если смещение страницы больше высоты окна
        if (scrolled > coordinate) {
            upBlock.classList.add('up_visibility');
        } else {
            upBlock.classList.remove('up_visibility');
        }
    });

    upLink.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Экспорт функции
export { up };