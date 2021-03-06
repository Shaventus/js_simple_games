var canvas,context;
window.onload = function(){
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  key = 1;
  init();
  setInterval(Update, 1000/15);
}

var snake = [];
var size = 0;
var nx = 1, ny = 0;
var key;
var food = {
  x:0,
  y:0,
}

var init = function() {
  snake = [];
  size = 0;
  for (var i = 0; i < 3; i++) {
    snake[size++] = {
      x: 32 - i,
      y: 24,
    }
  }
  RandFood();
}

var Update = function(){
  Logic();
  Draw();
}

var RandFood = function() {
  do {
    var good = 1;
    food.x = Math.floor((Math.random() * 63) + 1);
    food.y = Math.floor((Math.random() * 47) + 1);
    for (var i = 0; i < snake.length; i++) {
      if(snake[i].x == food.x && snake[i].y == food.y){
        good = 0;
      }
    }
  } while(good == 0);
}

var Logic = function(){
  document.onkeydown = move;

  for(i = snake.length-1; i >= 0;i--){
    if(i != 0){
      if(snake[0].x == food.x && snake[0].y == food.y){
        RandFood();
        snake[size++] = {
          x: snake[i-1].x,
          y: snake[i-1].y,
        }
      }
      snake[i].x = snake[i-1].x;
      snake[i].y = snake[i-1].y;
    } else {
      for (var j = 1; j < snake.length; j++) {
        if(snake[0].x + nx == snake[j].x && snake[0].y + ny == snake[j].y){
          init();
        }
      }
      if((snake[0].x + nx)*10 < 0 || (snake[0].x + nx)*10 > 630 ||
        (snake[0].y + ny)*10 < 0 || (snake[0].y + ny)*10 > 470){
        init();
      }
      snake[i].x += nx;
      snake[i].y += ny;
    }
  }
}

function move(e) {
  if(e.keyCode == 39){
    if(key != 2){
      key = 1;
      nx = 1,
      ny = 0;
    }
  } else if(e.keyCode == 37){
    if(key != 1){
      key = 2;
      nx = -1,
      ny = 0;
    }
  } else if(e.keyCode == 38){
    if(key != 4){
      key = 3;
      nx = 0,
      ny = -1;
    }
  } else if(e.keyCode == 40){
    if(key != 3){
      key = 4;
      nx = 0,
      ny = 1;
    }
  }
}

var Draw = function() {
  context.fillStyle ="#000000";
  context.fillRect(0,0,640,480);
  DrawFood();
  DrawPlayer();
}

var DrawPlayer = function(){
  for(i = 0; i < snake.length;i++){
    context.fillStyle ="#ffff00";
    context.fillRect(snake[i].x*10,snake[i].y*10,9,9);
  }
}

var DrawFood = function() {
  context.fillStyle ="#00ff00";
  context.fillRect(food.x*10,food.y*10,9,9);
}
