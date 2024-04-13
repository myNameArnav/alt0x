const altDesc = [
    "Xs and Os",
    "Tick Tack Toe",
    "Three in a Row",
    "X and O Game",
    "Cat's Game",
    "Triad",
];

const boxes = document.querySelectorAll('.box');
let naught = true;
let playerOne = [];
let playerTwo = [];

// Cache element selections
const cells = {
    "11": document.getElementById("11"),
    "12": document.getElementById("12"),
    "13": document.getElementById("13"),
    "21": document.getElementById("21"),
    "22": document.getElementById("22"),
    "23": document.getElementById("23"),
    "31": document.getElementById("31"),
    "32": document.getElementById("32"),
    "33": document.getElementById("33")
};

boxes.forEach(box => {
    box.addEventListener('click', () => {
        const element = cells[box.id];
        const currentPlayer = naught ? playerOne : playerTwo;

        if (currentPlayer.length === 3) {
            cells[currentPlayer[0]].removeAttribute("disabled");
            currentPlayer.shift();
        }

        element.textContent = naught ? "0" : "X";
        element.setAttribute("disabled", "disabled");
        currentPlayer.push(box.id);

        naught = !naught;
        const winner = winCheck();
        if (winner) {
            alert(winner + " won!");
            resetGame()
        }
    });
});

function winCheck() {
    const lines = [
        // Rows
        [cells["11"], cells["12"], cells["13"]],
        [cells["21"], cells["22"], cells["23"]],
        [cells["31"], cells["32"], cells["33"]],
        // Columns
        [cells["11"], cells["21"], cells["31"]],
        [cells["12"], cells["22"], cells["32"]],
        [cells["13"], cells["23"], cells["33"]],
        // Diagonals
        [cells["11"], cells["22"], cells["33"]],
        [cells["13"], cells["22"], cells["31"]]
    ];

    for (const line of lines) {
        const values = line.map(cell => cell.textContent);
        if (values.every(val => val === "0")) {
            return "0";
        } else if (values.every(val => val === "X")) {
            return "X";
        }
    }
    return "";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function resetGame() {
    // Clear all cell content and enable them
    for (const id in cells) {
        const cell = cells[id];
        cell.textContent = "";
        cell.removeAttribute("disabled");
        await sleep(100);
    }

    // Clear player arrays
    playerOne = [];
    playerTwo = [];

    // Reset player turn
    naught = true;
}