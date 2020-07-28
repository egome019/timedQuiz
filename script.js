// start
var startButton = document.getElementById("start-btn")
// questions
var questionContainerElement = document.getElementById("question-container")
// questions
var questionElement = document.getElementById("questions")
// answer buttons
var answerButtonsElement = document.getElementById("answer-buttons")
// start screen
var controlsContainerElement = document.getElementById("controls-container")
// timer
var timer = document.getElementById("timerP")
// response
var answerChoice = document.getElementById("Answer-rightwrong")
// initial
var inputScore = document.getElementById("lead-container")
// all the button
var answerButton1 = document.getElementById("btn1")

var answerButton2 = document.getElementById("btn2")

var answerButton3 = document.getElementById("btn3")

var answerButton4 = document.getElementById("btn4")

// this is where the questions come from


var questions = [
    {
        question : "What is Javascript?",
        text1 : "A programming language that makes a page dynamic.",
        text2 : "A markup language, barebones of a website/application.",
        text3 : "Cascading stylesheets used to give a website some style.",
        text4 : "None of the answers provided.",
        correctAnswer : "A programming language that makes a page dynamic.",
    },
    {
        question : "What tag is used when trying to use javascript?",
        text1 : "<img>",
        text2 : "<script>",
        text3 : "<src>",
        text4 : "<h1>",
        correctAnswer : "<script>",
    },
    {
        question : "What is the correct way to write a JavaScript array?",
        text1 : "var cars = 'honda', 'toyota', 'BMW'",
        text2 : "var cars = ('honda', 'toyota', 'BMW')",
        text3 : "var cars = (1:'honda', 2:'toyota', 3:'BMW')",
        text4 : "var cars = ['honda', 'toyota', 'BMW']",
        correctAnswer : "var cars = ['honda', 'toyota', 'BMW']",
    },
    {
        question : "How do you declare a JavaScript variable?",
        text1 : "var cars",
        text2 : "variable cars",
        text3 : "v cars",
        text4 : "cars",
        correctAnswer : "var cars",
    },
    {
        question : "What is the correct syntax for referring to an external script called 'script.js'?",
        text1 : "<script src='script.js'>",
        text2 : "<script link='script.js'>",
        text3 : "<script href='script.js'>",
        text4 : "None of the provided choices.",
        correctAnswer : "<script src='script.js'>",
    }

];


startButton.addEventListener("click", startGame)



function startGame() {
    controlsContainerElement.classList.add("hide")
    timedCount()
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

var counter = 60;
var questionIndex = 0;
var scoreTally = 0;


function timedCount() {
    var timeInterval = setInterval(function(){
        counter--;
        timer.innerText = "time: " + counter;

        if (counter === 0 || questions.length === questionIndex) {
            clearInterval(timeInterval)
            endGame()
        }
    }, 1000)
    
}



function setNextQuestion() {
    questionElement.innerText = questions[questionIndex].question

    answerButton1.textContent = questions[questionIndex].text1;
    answerButton1.setAttribute("data-answer", questions[questionIndex].text1);
    answerButton2.textContent = questions[questionIndex].text2;
    answerButton2.setAttribute("data-answer", questions[questionIndex].text2);
    answerButton3.textContent = questions[questionIndex].text3;
    answerButton3.setAttribute("data-answer", questions[questionIndex].text3);
    answerButton4.textContent = questions[questionIndex].text4;
    answerButton4.setAttribute("data-answer", questions[questionIndex].text4);
}

answerButton1.addEventListener("click", selectAnswer)
answerButton2.addEventListener("click", selectAnswer)
answerButton3.addEventListener("click", selectAnswer)
answerButton4.addEventListener("click", selectAnswer)

function selectAnswer(event) {
    var correctButton = questions[questionIndex].correctAnswer

    if (correctButton === event.target.getAttribute("data-answer")) {
        answerChoice.innerText = "Correct!";
        questionIndex++;
        scoreTally++;
        setNextQuestion();
    } else {
        counter = counter - 10;
        answerChoice.textContent = "Wrong!";
        questionIndex++;
        setNextQuestion();
    }
}

function endGame(){
    questionContainerElement.classList.add("hide")
    inputScore.classList.remove("hide")
    score.textContent = "Your final score is " + scoreTally + counter;
}

// storage

var scoreInputs = document.getElementById("score-text")
var scoreForm = document.getElementById("score-form")
var scoreList = document.getElementById("score-list")

var list = [];

biggestNerds()

function render() {
    scoreList.innerHTML = "";
  
    for (var i = 0; i < list.length; i++) {
      var nerds = list[i];
  
      var li = document.createElement("li");
      li.textContent = nerds;
      li.setAttribute("data-index", i);
  
      scoreList.appendChild(li);
    }
  }

  function biggestNerds() {
    var storedList = JSON.parse(localStorage.getItem("list"));
    if (storedList !== null) {
      list = storedList;
    }
    render();
  }

  function storeList() {
    localStorage.setItem("list", JSON.stringify(list));
  }

  scoreForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var scoreText = scoreInputs.value.trim();
    if (scoreText === "") {
      return;
    }
  
    list.push(scoreText + "    " + scoreTally + counter);
    scoreInputs.value = "";

    storeList();
    render();
  });

  var clear = document.getElementById("clear-btn")

  clear.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("button") === true) {
      var index = element.parentElement.getAttribute("data-index");
      list.splice(index);
      storeList();
      render();
    }
  })