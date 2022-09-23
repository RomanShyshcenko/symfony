//Файл для обучения js
// https://itgid.info/course/javascript-2
// 1-й урок
// console.log('Hell');
// alert('Zdorovo');
document.getElementById('out').innerHTML = 'Hello';//<div id="out">111111111</div>
document.querySelector('h2.header').innerHTML = 5;//<h2 class="header">Hello2</h2>
document.querySelector('.header').innerHTML = 15;//<h2 class="header">Hello2</h2>
document.querySelector('#one').innerHTML = 777; //id="one"

let a = document.getElementById('out');
let c;
c = document.querySelector('h2.header');

a.innerHTML = '9999';
c.innerHTML = 'sssss';

// =======2 Urok

// <input type="number" class="input-in" value="">
//     <button id="butt-on">Go</button>
//     <div class="out"></div>


let a = 'Ddddd';
console.log(a);
let inputIn = document.querySelector('.input-in');
let button = document.querySelector('#butt-on');
let div = document.querySelector('.out');

button.onclick = function () {
    console.log('Rabotaet');
    // console.log(inputIn.value)
    let b = +inputIn.value;
    console.log(b + 10);
    div.innerHTML = b;
    inputIn.value = '';

}

// =======3 Urok

//     <label for="">Enter age</label>
// <input class="age" type="text" value="">
//     <button class="butt-on">Ok</button>


const buttOn = document.querySelector('.butt-on');
const input = document.querySelector('.age');

buttOn.onclick = () => {
    let num = +input.value;
    if (num >= 16 && num<= 100) {
        console.log('Welcome');
    }
    else if (num > 100) {
        console.log('Ha Ha Ha )))');
    }
    else {
        console.log('Error');
    }

}
// =======4 Urok
// {#    <input id="onePassword" type="range" min="0" max="200" value="30">#}
// {#    <button class="but-on">Push</button>#}
//     {#    <span class="sp-an">30</span>#}
//         {#    <hr>#}
//
//     <input type="checkbox" id="i2" value="Hello"> <label for="i2">Click me</label>
//     <button id="btn-1">Push</button>
//
//         <hr>
//
//         <form id="form" action="">
//         <textarea id="two" cols="30" rows="10" name="n1"></textarea>
//         <input type="text" id="three" name="n2">
//         <button id="btn-2">Push</button>
//         </form>


document.querySelector('.but-on').onclick = () => {
    console.log(document.querySelector('#onePassword').value);

    document.querySelector('.but-on').style.backgroundColor = document.querySelector('#onePassword').value;
}

document.querySelector('#onePassword').oninput = () => {
    console.log(document.querySelector('#onePassword').value);
    document.querySelector('.sp-an').innerHTML = document.querySelector('#onePassword').value;
};

document.querySelector('#btn-1').onclick = () => {
    console.log(document.querySelector('#i2').value);
    let myCheckBox = document.querySelector('#i2');

    console.log(myCheckBox.checked);
    if (myCheckBox.checked) {
        console.log('Нажат');
    } else {
        console.log('Не Нажат');
    }
}

document.querySelector('#btn-2').onclick = (event) => {
    event.preventDefault();
    // let text = document.querySelector('#two');
    // console.log(text.value);
    //
    // text.value = 'one';

    let form = document.querySelector('#form');
    // console.log(form);
    console.log(form.elements.two.value);
    console.log(form.elements.three.value);
}

// =======5 Urok
// <div class="one">1</div>
//     <div class="one">2</div>
//     <div class="one">3</div>
//
//
//     <div><input type="radio" name="r" value="1" checked> Bla-Bla</div>
// <div><input type="radio" name="r" value="2"> Ha-Ha</div>
//     <div><input type="radio" name="r" value="3"> Da-Da</div>
//     <button class="push">Push</button>


let div = document.querySelectorAll('.one');
console.log(div);
// div.style.background = 'red';


for (let i=0; i < div.length; i++) {
    // console.log(i);
    console.log(div[i]);
    div[i].style.background = 'red';
    div[i].onclick = two;
}

function two() {
    console.log('Work');
}

let b = document.getElementsByClassName('one');
let c = document.getElementsByTagName('div');
console.log(b);

for (let i = 0; i < b.length; i++) {
    b[i].style.border = '1px solid black';
}

document.querySelector('.push').onclick = () => {
    let r = document.querySelectorAll('input[type="radio"]');
    console.log(r);
    for (let i = 0; i < r.length; i++) {
        if (r[i].checked) {
            console.log(r[i].value);
        }
    }
};
// =======6 Urok
// <div class="out"></div>

let out = document.querySelector('.out');

for (i = 0; i < 5; i++) {
    for (k = 0; k < 10; k++) {
        out.innerHTML += k;
    }
    out.innerHTML += ' ';
}

for (let i = 1; i < 10; i++) {
    for (let k = 1; k < 10; k++) {
        out.innerHTML += `${i}*${k}=${k*i}<br>`;
    }
    out.innerHTML += '<hr>'
}

// =======7 Urok
// <button class="f-1">Func1</button>

let f1 = document.querySelector('.f-1');

function one() {
    console.log('work');
}
f1.onclick = one;
// one();

function multi(x, y) {
    return x * y;
}

let z = multi(2, 3);

console.log(z);

// =======9 Urok
// <div class="test"></div>

let a = document.createElement('div');
a.innerHTML = 'Hello';

document.querySelector('.test').appendChild(a);
a.classList.add('one');

a.onclick = function () {
    alert('GoGo');
};

console.log(a);

// =======27 Urok


// const locale = {
//     'auction_ending' : 'Заканчивается' + animationEnding('to-end-timer', 1000),
//     'to_end_left_header':'До окончания осталось'
// };

function animationEnding(element, time) {
    let className = "." + element;
    $(className).fadeTo(time, 0.3).fadeTo(time,1);
    // setTimeout(animationEnding,400)
    if (time) {
        animationEnding(element, time);
    }
}

function blink(selector){
    $(selector).fadeTo(600, 0.3).fadeTo(600, 1, function () {
        blink(selector);
    });
}

function blink1(selector){
    $(selector).animate({opacity:1}, 1000, "linear", function(){
        $(this).delay(1000);
        $(selector).fadeTo(1000, 0.3).fadeTo(1000,1);
        $(this).animate({opacity:1}, 50, function(){
            blink(this);
            $(selector).fadeTo(1000, 0.3).fadeTo(1000,1);
        });
        $(this).delay(1000);
    });
}


setInterval(() => {
    $.get("/").then(function(html) {
        // Получаем от сервера HTML код, вытаскивает оттуда нужный DOM элемент.
        var list = $(".activity-list", html); // берём из этого ответа элемент UL, со списком комментариев.
        $(".activity-list").html(list); // И уже в нашу страницу вставляем актуальный список комментариев (заменяем DOM-элемент)
    });
}, 5000); // каждые 5 секунд

// popup
// =====================================

// =========================

function blink(selector){
    $(selector).fadeTo(600, 0.3).fadeTo(600, 1, function () {
        blink(selector);
    });
}

function hideField(selector) {
    $(selector).hide();
}

setInterval(() => {
    $.get("/").then(function(html) {
        // Получаем от сервера HTML код, вытаскивает оттуда нужный DOM элемент.
        var list = $(".activity-list", html); // берём из этого ответа элемент UL, со списком комментариев.
        $(".activity-list").html(list); // И уже в нашу страницу вставляем актуальный список комментариев (заменяем DOM-элемент)
    });
}, 5000); // каждые 5 секунд


// console.log($('.highestBid').html());
console.log($(lotPageState.status));

// Обновление бока "Наивысшая ставка" на странице лота: ======
function getAutoHighestBid() {
    setInterval(() => {
        // console.log($('.highestBid').html());
        $.get(lotPageState.baseUrl + lotPageState.lotId + '/get-state').then(function() {
            // console.log($('.highestBid').html());
            let currentWinnerBid = $('.highestBid').html();
            $(".highestBid").html(currentWinnerBid);
        });
    }, 5000); // каждые 5 секунд
}

// getAutoHighestBid();












