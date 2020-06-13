$(document).ready(function() {
    init();
});

let canvas, lastX, lastY, ctx, canvasWidth, canvasHeight;

let mousePressed = false, eraser = false, isFirst = true;
let mode = 'draw';
let rempli, sizeVal, symetrieH, symetrieV;


function init() { canvas = $('.canvas');
    for(var i = 0; i < canvas.length; i++ ){
        canvas = $('.canvas')[i];
    }
    canvasHeight = canvas.clientHeight // height of canvas
    canvasWidth = canvas.clientWidth // width of canvas

    ctx = canvas.getContext("2d");

    $('.canvas').mousedown(function (e) {
        mousePressed = true;
        switch (mode) {
            case 'draw':
                Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
                sizeVal = ctx.lineWidth = $('#size').val();
                ctx.beginPath();
                ctx.arc(e.offsetX, e.offsetY, sizeVal, 0, Math.PI + 2);
                ctx.fill();
                break;

            case 'rectangle':
                rectangle(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);
                break;

            case 'circle':
                circle(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);
                break;
            case 'line':
                line(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);
                break;
        }
    });

    $('.canvas').mousemove(function (e) {
        if (mousePressed && mode === 'draw') {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('.canvas').mouseup(function () {
        mousePressed = false;
    });

    $('.canvas').mouseleave(function () {
        mousePressed = false;
    });

    $('#eraser').click(function () {
        eraser = !eraser;
        mode = 'draw';
    });

    $('#eraseAll').click(function() {
        ctx.clearRect(0, 0, $('.canvas').width, $('.canvas').height);
    });

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
                ctx.moveTo(canvasWidth - lastX, lastY);
                ctx.lineTo(canvasWidth - x , y);
                ctx.closePath();
                ctx.stroke()
                symetrieH = false;
            }
            if(symetrieH === true){
                ctx.moveTo(lastX, canvasHeight - lastY);
                ctx.lineTo(x , canvasHeight - y);
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