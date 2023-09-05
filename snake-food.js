// Importing necessary functions from other modules
import { onSnake, expandSnake } from './snake-body.js';
import { randomGridPosition } from './snake-grid.js';

// Declaring variables
let score = 0;
let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

// Function to update the game state
export function update(speed) {
  // Check if the snake has collided with the food
  if (onSnake(food)) {
    // Increase the length of the snake
    expandSnake(EXPANSION_RATE);
    // Spawn a new food at a random position
    food = getRandomFoodPosition();
    // Increase the player's score
    score += (speed * 10);
    // Update the score display
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Score: ' + score;
  }
}

// Function to draw the game board
export function draw(gameBoard) {
  // Create a new element for the food
  const foodElement = document.createElement('div');
  // Set the food element's position on the grid
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  // Add a CSS class to the food element
  foodElement.classList.add('food');
  // Add the food element to the game board
  gameBoard.appendChild(foodElement);
}

// Function to get a random position for the food
function getRandomFoodPosition() {
  let newFoodPosition;
  // Keep generating a new position until it is not on the snake
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  // Return the new food position
  return newFoodPosition;
}
