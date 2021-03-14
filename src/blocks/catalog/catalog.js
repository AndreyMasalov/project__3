const catalogTabs = document.querySelectorAll('.catalog__tab');
const catalogCardWrappers = document.querySelectorAll('.catalog__card-wrapper');

// Функция, которая удаляет классы у элементов
function removeClass() {

    catalogTabs.forEach((tab, index) => {

        if (tab.classList.contains('catalog__tab_active')) {
            tab.classList.remove('catalog__tab_active');
            catalogCardWrappers[index].classList.remove('catalog__card-wrapper_active');
        }
    });
}

// Главная функция
function tab() {
    // Переменная, которая хранит количество активных табов (если их задано несколько в HTML)
    let countTabs = 0;

    catalogTabs.forEach(tab => {

        if (tab.classList.contains('catalog__tab_active')) {
            countTabs++;
        }
    });

    // Если количество активных табов больше 1, тогда
    if (countTabs > 1) {
        removeClass();
        catalogTabs[countTabs - 1].classList.add('catalog__tab_active');
    }

    catalogTabs.forEach((tab, index) => {

        if (tab.classList.contains('catalog__tab_active')) {
            catalogCardWrappers[index].classList.add('catalog__card-wrapper_active');
        }

        tab.addEventListener('click', event => {
            event.preventDefault();

            if (!tab.classList.contains('catalog__tab_active')) {

                // Удаление классов у элементов
                removeClass();

                tab.classList.add('catalog__tab_active');
                catalogCardWrappers[index].classList.add('catalog__card-wrapper_active');
            }
        });
    });
}

export { tab };