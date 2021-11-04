//Definindo o Mario e Background
const mario = document.querySelector('.mario');
const backg = document.querySelector('.backg');

let isJumping = false;
let isGameOver = false;
let position = 0;

//Atribuindo o controle do Game, atraves de uma tecla "Space"
function handleKeyUp(event) {
  if (event.keyCode === 87) {
    if (!isJumping) {
      jump();
    }
  }
}
//Configurando a movimentação do Mario
function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval)
      //Descer
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          mario.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      //Subir
      position += 20;
      mario.style.bottom = position + 'px';
    }
  }, 20)
}
//Configurando a movimentação da Tortuga
function createTortuga() {
  const tortuga = document.createElement('div');
  let tortugaPosition = 1000;
  let randomTime = Math.random() * 6000;
  //Condição de GameOver
  if (isGameOver) return;

  tortuga.classList.add('tortuga');
  backg.appendChild(tortuga);
  tortuga.style.left = tortugaPosition + 'px';


  let leftInterval = setInterval(() => {
    //Removendo a Tortuga da Tela
    if (tortugaPosition < -60) {
      clearInterval(leftInterval);
      backg.removeChild(tortuga);
    } else if (tortugaPosition > 0 && tortugaPosition < 60 && position < 60) {
      //GameOver
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">!💀GAME OVER💀!</h1>';
    } else {
      tortugaPosition -= 10;
      tortuga.style.left = tortugaPosition + 'px';
    }
  }, 20);

  setTimeout(createTortuga, randomTime);
}
/* Sistema de Pontuação
function score() {
  let date = new Date();
  let time = date.getSeconds();
  point += time
}
const createClock = setInterval(score, 1000);*/

createTortuga();
document.addEventListener('keyup', handleKeyUp)
