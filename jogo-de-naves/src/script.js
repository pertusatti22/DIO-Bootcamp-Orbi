
//Proposta de projeto - adicionar funcionalidade para recuperar a vida do helicóptero;

const audioExplosion = document.getElementById("audio-Explosion");
const audioShoot = document.getElementById("audio-Shoot");
const audioAmbiental = document.getElementById("audio-Ambiental");
const audioGameOver = document.getElementById("audio-GameOver");
const audioDead = document.getElementById("audio-Dead");
const audioRescue = document.getElementById("audio-Rescue");


function engine() {
  $("#newGame").hide();

  $("#game").append("<div id='player' class='player-motion'></div>");
  $("#game").append("<div id='enemy-1' class='enemy-1-motion'></div>");
  $("#game").append("<div id='enemy-2'></div>");
  $("#game").append("<div id='friend' class='friend-motion'></div>");
  $("#game").append("<div id='scoreboard'></div>");
  $("#game").append("<div id='energy'></div>");

  const keyboardShortcuts = { W: 87, S: 83, D: 68 };
  let endGame = false;
  let energy = 3;
  let flying = 5;
  let speed = 3;
  let player = {};
  let timeCommand = {};
  let shoot = true;
  let points = 0;
  let friendSave = 0;
  let friendLost = 0;
  let col = false;
  player.actions = [];
  timeCommand.timer = setInterval(loop, 30);

  $(document).keydown(function (e) {
    player.actions[e.which] = true;
  });
  $(document).keyup(function (e) {
    player.actions[e.which] = false;
  });



  function loop() {
    moveBackground();
    movePlayer();
    moveEnemy1();
    moveEnemy2();
    moveFriend();
    gameCollisions();
    scoreboard();
    energyBar();
    gameMusic();
  }

  function moveBackground() {
    bgMovement = parseInt($("#game").css("background-position"));
    $("#game").css("background-position", bgMovement - 1);
  }

  function movePlayer() {
    if (player.actions[keyboardShortcuts.W]) {
      let playerUp = parseInt($("#player").css("top"));
      $("#player").css("top", playerUp - 10);
      if (playerUp <= 100) {
        $("#player").css("top", playerUp + 10);
      }
    }

    if (player.actions[keyboardShortcuts.S]) {
      let playerDown = parseInt($("#player").css("top"));
      $("#player").css("top", playerDown + 10);
      if (playerDown >= 480) {
        $("#player").css("top", playerDown - 10);
      }
    }
    if (player.actions[keyboardShortcuts.D]) {
      shooting();
    }
  }

  function moveEnemy1() {
    let xPosition = parseInt($("#enemy-1").css("left"));
    let yPosition = parseInt($("#enemy-1").css("top"));
    $("#enemy-1").css("left", xPosition - flying);
    $("#enemy-1").css("top", yPosition);
    if (xPosition <= 150) {
      yPosition = parseInt(Math.random() * 310);
      if (yPosition < 110) {
        yPosition = 110;
      }
      $("#enemy-1").css("left", 1380);
      $("#enemy-1").css("top", yPosition);
    }
  }

  function moveEnemy2() {
    xPosition = parseInt($("#enemy-2").css("left"));
    $("#enemy-2").css("left", xPosition - speed);

    if (xPosition <= 100) {
      $("#enemy-2").css("left", 1500);
    }
  }

  function moveFriend() {
    xPosition = parseInt($("#friend").css("left"));
    $("#friend").css("left", xPosition + 1);

    if (xPosition > 1400) {
      $("#friend").css("left", 250);
    }
  }

  function newFriend() {
    let friendTimer = window.setInterval(friendNewPosition, 6000);
    function friendNewPosition() {
      window.clearInterval(friendTimer);
      friendTimer = null;
      if (endGame == false) {
        $("#game").append("<div id='friend' class='friend-motion'></div>");
      }
    }
  }

  function shooting() {
    if (shoot == true) {
      shoot = false;
      audioShoot.play();
      playerUp = parseInt($("#player").css("top"));
      playerLeft = parseInt($("#player").css("left"));
      xShoot = playerLeft + 190;
      yShoot = playerUp + 37;
      $("#game").append("<div id='shooting'></div");
      $("#shooting").css("top", yShoot);
      $("#shooting").css("left", xShoot);
      let shootTimer = window.setInterval(missile, 30);
      function missile() {
        xShoot = parseInt($("#shooting").css("left"));
        $("#shooting").css("left", xShoot + 25);
        if (xShoot > 1500) {
          window.clearInterval(shootTimer);
          shootTimer = null;
          $("#shooting").remove();
          shoot = true;
        }
      }
    }
  }

  function gameCollisions() {
    let pCe1 = $("#player").collision($("#enemy-1"));
    let pCe2 = $("#player").collision($("#enemy-2"));
    let pCf = $("#player").collision($("#friend"));
    let sCe1 = $("#shooting").collision($("#enemy-1"));
    let sCe2 = $("#shooting").collision($("#enemy-2"));
    let e2Cf = $("#enemy-2").collision($("#friend"));

    if (pCe1.length > 0) {
      col = true;
      energy--;
      audioExplosion.play();
      yPosition = parseInt(Math.random() * 310);
      gameCollisionsPosition("#enemy-1", col, yPosition);
    }
    if (pCe2.length > 0) {
      col = true;
      energy--;
      audioExplosion.play();
      gameCollisionsPosition("#enemy-2", col, 500);
    }
    if (pCf.length > 0) {
      newFriend();
      friendSave++;
      audioRescue.play();
      $("#friend").remove();
    }
    if (sCe1.length > 0) {
      col = true;
      flying = flying + 0.4;
      points = points + 100;
      audioExplosion.play();
      yPosition = parseInt(Math.random() * 310);
      gameCollisionsPosition("#enemy-1", col, yPosition);
      $("#shooting").css("left", 5001);
    }
    if (sCe2.length > 0) {
      col = true;
      speed = speed + 0.2;
      points = points + 50;
      audioExplosion.play();
      gameCollisionsPosition("#enemy-2", col, 500);
      $("#shooting").css("left", 5001);
    }
    if (e2Cf.length > 0) {
      xF = parseInt($("#friend").css("left"));
      yF = parseInt($("#friend").css("top"));
      friendLost++;
      audioDead.play();
      friendDead(xF, yF);
      $("#friend").remove();
      newFriend();
    }
  }

  function gameCollisionsPosition(id, coll, yPos) {
    if (coll) {
      xE = parseInt($(id).css("left"));
      yE = parseInt($(id).css("top"));
      explosion1(xE, yE);
      yPosition = yPos;
      if (yPosition < 110) {
        yPosition = 110;
      }
      $(id).css("left", 1380);
      $(id).css("top", yPosition);
      col = false;
    }
  }

  function explosion1(xE, yE) {
    $("#game").append("<div id='explosion-1'></div>");
    $("#explosion-1").css(
      "background-image",
      "url(../assets/images/explosion.png)"
    );
    let div = $("#explosion-1");
    div.css("left", xE + 50);
    div.css("top", yE);
    div.animate({ width: 200, opacity: 0 }, 600);
    let explosionTimer = window.setInterval(explosionRemove, 1000);
    function explosionRemove() {
      div.remove();
      window.clearInterval(explosionTimer);
      explosionTimer = null;
    }
  }

  function friendDead(xF, yF) {
    $("#game").append(
      "<div id='friend-dead' class='friend-motion-dead'></div>"
    );
    $("#friend-dead").css("left", xF);
    $("#friend-dead").css("top", yF);
    let deadTimer = window.setInterval(buried, 1000);
    function buried() {
      $("#friend-dead").remove();
      window.clearInterval(deadTimer);
      deadTimer = null;
    }
  }

  function scoreboard() {
    $("#scoreboard").html(
      `<h2> Score: ${points}<br/>Rescued: ${friendSave}<br/>Dead: ${friendLost}</h2>`
    );
  }

  function energyBar() {
    if (energy === 3) {
      $("#energy").css(
        "background-image",
        "url(../assets/images/energy-bar-3.png)"
      );
    }
    if (energy === 2) {
      $("#energy").css(
        "background-image",
        "url(../assets/images/energy-bar-2.png)"
      );
    }
    if (energy === 1) {
      $("#energy").css(
        "background-image",
        "url(../assets/images/energy-bar-1.png)"
      );
    }
    if (energy === 0) {
      $("#energy").css(
        "background-image",
        "url(../assets/images/energy-bar-empty.png)"
      );
      gameOver();
    }
  }

  function gameMusic() {
    if (endGame) {
      audioGameOver.play();
      audioAmbiental.pause();
    } else {
      audioAmbiental.addEventListener(
        "ended",
        function () {
          audioAmbiental.currentTime = 0;
          audioAmbiental.play();
        },
        false
      );
      audioAmbiental.play();
    }
  }

  function gameOver() {
    endGame = true;
    window.clearInterval(timeCommand.timer);
    timeCommand.timer = null;

    $("#player").remove();
    $("#enemy-1").remove();
    $("#enemy-2").remove();
    $("#friend").remove();

    $("#game").append("<div id='game-over'></div>");
    $("#game-over").html(
      `<h1> Game Over </h1><p><br/>Your Score: ${points}</p><div id='restart' onClick=restartGame()><h3><br/><br/>Play Again</h3></div>`
    );
  }
}

function restartGame() {
  audioGameOver.pause();
  $("#game-over").remove();
  engine();
}
