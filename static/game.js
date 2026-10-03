// ==========================================================
// ИГРА «ПОСЛЕДНИЙ ЭТАЖ»
// ПОЛНАЯ ЧИСТАЯ ВЕРСИЯ GAME.JS
// ==========================================================

let inventory = [];


// ==========================================================
// ОБЩИЕ ФУНКЦИИ
// ==========================================================

function getResult() {
    return document.getElementById("result");
}

function show(html) {
    const result = getResult();

    if (result) {
        result.innerHTML = html;
    }
}

function addItem(item) {
    if (!inventory.includes(item)) {
        inventory.push(item);
    }

    updateInventory();
}

function hasItem(item) {
    return inventory.includes(item);
}

function updateInventory() {
    const element = document.getElementById("inventory");

    if (!element) {
        return;
    }

    if (inventory.length === 0) {
        element.innerHTML = "Пусто";
    } else {
        element.innerHTML = inventory
            .map(item => "🔹 " + item)
            .join("<br>");
    }
}


// ==========================================================
// ПОДЪЕЗД
// ==========================================================

function backToEntrance() {
    show(`
        <h2>🏢 ПОДЪЕЗД</h2>

        <p>
            Вы стоите в старом заброшенном подъезде.
        </p>

        <p>
            Лампочка над головой мерцает.
        </p>

        <p>
            Перед вами находятся лифт и лестница.
        </p>

        <button onclick="lookAtLift()">
            🛗 Осмотреть лифт
        </button>

        <button onclick="lookAtStairs()">
            🪜 Осмотреть лестницу
        </button>
    `);
}


function lookAtLift() {
    show(`
        <h2>🛗 ЛИФТ</h2>

        <p>
            Старый лифт не работает.
        </p>

        <p>
            На панели нет питания.
        </p>

        <button onclick="openPanel()">
            ⚡ Осмотреть электрическую панель
        </button>

        <hr>

        <button onclick="backToEntrance()">
            ← Вернуться в подъезд
        </button>
    `);
}


function lookAtStairs() {

    show(`
        <h2>🪜 ЛЕСТНИЦА</h2>

        <p>
            Лестница ведёт на верхние этажи.
        </p>

        <p>
            Вы начинаете подниматься...
        </p>

        <button onclick="scaryShadow()">
            🔦 Посветить вверх
        </button>

        <button onclick="backToEntrance()">
            ← Вернуться в подъезд
        </button>
    `);

    setTimeout(function () {
        jumpscare();
    }, 800);
}

// ==========================================================
// ЭЛЕКТРИЧЕСКАЯ ПАНЕЛЬ
// ==========================================================

function openPanel() {
    show(`
        <h2>⚡ ЭЛЕКТРИЧЕСКАЯ ПАНЕЛЬ</h2>

        <p>
            Внутри находятся три выключателя.
        </p>

        <p>
            Только один восстановит питание.
        </p>

        <button onclick="switchPower(1)">
            Выключатель №1
        </button>

        <button onclick="switchPower(2)">
            Выключатель №2
        </button>

        <button onclick="switchPower(3)">
            Выключатель №3
        </button>

        <div id="panelResult"></div>

        <hr>

        <button onclick="lookAtLift()">
            ← Вернуться к лифту
        </button>
    `);
}


function switchPower(number) {
    const result = document.getElementById("panelResult");

    if (!result) {
        return;
    }

    if (number === 2) {

        addItem("Батарейка");

        result.innerHTML = `
            <p>⚡ Питание восстановлено!</p>

            <p>
                Лифт снова работает.
            </p>

            <p>
                Внутри панели вы нашли батарейку.
            </p>

            <button onclick="returnToElevator()">
                🛗 Перейти к лифту
            </button>
        `;

    } else {

        result.innerHTML = `
            <p>❌ Ничего не произошло.</p>

            <p>
                Попробуйте другой выключатель.
            </p>
        `;
    }
}


// ==========================================================
// ЛИФТ
// ==========================================================

function returnToElevator() {
    show(`
        <h2>🛗 ЛИФТ</h2>

        <p>
            Вы снова стоите перед панелью лифта.
        </p>

        <p>
            Некоторые кнопки выглядят странно.
        </p>

        <button onclick="goToFloor(4)">
            4 этаж
        </button>

        <button onclick="goToFloor(7)">
            7 этаж
        </button>

        <button onclick="goToFloor(8)">
            8 этаж
        </button>

        <button onclick="goToFloor(9)">
            9 этаж
        </button>

        <button onclick="goToFloor(12)">
            12 этаж
        </button>

        <button onclick="inspectElevatorPanel()">
            🔎 Внимательно осмотреть панель
        </button>

        <hr>

        <button onclick="backToEntrance()">
            ← Выйти из лифта
        </button>
    `);
}


function inspectElevatorPanel() {
    show(`
        <h2>🔎 ПАНЕЛЬ ЛИФТА</h2>

        <p>
            Вы внимательно осматриваете панель.
        </p>

        <p>
            Под кнопками этажей есть небольшой металлический шов.
        </p>

        <p>
            Раньше вы его не замечали.
        </p>

        <button onclick="openHiddenPanel()">
            🔧 Попробовать открыть
        </button>

        <hr>

        <button onclick="returnToElevator()">
            ← Вернуться
        </button>
    `);
}


function openHiddenPanel() {

    if (!hasItem("Неизвестный ключ")) {

        show(`
            <h2>🔒 СКРЫТАЯ ПАНЕЛЬ</h2>

            <p>
                Здесь находится маленький замок.
            </p>

            <p>
                Нужен необычный ключ.
            </p>

            <button onclick="returnToElevator()">
                ← Вернуться
            </button>
        `);

        return;
    }

    show(`
        <h2>🔓 СКРЫТАЯ ПАНЕЛЬ</h2>

        <p>
            Неизвестный ключ идеально подходит.
        </p>

        <p>
            Щёлк.
        </p>

        <p>
            Панель открывается.
        </p>

        <p>
            За ней находится маленькая чёрная кнопка.
        </p>

        <button onclick="pressHiddenButton()">
            ⚫ Нажать кнопку
        </button>

        <button onclick="returnToElevator()">
            ← Вернуться
        </button>
    `);
}


function pressHiddenButton() {
    show(`
        <h2>⚠️ СКРЫТЫЙ РЕЖИМ</h2>

        <p>
            Лифт начинает двигаться.
        </p>

        <p>
            Ни один индикатор этажа не загорается.
        </p>

        <p>
            Вы понимаете, что лифт едет выше 12 этажа.
        </p>

        <p>
            Динь...
        </p>

        <button onclick="enterTechnicalFloor()">
            🚪 Открыть двери
        </button>
    `);
}


// ==========================================================
// ПОЕЗДКА НА ЭТАЖ
// ==========================================================

function goToFloor(floor) {
    show(`
        <h2>🔔 ${floor} ЭТАЖ</h2>

        <p>
            Лифт поднимается...
        </p>

        <p>
            Динь...
        </p>

        <p>
            Двери открылись.
        </p>

        <button onclick="openFloorDoor(${floor})">
            🚪 Выйти из лифта
        </button>
    `);
}


// ==========================================================
// ЭТАЖИ
// ==========================================================

function openFloorDoor(floor) {

    if (floor === 8) {

        if (hasItem("Ключ от 8 этажа")) {

            show(`
                <h2>🏢 8 ЭТАЖ</h2>

                <p>
                    Перед вами служебная дверь.
                </p>

                <p>
                    Ключ подходит.
                </p>

                <button onclick="enterFloor8()">
                    🔑 Открыть дверь
                </button>

                <button onclick="returnToElevator()">
                    ← Вернуться к лифту
                </button>
            `);

        } else {

            show(`
                <h2>🏢 8 ЭТАЖ</h2>

                <p>
                    🔒 Служебная дверь заперта.
                </p>

                <p>
                    Нужен специальный ключ.
                </p>

                <button onclick="returnToElevator()">
                    ← Вернуться к лифту
                </button>
            `);
        }

        return;
    }


    if (floor === 12) {

        if (hasItem("Красная карта")) {
            enterFloor12();
        } else {

            show(`
                <h2>🏢 12 ЭТАЖ</h2>

                <p>
                    На выходе установлен считыватель.
                </p>

                <p>
                    🔴 Нужна красная карта доступа.
                </p>

                <button onclick="returnToElevator()">
                    ← Вернуться к лифту
                </button>
            `);
        }

        return;
    }


    show(`
        <h2>🏢 ${floor} ЭТАЖ</h2>

        <p>
            Перед вами длинный тёмный коридор.
        </p>

        <button onclick="searchFloor(${floor})">
            🔎 Осмотреть этаж
        </button>

        <button onclick="returnToElevator()">
            ← Вернуться к лифту
        </button>
    `);
}


function searchFloor(floor) {

    if (!hasItem("Старый ключ")) {
        addItem("Старый ключ");
    }

    show(`
        <h2>🔎 КОРИДОР ${floor} ЭТАЖА</h2>

        <p>
            Под старым ковриком вы нашли металлический предмет.
        </p>

        <p>
            Это старый ключ.
        </p>

        <button onclick="tryDoor()">
            🚪 Проверить дверь
        </button>

        <button onclick="returnToElevator()">
            ← Вернуться к лифту
        </button>
    `);
}


// ==========================================================
// КВАРТИРА 74
// ==========================================================

function tryDoor() {
    show(`
        <h2>🚪 ДВЕРЬ КВАРТИРЫ 74</h2>

        <p>
            Старый ключ подходит.
        </p>

        <p>
            Замок поворачивается.
        </p>

        <button onclick="enterRoom()">
            🏠 Войти в квартиру 74
        </button>

        <button onclick="returnToElevator()">
            ← Вернуться к лифту
        </button>
    `);
}


function enterRoom() {
    show(`
        <h2>🏠 КВАРТИРА 74</h2>

        <p>
            В квартире темно и очень тихо.
        </p>

        <p>
            Здесь находятся несколько странных предметов.
        </p>

        <button onclick="useBattery()">
            📱 Осмотреть телефон
        </button>

        <button onclick="lookAtPicture()">
            🖼️ Осмотреть картину
        </button>

        <button onclick="lookAtClock()">
            🕐 Осмотреть часы
        </button>

        <button onclick="lookAtTable()">
            📄 Осмотреть стол
        </button>

        <button onclick="lookAtSafe()">
            🔐 Осмотреть сейф
        </button>

        <button onclick="returnToElevator()">
            ← Вернуться к лифту
        </button>
    `);
}


// ==========================================================
// ТЕЛЕФОН
// ==========================================================

function useBattery() {

    if (!hasItem("Батарейка")) {

        show(`
            <h2>📱 СТАРЫЙ ТЕЛЕФОН</h2>

            <p>
                Телефон полностью разряжен.
            </p>

            <p>
                Нужна батарейка.
            </p>

            <button onclick="enterRoom()">
                ← Вернуться
            </button>
        `);

        return;
    }

    show(`
        <h2>📱 СТАРЫЙ ТЕЛЕФОН</h2>

        <p>
            Вы вставили батарейку.
        </p>

        <p>
            Телефон включился.
        </p>

        <div class="note">
            «ПЕРВАЯ ПОДСКАЗКА — 17»
        </div>

        <button onclick="enterRoom()">
            ← Вернуться
        </button>
    `);
}


// ==========================================================
// КАРТИНА
// ==========================================================

function lookAtPicture() {
    show(`
        <h2>🖼️ СТАРАЯ КАРТИНА</h2>

        <p>
            На картине изображён старый дом.
        </p>

        <p>
            В углу картины вы замечаете цифру:
        </p>

        <h1>7</h1>

        <p>
            Возможно, она понадобится позже.
        </p>

        <button onclick="enterRoom()">
            ← Вернуться
        </button>
    `);
}


// ==========================================================
// ЧАСЫ
// ==========================================================

function lookAtClock() {
    show(`
        <h2>🕐 СТАРЫЕ ЧАСЫ</h2>

        <p>
            Часы давно остановились.
        </p>

        <p>
            Стрелки показывают:
        </p>

        <h1>17:42</h1>

        <p>
            Последние две цифры выглядят важными.
        </p>

        <button onclick="enterRoom()">
            ← Вернуться
        </button>
    `);
}


// ==========================================================
// СТОЛ
// ==========================================================

function lookAtTable() {
    show(`
        <h2>📄 СТАРЫЙ СТОЛ</h2>

        <p>
            На столе лежит пожелтевшая записка.
        </p>

        <div class="note">
            «То, что остановилось,
            помнит правильный порядок».
        </div>

        <p>
            На обратной стороне:
        </p>

        <div class="note">
            КАРТИНА → ЧАСЫ → ТЕЛЕФОН
        </div>

        <button onclick="enterRoom()">
            ← Вернуться
        </button>
    `);
}


// ==========================================================
// СЕЙФ КВАРТИРЫ
// ==========================================================

function lookAtSafe() {
    show(`
        <h2>🔐 СТАРЫЙ СЕЙФ</h2>

        <p>
            На сейфе четырёхзначный кодовый замок.
        </p>

        <p>
            Подсказки находятся в квартире.
        </p>

        <input
            id="safeCode"
            maxlength="4"
            placeholder="КОД"
        >

        <br><br>

        <button onclick="checkSafe()">
            🔓 Открыть сейф
        </button>

        <div id="safeResult"></div>

        <hr>

        <button onclick="enterRoom()">
            ← Вернуться
        </button>
    `);
}


function checkSafe() {
    const input = document.getElementById("safeCode");

    if (!input) {
        return;
    }

    const code = input.value.trim();

    if (code === "7742") {

        addItem("Ключ от 8 этажа");

        document.getElementById("safeResult").innerHTML = `
            <p>🔓 <b>СЕЙФ ОТКРЫТ!</b></p>

            <p>
                Внутри лежит старый ключ.
            </p>

            <p>
                На бирке написано:
            </p>

            <h2>8 ЭТАЖ</h2>

            <button onclick="returnToElevator()">
                🛗 Вернуться к лифту
            </button>
        `;

    } else {

        document.getElementById("safeResult").innerHTML = `
            <p>❌ Неверный код.</p>

            <p>
                Осмотрите квартиру внимательнее.
            </p>
        `;
    }
}


// ==========================================================
// 8 ЭТАЖ
// ==========================================================

function enterFloor8() {
    show(`
        <h2>🏢 8 ЭТАЖ — СЛУЖЕБНОЕ ПОМЕЩЕНИЕ</h2>

        <p>
            Вы открываете дверь ключом.
        </p>

        <p>
            Внутри небольшая техническая комната.
        </p>

        <button onclick="lookAtMap()">
            🗺️ Осмотреть схему здания
        </button>

        <button onclick="lookAtLocker()">
            🚪 Осмотреть шкаф
        </button>

        <button onclick="lookAtDesk()">
            🗄️ Осмотреть стол
        </button>

        <button onclick="lookAtWall()">
            🧱 Осмотреть стену
        </button>

        <button onclick="returnToElevator()">
            ← Вернуться к лифту
        </button>
    `);
}


function lookAtMap() {
    show(`
        <h2>🗺️ СХЕМА ЗДАНИЯ</h2>

        <p>
            На стене висит старая схема здания.
        </p>

        <p>
            Несколько номеров выделены красным:
        </p>

        <h2>7 — 8 — 4</h2>

        <div class="note">
            «Не смотри на цифры.
            Смотри на их положение».
        </div>

        <button onclick="enterFloor8()">
            ← Вернуться
        </button>
    `);
}


// ==========================================================
// ШКАФ
// ==========================================================

function lookAtLocker() {
    show(`
        <h2>🚪 СТАРЫЙ ШКАФ</h2>

        <p>
            На шкафу установлен кодовый замок.
        </p>

        <p>
            Рядом выцарапано:
        </p>

        <div class="note">
            «Вспомни порядок с карты».
        </div>

        <input
            id="lockerCode"
            maxlength="4"
            placeholder="КОД"
        >

        <br><br>

        <button onclick="checkLocker()">
            🔓 Открыть шкаф
        </button>

        <div id="lockerResult"></div>

        <hr>

        <button onclick="enterFloor8()">
            ← Вернуться
        </button>
    `);
}


function checkLocker() {
    const input = document.getElementById("lockerCode");

    if (!input) {
        return;
    }

    const code = input.value.trim();

    if (code === "7874") {

        addItem("Красная карта");

        document.getElementById("lockerResult").innerHTML = `
            <p>🔓 <b>ШКАФ ОТКРЫТ!</b></p>

            <p>
                Внутри находится красная карта доступа.
            </p>

            <h2>12 ЭТАЖ</h2>

            <button onclick="returnToElevator()">
                🛗 Вернуться к лифту
            </button>
        `;

    } else {

        document.getElementById("lockerResult").innerHTML = `
            <p>❌ Неверный код.</p>

            <p>
                Нужно исследовать комнату.
            </p>
        `;
    }
}


// ==========================================================
// СТОЛ 8 ЭТАЖА
// ==========================================================

function lookAtDesk() {
    show(`
        <h2>🗄️ СТАРЫЙ СТОЛ</h2>

        <p>
            На столе лежит лист бумаги.
        </p>

        <div class="note">
            «Если хочешь найти следующий путь,
            сначала посмотри на то,
            что никогда не открывается».
        </div>

        <p>
            Странная подсказка.
        </p>

        <button onclick="enterFloor8()">
            ← Вернуться
        </button>
    `);
}


// ==========================================================
// СТЕНА
// ==========================================================

function lookAtWall() {
    show(`
        <h2>🧱 СТЕНА</h2>

        <p>
            На стене находится длинная трещина.
        </p>

        <p>
            Вы проводите рукой по стене.
        </p>

        <p>
            Из трещины выпадает металлическая пластинка.
        </p>

        <div class="note">
            На ней выгравировано:
            <br><br>
            <b>2</b>
        </div>

        <p>
            Возможно, это последняя цифра какого-то кода.
        </p>

        <button onclick="enterFloor8()">
            ← Вернуться
        </button>
    `);
}


// ==========================================================
// 12 ЭТАЖ
// ==========================================================

function enterFloor12() {

    show(`
        <h2>🔴 12 ЭТАЖ</h2>

        <p>
            Красная карта сработала.
        </p>

        <p>
            Перед вами совершенно другой коридор.
        </p>

        <p>
            Здесь нет квартир.
        </p>

        <p>
            В конце находится тяжёлая металлическая дверь.
        </p>

        <button onclick="lookAtDoor12()">
            🚪 Осмотреть дверь
        </button>

        <button onclick="lookAtCamera12()">
            📹 Осмотреть камеру
        </button>

        <button onclick="lookAtPanel12()">
            🔢 Осмотреть панель
        </button>

        <hr>

        <button onclick="returnToElevator()">
            ← Вернуться к лифту
        </button>
    `);

    setTimeout(function () {
        jumpscare();
    }, 2500);
}


function lookAtDoor12() {
    show(`
        <h2>🚪 МЕТАЛЛИЧЕСКАЯ ДВЕРЬ</h2>

        <p>
            Дверь полностью закрыта.
        </p>

        <p>
            Обычного замка нет.
        </p>

        <p>
            На двери выгравировано:
        </p>

        <div class="note">
            «Тот, кто видит тебя,
            знает правильный путь».
        </div>

        <button onclick="enterFloor12()">
            ← Вернуться
        </button>
    `);
}


function lookAtCamera12() {
    show(`
        <h2>📹 КАМЕРА</h2>

        <p>
            Старая камера наблюдения смотрит прямо на вас.
        </p>

        <p>
            На корпусе камеры есть наклейка:
        </p>

        <div class="note">
            04 — 17 — 29
        </div>

        <p>
            Возможно, это подсказка.
        </p>

        <button onclick="enterFloor12()">
            ← Вернуться
        </button>
    `);
}


// ==========================================================
// ПАНЕЛЬ 12 ЭТАЖА
// ==========================================================

function lookAtPanel12() {
    show(`
        <h2>🔢 ЭЛЕКТРОННАЯ ПАНЕЛЬ</h2>

        <p>
            Панель требует четырёхзначный код.
        </p>

        <input
            id="doorCode12"
            maxlength="4"
            placeholder="КОД"
        >

        <br><br>

        <button onclick="checkDoor12()">
            🔓 Ввести код
        </button>

        <div id="doorResult12"></div>

        <hr>

        <button onclick="enterFloor12()">
            ← Вернуться
        </button>
    `);
}


function checkDoor12() {
    const input = document.getElementById("doorCode12");

    if (!input) {
        return;
    }

    const code = input.value.trim();

    if (code === "0417") {

        document.getElementById("doorResult12").innerHTML = `
            <p>🔓 <b>КОД ПРИНЯТ.</b></p>

            <p>
                Металлическая дверь открывается.
            </p>

            <button onclick="enterSecretRoom()">
                🚪 Войти внутрь
            </button>
        `;

    } else {

        document.getElementById("doorResult12").innerHTML = `
            <p>❌ Неверный код.</p>

            <p>
                Нужно внимательнее исследовать 12 этаж.
            </p>
        `;
    }
}


// ==========================================================
// СЕКРЕТНАЯ КОМНАТА
// ==========================================================

function enterSecretRoom() {
    show(`
        <h2>🔴 СЕКРЕТНАЯ КОМНАТА</h2>

        <p>
            Дверь закрывается за вашей спиной.
        </p>

        <p>
            В центре комнаты стоит большой металлический сейф.
        </p>

        <p>
            На нём четыре вращающихся диска.
        </p>

        <button onclick="lookAtFinalSafe()">
            🔐 Осмотреть сейф
        </button>

        <button onclick="returnToElevator()">
            ← Вернуться к лифту
        </button>
    `);
}


// ==========================================================
// БОЛЬШОЙ СЕЙФ
// ==========================================================

function lookAtFinalSafe() {
    show(`
        <h2>🔐 БОЛЬШОЙ МЕТАЛЛИЧЕСКИЙ СЕЙФ</h2>

        <p>
            На каждом диске цифры от 0 до 9.
        </p>

        <div class="note">
            «Первое скрыто там, где всё началось.<br>
            Второе — там, где время остановилось.<br>
            Третье — там, где ты увидел меня.<br>
            Четвёртое — там, куда ты ещё не заглянул».
        </div>

        <br>

        <input
            id="finalCode"
            maxlength="4"
            placeholder="КОД"
        >

        <br><br>

        <button onclick="checkFinalSafe()">
            🔓 Повернуть диски
        </button>

        <div id="finalSafeResult"></div>

        <hr>

        <button onclick="enterSecretRoom()">
            ← Вернуться
        </button>
    `);
}


function checkFinalSafe() {
    const input = document.getElementById("finalCode");

    if (!input) {
        return;
    }

    const code = input.value.trim();

    if (code === "7429") {

        document.getElementById("finalSafeResult").innerHTML = `
            <p>🔓 <b>СЕЙФ ОТКРЫТ!</b></p>

            <p>
                Диски останавливаются один за другим.
            </p>

            <p>
                Внутри находится металлический контейнер.
            </p>

            <button onclick="openContainer()">
                📦 Открыть контейнер
            </button>
        `;

    } else {

        document.getElementById("finalSafeResult").innerHTML = `
            <p>❌ Неверная комбинация.</p>

            <p>
                Подсказки нужно сопоставить внимательнее.
            </p>
        `;
    }
}


// ==========================================================
// КОНТЕЙНЕР
// ==========================================================

function openContainer() {
    show(`
        <h2>📦 МЕТАЛЛИЧЕСКИЙ КОНТЕЙНЕР</h2>

        <p>
            Крышка медленно открывается.
        </p>

        <p>
            Внутри лежит старая фотография здания.
        </p>

        <div class="note">
            «12 этаж — это только начало».
        </div>

        <p>
            Рядом лежит неизвестный металлический ключ.
        </p>

        <button onclick="takeFinalKey()">
            🔑 Забрать ключ
        </button>
    `);
}


function takeFinalKey() {

    addItem("Неизвестный ключ");

    show(`
        <h2>🔑 НЕИЗВЕСТНЫЙ КЛЮЧ</h2>

        <p>
            Вы забираете ключ.
        </p>

        <p>
            На обратной стороне выгравировано:
        </p>

        <div class="note">
            «Ищи там, где лифт никогда не останавливается».
        </div>

        <p>
            Вы возвращаетесь к лифту.
        </p>

        <button onclick="returnToElevator()">
            🛗 Вернуться к лифту
        </button>
    `);
}


// ==========================================================
// ТЕХНИЧЕСКИЙ ЭТАЖ
// ==========================================================

function enterTechnicalFloor() {
    show(`
        <h2>⚙️ ТЕХНИЧЕСКИЙ ЭТАЖ</h2>

        <p>
            Двери лифта открываются.
        </p>

        <p>
            Здесь нет квартир и окон.
        </p>

        <p>
            Только бетонные стены, трубы и старое оборудование.
        </p>

        <p>
            Перед вами три направления.
        </p>

        <button onclick="inspectGenerator()">
            ⚡ Генераторная
        </button>

        <button onclick="inspectControlRoom()">
            🖥️ Пульт управления
        </button>

        <button onclick="inspectCorridor()">
            🚪 Северный коридор
        </button>

        <button onclick="returnToElevator()">
            ← Вернуться к лифту
        </button>
    `);
}


function backToElevator() {
    returnToElevator();
}


// ==========================================================
// ГЕНЕРАТОРНАЯ
// ==========================================================

function inspectGenerator() {
    show(`
        <h2>⚡ ГЕНЕРАТОРНАЯ</h2>

        <p>
            В комнате стоит старый промышленный генератор.
        </p>

        <p>
            Над переключателями написано:
        </p>

        <div class="note">
            «Сначала жёлтый.<br>
            Потом зелёный.<br>
            Красный — последний».
        </div>

        <button onclick="generatorSwitch(1)">
            🔴 Красный
        </button>

        <button onclick="generatorSwitch(2)">
            🟡 Жёлтый
        </button>

        <button onclick="generatorSwitch(3)">
            🟢 Зелёный
        </button>

        <div id="generatorResult"></div>

        <hr>

        <button onclick="enterTechnicalFloor()">
            ← Вернуться
        </button>
    `);
}


function generatorSwitch(number) {
    const result = document.getElementById("generatorResult");

    if (!result) {
        return;
    }

    if (number === 2) {

        result.innerHTML = `
            <p>🟡 Жёлтый активирован.</p>

            <button onclick="generatorSecondStep()">
                Продолжить
            </button>
        `;

    } else {

        result.innerHTML = `
            <p>❌ Неправильно.</p>

            <p>
                Генератор издал громкий щелчок.
            </p>

            <button onclick="inspectGenerator()">
                🔄 Попробовать снова
            </button>
        `;
    }
}


function generatorSecondStep() {

    const result = document.getElementById("generatorResult");

    if (!result) {
        return;
    }

    result.innerHTML = `
        <p>
            Второй переключатель...
        </p>

        <button onclick="generatorThirdStep(3)">
            🟢 Зелёный
        </button>

        <button onclick="generatorThirdStep(1)">
            🔴 Красный
        </button>
    `;
}


function generatorThirdStep(number) {

    const result = document.getElementById("generatorResult");

    if (!result) {
        return;
    }

    if (number === 3) {

        result.innerHTML = `
            <p>🟢 Зелёный активирован.</p>

            <p>
                Остался последний.
            </p>

            <button onclick="finishGenerator()">
                🔴 Включить красный
            </button>
        `;

    } else {

        result.innerHTML = `
            <p>❌ Неправильная последовательность.</p>

            <button onclick="inspectGenerator()">
                🔄 Начать заново
            </button>
        `;
    }
}


function finishGenerator() {

    addItem("Предохранитель");

    const result = document.getElementById("generatorResult");

    if (!result) {
        return;
    }

    result.innerHTML = `
        <h3>⚡ ГЕНЕРАТОР ЗАПУЩЕН</h3>

        <p>
            В здании включается электричество.
        </p>

        <p>
            Где-то далеко загорается зелёный индикатор.
        </p>

        <p>
            Вы нашли запасной предохранитель.
        </p>

        <button onclick="enterTechnicalFloor()">
            ← Вернуться
        </button>
    `;
}


// ==========================================================
// ПУЛЬТ УПРАВЛЕНИЯ
// ==========================================================

function inspectControlRoom() {
    show(`
        <h2>🖥️ ПУЛЬТ УПРАВЛЕНИЯ</h2>

        <p>
            Старый монитор не работает.
        </p>

        <p>
            Рядом находится пустой разъём.
        </p>

        <p>
            Кажется, сюда должен вставляться предохранитель.
        </p>

        <button onclick="insertFuse()">
            ⚡ Вставить предохранитель
        </button>

        <div id="controlResult"></div>

        <hr>

        <button onclick="enterTechnicalFloor()">
            ← Вернуться
        </button>
    `);
}


function insertFuse() {

    const result = document.getElementById("controlResult");

    if (!result) {
        return;
    }

    if (!hasItem("Предохранитель")) {

        result.innerHTML = `
            <p>❌ У вас нет предохранителя.</p>

            <p>
                Найдите его в генераторной.
            </p>
        `;

        return;
    }

    result.innerHTML = `
        <p>⚡ Предохранитель установлен.</p>

        <p>
            Монитор начинает работать.
        </p>

        <div class="note">
            СИСТЕМА ВОССТАНОВЛЕНА<br><br>

            СЕВЕРНЫЙ КОРИДОР — ОТКРЫТ<br>
            ДВЕРЬ №13 — АКТИВНА
        </div>

        <button onclick="inspectCorridor()">
            🚪 Идти в северный коридор
        </button>
    `;
}


// ==========================================================
// СЕВЕРНЫЙ КОРИДОР
// ==========================================================

function inspectCorridor() {
    show(`
        <h2>🚪 СЕВЕРНЫЙ КОРИДОР</h2>

        <p>
            Теперь здесь горит аварийное освещение.
        </p>

        <p>
            В конце коридора находится металлическая дверь.
        </p>

        <div class="note">
            ДВЕРЬ №13
        </div>

        <button onclick="inspectCorridorDoor()">
            🔎 Осмотреть дверь
        </button>

        <button onclick="enterTechnicalFloor()">
            ← Вернуться
        </button>
    `);
}


// ==========================================================
// ДВЕРЬ №13
// ==========================================================

function inspectCorridorDoor() {
    show(`
        <h2>🚪 ДВЕРЬ №13</h2>

        <p>
            Дверь полностью металлическая.
        </p>

        <p>
            На ней нет ручки.
        </p>

        <p>
            Только электронная панель.
        </p>

        <div class="note">
            «НЕ ПЫТАЙСЯ ОТКРЫТЬ.<br>
            СНАЧАЛА ПОСМОТРИ ВНИЗ».
        </div>

        <button onclick="lookUnderDoor()">
            🔎 Посмотреть под дверь
        </button>

        <button onclick="inspectCorridor()">
            ← Вернуться
        </button>
    `);
}


function lookUnderDoor() {

    if (hasItem("Жетон №13")) {

        show(`
            <h2>🔎 ПОД ДВЕРЬЮ</h2>

            <p>
                Здесь больше ничего нет.
            </p>

            <button onclick="inspectCorridorDoor()">
                ← Вернуться
            </button>
        `);

        return;
    }

    show(`
        <h2>🔎 ПОД ДВЕРЬЮ</h2>

        <p>
            Под дверью лежит небольшой металлический жетон.
        </p>

        <div class="note">
            13 ▲
        </div>

        <p>
            На обратной стороне выгравировано:
        </p>

        <div class="note">
            «Треугольник показывает путь».
        </div>

        <button onclick="takeToken()">
            🪙 Забрать жетон
        </button>

        <button onclick="inspectCorridor()">
            ← Вернуться
        </button>
    `);
}


function takeToken() {

    addItem("Жетон №13");

    show(`
        <h2>🪙 ЖЕТОН №13</h2>

        <p>
            Вы поднимаете жетон.
        </p>

        <p>
            На обратной стороне появляется новая надпись:
        </p>

        <div class="note">
            «Треугольник показывает путь».
        </div>

        <p>
            Вы смотрите вверх.
        </p>

        <p>
            На потолке замечаете маленький треугольный знак.
        </p>

        <button onclick="followTriangle()">
            🔺 Следовать за знаком
        </button>
    `);
}


// ==========================================================
// СКРЫТЫЙ ПРОХОД
// ==========================================================

function followTriangle() {
    show(`
        <h2>🔺 СКРЫТЫЙ ПРОХОД</h2>

        <p>
            Вы замечаете узкую металлическую дверь в стене.
        </p>

        <p>
            Рядом находится треугольный замок.
        </p>

        <p>
            Жетон идеально подходит.
        </p>

        <button onclick="openTriangleDoor()">
            🔓 Вставить жетон
        </button>

        <button onclick="inspectCorridor()">
            ← Вернуться
        </button>
    `);
}


function openTriangleDoor() {
    show(`
        <h2>🚪 СКРЫТЫЙ ПРОХОД</h2>

        <p>
            Раздаётся тяжёлый металлический щелчок.
        </p>

        <p>
            Стена медленно отъезжает.
        </p>

        <p>
            За ней находится лестница, уходящая ещё выше.
        </p>

        <p>
            На стене написано:
        </p>

        <div class="note">
            «ЕСЛИ ТЫ ДОШЁЛ СЮДА —
            ЗНАЧИТ, ТЫ УЖЕ ВНУТРИ».
        </div>

        <button onclick="climbFinalStairs()">
            🪜 Подняться выше
        </button>
    `);
}


// ==========================================================
// ФИНАЛ
// ==========================================================

function climbFinalStairs() {
    
    playFootsteps();

    show(`
        <h2>⬆️ ВЕРХНИЙ УРОВЕНЬ</h2>

        <p>
            Вы поднимаетесь по лестнице.
        </p>

        <p>
            На последней ступени вы замечаете дверь.
        </p>

        <p>
            На двери нет номера.
        </p>

        <p>
            Только одна надпись:
        </p>

        <div class="note">
            «НЕ ОГЛЯДЫВАЙСЯ».
        </div>

        <button onclick="openFinalDoor()">
            🚪 Открыть дверь
        </button>
    `);
}


function openFinalDoor() {
    show(`
        <h2>🚪 ПОСЛЕДНЯЯ ДВЕРЬ</h2>

        <p>
            Дверь открывается без ключа.
        </p>

        <p>
            За ней находится небольшая комната.
        </p>

        <p>
            В центре стоит старый монитор.
        </p>

        <p>
            На экране появляется:
        </p>

        <div class="note">
            «ТЫ ИСКАЛ ВЫХОД.<br><br>
            НО ЗДАНИЕ ИСКАЛО ТЕБЯ».
        </div>

        <button onclick="activateFinalTerminal()">
            🖥️ Включить монитор
        </button>
    `);
}


// ==========================================================
// ФИНАЛЬНЫЙ ТЕРМИНАЛ
// ==========================================================

function activateFinalTerminal() {
    show(`
        <h2>🖥️ ТЕРМИНАЛ</h2>

        <p>
            Монитор включается.
        </p>

        <p>
            На экране появляется четыре символа:
        </p>

        <h1>▲ 7 4 2</h1>

        <p>
            Затем появляется сообщение:
        </p>

        <div class="note">
            «Введи то, что уже видел».
        </div>

        <input
            id="endingCode"
            maxlength="4"
            placeholder="КОД"
        >

        <br><br>

        <button onclick="checkEndingCode()">
            🔓 Ввести код
        </button>

        <div id="endingResult"></div>
    `);
}


function checkEndingCode() {

    const input = document.getElementById("endingCode");

    if (!input) {
        return;
    }

    const code = input.value.trim();

    if (code === "7429") {

        document.getElementById("endingResult").innerHTML = `
            <p>✅ КОД ПРИНЯТ.</p>

            <p>
                Все системы здания отключаются.
            </p>

            <p>
                Где-то внизу открывается главный выход.
            </p>

            <button onclick="trueEnding()">
                🚪 Идти к выходу
            </button>
        `;

    } else {

        document.getElementById("endingResult").innerHTML = `
            <p>❌ Код неверный.</p>

            <p>
                Вспомните предметы и цифры,
                которые встречались вам раньше.
            </p>
        `;
    }
}


// ==========================================================
// ИСТИННЫЙ ФИНАЛ
// ==========================================================

function trueEnding() {
    show(`
        <h2>🌅 ИСТИННЫЙ ФИНАЛ</h2>

        <p>
            Вы спускаетесь обратно.
        </p>

        <p>
            Лифт впервые за всё время работает совершенно бесшумно.
        </p>

        <p>
            Двери открываются на первом этаже.
        </p>

        <p>
            Главная дверь подъезда распахнута.
        </p>

        <p>
            Вы выходите наружу.
        </p>

        <p>
            На улице уже рассвет.
        </p>

        <div class="note">
            «Некоторые двери открываются ключом.<br>
            Некоторые — правильным ответом.<br><br>

            А некоторые открываются только тогда,
            когда ты решаешься войти».
        </div>

        <h1>🏆 КОНЕЦ</h1>

        <p>
            Вы прошли всю игру.
        </p>

        <button onclick="restartGame()">
            🔄 Начать заново
        </button>
    `);
}


// ==========================================================
// ПЕРЕЗАПУСК
// ==========================================================

function restartGame() {

    inventory = [];

    updateInventory();

    show(`
        <h2>🏢 СТАРЫЙ ПОДЪЕЗД</h2>

        <p>
            Вы снова стоите перед старым лифтом.
        </p>

        <p>
            На этот раз вы знаете,
            что здание скрывает гораздо больше,
            чем кажется.
        </p>

        <button onclick="lookAtLift()">
            🛗 Начать расследование
        </button>

        <button onclick="lookAtStairs()">
            🪜 Осмотреть лестницу
        </button>
    `);
}


// ==========================================================
// ХОРРОР-ЭФФЕКТЫ
// ==========================================================

function horrorFlash() {

    const flash = document.createElement("div");

    flash.style.position = "fixed";
    flash.style.left = "0";
    flash.style.top = "0";
    flash.style.width = "100%";
    flash.style.height = "100%";
    flash.style.background = "rgba(120, 0, 0, 0.8)";
    flash.style.zIndex = "99999";
    flash.style.pointerEvents = "none";

    document.body.appendChild(flash);

    setTimeout(function () {
        flash.remove();
    }, 250);
}


function scaryShadow() {

    const shadow = document.createElement("div");

    shadow.innerHTML = "👤";

    shadow.style.position = "fixed";
    shadow.style.left = "50%";
    shadow.style.top = "50%";
    shadow.style.transform = "translate(-50%, -50%)";
    shadow.style.fontSize = "180px";
    shadow.style.zIndex = "100000";
    shadow.style.pointerEvents = "none";

    document.body.appendChild(shadow);

    setTimeout(function () {
        shadow.remove();
    }, 700);
}


function jumpscare() {

    const scare = document.createElement("div");

    scare.style.position = "fixed";
    scare.style.inset = "0";
    scare.style.background = "black";
    scare.style.display = "flex";
    scare.style.alignItems = "center";
    scare.style.justifyContent = "center";
    scare.style.zIndex = "999999";
    scare.style.pointerEvents = "none";
    scare.style.overflow = "hidden";

    scare.innerHTML = `
        <img
            src="/static/scary.png"
            style="
                width:100%;
                height:100%;
                object-fit:cover;
            "
        >
    `;

    document.body.appendChild(scare);

    // 🔊 КРИК
    const sound = document.getElementById("screamSound");

    if (sound) {
        sound.currentTime = 0;
        sound.volume = 1;
        sound.play().catch(() => {});
    }

    // 🔴 КРАСНАЯ ВСПЫШКА
    const flash = document.createElement("div");

    flash.style.position = "fixed";
    flash.style.inset = "0";
    flash.style.background = "rgba(255, 0, 0, 0.75)";
    flash.style.zIndex = "1000000";
    flash.style.pointerEvents = "none";

    document.body.appendChild(flash);

    // 😵 ТРЯСКА ЭКРАНА
    document.body.animate(
        [
            { transform: "translate(0, 0) rotate(0deg)" },
            { transform: "translate(-15px, 10px) rotate(-1deg)" },
            { transform: "translate(15px, -10px) rotate(1deg)" },
            { transform: "translate(-12px, -8px) rotate(-1deg)" },
            { transform: "translate(12px, 8px) rotate(1deg)" },
            { transform: "translate(0, 0) rotate(0deg)" }
        ],
        {
            duration: 600,
            iterations: 2
        }
    );

    // 🔥 Убираем вспышку
    setTimeout(function () {
        flash.remove();
    }, 180);

    // 👹 Убираем скример
    setTimeout(function () {
        scare.remove();
    }, 1200);
}

// ==========================================================
// ЗАПУСК
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
    updateInventory();
});
// ==========================================================
// 🔊 ФОНОВАЯ ХОРРОР-МУЗЫКА
// ==========================================================

let horrorMusicStarted = false;

function startHorrorMusic() {

    if (horrorMusicStarted) return;

    const music = document.getElementById("horrorMusic");

    if (!music) return;

    music.volume = 0.18;

    music.play()
        .then(() => {
            horrorMusicStarted = true;
        })
        .catch(() => {});
}

document.addEventListener("click", function () {
    startHorrorMusic();
}, { once: true });
// ==========================================================
// 👣 ЗВУК ШАГОВ
// ==========================================================

function playFootsteps() {

    const sound = document.getElementById("footstepsSound");

    if (!sound) return;

    sound.currentTime = 0;
    sound.volume = 0.45;

    sound.play().catch(() => {});
}
function jumpscareWithSound() {function jumpscareWithSound() {

    const scare = document.createElement("div");

    scare.style.position = "fixed";
    scare.style.inset = "0";
    scare.style.background = "rgba(0, 0, 0, 0.95)";
    scare.style.display = "flex";
    scare.style.alignItems = "center";
    scare.style.justifyContent = "center";
    scare.style.zIndex = "999999";
    scare.style.pointerEvents = "none";

    scare.innerHTML = `
        <img
            src="/static/scary.png"
            style="
                width: 90vw;
                height: 90vh;
                object-fit: contain;
                filter: contrast(1.5) brightness(0.8);
                animation: scaryZoom 0.7s ease-out;
            "
        >
    `;

    document.body.appendChild(scare);

    const sound = document.getElementById("screamSound");

    if (sound) {
        sound.currentTime = 0;
        sound.volume = 0.9;
        sound.play().catch(() => {});
    }

    document.body.style.animation = "horrorShake 0.4s";

    setTimeout(function () {
        scare.remove();
        document.body.style.animation = "";
    }, 1500);
}

    const sound = document.getElementById("screamSound");

    if (sound) {
        sound.currentTime = 0;
        sound.volume = 0.9;
        sound.play().catch(() => {});
    }

    jumpscare();
}
const scareStyle = document.createElement("style");

scareStyle.innerHTML = `
@keyframes scareShake {
    0% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(-15px, 10px) scale(1.15); }
    50% { transform: translate(15px, -10px) scale(1.25); }
    75% { transform: translate(-10px, -15px) scale(1.15); }
    100% { transform: translate(10px, 15px) scale(1); }
}
`;

document.head.appendChild(scareStyle);