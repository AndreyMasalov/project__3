'use strict';

// Импорт библиотек
import 'inputmask';
import 'whatwg-fetch';
import 'core-js/es/promise/index.js';
import 'core-js/es/array/includes.js';
import 'just-validate/dist/js/just-validate.js';
import smoothscroll from 'smoothscroll-polyfill';

// Импорт скриптов
import * as promo from '../blocks/promo/promo.js';
import * as form from '../blocks/form/form.js'
import * as modal from '../blocks/modal/modal.js';
import * as slider from '../blocks/slider/slider.js';
import * as catalog from '../blocks/catalog/catalog.js';
import * as card from '../blocks/card/card.js';
import * as up from '../blocks/up/up.js';

window.addEventListener('DOMContentLoaded', () => {

    // Вызов полифила 'smoothscroll-polyfill'
    smoothscroll.polyfill();

    // Вызов функции отвечающей за плавный скролл к внутренней ссылке
    promo.scroll();

    // Вызов функции отвечающей за валидацию полей формы
    form.form();

    // Вызов функции отвечающей за работу модальных окон
    modal.modal();

    // Вызов функции отвечающей за работу слайдера
    slider.slider({ slidesToShow: 1, slidesToScroll: 1 });

    // Вызов функции отвечающей за переключение табов
    catalog.tab();

    // Вызов функции отвечающей за работу карточки товара
    card.card();

    // Вызов функции отвечающей за работу кнопки "наверх"
    up.up();

});