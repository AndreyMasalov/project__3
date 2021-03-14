// Обращение к элементам
const slideWrapper = document.querySelector('.slider__track-wrapper');
const slideTrack = document.querySelector('.slider__track');
const slidePrev = document.querySelector('.slider__button-previous');
const slideNext = document.querySelector('.slider__button-next');
const slides = document.querySelectorAll('.slider__item');
// Получение общего количества слайдов
const slidesCount = slides.length;

// Функция, которая устанавливает позицию трека
function setPosition(position) {
    slideTrack.style.transform = `translateX(${position}px)`;
};

// Функция, которая проверяет кнопки управления
function checkButtons(position, slidesToShow, slideWidth) {
    // Если позиция трека = 0, тогда скрыть кнопку влево, иначе показать кнопку влево
    position === 0 ? slidePrev.hidden = true : slidePrev.hidden = false;
    // Если позиция трека установлена на предпоследнем слайде, тогда скрыть кнопку вправо, иначе показать кнопку вправо
    position <= -(slidesCount - slidesToShow) * slideWidth ? slideNext.hidden = true : slideNext.hidden = false;
};

// Главная функция
function slider(parameters) {
    // Количество слайдов, которое нужно отобразить
    const slidesToShow = parameters.slidesToShow;
    // Количество слайдов, которое нужно прокрутить
    const slidesToScroll = parameters.slidesToScroll;
    // Вычисление значения ширины для каждого слайда
    let slideWidth = slideWrapper.clientWidth / slidesToShow;
    // Вычисление значения смещения слайдов
    let movePosition = slidesToScroll * slideWidth;
    // Переменная, которая хранит координаты исходной позиции трека
    let position = 0;
    // Переменная, которая хранит номер текущего слайда
    let slideNumber = 1;

    setPosition(position);
    checkButtons(position, slidesToShow, slideWidth);

    slides.forEach((element, index) => {
        // Установка ширины для слайдов, исходя из количества отображаемых сладов одновременно
        element.style.minWidth = `${slideWidth}px`;

        // Если слайд содержит класс slider__item_active, тога 
        if (element.classList.contains('slider__item_active')) {
            // Обновление координат позиции трека -((индекс слайда + 1) * ширину слайда)
            position = -(index++ * slideWidth);

            setPosition(position);
            checkButtons(position, slidesToShow, slideWidth);
            slideNumber = index++;
        }
    });

    window.addEventListener('resize', () => {
        // Вычисление значения ширины для каждого слайда
        slideWidth = slideWrapper.clientWidth / slidesToShow;
        // Вычисление значения смещения слайдов
        movePosition = slidesToScroll * slideWidth;
        // Обновление координат позиции трека -(номер слайда * ширину слайда - ширина слайда)
        position = -(slideNumber * slideWidth - slideWidth);

        setPosition(position);
        checkButtons(position, slidesToShow, slideWidth);

        slides.forEach(element => {
            element.style.minWidth = `${slideWidth}px`;
        });
    });

    slideNext.addEventListener('click', () => {
        // Вычисление, сколько осталось слайдов (общее количество слайдов - (модуль текущей позиции трека + количество отображаемых слайдов * ширину слайда) / ширину слайда)
        const slidesLeft = slidesCount - (Math.abs(position) + slidesToShow * slideWidth) / slideWidth;
        // Если, позиция трека - количество оставшихся слайдов >= количеству слайдов, которое нужно прокрутить, тогда прокрутить на значение смещения слайдов, иначе прокрутить на количество оставшихся слайдов * ширину слайда
        position -= slidesLeft >= slidesToScroll ? movePosition : slidesLeft * slideWidth;

        setPosition(position);
        checkButtons(position, slidesToShow, slideWidth);
        slideNumber++;
    });

    slidePrev.addEventListener('click', () => {
        // Вычисление, сколько осталось слайдов (модуль текущей позиции трека / ширину слайда) 
        const slidesLeft = Math.abs(position) / slideWidth;
        // Если, позиция трека + количество оставшихся слайдов >= количеству слайдов, которое нужно прокрутить, тогда прокрутить на значение смещения слайдов, иначе прокрутить на количество оставшихся слайдов * ширину слайда
        position += slidesLeft >= slidesToScroll ? movePosition : slidesLeft * slideWidth;

        setPosition(position);
        checkButtons(position, slidesToShow, slideWidth);
        slideNumber--;
    });

    // Макрозадача, которая выполнится сразу после завершения всех других задач
    setTimeout(() => slideTrack.classList.add('slider__track_transition'), 0);
};

// Экспорт функции
export { slider };