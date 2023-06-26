const valueOfDice = [];
let selectedDice = [];


function initializeGame() {
    document.addEventListener("DOMContentLoaded", function () {
        const diceContainer = document.getElementById("board");
        const diceElements = diceContainer.querySelectorAll("img");
        const diceRollsMessage = document.getElementById("dice-rolls-message");

        let rolls = 0;

        function rollDice() {
            rolls += 1;

            diceElements.forEach((diceElement) => {
                diceElement.classList.remove("selected");
            });

            selectedDice.forEach((diceIndex) => {
                const diceElement = diceElements[diceIndex];
                const prevValue = parseInt(diceElement.textContent.split(":")[1].trim());
                valueOfDice.push(prevValue);
            });

            console.log(valueOfDice);
            selectedDice = [];

            const diceValues = Array.from(diceElements).map(() => {
                return Math.floor(Math.random() * 6) + 1;
            });

            diceElements.forEach((diceElement, index) => {
                const diceValue = diceValues[index];
                diceElement.textContent = `Dice ${index + 1}: ${diceValue}`;
                const diceImg = document.getElementById(`dice-img-${index + 1}`);
                if (diceImg != null) {
                    diceImg.src = `/dice/dice-${diceValue}.svg`;
                }
            });

            updateScore();

            const rollsRemaining = 5 - rolls;
            if (rollsRemaining === 1) {
                diceRollsMessage.textContent = "Click button to finish game";
            } else if (rollsRemaining === 0) {
                diceRollsMessage.textContent = "No rolls remaining";
                rollDiceBtn.disabled = true;
            } else {
                diceRollsMessage.textContent = `Roll dice (${rollsRemaining-1} roll(s) remaining)`;
            }

            if (rolls === 1) {
                addEventListenerToDice(diceElements);
            }
        }

        const rollDiceBtn = document.getElementById("roll-dice-btn");
        rollDiceBtn.addEventListener("click", rollDice);
    });
}

function addEventListenerToDice(diceElements) {
    diceElements.forEach((diceElement) => {
        diceElement.addEventListener("click", function () {
            const diceIndex = Array.from(diceElements).indexOf(this);
            if (selectedDice.includes(diceIndex)) {
                selectedDice.splice(selectedDice.indexOf(diceIndex), 1);
                this.classList.remove("selected");
            } else {
                selectedDice.push(diceIndex);
                this.classList.add("selected");
            }

            this.parentElement.removeChild(this);
        });
    });
}

function updateScore() {
    const scoreSection = document.getElementById("score");
    const scoreContainer = [
        document.getElementById("ones"),
        document.getElementById("twos"),
        document.getElementById("threes"),
        document.getElementById("fours"),
        document.getElementById("fives"),
        document.getElementById("sixes")
    ];

    const counts = {};
    for (let i = 1; i <= 6; i++) {
        counts[i] = 0;
    }

    // Count occurrences of each value
    valueOfDice.forEach((x) => {
        counts[x] += 1;
    });

    console.log(counts);

    for (let i = 1; i <= 6; i++) {
        const count = counts[i] * i;
        scoreContainer[i - 1].textContent = count.toString();
    }
}

initializeGame();
