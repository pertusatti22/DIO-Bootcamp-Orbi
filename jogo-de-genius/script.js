let order = [];
let clickedOrder = [];
let score = 0;

// Melhorias no Jogo:
// 1 - Ajuste no style.css para sempre centralizar o Genius utilizando o flex no body.
// 2 - score++; para aumentar pontuação transferido da função nextLevel() para função checkOrder(), para que a pontuação só aumente quando o jogador acertar a combinação.
// 3 -
// proposta de melhoria - apagar a cor depois que o jogo sinalizar, para não confundir cores repetidas, melhorar a responsividade

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];
  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

let lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
    console.log("adicionou classe");
    if (element.classList.contains("selected")) {
      console.log("passou!");
      setTimeout(() => {
        element.classList.remove("selected");
        console.log("removeu a classe");
      }, 500);
    } 
  }, number - 200);

}
/*
let lightColor = (element, number) => {
  number = number * 500;
  console.log(number);
  if (element.classList.contains("selected")) {
    setTimeout(() => {
      element.classList.remove("selected");
      console.log("removeu a classe");
    }, 500);
  } else {
    setTimeout(() => {
      element.classList.add("selected");
      console.log("aqui");
    }, number - 200); //number - 350
  }
};
*/
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    score++;
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
};

let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.remove("selected");

  setTimeout(() => {
    createColorElement(color).classList.add("selected");
    checkOrder();
  }, 200);
};

let createColorElement = (color) => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

let nextLevel = () => {
  shuffleOrder();
};

let gameOver = () => {
  alert(
    `Pontuação: ${score}\nVocê perdeu o jogo\n Clique em OK para iniciar um novo jogo`
  );
  order = [];
  clickedOrder = [];
  playGame();
};

let playGame = () => {
  alert("Bem vindo ao Genius! Iniciando novo jogo!");
  score = 0;
  nextLevel();
};

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
