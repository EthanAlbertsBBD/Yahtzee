function initializeGame() {
    // JavaScript code for rolling dice and selecting them
   document.addEventListener("DOMContentLoaded", function() {
       // Get references to the dice elements
       var diceElements = document.querySelectorAll("section[title='Board'] p");

       // Function to roll the dice
       function rollDice() {
           // Generate random numbers for each dice
           var diceValues = [];
           for (var i = 0; i < diceElements.length; i++) {
               var value = Math.floor(Math.random() * 6) + 1;
               diceValues.push(value);
           }

           // Update the dice values on the page
           for (var i = 0; i < diceElements.length; i++) {
               diceElements[i].textContent = "Dice " + (i + 1) + ": " + diceValues[i];
           }
       }

       // Add click event listener to the roll dice button
       var rollDiceBtn = document.getElementById("roll-dice-btn");
       rollDiceBtn.addEventListener("click", rollDice);

       // Add click event listeners to the dice elements for selection
       for (var i = 0; i < diceElements.length; i++) {
           diceElements[i].addEventListener("click", function() {
               // Add your code for dice selection here
               console.log("Dice selected: " + this.textContent);
           });
       }
   });
}

// Call the initializeGame function to start the game
initializeGame();
