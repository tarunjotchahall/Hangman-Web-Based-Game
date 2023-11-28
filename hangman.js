document.addEventListener('DOMContentLoaded', () => {
    const wordDatabase = [
        "example", "hangman", "javascript", "coding",
        "algorithm", "function", "variable", "constant",
        "array", "object", "loop", "condition",
        "syntax", "compilation", "execution", "inheritance",
        "recursion", "polymorphism", "abstraction",
        "callback", "promise", "event", "framework",
        "library", "react", "angular", "vue",
        "node", "express", "database", "sql",
        "mongodb", "websocket", "json", "xml",
        "html", "css", "bootstrap", "tailwind"
      ];      
    let selectedWord = '';
    let guessedLetters = [];
    let mistakes = 0;

    const hangman = document.getElementById('hangman');
    const wordDisplay = document.getElementById('word');
    const keyboard = document.getElementById('keyboard');
    const resetButton = document.getElementById('reset');
    const message = document.getElementById('message');
    const guessesUsed = document.getElementById('guesses-used');
    const guessesLeft = document.getElementById('guesses-left');


    function initGame() {
        selectedWord = wordDatabase[Math.floor(Math.random() * wordDatabase.length)].toUpperCase();
        guessedLetters = [];
        mistakes = 0;
        displayWord();
        generateKeyboard();
        updateGuessesInfo();
        updateHangman();
        message.textContent = '';
        // Show the guesses info elements
        guessesUsed.style.display = 'block';
        guessesLeft.style.display = 'block';
    }

    function displayWord() {
        wordDisplay.innerHTML = selectedWord.split('').map(letter =>
            `<span class="letter">${guessedLetters.includes(letter) ? letter : '_'}</span>`
        ).join('');
    }

    function generateKeyboard() {
        keyboard.innerHTML = '';
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => handleGuess(letter));
            keyboard.appendChild(button);
        });
    }

    function handleGuess(chosenLetter) {
        guessedLetters.push(chosenLetter);
        displayWord();

        if (!selectedWord.includes(chosenLetter)) {
            mistakes++;
            updateHangman();
            updateGuessesInfo(); // Update the number of guesses after a mistake
            if (mistakes === 6) gameOver(false);
        } else {
            const isComplete = selectedWord.split('').every(letter => guessedLetters.includes(letter));
            if (isComplete) gameOver(true);
        }
    }

    function updateGuessesInfo() {
        guessesUsed.textContent = `Guesses Used: ${mistakes}`;
        guessesLeft.textContent = `Guesses Left: ${6 - mistakes}`;
        guessesUsed.classList.add('update-animation');
        guessesLeft.classList.add('update-animation');
        // Remove the class after the animation completes
    setTimeout(() => {
        guessesUsed.classList.remove('update-animation');
        guessesLeft.classList.remove('update-animation');
    }, 200); // matches the transition duration
    }

    function updateHangman() {
        hangman.innerHTML = '';
        console.log('Updating hangman with mistakes:', mistakes); // Debugging log
    
        // A function to create a hangman part
        function createPart(className) {
            const part = document.createElement('div');
            part.className = `part ${className}`;
            part.style.display = 'block'; // Ensure the part is visible
            console.log('Creating part:', className); // Debugging log
            return part;
        }
        
        // Add parts based on the number of mistakes
        if (mistakes >= 1) hangman.appendChild(createPart('head'));
        if (mistakes >= 2) hangman.appendChild(createPart('body'));
        if (mistakes >= 3) hangman.appendChild(createPart('left-arm'));
        if (mistakes >= 4) hangman.appendChild(createPart('right-arm'));
        if (mistakes >= 5) hangman.appendChild(createPart('left-leg'));
        if (mistakes >= 6) hangman.appendChild(createPart('right-leg'));
    }
    
    function gameOver(win) {
        message.textContent = win ? 'Congratulations! You won!' : 'Game over!';
        keyboard.innerHTML = '';
    }

    resetButton.addEventListener('click', initGame);
    initGame();
});
