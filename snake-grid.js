// Define the size of the grid
const GRID_SIZE = 42;

// Function to generate a random grid position
export function randomGridPosition() {
    // Generate random x and y values within the grid size
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

// Function to check if a position is outside of the grid
export function outsideGrid(position) {
    // Check if the x or y value of the position is less than 1 or greater than the grid size
    return(
        position.x < 1 || position.x > GRID_SIZE || 
        position.y < 1 || position.y > GRID_SIZE
    )
}
