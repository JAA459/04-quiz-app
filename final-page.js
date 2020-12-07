var initials = document.querySelector("#initials");
var saveScore = document.querySelector("#saveScore");
var final = document.querySelector("#finalScore");
var finalScore = localStorage.getItem("finalScore");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var maxScore = 5;


final.innerHTML = finalScore;

initials.addEventListener("keyup", function() {
    console.log(initials.value);
    saveScore.disabled = !initials.value;
});

function saveHighScore(event) {
    console.log("clicked the save button");
    event.preventDefault();

    var score = {
        score: finalScore,
        name: initials.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(maxScore);

    localStorage.setItem("highScores", JSON.stringify(highScores));
};