const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");

let timerEl = document.getElementById('countdown');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which of the following is an example of an array?",
    choice1: "var array = []",
    choice2: "var array = {}", 
    choice3: "var array = ()", 
    choice4: "var array = <>",
    answer: 1
  },
  {
    question: "Which DOM method is used to create a new HTML element?",
    choice1: "document.newElement()", 
    choice2: "document.createElement()",
    choice3: "document.element()", 
    choice4: "document.spawnElement()",
    answer: 2
  },
  {
    question: "Which operator is used to represent AND statements?",
    choice1: "||", 
    choice2: "+", 
    choice3: "&&",
    choice4: "&",
    answer: 3
  },
  {
    question: "What does HTML stand for?",
    choice1: "Hypertext Markup Language",
    choice2: "Hypertext Markdown Language",
    choice3: "Hyperloop Machine Language",
    choice4: "Helicopters Terminals Motorboats Lamborginis",
    answer: 1
  },
  {
    question: "What does CSS stand for?",
    choice1: "Central Style Sheets",
    choice2: "Cascading Style Sheets",
    choice3: "Cascading Simple Sheets",
    choice4: "Cars SUVs Sailboats",
    answer: 2
  },
  {
    question: "Which language runs in a web browser?",
    choice1: "Java",
    choice2: "C",
    choice3: "Python",
    choice4: "JavaScript",
    answer: 4
  },
  {
    question: "Which operator will compare if two literals are the exact same?",
    choice1: "==", 
    choice2: "*=", 
    choice3: "!=",
    choice4: "===",
    answer: 4
  },
  {
    question: "What year was JavaScript launched?",
    choice1: "1996",
    choice2: "1995",
    choice3: "1994",
    choice4: "none of the above",
    answer: 2
  }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 8;


countdown ();
// Timer that counts down from 75
function countdown() {
  var timeLeft = 75;
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft;
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '0';
    }
  }, 1000);
}





startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]
  getNewQuestion();
};

getNewQuestion = () => {

  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("high-score.html");
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice =>{
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice =>{
  choice.addEventListener("click", e =>{
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = 
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    
    
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout (() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}
 
startGame()