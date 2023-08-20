// Récupération des éléments d'écran
let screenWelcome = document.getElementById("welcomeScreen");
let screenQuestion = document.getElementById("questionScreen");
let screenResult = document.getElementById("resultScreen");

// Définition de la classe Quiz pour gérer le quiz
function Quiz() {
  this.questions = []; // Tableau pour stocker les questions
  this.nbCorrects = 0; // Compteur pour le nombre de réponses correctes
  this.indexCurrentQuestion = 0; // index pour savoir la position

  // Méthode pour ajouter une question au quiz
  this.addQuestion = function (question) {
    this.questions.push(question);
  };

  // Méthode pour afficher la question actuelle
  this.showCurrentQuestion = function () {
    if (this.indexCurrentQuestion < this.questions.length) {
      // Afficher la question
      this.questions[this.indexCurrentQuestion].getElement(
        this.indexCurrentQuestion + 1,
        this.questions.length
      );
    } else {
      // Toutes les questions ont été répondues
      screenQuestion.classList.add("hidden");

      // Afficher le nombre de questions correctes
      let elNbCorrects = document.querySelector("#nbcorrects");
      elNbCorrects.textContent = quiz.nbCorrects;

      screenResult.style.display = "block";
    }
  };

  // Methode pour reset le quiz
  this.restartQuiz = function () {
    this.questions.forEach((question) => {
      question.isAnswered = false; // Réinitialiser l'état de réponse de chaque question
    });

    this.nbCorrects = 0;
    this.indexCurrentQuestion = 0;
    screenResult.style.display = "none";
    screenQuestion.style.display = "block";
    this.showCurrentQuestion();
  };
}

// Pour créer des questions
function Question(title, answers, answerCorrect) {
  this.title = title; // Titre de la question
  this.answers = answers; // Tableau des réponses possibles
  this.answerCorrect = answerCorrect; // Indice de la réponse correcte
  this.isAnswered = false; // si la question a deja été repondu

  // Afficher le numero de la question
  this.getElement = function (indexQuestion, nbQuestions) {
    let questionNumber = document.createElement("h2");
    questionNumber.classList.add("quizSubtitle");
    questionNumber.textContent =
      "Question " + indexQuestion + "/ " + nbQuestions;
    screenQuestion.append(questionNumber);

    // Afficher l'intitulé de la question
    let questionTitle = document.createElement("h3");
    questionTitle.textContent = this.title;
    screenQuestion.append(questionTitle);

    // Afficher les différentes réponses
    let questionReponse = document.createElement("ul");
    questionReponse.classList.add("questionAnswer");

    this.answers.forEach((answer, index) => {
      let elAnswer = document.createElement("li");
      elAnswer.classList.add("answer");
      elAnswer.textContent = answer;
      elAnswer.id = index;
      elAnswer.addEventListener("click", this.checkAnswer);
      questionReponse.append(elAnswer);
    });

    screenQuestion.append(questionReponse);
  };

  // vérifier la réponse
  this.checkAnswer = (e) => {
    // si la question a deja été repondu
    if (this.isAnswered) {
      return; // Sortir de la fonction
    }

    this.isAnswered = true; 
    let answerSelected = e.target;

    // Afficher en vert si c'est la bonne réponse
    if (this.isCorrectAnswer(answerSelected.id)) {
      answerSelected.classList.add("answer--correct");
      quiz.nbCorrects++;
    }
    // afficher en rouge si c'est la mauvaise reponse et afficher la bonne réponse
    else {
      answerSelected.classList.add("answer--wrong");
      let elRigthAnswer = document.getElementById(this.answerCorrect);
      elRigthAnswer.classList.add("answer--correct");
    }

    // passer automatiquement à la prochaine question
    setTimeout(function () {
      screenQuestion.textContent = "";
      quiz.indexCurrentQuestion++;
      quiz.showCurrentQuestion();
    }, 1000);
  };

  // Méthode pour vérifier si la réponse de l'utilisateur est correcte
  this.isCorrectAnswer = function (answerUser) {
    return answerUser == this.answerCorrect;
  };
}

// Création des questions
let question1 = new Question(
  "Quel est la capitale de la France ?",
  ["Paris", "Lyon", "Marseille"],
  "0"
);

let question2 = new Question(
  "Quel est le meilleur club de ligue 1 ?",
  ["OM", "OL", "PSG"],
  "2"
);

let question3 = new Question(
  "Dans quel continent se situe la Mongolie ?",
  ["Asie", "Océanie", "Europe"],
  "0"
);

let question4 = new Question(
  "A quel poste joue Neymar ?",
  ["Defenseur", "Milieu", "Attaquant"],
  "2"
);


// Création d'une instance de Quiz
let quiz = new Quiz();

// Ajout des questions au quiz
quiz.addQuestion(question1);
quiz.addQuestion(question2);
quiz.addQuestion(question3);
quiz.addQuestion(question4);

// Afficher le nombre de questions
elNbQuestions = document.querySelectorAll(".nbQuestions");

elNbQuestions.forEach(function (elNbQuestions) {
  elNbQuestions.textContent = quiz.questions.length;
});

// recuperer le bouton de commencement du quiz
let btn = document.querySelector("#buttonWelcome");

// evenement pour commencer le quiz
btn.addEventListener("click", seeFirstQuestion);

// Afficher la premiere question après le click sur le boutton
function seeFirstQuestion() {
  screenWelcome.classList.add("hidden");

  screenQuestion.style.display = "block";

  quiz.showCurrentQuestion();
}


// Boutton pour recommmencer
const restartButton = document.querySelector("#restartButton");
restartButton.addEventListener("click", function () {
  quiz.restartQuiz(); // Appeler la méthode de redémarrage du quiz
});
