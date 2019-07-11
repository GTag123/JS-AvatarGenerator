const length = 10;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomArray(length) {
    let arr = new Array(length),
        countZero = 0,
        countOne = 0;
    for (let index = 0; index < length; index++) {
        arr[index] = {
            values: new Array(length),
            cf: 0.5
        };
    }
    // сюда действия с массивами
    arr[0].cf = 0.95;
    arr[1].cf = 0.9;
    arr[2].cf = 0.8;
    arr[ arr.length - 1 ].cf = 0.9;

    for ( let index = 0; index < length; index++ ) {
        let x = 0;
        for (; x < length / 2; x++) {
            let rnd = Math.random();
            if ( rnd > arr[index].cf ){
                countZero++;
                arr[index].values[x] = 0;
            } else {
                countOne++;
                arr[index].values[x] = 1;
            }
        }
        for (; x < length; x++) {
            arr[index].values[x] = arr[index].values[length - 1 - x];
        }
    }
    console.log('\nНолики: ' + countZero.toString());
    console.log('Единицы: ' + countOne.toString());
    let division = countOne / countZero;
    console.log('Отношение 1 / 0: ' + division.toString() + '');
    if ( division === 1 ) console.warn('Отношение 1!');

    return arr;
}
function drawImage(canvas, arr, length, color='#000'){
    let ctx = canvas.getContext("2d"),
        rectWidth = Math.round(canvas.width / length),
        rectHeight = Math.round(canvas.height / length),
        currentY = 0;
    for ( let y = 0; y < length; y++) {
        let currentX = 0;
        for ( let x = 0; x < length; x++) {
            if ( !arr[y].values[x] ) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = color;
            }
            
            ctx.fillRect(currentX, currentY, currentX + rectWidth, currentY + rectHeight);
            currentX += rectWidth;
        }
        currentY += rectHeight;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById('myCanvas'),
        render = function (){
            let array = getRandomArray(length),
                color = getRandomColor();
            drawImage(canvas, array, length, color);
        };
    canvas.height = Math.floor(document.documentElement.clientHeight / 100) * 100;
    canvas.width = canvas.height;
    render();
    canvas.onclick = render;
});