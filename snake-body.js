// import the function to get input direction from the input module
import { getInputDirection } from "./snake-input.js";

// initialize the snake body array with an object containing x and y properties
const snakeBody = [{ x: 21, y: 21 }];

// newSegments variable will store the number of new segments to be added to the snake
let newSegments = 0;

// function to update the snake's position and direction
export function update() {
  // add new segments to the snake
  addSegments();
  // get the input direction from the input module
  const inputDirection = getInputDirection();

  // move each segment of the snake's body one position towards the head
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  // move the head of the snake in the input direction
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

// function to draw the snake on the game board
export function draw(gameBoard) {
  // loop through each segment of the snake and create a div element
  // with the appropriate position and class
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

// function to add new segments to the snake
export function expandSnake(amount) {
  newSegments += amount;
}

// function to check if a given position is on the snake's body
export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) {
      return false;
    }

    return equalPositions(segment, position);
  });
}

// function to get the head of the snake
export function getSnakeHead() {
  return snakeBody[0];
}

// function to check if the snake intersects with itself
export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

// helper function to check if two positions are equal
function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

// function to add new segments to the snake
function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  // reset newSegments back to 0
  newSegments = 0;
}
