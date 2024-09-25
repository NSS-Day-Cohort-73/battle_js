const messageDisplay = document.getElementById('message');
const gameboard = document.getElementById('gameboard');
const shipPositions = []; // Store ship positions
let hits = 0;
const totalShips = 2; // Total ships to sink

// Initialize the game
function initGame() {
    placeShips();
    setupEventListeners();
    // setupConfettiListener();
}

// Function to randomly place ships on the board
function placeShips() {
    while (shipPositions.length < totalShips) {
        const randomIndex = Math.floor(Math.random() * 9); // 0 to 8 for a 3x3 gameboard
        if (!shipPositions.includes(randomIndex)) {
            shipPositions.push(randomIndex);
        }
    }
}

// Setup event listeners for each cell
function setupEventListeners() {
    document.getElementById(`cell0`).addEventListener('click', () => handleCellClick(`cell0`));
    document.getElementById(`cell1`).addEventListener('click', () => handleCellClick(`cell1`));
    document.getElementById(`cell2`).addEventListener('click', () => handleCellClick(`cell2`));
    document.getElementById(`cell3`).addEventListener('click', () => handleCellClick(`cell3`));
    document.getElementById(`cell4`).addEventListener('click', () => handleCellClick(`cell4`));
    document.getElementById(`cell5`).addEventListener('click', () => handleCellClick(`cell5`));
    document.getElementById(`cell6`).addEventListener('click', () => handleCellClick(`cell6`));
    document.getElementById(`cell7`).addEventListener('click', () => handleCellClick(`cell7`));
    document.getElementById(`cell8`).addEventListener('click', () => handleCellClick(`cell8`));
}

function setupConfettiListener() {
    gameboard.addEventListener('click', () => {
        triggerConfetti(); // Trigger confetti on gameboard click
    });
}

function triggerConfetti() {
    confetti({
        spread: 70,
        startVelocity: 30,
        elementCount: 100,
        dragFriction: 0.1,
        duration: 3000,
        stagger: 3,
        width: "10px",
        height: "10px",
        colors: ["#bb0000", "#ffffff", "#007BFF"]
    });
}

// Handle cell clicks
function handleCellClick(id) {
    const cell = document.getElementById(id);
    const index = parseInt(id.split("cell")[1]);
    console.log(index);
    // Check if the cell is already clicked
    if (cell.classList.contains('hit') || cell.classList.contains('miss')) {
        messageDisplay.textContent = "Already targeted! Choose another cell.";
        return;
    }

    // Determine if it's a hit or miss
    if (shipPositions.includes(index)) {
        cell.classList.add('hit');
        hits++;
        messageDisplay.textContent = "Hit!";
    } else {
        cell.classList.add('miss');
        messageDisplay.textContent = "Miss!";
    }

    // Check for win condition
    if (hits === totalShips) {
        setTimeout(() => {
            alert("You sunk all the ships! Game Over!");
            resetGame();
        }, 100);
    }
}

// Function to reset the game
function resetGame() {
    hits = 0;
    shipPositions.length = 0; // Clear the ship positions
    messageDisplay.textContent = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell${i}`);
        cell.classList.remove('hit', 'miss'); // Reset the cell styles
    }
    initGame(); // Initialize a new game
}

// Start the game
initGame();
