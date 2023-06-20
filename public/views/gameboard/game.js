function initializeGame() {
    // JavaScript code for rolling dice and selecting them
    document.addEventListener("DOMContentLoaded", function () {
        // Get references to the dice elements
        const diceElements = document.querySelectorAll("section[title='Board'] p");

        let selectedDice = [];

        // Function to roll the dice
        function rollDice() {
            selectedDice = [];

            // Remove the "selected" class from dice elements
            diceElements.forEach(function(diceElement) {
                diceElement.classList.remove("selected");
            });

            // Generate random numbers for each dice
            const diceValues = [];

            for (let i = 0; i < diceElements.length; i++) {
                const value = Math.floor(Math.random() * 6) + 1;
                diceValues.push(value);
            }

            // Update the dice values on the page
            for (let i = 0; i < diceElements.length; i++) {
                diceElements[i].textContent = "Dice " + (i + 1) + ": " + diceValues[i];
            }
        }

        // Add click event listener to the roll dice button
        const rollDiceBtn = document.getElementById("roll-dice-btn");
        rollDiceBtn.addEventListener("click", rollDice);

        // Add click event listeners to the dice elements for selection
        for (let i = 0; i < diceElements.length; i++) {
            diceElements[i].addEventListener("click", function () {
                // Add your code for dice selection here

                // console.log("Dice selected: " + this.textContent);

                if (selectedDice.length >= 3) {
                    console.log("You can only select up to three dice.");
                    return;
                }

                // Toggle the selection status of the clicked dice
                const diceIndex = Array.from(diceElements).indexOf(this);
                if (selectedDice.includes(diceIndex)) {
                    // Deselect the dice
                    selectedDice.splice(selectedDice.indexOf(diceIndex), 1);
                    this.classList.remove("selected");
                } else {
                    // Select the dice
                    selectedDice.push(diceIndex);
                    this.classList.add("selected");
                }
            });
        }
    });
}

// Call the initializeGame function to start the game
initializeGame();
