$(document).ready(function() {
    init();
});
let lastX, lastY;
let ctx;

let mousePressed = false;
let eraser = false;
let isFirst = true;

let mode = 'draw';
let rempli;
let lol ;
let symetrieH;
let symetrieV;


function init() {

    var  canvas = $('.canvas');
    for(var i = 0; i < canvas.length; i++ ){
        canvas = $('.canvas')[i];
    }
    console.log(canvas);

    ctx = canvas.getContext("2d");
    // $('.canvas')[0].getContext("2d");

    $('.canvas').mousedown(function (e) {
        mousePressed = true;
        switch (mode) {
            case 'draw':
                Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
                // console.log($(this).offset());
                lol = ctx.lineWidth = $('#size').val();
                ctx.beginPath();
                ctx.arc(e.offsetX, e.offsetY, lol, 0, Math.PI + 2);
                ctx.fill();
                // console.log(this);
                break;

            case 'rectangle':
                rectangle(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);
                break;

            case 'circle':
                circle(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);
                break;
            case 'line':
                line(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);
                // console.log(e.pageX - $(this).offset().left);
                break;
        }
    });

    $('.canvas').mousemove(function (e) {
        if (mousePressed && mode === 'draw') {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('.canvas').mouseup(function (e) {
        mousePressed = false;
    });

    $('.canvas').mouseleave(function (e) {
        mousePressed = false;
    });

    $('#eraser').click(function () {
        eraser = !eraser;
        mode = 'draw';
    });

    $('#eraseAll').click(function() {
        ctx.clearRect(0, 0, $('.canvas').width, $('.canvas').height);
    });
    // $('#eraserAll').click(function () { eraser = !eraser; });
    $('#draw').click(function () {
        mode = 'draw';
    });
    $('#rectangle').click(function () {
        mode = 'rectangle';
        console.log(mode)
    });
    $('#circle').click(function () {
        mode = 'circle';
    });
    $('#line').click(function () {
        mode = 'line';
    });
    $('#fill').click(function () {
        rempli = true;
    });
    $('#nofill').click(function () {
        rempli = false;
    });
    $('#symetrieX').click(function () {
        symetrieH = true;
    })
    $('#symetrieY').click(function () {
        symetrieV = true;
    })
}
function Draw(x, y, isDown) {
    // console.log(ctx.lineWidth = $('#size').val());
    // console.log('hello');
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#color').val();
        ctx.lineWidth = $('#size').val();
        ctx.lineJoin = "round";
        if (eraser === true) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        } else {
            ctx.globalCompositeOperation = "source-over";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            if(symetrieV === true){
                ctx.moveTo(1556 - lastX, lastY);
                ctx.lineTo(1556 - x , y);
                ctx.closePath();
                ctx.stroke()
                symetrieH = false;
            }
            if(symetrieH === true){
                ctx.moveTo(lastX, 700 - lastY);
                ctx.lineTo(x , 700 - y);
                ctx.closePath();
                ctx.stroke()
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
    lastX = x;
    lastY = y;
}
// console.log(dragStartLocation.x);)
function rectangle(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = $('#color').val();
    ctx.lineWidth = $('#size').val();
    ctx.lineJoin = "round";
    if (!isFirst) {
        let width = x - lastX;
        let height = y - lastY;
        ctx.rect(lastX, lastY, width, height);
        if(rempli === true) {
            ctx.fill();
            ctx.closePath();
            ctx.stroke();
            isFirst = true;
        }
        else{
            ctx.closePath();
            ctx.stroke();
            isFirst = true;
        }

    } else {
        isFirst = false;
    }
    console.log(rempli);

    lastX = x;
    lastY = y;
}

function circle(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = $('#color').val();
    ctx.lineWidth = $('#size').val();
    ctx.lineJoin = "round";
    if (!isFirst) {
        let width = x - lastX;
        let height = y - lastY;
        console.log(lastX);
        console.log(lastY);
        console.log(width);

        ctx.arc(lastX, lastY, Math.abs(width), -1, Math.PI+2, false);
        if(rempli === true) {
            ctx.fill();
            ctx.closePath();
            ctx.stroke();
            isFirst = true;
        }
        else{
            ctx.closePath();
            ctx.stroke();
            isFirst = true;
        }
    } else {
        isFirst = false;
    }
    lastX = x;
    lastY = y;
}

function line(x, y) {
    ctx.strokeStyle = $('#color').val();
    ctx.lineWidth = $('#size').val();
    ctx.lineJoin = "round";
    if (!isFirst) {
        let width = x - lastX;
        // let height = y - lastY;
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        isFirst = true;
    } else {
        isFirst = false;
    }
    lastX = x;
    lastY = y;
}