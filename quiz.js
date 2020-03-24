



// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question


// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock   X
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score




//Timer using the tomato timer as a template
var statusSpan = document.querySelector("#status");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var startButton = document.querySelector("#start-button");
var instructions = document.querySelector("#instructions");
var totalSeconds = 0;
var status;
var secondsElapsed = 0;
var interval;
var timeStarted = false;

//Start timer by clicking start

startButton.addEventListener("click", startTimer);

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
    setTime();
    status = "Running";
    startButton.style.display = "none";
    instructions.style.display = "none";
    statusSpan.textContent = status;
    /* the "interval" variable here using "setInterval()" begins the recurring increment of the 
       secondsElapsed variable which is used to check if the time is up */
    interval = setInterval(function () {
        secondsElapsed++;
        //So renderTime() is called here once every second.
        renderTime();
    }, 1000);
    showQuestions();
}
// set timer to 2 minutes
function setTime() {
    var minutes = 1;
    clearInterval(interval);
    totalSeconds = minutes * 60;
}

//These two functions are just for making sure the numbers look nice for the html elements
function getFormattedMinutes() {
    //
    var secondsLeft = totalSeconds - secondsElapsed;

    var minutesLeft = Math.floor(secondsLeft / 60);

    var formattedMinutes;

    if (minutesLeft < 10) {
        formattedMinutes = "0" + minutesLeft;
    } else {
        formattedMinutes = minutesLeft;
    }

    return formattedMinutes;
}

function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;
    var formattedSeconds;
    if (secondsLeft < 10) {
        formattedSeconds = "0" + secondsLeft;
    } else {
        formattedSeconds = secondsLeft;
    }
    return formattedSeconds;
}

//This function does 2 things. displays the time and checks to see if time is up.
function renderTime() {
    // When renderTime is called it sets the textContent for the timer html...
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();
    // ..and then checks to see if the time has run out
    if (secondsElapsed >= totalSeconds) {
        console.log("Times up!");
        stopTimer();
        endGame();
    }
}
/* This function stops the interval and also resets secondsElapsed 
   and calls "setTime()" which effectively reset the timer 
   to the input selections workMinutesInput.value and restMinutesInput.value */
function stopTimer() {
    secondsElapsed = 0;
    setTime();
    renderTime();
}
//This is where the app is really kicked-off, setTime and renderTime are the two main routines.
setTime();
renderTime();


questions = ["hi", "hello", 3, 4, 5, 6, 7, 8]
var counter = 0;
var questionSpan = document.querySelector("#question");
var next = document.querySelector(".next");

function showQuestions() {
    questionSpan.innerHTML = questions[counter];
}



next.onclick = function () {
    if (counter < questions.length - 1) {
        counter = counter + 1;
        questionSpan.innerHTML = questions[counter];
        console.log(questions[counter]);

    } else {console.log("hi");
    endGame()}
}
















function endGame() {
    status = "Game over";
    statusSpan.textContent = status;

    //window.location.href = "alldone.html" ; 
}