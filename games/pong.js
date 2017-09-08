var canvas,context;
var key;

window.onload = function(){
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  key = 1;
  init();
  setInterval(Update, 1000/15);
}

var AABBBall = function(a, b) {
  if(a.x < 320){
    if((a.x + a.w > b.x - b.r && a.x + a.w < b.x + b.r ) && ((a.y + a.h > b.y + b.r && a.y < b.y + b.r)
    || (a.y + a.h > b.y - b.r && a.y + a.h < b.y + b.r))){
      b.speedX *= -1;
      b.speedX += 1;
    }
  } else {
    if((a.x > b.x - b.r && a.x < b.x + b.r ) && ((a.y + a.h > b.y + b.r && a.y < b.y + b.r)
    || (a.y + a.h > b.y - b.r && a.y + a.h < b.y + b.r))){
      b.speedX *= -1;
      b.speedX -= 1;
    }
  }
}

function Player(x, y, ai, side) {
  this.x = x;
  this.y = y;
  this.d = 0;
  this.w = 10;
  this.h = 60;
  this.ai = ai;
  this.side = side;
  this.startx = x;
  this.starty = y;

  this.reset = function() {
    this.x = this.startx;
    this.y = this.starty;
  }

  this.Draw = function() {
    context.fillStyle ="#ffff00";
    context.fillRect(this.x,this.y,this.w,this.h);
  };

  this.Logic = function() {
    if(this.d < 0){
      if(this.y + this.d > 0){
        this.y += this.d;
      }
    } else {
      if(this.y + this.h + this.d < 480){
        this.y += this.d;
      }
    }
  };

  this.Logic_AI = function(Ball) {
    this.Logic();
    if(Ball.speedY > 0){
      if(Ball.y + Ball.r > this.y - this.h/2){
        if(this.x - Ball.x > Ball.speedX*2){
          this.d = 15;
        } else {
          this.d = -15;
        }
      } else {
        if(this.x - Ball.x > -Ball.speedX*2){
          this.d = -15;
        } else {
          this.d = 15;
        }
      }
    } else {
      if(Ball.y - Ball.r < this.y + this.h/2){
        if(this.x - Ball.x > -Ball.speedX*2){
          this.d = -15;
        } else {
          this.d = 15;
        }
      } else {
        if(this.x - Ball.x > -Ball.speedX*2){
          this.d = 15;
        } else {
          this.d = -15;
        }
      }
    }
  }
}

function Ball(x, y, d) {
  this.x = x;
  this.y = y;
  this.startx = x;
  this.starty = y;
  this.d = Math.floor((Math.random() * 2) + 1); //direction
  this.r = 10; //radius

  this.speedX = Math.floor((Math.random() * 10) + 5);
  this.speedY = Math.floor((Math.random() * 10) + 5);

  this.setSpeed = function(speedX, speedY) {
    this.speedX = speedX;
    this.speedY = speedY;
  };

  this.reset = function() {
    this.x = this.startx;
    this.y = this.starty;
  }

  this.Draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.fillStyle ="#ffff00";
    context.fill();
    context.stroke();
  };

  this.Logic = function() {
    if(this.y + this.r + this.speedY > 480){
      this.speedY *= -1;
    } else if(this.y + this.speedY < 0){
      this.speedY *= -1;
    }

    if(this.x + this.r < 0){
      this.reset()
      this.speedX = Math.floor((Math.random() * 10) + 5);
      this.speedY = Math.floor((Math.random() * 10) + 5);
      return true;
    } else if(this.x - this.r > 640){
      this.reset()
      this.speedX = Math.floor((Math.random() * 10) + 5) * -1;
      this.speedY = Math.floor((Math.random() * 10) + 5);
      return true;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }
}

var init = function() {
  player = new Player(10, 200, 1);
  player2 = new Player(620, 200, 1);
  ball = new Ball(300, 230,)
}

var Update = function() {
  Logic();
  Draw();
}

var Logic = function() {
  document.onkeydown = move;
  AABBBall(player, ball);
  AABBBall(player2, ball);
  if(player2.ai == 1){
    player2.Logic_AI(ball);
  }
  player.Logic();
  if(ball.Logic()){
    player.reset();
    player2.reset();
  }
}

function move(e) {
  if(e.keyCode == 38){
      player.d = -15;
  }
  if(e.keyCode == 40){
      player.d = 15;
  }
}

var Draw = function() {
  context.fillStyle ="#000000";
  context.fillRect(0,0,640,480);
  player.Draw();
  player2.Draw();
  ball.Draw();
}
