const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const blockSize = 21;
const canvasSize = 400;
const numBlocks = canvasSize / blockSize;
const appleSize = blockSize - 2;
const snakeColor = "#49e20e";
const appleColor = "#e20e0e";

let snake = [
  { x: numBlocks / 2, y: numBlocks / 2 }
];
let apple = { x: Math.floor(Math.random() * numBlocks), y: Math.floor(Math.random() * numBlocks) };
let dx = 0;
let dy = 0;

function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

function drawSnake() {
  snake.forEach(segment => {
    drawBlock(segment.x, segment.y, snakeColor);
  });
}

function drawApple() {
  drawBlock(apple.x, apple.y, appleColor);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    apple = { x: Math.floor(Math.random() * numBlocks), y: Math.floor(Math.random() * numBlocks) };
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;

  if (keyPressed === 37 && dx !== 1) {
    dx = -1;
    dy = 0;
  } else if (keyPressed === 38 && dy !== 1) {
    dx = 0;
    dy = -1;
  } else if (keyPressed === 39 && dx !== -1) {
    dx = 1;
    dy = 0;
  } else if (keyPressed === 40 && dy !== -1) {
    dx = 0;
    dy = 1;
  }
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 0 || head.x >= numBlocks || head.y < 0 || head.y >= numBlocks) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  if (checkCollision()) {
    alert("Game Over!");
    location.reload();
    return;
  }

  drawApple();
  drawSnake();
  moveSnake();

  setTimeout(gameLoop, 100);
}

document.addEventListener("keydown", changeDirection);
gameLoop();
