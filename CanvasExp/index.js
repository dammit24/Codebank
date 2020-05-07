let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let worldY = 0,
  gravity = 0.3;
let keyPressed;
let gameOver = true;
let colours = ["red", "yellow", "blue", "lime"];

function Player() {
  this.x = canvas.width / 2;
  this.y = canvas.height - 70;
  this.colour = colours[Math.floor(Math.random() * 4)];
  this.radius = 10;
  this.vy;
  this.vx = 0;
  this.rgb;
  this.alive = true;
  this.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    if (this.alive == true) {
      if (keyPressed == "Space") {
        this.vy = -6;
        gameOver = false;
        keyPressed = "";
      }
      this.rgb = ctx.getImageData(this.x, this.y, 1, 1).data; //rgb value of player
      rgbCheckFront = ctx.getImageData(this.x, this.y - this.radius - 2, 1, 1)
        .data; //to check collision for top of circle
      rgbCheckBack = ctx.getImageData(this.x, this.y + this.radius + 2, 1, 1)
        .data; //check for bottom of player collision
      for (i = 0; i < 3; i++) {
        if (
          (this.rgb[i] != rgbCheckFront[i] &&
            this.rgb[i] == 0 &&
            this.colour != "yellow") ||
          (this.colour == "yellow" &&
            this.rgb[i] != rgbCheckFront[i] &&
            this.rgb[i] == 0)
        ) {
          this.alive = false;
          this.vy = -4;
          this.vx = -2;
          break;
        }
        if (
          (this.rgb[i] != rgbCheckBack[i] &&
            this.rgb[i] == 0 &&
            this.colour != "yellow") ||
          (this.colour == "yellow" &&
            this.rgb[i] != rgbCheckBack[i] &&
            this.rgb[i] == 0)
        ) {
          this.alive = false;
          this.vy = -4;
          this.vx = -2;
          break;
        }
      }
    }
    if (this.y + this.radius > canvas.height) {
      this.alive = false;
      this.vy = -4;
      this.vx = -2;
    }
    if (gameOver == false) {
      if (this.y > canvas.height - 200) {
        this.y += this.vy;
        this.vy += gravity;
      } else if (this.vy < 0) {
        worldY -= this.vy;
        this.vy += gravity;
      } else {
        this.y += this.vy;
        this.vy += gravity;
      }
      this.x += this.vx;
    }
  };
}

player = new Player();

function InstructionText() {
  this.x = canvas.width / 2;
  this.y = canvas.height / 2 - 50;
  this.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y + worldY);
    ctx.font = "bold 25px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.fillText("Press SPACE to Jump.", 0, 0);
    ctx.restore();
  };
}
function Circle1() {
  this.angle = 0;
  this.colour1 = "red";
  this.colour2 = "blue";
  this.radius = 80;
  this.x = canvas.width / 2;
  this.y = 0;
  this.enter = false;
  this.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y + worldY);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI / 2, false);
    ctx.strokeStyle = this.colour1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, Math.PI / 2, Math.PI, false);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, Math.PI, (Math.PI * 3) / 2, false);
    ctx.strokeStyle = "lime";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, (Math.PI * 3) / 2, Math.PI * 2, false);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.restore();
    if (this.angle >= 360) {
      this.angle = 0;
    }
    this.angle += 1;
  };
}
function Circle2() {
  this.angle1 = 0;
  this.angle2 = 0;
  this.radius = 80;
  this.x = canvas.width / 2;
  this.y = 0;
  this.enter = false;
  let vy = 0,
    vx = 0.5,
    spdx = 0;
  let dt = 0.15;
  this.draw = function () {
    // ctx.fillStyle = this.colour1;
    ctx.save();
    ctx.translate(this.x, this.y + worldY);
    ctx.rotate(-(this.angle1 * Math.PI) / 180);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI / 2, false);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, Math.PI / 2, Math.PI, false);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, Math.PI, (Math.PI * 3) / 2, false);
    ctx.strokeStyle = "lime";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, (Math.PI * 3) / 2, Math.PI * 2, false);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.restore();
    //outer circle
    ctx.save();
    ctx.translate(this.x, this.y + worldY);
    ctx.rotate((this.angle2 * Math.PI) / 180);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius + 15, 0, Math.PI / 2, false);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius + 15, Math.PI / 2, Math.PI, false);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius + 15, Math.PI, (Math.PI * 3) / 2, false);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius + 15, (Math.PI * 3) / 2, Math.PI * 2, false);
    ctx.strokeStyle = "lime";
    ctx.stroke();
    ctx.restore();
    if (this.angle1 >= 360) {
      this.angle1 = 0;
    }
    if (this.angle2 >= 360) {
      this.angle2 = 0;
    }
    this.angle1 += 1;
    this.angle2 += 1;
  };
}
function Circle3() {
  this.angle = 0;
  this.radius = 80;
  this.x = canvas.width / 2;
  this.y = 0;
  this.enter = false;
  let vy = 0,
    vx = 0.5,
    spdx = 0;
  let dt = 0.15;
  this.draw = function () {
    // ctx.fillStyle = this.colour1;
    ctx.save();
    ctx.translate(this.x + this.radius, this.y + worldY);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI / 2, false);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, Math.PI / 2, Math.PI, false);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, Math.PI, (Math.PI * 3) / 2, false);
    ctx.strokeStyle = "lime";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, (Math.PI * 3) / 2, Math.PI * 2, false);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(this.x - this.radius, this.y + worldY);
    ctx.rotate(-(this.angle * Math.PI) / 180);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI / 2, false);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, Math.PI / 2, Math.PI, false);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, Math.PI, (Math.PI * 3) / 2, false);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, (Math.PI * 3) / 2, Math.PI * 2, false);
    ctx.strokeStyle = "lime";
    ctx.stroke();
    ctx.restore();
    if (this.angle >= 360) {
      this.angle = 0;
    }
    this.angle += 1;
  };
}
function Rect() {
  this.x = canvas.width / 2;
  this.y = 0;
  this.angle = 0;
  this.enter = false;
  this.colour1 = colours[Math.floor(Math.random() * 4)];
  this.colour2 = colours[Math.floor(Math.random() * 4)];
  this.draw = function () {
    ctx.save();
    ctx.translate(this.x + 75, this.y + worldY);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.fillStyle = this.colour1;
    ctx.fillRect(-75, -10, 150, 20);
    ctx.fillStyle = this.colour2;
    ctx.fillRect(-10, -75, 20, 150);
    ctx.restore();
    ctx.save();
    ctx.translate(this.x - 75, this.y + worldY);
    ctx.rotate(-(this.angle * Math.PI) / 180);
    ctx.fillStyle = this.colour1;
    ctx.fillRect(-75, -10, 150, 20);
    ctx.fillStyle = this.colour2;
    ctx.fillRect(-10, -75, 20, 150);
    ctx.restore();
    if (this.angle >= 360) {
      this.angle = 0;
    }
    this.angle += 1;
  };
}

let obstacles = [],
  yStrt = 0,
  instruction = new InstructionText();

function addObs() {
  let randomObs = Math.floor(Math.random() * 4);
  let obs;
  switch (randomObs) {
    case 0:
      obs = new Circle2();
      break;
    case 1:
      obs = new Rect();
      break;
    case 2:
      obs = new Circle1();
      break;
    case 3:
      obs = new Circle3();
      break;
  }
  obstacles.push(obs);
  yStrt -= 300;
  obstacles[obstacles.length - 1].y = yStrt;
}

addObs();

function gameRestart() {
  obstacles.splice(0, obstacles.length);
  player.alive = true;
  player.vx = 0;
  player.vy = 0;
  player.x = canvas.width / 2;
  worldY = 0;
  yStrt = 0;
  addObs();
}
function animate() {
  ctx.fillRect(0, 0, 500, 700);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y + worldY > 0 && obstacles[i].enter == false) {
      obstacles[i].enter = true;
      addObs();
      console.log(obstacles);
    }
    if (obstacles[i].y + worldY > canvas.height + 150) {
      obstacles.splice(i, 1);
      console.log(obstacles);
    }
    obstacles[i].draw();
  }

  player.draw();
  instruction.draw();

  if (player.alive == false) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.fillText("GAME OVER-SPACE to Restart.", 0, 0);
    ctx.restore();
    console.log("hi");
    if (keyPressed == "Space" && player.y > canvas.height - 50) {
      gameRestart();
    }
  }
  requestAnimationFrame(animate);
}
function keyHandle(e) {
  keyPressed = e.code;
  console.log(keyPressed);
}

animate();
window.addEventListener("keypress", keyHandle);
// let click = canvas.addEventListener("click", function (event) {
//   obj1.y += 20;
//   // let rect = canvas.getBoundingClientRect();
//   // let x = event.clientX - rect.left;
//   // let y = event.clientY - rect.top;
//   // console.log(y);
//   // if (y >= obj1.y + obj1.radius && y <= obj1.y + obj1.radius + 10) {
//   //   alert("clicked");
//   // }
// });