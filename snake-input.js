// Initialize the input direction to {x:0, y:0} and the last input direction to {x:0, y:0}
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

// Add an event listener to the window for keydown events
window.addEventListener('keydown', e => {
    // Use a switch statement to update the input direction based on the key pressed
    switch (e.key) {
        case 'ArrowUp':
            // Check if the last input direction was not down to prevent reversing direction
            if (lastInputDirection.y !== 0) break;
            // Update the input direction to up
            inputDirection = { x: 0, y: -1};
            break;
        case 'ArrowDown':
            // Check if the last input direction was not up to prevent reversing direction
            if (lastInputDirection.y !== 0) break;
            // Update the input direction to down
            inputDirection = { x: 0, y: 1};
            break;
        case 'ArrowLeft':
            // Check if the last input direction was not right to prevent reversing direction
            if (lastInputDirection.x !== 0) break;
            // Update the input direction to left
            inputDirection = { x: -1, y: 0};
            break;
        case 'ArrowRight':
            // Check if the last input direction was not left to prevent reversing direction
            if (lastInputDirection.x !== 0) break;
            // Update the input direction to right
            inputDirection = { x: 1, y: 0};
            break;
    }
});

// Add an event listener to the game board for touch events
const gameBoard = document.getElementById('game-board');
let touchStartX, touchStartY;

gameBoard.addEventListener('touchstart', e => {
    // Get the x and y coordinates of the touch event
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

gameBoard.addEventListener('touchmove', e => {
    // Get the x and y coordinates of the current touch event
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    // Calculate the distance and direction of the swipe gesture
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
        // If the swipe gesture is mostly horizontal, update the input direction to left or right
        inputDirection = dx > 0 ? { x: 1, y: 0} : { x: -1, y: 0};
    } else {
        // If the swipe gesture is mostly vertical, update the input direction to up or down
        inputDirection = dy > 0 ? { x: 0, y: 1} : { x: 0, y: -1};
    }
});

// Export a function to get the input direction
export function getInputDirection() {
    // Update the last input direction to the current input direction
    lastInputDirection = inputDirection;
    // Return the current input direction
    return inputDirection;
}
