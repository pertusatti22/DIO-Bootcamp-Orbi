//Proposta de projeto corrigir bugs, adicionar score e vida a nave, adicionar efeito paralax no fundo

const player = document.querySelector(".player");
const space = document.querySelector("#main-play-area");
const enemy = [
  "./assets/images/enemy-0.png",
  "./assets/images/enemy-1.png",
  "./assets/images/enemy-2.png",
];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');

function flyShip(event) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveLeft();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    moveRight();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    moveUp();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    moveDown();
  }
}

function fireShip(event) {
  if (event.key === " ") {
    event.preventDefault();
    fireLaser();
  }
}

function moveLeft() {
  let hPosition = getComputedStyle(player).getPropertyValue("left");
  let position = parseInt(hPosition);
  position -= 20;
  player.style.left = `${position}px`;
  if (position <= 5) {
    position += 30;
    player.style.left = `${position}px`;
  }
}

function moveRight() {
  let hPosition = getComputedStyle(player).getPropertyValue("left");
  let position = parseInt(hPosition);
  position += 20;
  player.style.left = `${position}px`;
  if (position >= 540) {
    position -= 30;
    player.style.left = `${position}px`;
  }
}

function moveUp() {
  let vPosition = getComputedStyle(player).getPropertyValue("top");
  if (vPosition <= "550px") {
    return;
  } else {
    let position = parseInt(vPosition);
    position -= 20;
    player.style.top = `${position}px`;
  }
}

function moveDown() {
  let vPosition = getComputedStyle(player).getPropertyValue("top");
  if (vPosition >= "600px") {
    return;
  } else {
    let position = parseInt(vPosition);
    position += 5;
    player.style.top = `${position}px`;
  }
}

function fireLaser() {
  let laser = createLaserElement();
  space.appendChild(laser);
  moveLaser(laser);
}

function createLaserElement() {
  let xPosition = parseInt(
    window.getComputedStyle(player).getPropertyValue("left")
  );
  let yPosition = parseInt(
    window.getComputedStyle(player).getPropertyValue("top")
  );
  let newLaser = document.createElement("img");
  newLaser.src = "./assets/images/shoot.png";
  newLaser.classList.add("laser");
  newLaser.style.left = `${xPosition - 50}px`;
  newLaser.style.top = `${yPosition - 45}px`;
  return newLaser;
}

function moveLaser(laser) {
  setInterval(() => {
    let yPosition = parseInt(laser.style.top);
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach((enemy) => {
      if (checkLaserCollision(laser, enemy)) {
        enemy.src = "./assets/images/explosion.png";
        enemy.classList.remove("enemy");
        enemy.classList.add("enemy-destroy");
      }
    });

    if (yPosition <= 0) {
      laser.remove();
    } else {
      laser.style.top = `${yPosition - 8}px`;
    }
  }, 8);
}

function createEnemy() {
  let newEnemy = document.createElement("img");
  let enemySprite = enemy[Math.floor(Math.random() * enemy.length)];
  newEnemy.src = enemySprite;
  newEnemy.classList.add("enemy");
  newEnemy.classList.add("enemy-transition");
  newEnemy.style.left = `${Math.floor(Math.random() * 330) + 30}px`;
  newEnemy.style.top = "20px";
  space.appendChild(newEnemy);
  moveEnemy(newEnemy);
}

function moveEnemy(enemy) {
  setInterval(() => {
    let yPosition = parseInt(
      window.getComputedStyle(enemy).getPropertyValue("top")
    );
    if (yPosition === 500) {
      if (Array.from(enemy.classList).includes("enemy-destroy")) {
        enemy.remove();
      } else {
        gameOver();
      }
    } else {
      enemy.style.top = `${yPosition + 4}px`;
    }
  }, 30);
}

function checkLaserCollision(laser, enemy) {
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);
  let enemyTop = parseInt(enemy.style.top);
  let enemyLeft = parseInt(enemy.style.left);
  let enemyBottom = enemyTop - 30;
  if (laserLeft != 0 && laserLeft + 20 >= enemyLeft) {
    console.log("cond1");
    if (laserTop <= enemyTop && laserTop >= enemyBottom) {
      console.log("cond2");
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

startButton.addEventListener('click', (event) => {
  playGame();
})

function playGame() {
  startButton.style.display = 'none';
  instructionsText.style.display = 'none';
  window.addEventListener("keydown", flyShip);
  window.addEventListener("keyup", fireShip);
  enemyInterval = setInterval(() => {
    createEnemy();
  }, 2000);
}

//função de game over
function gameOver() {
  window.removeEventListener('keydown', flyShip);
  window.removeEventListener('keyup', fireShip);
  clearInterval(enemyInterval);
  let enemies = document.querySelectorAll('.enemy');
  enemies.forEach((enemy) => alien.remove());
  let lasers = document.querySelectorAll('.laser');
  lasers.forEach((laser) => laser.remove());
  setTimeout(() => {
      alert('game over!');
      yourShip.style.top = "250px";
      startButton.style.display = "block";
      instructionsText.style.display = "block";
  });
}