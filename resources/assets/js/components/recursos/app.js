var questions = [
    new Question("¿Cual no es un lenguaje de programación orientado a objetos?", ["Java", "C#","C++", "C"], "C"),
    new Question("¿Cual es usado para estilizar paginas web?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Hay ____ compoenentes principales en la programacion orientada a objetos.", ["1", "6","2", "4"], "4"),
    new Question("¿Cual es usado para la programacion web?", ["PHP", "Python", "Javascript", "Todas"], "Todas"),
    new Question("MVC es un ____.", ["Lenguaje de programacion", "Libreria", "Framework", "Todas"], "Framework")
];

var quiz = new Quiz(questions);

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Pregunta " + currentQuestionNumber + " de " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Resultado</h1>";
    gameOverHTML += "<h2 id='score'> Obtuviste : " + quiz.score + " preguntas correctas</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};


populate();





