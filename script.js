var startButton = document.getElementById("start-btn")
var questionContainerElement = document.getElementById("question-container")
var questionElement = document.getElementById("questions")
var answerButtonsElement = document.getElementById("answer-buttons")
var controlsContainerElement = document.getElementById("controls-container")
var timer = document.getElementById("timerP")
var answerChoice = document.getElementById("answer-rightwrong")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
answerButtonsElement.addEventListener("click", ()=> {
    currentQuestionIndex++
    setNextQuestion()
})


var counter = 60;
var timerIsOn = 0;


function startGame() {
    startButton.classList.add("hide")
    controlsContainerElement.classList.add("hide")
    timedCount()
    
    shuffledQuestions = questions.sort(() =>Math.random()-.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function timedCount() {
    var timeInterval = setInterval(function(){
        counter--;
        timer.innerText = "time: " + counter;

        if (counter === 0 || questions.length === timerIsOn) {
            clearInterval(timeInterval)
        }
    }, 1000)
    
}



function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}



function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState(){
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectButton = e.target
    var correct = selectButton.dataset.correct
    // if (correct === selectButton) {
    //     answerChoice.innerText = "Correct!";
    //     currentQuestionIndex++
    //     setNextQuestion()
    // }else{
    //     counter = counter - 10;
    //     answerChoice.innerText = "Wrong!";
    //     currentQuestionIndex++
    //     setNextQuestion()
    // }
    
    isItReal(document.body.button, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        isItReal(button, button.dataset.correct)
    })
}

function isItReal(element, correct){
    clearButton(element)
    if (correct) {
        element.classList.add("correct")
    }else{
        element.classList.add("wrong")
    }
}

function clearButton(element){
    element.classList.remove("correct")
        element.classList.remove("wrong")
}



var questions = [
    {
        question: "What is Javascript?",
        answers: [
            {text: "A programming language that makes a page dynamic.", correct: true},
            {text: "A markup language, barebones of a website/application.", correct: false},
            {text: "Cascading stylesheets used to give a website some style.", correct: false},
            {text: "None of the answers provided.", correct: false}
        ]
    },
    {
        question: "What tag is used when trying to use javascript?",
        answers: [
            {text: "<img>", correct: false},
            {text: "<script>", correct: true},
            {text: "<src>", correct: false},
            {text: "<h1>", correct: false}
        ]
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
            {text: "var cars = 'honda', 'toyota', 'BMW'", correct: false},
            {text: "var cars = ('honda', 'toyota', 'BMW')", correct: false},
            {text: "var cars = (1:'honda', 2:'toyota', 3:'BMW')", correct: false},
            {text: "var cars = ['honda', 'toyota', 'BMW']", correct: true}
        ]
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            {text: "var cars", correct: true},
            {text: "variable cars", correct: false},
            {text: "v cars", correct: false},
            {text: "cars", correct: false}
        ]
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answers: [
            {text: "<script src='script.js'>", correct: true},
            {text: "<script link='script.js'>", correct: false},
            {text: "<script href='script.js'>", correct: false},
            {text: "None of the provided choices.", correct: false}
        ]
    }

]