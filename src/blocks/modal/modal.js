// Обращение к элементам
const promoModal = document.querySelector('[data-modal=promo]');
const promoButtons = document.querySelectorAll('[data-modal=modal-promo]');
const catalogModal = document.querySelector('[data-modal=catalog]');
const catalogButtons = document.querySelectorAll('[data-modal=modal-catalog]');
const cardTitle = document.querySelectorAll('h3.card__title');
const thankModal = document.querySelector('[data-modal=thank]');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal__close');
const page = document.querySelector('.page');

// Переменная, которая хранит значение - показывать модальное окно "Спасибо" или нет
let showThankModal = false;

// Главная функция
function modal() {

    promoButtons.forEach(button => {

        button.addEventListener('click', () => {
            page.classList.add('page__full_overflow');
            promoModal.classList.add('modal_active');
            promoModal.querySelector('.modal__window').classList.add('modal__window_active');
        });
    });

    catalogButtons.forEach((button, index) => {

        button.addEventListener('click', () => {
            let textRus = cardTitle[index].textContent.substring(0 , cardTitle[index].textContent.indexOf(' '));
            let textEng = cardTitle[index].textContent.substring(cardTitle[index].textContent.indexOf(' '));
            catalogModal.querySelector('div.modal__description').innerHTML = `${textRus}<span class="modal__description modal__description_big font font_museo-moderno">${textEng}</span>`;
            page.classList.add('page__full_overflow');
            catalogModal.classList.add('modal_active');
            catalogModal.querySelector('.modal__window').classList.add('modal__window_active');
        });
    });

    // Подписка на событие успешной отправки формы (скрипт form.js)
    document.addEventListener('form', () => {

        showThankModal = true;

        if (showThankModal) {

            modals.forEach(modal => {
                modal.classList.remove('modal_active');
                modal.querySelector('.modal__window').classList.remove('modal__window_active');
            });

            page.classList.add('page__full_overflow');
            thankModal.classList.add('modal_active');
            thankModal.querySelector('.modal__window').classList.add('modal__window_active');
    
            showThankModal = false;
        }
    });

    modalCloses.forEach(close => {

        close.addEventListener('click', () => {
            modals.forEach(modal => {
                page.classList.remove('page__full_overflow');
                modal.classList.remove('modal_active');
                modal.querySelector('.modal__window').classList.remove('modal__window_active');
            });
        });
    });

}

export { modal };