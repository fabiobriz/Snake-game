
let canvas = document.getElementById('canvas-snake');
let context = canvas.getContext('2d');
let box = 32;
let speed = 10;
let snake = [];
snake[0] = {
    x: 7 * box,
    y: 7 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG () {
    context.fillStyle = "lightgray";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake () {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood () {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}


function gameOverMsg() {
    context.fillStyle = "black";
    context.font = "bold 60px Verdana";
    context.fillText("Game over", 2.5 * box, 6 * box);
    context.fillText( (snake.length - 1) + " pontos", 3 * box, 9 * box);
}


function startGame() {

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            gameOverMsg();
            clearInterval(jogo);
        
        }
    }

    createBG();
    createSnake();
    drawFood();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "up") snakeY -= box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;

    if ((snakeX != food.x) || (snakeY !== food.y)) {
        snake.pop();
    } 
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
    
    
}

let game = setInterval(startGame, 1000 / speed);


