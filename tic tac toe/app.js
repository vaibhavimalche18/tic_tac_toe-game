let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newButton = document.querySelector("#new");
let msgcontainer = document.querySelector("#msg");
let container = document.querySelector(".container");

let turn = true; // true = "O", false = "X"
let count = 0; // Track moves

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Reset Game Function
const resetGame = () => {
    turn = true;
    count = 0;
    enableBoxes();
    msgcontainer.innerText = ""; // Clear message
    container.classList.add("hide"); // Hide result message
};

// Handling box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        box.disabled = true;
        turn = !turn;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

// Handle Draw
const gameDraw = () => {
    msgcontainer.innerText = "Game was a Draw!";
    container.classList.remove("hide");
    disableBoxes();
};

// Disable all boxes after game ends
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Enable all boxes when game resets
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Show Winner Message
const showWinner = (winner) => {
    msgcontainer.innerText = `Congratulations! Winner is ${winner}`;
    container.classList.remove("hide");
    disableBoxes();
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winpatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText);
            return true;
        }
    }
    return false;
};

// Event Listeners for Buttons
newButton.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

// Start the game properly
resetGame();
