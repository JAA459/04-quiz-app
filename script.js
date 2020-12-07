var question = document.querySelector('#question');
var choices = Array.from(document.getElementsByClassName('choice'));
var scoreText = document.querySelector(".hud-main-text");

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var sec = 60;

let questions = [
    {
        question: "Which of the following messages writes 'Hello World' in an alert box?",
        choice1: "alertBox('Hello World')",
        choice2: "alert(Hello World)",
        choice3: "msgAlert('Hello World')",
        choice4: "alert('Hello World')",
        answer: 4
    },
    {
       question: "How do you find the minimum of x and y using JavaScript?",
       choice1: "min(x,y);",
       choice2: "Math.min(x,y)",
       choice3: "Math.min(xy)",
       choice4: "min(xy);",
       answer: 2 
    },
    {
        question: "Which of the following is an event listener in JavaScript?",
        choice1: "onclick",
        choice2: "blur",
        choice3: "click",
        choice4: "click()",
        answer: 3
    }
];

const Bonus = 50;
const Max_QUESTION = 3;


function startGame () {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

function getNewQuestion() {
    if(availableQuestions.length == 0 || questionCounter > Max_QUESTION) {
        localStorage.setItem("finalScore", score);
        return window.location.assign("final-page.html");
    };
    questionCounter++;
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", function(e) {
       if(!acceptingAnswers) return;

       acceptingAnswers = false;
       var selectedChoice = e.target;
       var selectedAnswer = selectedChoice.dataset["number"];
       
       var classToApply = 'incorrect'
        if(selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        if(classToApply == 'correct') {
            addScore(Bonus);
        }
        if(classToApply == 'incorrect') {
            sec -= 15;
        }
        selectedChoice.classList.add(classToApply);
        
        setTimeout( () => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

addScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
function timer(){
    var timer = setInterval(function(){
        document.getElementById('timer').innerHTML="00:"+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            alert("you have run out of time!");
            return window.location.assign("final-page.html");
        }
    }, 1000);}
    timer();
