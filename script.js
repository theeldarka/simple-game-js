/** Simple JS Game by theeldarka (https://vk.com/theeldarka) */

// Игровое поле
var $game = document.querySelector('#game');

// Кнопка "Начать игру"
var $start = document.querySelector('#start');

// Счётчик времени
var $time = document.querySelector('#time');

// Блок с отображением времени до конца игры
var $time_header = document.querySelector('#time-header');

// Блок с выводом результата
var $result_header = document.querySelector('#result-header');

// Счётчик результата
var $result = document.querySelector('#result');

// Поле ввода нового времени игры
var $game_time = document.querySelector('#game-time');

// Начальное количество очков
var score = 0;

// Флаг: игра запущена
var isGameStarted = false;

// Клик по кнопке "Начать игру"
$start.addEventListener('click', startGame);

// Клик по игровому полю
$game.addEventListener('click', handleGameAreaClick);

// Изменение времени игры
$game_time.addEventListener('input', setTime);

function setTime(){

    // Игра запущена, изменение времени отключено
    if( isGameStarted ) return;

    // Получаем время из поля ввода
    var time = +$game_time.value;

    // Устанавливаем счётчик
    $time.textContent = time.toFixed(1);

    // Регулируем видимость элементов в шапке
    show( $time_header );
    hide( $result_header );
}

// Отобразить элемент
function show( $element ) {
    $element.classList.remove('hide')
}

// Скрыть элемент
function hide( $element ) {
    $element.classList.add('hide')
}

// Старт игры
function startGame(){

    // Установка времени
    setTime();

    // Переключаем флаг: игра запущена
    isGameStarted = true;
    
    // Обнуляем счётчик
    score = 0;

    // Отключаем возможность изменения времени
    $game_time.setAttribute('disabled', 'true');

    // Скрываем прокладку перед игровым полем
    $game.style.backgroundColor = '#fff';

    // Регулируем видимость элементов
    hide( $start );
    show( $time_header );
    hide( $result_header );

    // Таймер
    var interval = setInterval(function (){

        // Оставшееся время
        var time = parseFloat( $time.textContent );

        // Игра завершилась
        if( time <= 0 ) {

            // Очистка таймера
            clearInterval( interval );

            // Действия для завершения раунда
            endGame();
        }

        // Изменяем время визуально
        else $time.textContent = ( time - 0.1 ).toFixed(1);

    }, 100);
    
    // Отображаем новый квадрат
    renderBox();
}

// Клик по игровому полю
function handleGameAreaClick(event){

    // Игра запущена и элемент является квадратом
    if(isGameStarted && event.target.dataset.box){

        // Увеличиваем счёт
        score++;

        // Отображаем новый квадрат
        renderBox();

    }
}

// Отображение квадрата
function renderBox(){

    // Очистка игрового поля
    clearGameArea();

    // Создаём новый элемент
    var box = document.createElement('div');

    // Размер стороны квадрата
    var boxSize = getRandom( 20, 100 );

    // Размер игрового поля
    var gameSize = $game.getBoundingClientRect();
    
    // Установка размера квадрата
    box.style.width = box.style.height = boxSize + 'px';

    // Присваиваем квадрату случайный цвет
    box.style.backgroundColor = '#' + getRandomColor();

    // Отступ от верхнего края
    box.style.top = getRandom( 0, (gameSize.height - boxSize) ) + 'px';

    // Отступ от левого края
    box.style.left = getRandom( 0, (gameSize.width - boxSize) ) + 'px';

    // Добавляем общие стили для квадрата
    box.classList.add('box');

    // Сообщаем элементу, что это квадрат (для обработчика кликов)
    box.setAttribute('data-box', 'true');

    // Добавляем элемент сразу после открывающего тега
    $game.insertAdjacentElement('afterbegin', box)
}

// Генерация случайного числа
function getRandom(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

// Получаем случайный цвет
function getRandomColor(){
    var colors = [ '0e294b', 'ad655f', 'fafad2', '686c5e', 'fcb4d5', 'd5d5d5', '1164b4', 'c34d0a', 'ed0744', '008000' ];
    return colors[ getRandom( 0, ( colors.length - 1 ) ) ];
}

// Очистка игрового поля
function clearGameArea(){
    $game.innerHTML = '';
}

// Завершение игры
function endGame(){

    // Переключаем флаг: игра завершена.
    isGameStarted = false;

    // Разрешаем пользователю редактировать поле для ввода времени
    $game_time.removeAttribute('disabled');

    // Отображаем результат игры
    $result.textContent = score;

    // Регулируем видимость элементов
    hide( $time_header );
    show( $result_header );

    // Очистка игрового поля
    clearGameArea();

    // Возвращаем прокладку для игрового поля
    $game.style.backgroundColor = '#ccc';

    // Отображем кнопку "Начать игру" через время, чтобы случайно не кликнули
    setTimeout( function(){ show($start); }, 500 );
}