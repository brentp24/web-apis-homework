// GIVEN I am taking a code quiz
// WHEN I click the start button X
// THEN a timer starts and I am presented with a question X
// WHEN I answer a question X
// THEN I am presented with another question X
// WHEN I answer a question incorrectly X
// THEN time is subtracted from the clock   X
// WHEN all questions are answered or the timer reaches 0  X
// THEN the game is over X
// WHEN the game is over X
// THEN I can save my initials and score
//Timer using the tomato timer as a template

//Declare question objects!
var Question1 = {
    askQuestion: "Inside which HTML element do we put the JavaScript?",
    answer1: "1. <scripting>",
    answer2: "2. <javascript>",
    answer3: "3. <js>",
    answer4: "4. <script>",
    correctAnswer: "4. <script>"
}

var Question2 = {
    askQuestion: "Where is the correct place to insert a JavaScript?",
    answer1: "1. Both the <head> section and the <body> section are correct",
    answer2: "2. The <body> section",
    answer3: "3. The <head> section",
    correctAnswer: "1. Both the <head> section and the <body> section are correct"
}

var Question3 = {
    askQuestion: "The external JavaScript file must contain the <script> tag.",
    answer1: "True",
    answer2: "False",
    correctAnswer: "False"
}

var Question4 = {
    askQuestion: "How do you write 'Hello World' in an alert box?",
    answer1: "1. alert('Hello World');",
    answer2: "2. msg('Hello World');",
    answer3: "3. alertBox('Hello World');",
    answer4: "4. msgBox('Hello World');",
    correctAnswer: "1. alert('Hello World');"
}

var Question5 = {
    askQuestion: "How do you create a function in JavaScript?",
    answer1: "1. function = myFunction()",
    answer2: "2. function myFunction()",
    answer3: "3. function:myFunction()",
    correctAnswer: "2. function myFunction()"
}

var Question6 = {
    askQuestion: "How do you call a function named 'myFunction'?",
    answer1: "1. call myFunction()",
    answer2: "2. call function myFunction()",
    answer3: "3. myFunction()",
    correctAnswer: "3. myFunction()"
}

var Question7 = {
    askQuestion: "How to write an IF statement in JavaScript?",
    answer1: "1. if i = 5",
    answer2: "2. if (i == 5)",
    answer3: "3. if i == 5 then",
    answer4: "4. if i = 5 then",
    correctAnswer: "2. if (i == 5)"
}

var Question8 = {
    askQuestion: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    answer1: "1. if i <> 5",
    answer2: "2. if (i <> 5)",
    answer3: "3. if i =! 5 then",
    answer4: "4. if (i != 5)",
    correctAnswer: "4. if (i != 5)"
}

var statusSpan = document.querySelector("#status");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var startButton = document.querySelector("#start-button");
var instructions = document.querySelector("#instructions");
var resultSpan = document.querySelector("#result");
var totalSeconds = 0;
var status;
var secondsElapsed = 0;
var interval;
var timeStarted = false;
var questions = [Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8]
var counter = 0;
var askQuestionSpan = document.querySelector("#question");
var answer1Span = document.querySelector("#answer1");
var answer2Span = document.querySelector("#answer2");
var answer3Span = document.querySelector("#answer3");
var answer4Span = document.querySelector("#answer4");
var answersSpan = [answer1Span, answer2Span, answer3Span, answer4Span]
var bottomSection = document.querySelector(".result");
var penalty = 0;
var next = document.querySelector(".next");
var displayScore = document.querySelector("#score");
var score = 0;
var finalDisplay = document.querySelector(".final")
var highScoresDisplay = document.querySelector(".high-scores")
var restartButton = document.querySelector("#restart-button");

//hide questions before the quiz starts
if (status = "Not Started") {
    askQuestionSpan.style.display = "none";
    for (i = 0; i < answersSpan.length; i++) {
        answersSpan[i].style.display = "none"
    };
    bottomSection.style.display = "none";
    finalDisplay.style.display = "none";
    highScoresDisplay.style.display = "none"
}

//Start timer by clicking start
startButton.addEventListener("click", startTimer);

// This function is where the "time" aspect of the timer runs
function startTimer() {
    setTime();
    status = "Running";
    startButton.style.display = "none";
    instructions.style.display = "none";
    highScoresDisplay.style.display = "none";
    statusSpan.textContent = status;
    interval = setInterval(function () {
        secondsElapsed++;
        //So renderTime() is called here once every second.
        renderTime();
    }, 1000);
    showQuestions();
}
// set timer to 1 minute
function setTime() {
    var minutes = 1;
    clearInterval(interval);
    totalSeconds = minutes * 60;
}

//These two functions are just for making sure the numbers look nice for the html elements
function getFormattedMinutes() {
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

//Displays the time and checks to see if time is up and shows the end of game screen. 
function renderTime() {
    // When renderTime is called it sets the textContent for the timer html...
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();
    // ..and then checks to see if the time has run out
    if (secondsElapsed >= totalSeconds) {
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

//show the question text 
function showQuestions() {
    askQuestionSpan.style.display = "block";
    for (i = 0; i < answersSpan.length; i++) {
        answersSpan[i].style.display = "inline-block"
    };
    bottomSection.style.display = "inline-block";
    askQuestionSpan.innerText = questions[counter].askQuestion;
    if (typeof (questions[counter].answer1) != "undefined") { answer1Span.innerText = questions[counter].answer1; } else { answer1Span.style.display = "none"; }
    if (typeof (questions[counter].answer2) != "undefined") { answer2Span.innerText = questions[counter].answer2; } else { answer2Span.style.display = "none"; }
    if (typeof (questions[counter].answer3) != "undefined") { answer3Span.innerText = questions[counter].answer3; } else { answer3Span.style.display = "none"; }
    if (typeof (questions[counter].answer4) != "undefined") { answer4Span.innerText = questions[counter].answer4; } else { answer4Span.style.display = "none"; }

}
// after clicking on one of the answers, you need to disable the buttons so you only get one answer. 
function disableButtons() {
    for (i = 0; i < answersSpan.length; i++) {
        answersSpan[i].disabled = true
    }
}
// re-enable the buttons for the next questions
function enableButtons() {
    for (i = 0; i < answersSpan.length; i++) {
        answersSpan[i].disabled = false
    }
}

// what happens when you get a wrong answer
function wrongAnswer() {
    resultSpan.innerText = "Wrong!";
    resultSpan.style.color = "red";
    penalty = 10;
    disableButtons();
    secondsElapsed = secondsElapsed + penalty;
    displayScore.innerText = score
}

// what happens when you get a right answer
function rightAnswer() {
    resultSpan.innerText = "Correct!";
    resultSpan.style.color = "green";
    score = score + 1;
    penalty = 0;
    disableButtons();
    secondsElapsed = secondsElapsed + penalty;
    displayScore.innerText = score
}

// When you click on an answer. 
answer1Span.onclick = function () {
    resultSpan.style.display = "block";
    if (questions[counter].answer1 === questions[counter].correctAnswer) {
        rightAnswer();
    }
    else {
        wrongAnswer();
    };
}

answer2Span.onclick = function () {
    resultSpan.style.display = "block";
    if (questions[counter].answer2 === questions[counter].correctAnswer) {
        rightAnswer();
    }
    else {
        wrongAnswer();
    };
}

answer3Span.onclick = function () {
    resultSpan.style.display = "block";
    if (questions[counter].answer3 === questions[counter].correctAnswer) {
        rightAnswer();
    }
    else {
        wrongAnswer();
    };
}

answer4Span.onclick = function () {
    resultSpan.style.display = "block";
    if (questions[counter].answer4 === questions[counter].correctAnswer) {
        rightAnswer();
    }
    else {
        wrongAnswer();
    };
}

// Next button clicked
next.onclick = function () {
    resultSpan.style.display = "none";
    enableButtons();
    if (counter < questions.length - 1) {
        counter = counter + 1;
        showQuestions()
    } else {
        endGame()
    }
}

//End of game 

function endGame() {
    status = "Game over";
    statusSpan.textContent = status;
    askQuestionSpan.style.display = "none";
    for (i = 0; i < answersSpan.length; i++) {
        answersSpan[i].style.display = "none"
    };
    bottomSection.style.display = "none";

    finalDisplay.style.display = "block";
    document.querySelector("#final-score").innerText = score;
}
var initialsInput = document.querySelector("#user-initials");
var submitButton = document.querySelector("#submit");
var highScoreList = document.querySelector("#high-scores");
var highScoreCount = document.querySelector("#high-score-count");
var highScores = [];


function renderScoresList() {
    // Clear high score list element and update score count
    highScoreList.innerHTML = "";
    highScoreCount.textContent = highScores.length;
    // Render a new li for each highScore
    for (var i = 0; i < highScores.length; i++) {
        var highScore = highScores[i];
        var li = document.createElement("li");
        li.textContent = highScore;
        li.setAttribute("data-index", i);
        var button = document.createElement("button");
        button.textContent = score;
        li.appendChild(button);
        highScoreList.appendChild(li);
    }
}

// When score is submitted
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = document.querySelector("#user-initials").value.trim();
    // Return from function early if submitted initials are blank
    if (initials === "") {
        return;
    }
    highScores.push(initials); // Add new Initials 
    initialsInput.value = "";
    localStorage.setItem("initials", initials);
    finalDisplay.style.display = "none"
    highScoresDisplay.style.display = "block";
    renderScoresList();
    storeHighScores();
});

function storeHighScores() {
    // Stringify and set "todos" key in localStorage to todos array
    localStorage.setItem("user-initials", JSON.stringify(highScores));
};

restartButton.onclick = function() {
counter = 0;
score = 0;
displayScore.innerText = score
startTimer();
}






