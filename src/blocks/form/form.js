// Обращение к элементам
const forms = ['[data-form=consultation]', '[data-form=promo]', '[data-form=catalog]'];
const inputs = document.querySelectorAll('.form__input');
const phones = document.querySelectorAll('[type=tel]');

// Шаблоны телефонного номера
const imPhoneMask = '+7 (999) 999-99-99';
const jvPhoneMask = new RegExp('^([+]7 [(][0-9]{3}[)] [0-9]{3}-[0-9]{2}-[0-9]{2})$');

// Минимальное и максимальное количество вводимых символов в поле name
const minLength = 3;
const maxLength = 25;

// Главная функция
function form() {
    new window.Inputmask({ mask: imPhoneMask, placeholder: ' ', showMaskOnHover: false }).mask(phones);

    forms.forEach(form => {

        let jv = new window.JustValidate(form, {
            rules: {
                name: {
                    required: true,
                    minLength: minLength,
                    maxLength: maxLength
                },
                phone: {
                    required: true,
                    phone: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: 'Пожалуйста, укажите имя',
                    minLength: `Минимальное количество символов ${minLength}`,
                    maxLength: `Максимальное количество символов ${maxLength}`
                },
                phone: {
                    required: 'Пожалуйста, укажите номер телефона',
                    phone: 'Номер телефона указан неккоректно'
                },
                email: {
                    required: 'Пожалуйста, укажите почту',
                    email: 'Почта указана неккоректно'
                }
            },
            colorWrong: '#C70101',
            // Функция, отвечающая за отправку формы, в качестве аргумента принимает текущую форму
            submitHandler: form => {

                // Отправка формы методом POST с содержанием body
                fetch('php/Mailer.php', { method: 'POST', body: new FormData(form) })
                    .then(response => {
                        // Если форма была отправлена успешно
                        if (response.ok && response.status === 200) {
                            // Инициализация переменной, которая хранит событие
                            let event = null;

                            // Если тип Event равен функции (поддержка IE 11)
                            if (typeof(Event) === 'function') {
                                // Сгенерировать новое событие со всплытием для модального окна (скрипт modal.js)
                                event = new Event('form', { bubbles: true });
                            // Если тип Event не равен функции
                            } else {
                                event = document.createEvent('Event');
                                event.initEvent('form', true, true);
                            }

                            // Прикрепить событие form к текущей форме
                            form.dispatchEvent(event);
                        }
                    })
                    .catch(error => console.error('Письмо не было отправлено: ' + error));

                // Очистка полей формы
                form.reset();
            }
        });

        // Переопределение шаблона телефонного номера
        jv.REGEXP.phone = jvPhoneMask;
    });

    inputs.forEach(input => {

        // Инициализация наблюдателя за изменениями в DOM
        let observer = new MutationObserver(mutationRecords => {
            // Для каждого изменения в DOM
            mutationRecords.forEach(mutation => {

                // Если изменение произошло в атрибуте И имя атрибута = 'class'
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {

                    // Если DOM элемент имеет класс 'js-validate-error-field'
                    if (mutation.target.classList.contains('js-validate-error-field')) {
                        // Добавить следующему DOM элементу классы 'font' и 'font_museo-sans'
                        mutation.target.nextSibling.classList.add('font', 'font_museo-sans');
                    }
                }
            });
        });
    
        // Добавление наблюдателя за изменениями в DOM к каждому input, с параметром слежения за изменениями атрибутов
        observer.observe(input, { attributes: true });
    });
}

export { form };