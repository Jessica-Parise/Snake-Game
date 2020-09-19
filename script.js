let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 28;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction; 

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let score = 0;
let level = 1;
let vel = 150;
let border = false;
let fim = false;

let btnScore = document.getElementById('btnScore');
let btnLevel = document.getElementById('btnLevel');
let btnBorder = document.getElementById('btnBorder');

let spanLevel = document.getElementById('spanLevel');
let spanBorder = document.getElementById('spanBorder');
let spanScore = document.getElementById('spanScore');

let gameover = document.getElementById('gameover');

btnScore.onclick = function(){
    if(fim) {
        window.location.reload();
    }
}

btnBorder.onclick = function(){    
    if (!fim) {
        if (!border) {
            border = true;
            canvas.classList.add('border');
            spanBorder.innerHTML = 'Yes';
        } else {
            border = false;
            canvas.classList.remove('border');
            spanBorder.innerHTML = 'No';
        }
    }
}

btnLevel.onclick = function() {    
    if (!fim) {
        if (level < 10) {
            level++;
            vel = vel-12;
        } else if (level == 10) {
            level = 1;        
            vel = 150;        
        }
        if (level != 10) {
            spanLevel.innerHTML = level;
        } else {
            spanLevel.innerHTML = level+"!";
        }
        clearInterval(jogo);
        jogo = setInterval(iniciarJogo, vel);
    }
}

function criarBG() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box)        
        context.strokeStyle = 'lightgreen';
        context.strokeRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
    context.strokeStyle = 'lightgreen';
    context.strokeRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update);

function update(event){
    if (!fim) {
        if(event.keyCode == 37 && direction != "right") direction = "left";
        if(event.keyCode == 38 && direction != "down") direction = "up";
        if(event.keyCode == 39 && direction != "left") direction = "right";
        if(event.keyCode == 40 && direction != "up") direction = "down";
    }
}

function iniciarJogo() {    

    if (!border) {
        
        if(snake[0].x > 15 * box && direction !== "left") snake[0].x = 0;
        if(snake[0].x < 0 && direction != "right") snake[0].x = 15 * box;
        if(snake[0].y > 15 * box && direction != "up") snake[0].y = 0;
        if(snake[0].y < 0 && direction != "down") snake[0].y = 15 * box;
    } else {
        
        if(snake[0].x > 15 * box) gameOver();
        if(snake[0].x < 0) gameOver();
        if(snake[0].y > 15 * box) gameOver();
        if(snake[0].y < 0) gameOver();
    }

    for (i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) gameOver();
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;    

    if(snakeX != food.x || snakeY != food.y){

        snake.pop();
    } else {
   
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

        score++;
        spanScore.innerHTML = score;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function gameOver() {
    clearInterval(jogo);
    fim = true;            
    gameover.style.display = "flex";
}

let jogo = setInterval(iniciarJogo, vel);