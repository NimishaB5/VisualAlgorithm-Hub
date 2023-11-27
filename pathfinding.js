document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");
     
    
    function createGrid(size) {

     // Get the grid size from the input field
     let gridSize;
     document.addEventListener("DOMContentLoaded", function () {
    const gridSizeInput = document.getElementById("gridSize");
    gridSize = parseInt(gridSizeInput.value, 10);
     });
    const grid = document.getElementById("grid"); // Get the table element
    grid.innerHTML = ""; // Clear the grid
    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("td");
            cell.dataset.coords = `${i},${j}`; // Set data-coords attribute
            
            

            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    // Now that the cells are part of the DOM, add the event listener
    addCellClickListeners();
}


// JavaScript to show the grid container when the button is clicked
const createGridButton = document.getElementById("createGridButton");
const gridContainer = document.getElementById("grid-container");
const gridSection = document.getElementById("grid-section");
const gridSizeInput = document.getElementById("gridSize");
const grid = document.getElementById("grid");
const obstacles = new Set();

createGridButton.addEventListener("click", () => {
    gridSize = parseInt(gridSizeInput.value, 10);
    createGrid(gridSize);
    gridContainer.style.display = "block"; // Show the grid container
    
});


// Add event listener to handle cell clicks
let selectedMode = "start"; // Initially, we set it to "start" mode
let startCell = null;
let endCell = null;
// Function to switch between start and end point selection
function switchMode(mode) {
    selectedMode = mode;
    // Set isDrawing to true only when in draw mode
    isDrawing = mode === 'draw';
  
}


// Function to handle cell click events
function handleCellClick(event) {
    const cell = event.target;
    const coords = cell.dataset.coords;
    console.log('Cell clicked in mode:', selectedMode, 'isDrawing:', isDrawing);
    if (selectedMode === "start") {
        // Handle setting the start point
        if (startCell) {
            // Clear the previous start cell
            startCell.style.backgroundColor = "#f0f0f0"; // Restore default color
        }
        startCell = cell;
        cell.style.backgroundColor = "green"; // Visualize the start point
    } else if (selectedMode === "end") {
        // Handle setting the end point
        if (endCell) {
            // Clear the previous end cell
            endCell.style.backgroundColor = "#f0f0f0"; // Restore default color
        }
        endCell = cell;
        cell.style.backgroundColor = "red"; // Visualize the end point
    }
    else if (selectedMode === "draw") {
            // Handle drawing obstacles
            if (isDrawing) {
                if (obstacles.has(coords)) {
                    // If the cell is already an obstacle, erase it
                    obstacles.delete(coords);
                    cell.classList.remove("obstacle");
                } else {
                    // Otherwise, draw an obstacle
                    obstacles.add(coords);
                    cell.classList.add("obstacle");
                }
        }
    }
}   

// Add event listeners to each cell in the grid
function addCellClickListeners() {
    const gridCells = document.querySelectorAll("#grid td");
    gridCells.forEach((cell) => {
        cell.addEventListener("click", handleCellClick);
    });
}

// Add event listeners to the buttons
const selectStartButton = document.getElementById("selectStartButton");
selectStartButton.addEventListener("click", () => {
    switchMode('start')
    startCell = null;
    console.log("Start cell selected");
});

const selectEndButton = document.getElementById("selectEndButton");
selectEndButton.addEventListener("click", () => {
    switchMode("end")
    endCell = null;
    console.log("End cell selected");
});

const drawObstaclesButton = document.getElementById("drawObstaclesButton");
drawObstaclesButton.addEventListener("click", () => {
    switchMode('draw');
    console.log("Draw obstacles mode selected");
});

const clearGridButton = document.getElementById("clearGridButton");
clearGridButton.addEventListener("click", clearGrid);



// Function to reset the grid
function clearGrid() {
    if (startCell) {
        startCell.style.backgroundColor = "#f0f0f0"; // Restore default color
    }
    if (endCell) {
        endCell.style.backgroundColor = "#f0f0f0"; // Restore default color
    }
     // Clear obstacles by resetting cell background colors
    const gridCells = document.querySelectorAll("#grid td");
    gridCells.forEach((cell) => {
        cell.style.backgroundColor = "#f0f0f0"; // Restore default color
    });
    startCell = null;
    endCell = null;
    selectedMode = "start"; // Set mode back to "start"
}

// Function to get the coordinates of the start and end points
function getStartPoint() {
    if (startCell) {
        const[x,y] = startCell.dataset.coords.split(',').map(Number); // Get the coordinates as [row, column]
        console.log(x,y);
        return {x,y};
    }
    return null;
}

function getEndPoint() {
    if (endCell) {
        const[x,y] = endCell.dataset.coords.split(',').map(Number); // Get the coordinates as [row, column]
        return {x,y};    
    }
    return null;
}


function handleObstacle(cell, coords) {
    if (isDrawing) {
        if (cell.classList.contains("obstacle")) {
            cell.classList.remove("obstacle");
        } else {
            cell.classList.add("obstacle");
        }
    }
}

// Event listener for "Run Selected Algorithm" button
document.getElementById("runPathfindingAlgorithmButton").addEventListener("click", () => {
    const algorithmSelect = document.getElementById("pathfindingAlgorithmSelection");
    console.log("Button clicked"); // Add this line for debugging
    const selectedAlgorithm = algorithmSelect.value;
    
    if (selectedAlgorithm === "bfs") {
        console.log("Running BFS algorithm"); // Add this line for debugging
        console.log("Start cell :" , startCell);
        console.log("End cell: ", endCell);
        if(startCell && endCell) {
            console.log("called");
        breadthFirstSearch(obstacles);
        } else {
            alert("Please select both start and end points");
        }
    }
    if (selectedAlgorithm === "dfs"){
        console.log("Running DFS algorithm"); // Add this line for debugging
        console.log("Start cell :" , startCell);
        console.log("End cell: ", endCell);
        if(startCell && endCell) {
            console.log("called");
        depthFirstSearch(obstacles);
        } else {
            alert("Please select both start and end points");
        }

    }
    if (selectedAlgorithm === "dijkstra"){
        console.log("Running dijkstra algorithm"); // Add this line for debugging
        console.log("Start cell :" , startCell);
        console.log("End cell: ", endCell);
        if(startCell && endCell) {
            console.log("called");
        dijkstraSearch(obstacles);
        } else {
            alert("Please select both start and end points");
        }
    }
});

async function highlightVisited(cell, duration) {
    const originalColor = cell.style.backgroundColor;
    cell.style.backgroundColor = "lightblue"; // Color for visited cells
    await sleep(duration);
    cell.style.backgroundColor = originalColor;
}

async function highlightQueue(cell, duration) {
    const originalColor = cell.style.backgroundColor;
    cell.style.backgroundColor = "rgba(255, 165, 0, 0.7)"; // Color for cells in the queue
    await sleep(duration);
    cell.style.backgroundColor = originalColor;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let animationSpeedPath=50;

async function breadthFirstSearch(obstacles) {
    const start = getStartPoint();
    const end = getEndPoint();
  
    if (start === null || end === null) {
        alert("Please select both start and end points.");
        return;
    }
  
    const gridCells = document.querySelectorAll("#grid td");
    const queue = [];
    const visited = new Set();
    const pathColor = "yellow"; // Color for the shortest path cells
    const visitedColor = "lightblue"; // Color for visited cells
    const queueColor = "lightgreen"; // Color for cells in the queue
  
    // Define movement directions (up, down, left, right)
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
  
    // Function to check if a cell is valid
    function isValidCell(x, y) {
        const coords = `${x},${y}`;
        return x >= 0 && x < gridSize && y >= 0 && y < gridSize && !obstacles.has(coords);;
    }
  
    // Function to mark a cell with a color
    function markCell(cell, color) {
        cell.style.backgroundColor = color;
    }
  
    // Initialize the queue with the start cell
    queue.push(gridCells[start.x * gridSize + start.y]);
    visited.add(start);
  
    // Function to process the next cell in the queue with a delay
    async function processNextCell() {
        if (queue.length > 0) {
            const currentCell = queue.shift();
            const [x, y] = currentCell.dataset.coords.split(',').map(Number);
  
            if (x === end.x && y === end.y) {
                // Reached the end point, reconstruct the path with a delay
                let pathCell = currentCell;
                while (pathCell !== gridCells[start.x * gridSize + start.y]) {
                    markCell(pathCell, pathColor);
                    const [px, py] = pathCell.dataset.from.split(',').map(Number);
                    pathCell = gridCells[px * gridSize + py];
                    await sleep(animationSpeedPath); // Add a delay
                }
                markCell(gridCells[start.x * gridSize + start.y], visitedColor);
                markCell(gridCells[end.x * gridSize + end.y], visitedColor);
            } else {
                for (const [dx, dy] of directions) {
                    const newX = x + dx;
                    const newY = y + dy;
  
                    if (isValidCell(newX, newY)) {
                        const neighborCell = gridCells[newX * gridSize + newY];
  
                        if (!visited.has(neighborCell)) {
                            visited.add(neighborCell);
                            neighborCell.dataset.from = `${x},${y}`;
                            queue.push(neighborCell);
                            markCell(neighborCell, queueColor);
                            await sleep(animationSpeedPath); // Add a delay
                        }
                    }
                }
                markCell(currentCell, visitedColor);
                setTimeout(processNextCell, animationSpeedPath); // Continue with the next cell
            }
        } else {
            // If BFS does not find a path to the end point
            alert("No path found to the end point.");
        }
    }
  
    // Start the algorithm with the first cell
    processNextCell();
}

// Function to implement Depth-First Search (DFS)
async function depthFirstSearch(obstacles) {
    const start = getStartPoint();
    const end = getEndPoint();
    console.log("Start point:", start);
    console.log("End point:", end);

    if (start === null || end === null) {
        alert("Please select both start and end points.");
        return;
    }

    const gridCells = document.querySelectorAll("#grid td");
    const stack = [];
    const visited = new Set();
    const pathColor = "yellow"; // Color for the shortest path cells
    const visitedColor = "lightblue"; // Color for visited cells

    // Define movement directions (up, down, left, right)
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    // Function to check if a cell is valid
    function isValidCell(x, y) {
        const coords = `${x},${y}`;
        return x >= 0 && x < gridSize && y >= 0 && y < gridSize && !obstacles.has(coords);;
    }

    // Function to mark a cell as visited
    function markAsVisited(cell) {
        cell.style.backgroundColor = visitedColor;
    }

    // Function to highlight cells in the stack
    async function highlightStack(cell) {
        cell.style.backgroundColor = "lightgreen"; // Color for cells in the stack
        await sleep(animationSpeedPath);
    }

    // Function to mark a cell as path
    function markAsPath(cell) {
        if (cell) {
            cell.style.backgroundColor = pathColor;
        }
    }

    // Function to process the next cell in the stack
    async function processNextCell() {
        if (stack.length > 0) {
            const currentCell = stack.pop();
            const [x, y] = currentCell.dataset.coords.split(',').map(Number);

            if (x === end.x && y === end.y) {
                // Reached the end point, reconstruct the path with a delay
                let pathCell = currentCell;

                const reconstructPath = async () => {
                    if (pathCell && pathCell !== gridCells[start.x * gridSize + start.y]) {
                        markAsPath(pathCell);
                        const [px, py] = pathCell.dataset.from.split(',').map(Number);
                        pathCell = gridCells[px * gridSize + py];
                        await sleep(animationSpeedPath); // Add a delay
                        await reconstructPath();
                    } else {
                        markAsVisited(gridCells[start.x * gridSize + start.y]);
                        markAsVisited(gridCells[end.x * gridSize + end.y]);
                    }
                };

                await reconstructPath(); // Start path reconstruction with a delay
            } else {
                for (const [dx, dy] of directions) {
                    const newX = x + dx;
                    const newY = y + dy;

                    if (isValidCell(newX, newY)) {
                        const neighborCell = gridCells[newX * gridSize + newY];

                        if (!visited.has(neighborCell)) {
                            visited.add(neighborCell);
                            neighborCell.dataset.from = `${x},${y}`;
                            stack.push(neighborCell);
                            await highlightStack(neighborCell);
                            await sleep(animationSpeedPath); // Add a delay
                            await processNextCell(); // Continue with the next cell
                        }
                    }
                }
            }
        }
    }

    // Initialize the stack with the start cell
    stack.push(gridCells[start.x * gridSize + start.y]);
    visited.add(start);

    // Start the algorithm with the first cell
    await processNextCell();
}




// Function to implement Dijkstra's Algorithm
async function dijkstraSearch(obstacles) {
    const start = getStartPoint();
    const end = getEndPoint();

    if (start === null || end === null) {
        alert("Please select both start and end points.");
        return;
    }

    const gridCells = document.querySelectorAll("#grid td");
    const visited = new Set();
    const distances = new Map(); // Map to store the minimum distances
    const pathColor = "yellow"; // Color for the shortest path cells
    const visitedColor = "lightblue"; // Color for visited cells

    // Function to check if a cell is valid
    function isValidCell(x, y) {
        const coords = `${x},${y}`;
        return x >= 0 && x < gridSize && y >= 0 && y < gridSize && !obstacles.has(coords);;
    }

    // Function to mark a cell as visited
    function markAsVisited(cell) {
        cell.style.backgroundColor = visitedColor;
    }

    // Function to highlight cells in the queue
    async function highlightQueue(cell) {
        cell.style.backgroundColor = "lightgreen"; // Color for cells in the queue
        await sleep(animationSpeedPath);
    }

    // Function to mark a cell as path
    function markAsPath(cell) {
        if (cell) {
            cell.style.backgroundColor = pathColor;
        }
    }

    for (const cell of gridCells) {
        distances.set(cell, Infinity); // Initialize distances with infinity
    }

    distances.set(gridCells[start.x * gridSize + start.y], 0); // Start cell distance is 0

    while (visited.size < gridCells.length) {
        // Find the cell with the minimum distance
        let minDistance = Infinity;
        let currentCell = null;

        for (const cell of gridCells) {
            if (!visited.has(cell) && distances.get(cell) < minDistance) {
                minDistance = distances.get(cell);
                currentCell = cell;
            }
        }

        if (!currentCell) {
            break; // No valid path found
        }

        visited.add(currentCell);
        currentCell.style.backgroundColor = visitedColor;

        if (currentCell === gridCells[end.x * gridSize + end.y]) {
            // Reached the end point, reconstruct the path
            let pathCell = currentCell;
            while (pathCell !== gridCells[start.x * gridSize + start.y]) {
                pathCell.style.backgroundColor = pathColor; // Set path cells to yellow
                const [px, py] = pathCell.dataset.from.split(',').map(Number);
                pathCell = gridCells[px * gridSize + py];
            }
            return;
        }

        const [x, y] = currentCell.dataset.coords.split(',').map(Number);

        // Define movement directions (up, down, left, right)
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1]
        ];

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            if (isValidCell(newX, newY, obstacles)) {
                const neighborCell = gridCells[newX * gridSize + newY];
                if (!visited.has(neighborCell)) {
                    const tentativeDistance = distances.get(currentCell) + 1; // Assuming equal weight for all cells
                    if (tentativeDistance < distances.get(neighborCell)) {
                        distances.set(neighborCell, tentativeDistance);
                        neighborCell.dataset.from = `${x},${y}`;
                        await highlightQueue(neighborCell);
                        await sleep(animationSpeedPath); // Add a delay
                    }
                }
            }
        }
    }

    alert("No path found to the end point.");
}

// Function to implement A* algorithm
function aStarSearch(obstacles) {
    const start = getStartPoint();
    const end = getEndPoint();

    if (start === null || end === null) {
        alert("Please select both start and end points.");
        return;
    }

    const gridCells = document.querySelectorAll("#grid td");
    const openSet = new Set([gridCells[start.x * gridSize + start.y]]);
    const closedSet = new Set();
    const gScore = new Map();
    const fScore = new Map();

    // Initialize scores
    for (const cell of gridCells) {
        gScore.set(cell, Infinity);
        fScore.set(cell, Infinity);
    }
    gScore.set(gridCells[start.x * gridSize + start.y], 0);
    fScore.set(gridCells[start.x * gridSize + start.y], heuristic(start, end));

    // Function to calculate heuristic (Euclidean distance)
    function heuristic(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    // Function to reconstruct path
    function reconstructPath(currentCell) {
        if (currentCell !== gridCells[start.x * gridSize + start.y]) {
            markAsPath(currentCell);
            const [px, py] = currentCell.dataset.from.split(',').map(Number);
            const parentCell = gridCells[px * gridSize + py];
            reconstructPath(parentCell);
        } else {
            markAsVisited(gridCells[start.x * gridSize + start.y]);
            markAsVisited(gridCells[end.x * gridSize + end.y]);
        }
    }

    function processNextCell() {
        if (openSet.size > 0) {
            let currentCell = null;
            let minFScore = Infinity;
            for (const cell of openSet) {
                if (fScore.get(cell) < minFScore) {
                    minFScore = fScore.get(cell);
                    currentCell = cell;
                }
            }

            openSet.delete(currentCell);
            closedSet.add(currentCell);

            const [x, y] = currentCell.dataset.coords.split(',').map(Number);

            if (x === end.x && y === end.y) {
                // Reached the end point, reconstruct the path
                reconstructPath(currentCell);
            } else {
                for (const [dx, dy] of directions) {
                    const newX = x + dx;
                    const newY = y + dy;

                    if (isValidCell(newX, newY)) {
                        const neighborCell = gridCells[newX * gridSize + newY];

                        if (!closedSet.has(neighborCell)) {
                            const tentativeGScore = gScore.get(currentCell) + 1;
                            if (!openSet.has(neighborCell)) {
                                openSet.add(neighborCell);
                            } else if (tentativeGScore >= gScore.get(neighborCell)) {
                                continue;
                            }

                            neighborCell.dataset.from = `${x},${y}`;
                            gScore.set(neighborCell, tentativeGScore);
                            fScore.set(neighborCell, tentativeGScore + heuristic({ x: newX, y: newY }, end));
                            markAsVisited(neighborCell);
                            setTimeout(processNextCell, animationSpeedPath);
                        }
                    }
                }
            }
        }
    }

    // Start the algorithm with the first cell
    processNextCell();
}
});