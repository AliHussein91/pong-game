const gameBoard = document.querySelector('#bg');
gameBoard.width = window.innerWidth - 100;
gameBoard.height = window.innerHeight - 100;
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('.score');
const resetBtn = document.querySelector('.reset-btn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'black';
const paddle1Color = 'white';
const paddle2Color = 'white';
const paddleboarder = 'black';
const ballColor = 'white';
const ballBoarderColor = 'black';
const ballRadius = 12.5;
const paddleSpeed = (gameHeight / 100) * 5;
let intervalId;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
  width: 25,
  height: 100,
  x: 10,
  y: 0,
};
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 35,
  y: gameHeight - 100,
};

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

gameStart();

function gameStart() {
  createBall();
  nextTick();
}
function nextTick() {
  intervalId = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function drawPaddles() {
  ctx.strokeStyle = paddleboarder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}
function createBall() {
  ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }

  if (Math.round(Math.random()) == 1) {
    ballYDirection = 1;
  } else {
    ballYDirection = -1;
  }

  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
}
function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}
function drawBall(ballX, ballY) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBoarderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}
function checkCollision() {
  if (ballY >= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY <= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    player2Score++;
    updateScore();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    player1Score++;
    updateScore();
    createBall();
    return;
  }
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY <= paddle1.y + paddle1.height) {
      ballX = paddle1.x + paddle1.width + ballRadius;
      ballSpeed++;
      ballXDirection *= -1;
    }
  }
  if (ballX >= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY <= paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius;

      ballSpeed++;
      ballXDirection *= -1;
    }
  }
}
function changeDirection(e) {
  const keyPressed = e.key;
  const paddle1Up = 'ArrowUp';
  const paddle1Down = 'ArrowDown';
  const paddle2Up = 'w';
  const paddle2Down = 's';

  switch (keyPressed) {
    case paddle1Up:
      if (paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
      }
      break;
    case paddle1Down:
      if (paddle1.y < gameHeight - paddle1.height) {
        paddle1.y += paddleSpeed;
      }
      break;
    case paddle2Up:
      if (paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
      }
      break;
    case paddle2Down:
      if (paddle2.y < gameHeight - paddle2.height) {
        paddle2.y += paddleSpeed;
      }
      break;
  }
}
function updateScore() {
  scoreText.innerHTML = `Player 1 > ${player1Score} : ${player2Score} < Player 2`;
}
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  paddle1 = {
    width: 25,
    height: 100,
    x: 10,
    y: 0,
  };
  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 35,
    y: gameHeight - 100,
  };
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalId);
  gameStart();
}
