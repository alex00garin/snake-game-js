// Import necessary functions from other JavaScript files
import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake-body.js';
import { update as updateFood, draw as drawFood } from './snake-food.js';
import { outsideGrid } from './snake-grid.js';

// Get necessary HTML elements
const gameBoard = document.getElementById('game-board');
const speedInput = document.getElementById('speed-input');
const messageDisplay = document.querySelector('#message');

// Initialize game variables
let gameOver = false;
let lastRenderTime = 0;
export let SNAKE_SPEED = Number(speedInput.value); // Initial snake speed

// Add an event listener for changes to the speed input
speedInput.addEventListener('change', () => {
  SNAKE_SPEED = Number(speedInput.value);
});

// The main game loop
function main(currentTime) {
  if (gameOver) { // If the game is over, display a message and return
    return messageDisplay.textContent = 'You lose, try again!'
  }

  window.requestAnimationFrame(main); // Request animation frame to update the game
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; // Calculate the time since the last render

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) { // If it is not yet time to render, return
    return;
  }

  console.log('Render'); // Log a message to the console indicating that it is time to render
  lastRenderTime = currentTime; // Set the last render time to the current time

  update(); // Update the game state
  draw(); // Draw the game on the screen
}

window.requestAnimationFrame(main); // Start the game loop

// Update the game state
function update() {
  updateSnake(); // Update the snake's position
  updateFood(SNAKE_SPEED); // Update the food's position and speed (passed to the food.js module)
  checkDeath(); // Check if the game is over
}

// Draw the game on the screen
function draw() {
  gameBoard.innerHTML = ''; // Clear the game board
  drawSnake(gameBoard); // Draw the snake
  drawFood(gameBoard); // Draw the food
}

// Check if the game is over
function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection(); // If the snake is outside the grid or has collided with itself, the game is over
}

// Reset the game and start over
document.addEventListener('DOMContentLoaded', () => {
  const resetBtn = document.getElementById('btn'); // Get the reset button
  resetBtn.textContent = 'Reset'; // Set the reset button text
  resetBtn.addEventListener('click', () => {
    location.reload(); // Reload the page when the reset button is clicked
  });
});
