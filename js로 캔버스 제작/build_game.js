'use strict'; /* use strict: JS 엄격모드*/

let canvas = document.getElementById("canvas"); /*getElemetBYId로 canvas 가져오기*/
let ctx = canvas.getContext("2d"); /*ctx: 캔버스에 그리는 도구*/

let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
/*패들*/
let paddleWidth = 100;
let paddleHeight = 10;
let paddleX = (canvas.width-paddleWidth)/2;
/*키보드 사용 */
let rightPressed = false;
let leftPressed = false;
/*벽돌 변수*/
let brickRowCount = 4;
let brickColumnCount = 6;
let brickWidth = 110;
let brickHeight = 20;
let brickPadding = 15;
let brickOffsetTop = 30;
let brickOffsetLeft = 35;
let bricks = []; 

for(let c=0; c<brickColumnCount; c++){ //벽동배열
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++){ //좌표 담음
        bricks[c][r] = {x:0, y:0};
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.KeyCode == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }
    else if(e.KeyCode == "left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.KeyCode == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    else if(e.KeyCode == "left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#FF00BF";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#802222";
    ctx.fill();
    ctx.closePath;
}

function drawBricks(){
    for(let c=0; c<brickColumnCount; c++){
        for( let r=0; r<brickRowCount; r++){
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#A6EAF1";
            ctx.fill();
            ctx.closePath();


        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);                /* 움직이는건 다 여기 */
    drawBricks();
    drawBall(); //ball
    drawPaddle();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){     /*벽 튕기기*/
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius){    /*벽 튕기기*/
        dy = -dy;
    }
    //paddle
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    //game over
    if(y + dy < ballRadius){ //아랫면 닿으면 끝
        dy = -dy;
    }
    else if(y+ dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else{
            alert("Game Over");
            document.location.reload();
        }
    }
}




setInterval(draw, 10);