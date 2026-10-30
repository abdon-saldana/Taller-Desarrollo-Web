"use strict";

// 1. Banco de preguntas. correctAnswer es el índice de la opción correcta (0, 1 o 2).
// Para adaptar el taller, edita los textos de este arreglo.
const questions = [
  {
    question: "¿Quién fue el vocalista principal de la banda Queen?",
    answers: ["Freddie Mercury", "David Bowie", "Mick Jagger"],
    correctAnswer: 0,
    explanation: "Freddie Mercury fue el icónico vocalista principal de Queen."
  },
  {
    question: "¿Cuántas cuerdas tiene una guitarra tradicional?",
    answers: ["Cuatro cuerdas", "Seis cuerdas", "Ocho cuerdas"],
    correctAnswer: 1,
    explanation: "La guitarra tradicional tiene seis cuerdas, que se afinan en mi, la, re, sol, si y mi."
  },
  {
    question: "¿Qué instrumento se toca con teclas blancas y negras?",
    answers: ["La batería", "El violín", "El piano"],
    correctAnswer: 2,
    explanation: "El piano tiene teclas blancas y negras. Cada tecla permite tocar una nota musical."
  },
  {
    question: "¿Qué artista es conocido como el Rey del Pop?",
    answers: ["Michael Jackson", "Elvis Presley", "Bruno Mars"],
    correctAnswer: 0,
    explanation: "Michael Jackson es conocido como el Rey del Pop por su influencia en la música y el baile."
  },
  {
    question: "¿Qué género musical popularizó Bob Marley?",
    answers: ["El jazz", "El reggae", "El tango"],
    correctAnswer: 1,
    explanation: "Bob Marley ayudó a llevar el reggae, un género nacido en Jamaica, a todo el mundo."
  }
];

// 2. Referencias a los elementos HTML que JavaScript actualizará.
const questionView = document.querySelector("#question-view");
const resultView = document.querySelector("#result-view");
const questionText = document.querySelector("#question");
const questionCount = document.querySelector("#question-count");
const answersContainer = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const answerHint = document.querySelector("#answer-hint");
const progress = document.querySelector("#progress");
const progressFill = document.querySelector("#progress-fill");
const dialog = document.querySelector("#info-dialog");

// 3. Estado de la partida. Cada respuesta solo puede contabilizarse una vez.
let currentQuestion = 0;
let score = 0;
let answered = false;
let finished = false;

function updateProgress(completed) {
  progress.setAttribute("aria-valuemax", String(questions.length));
  progress.setAttribute("aria-valuenow", String(completed));
  progressFill.style.width = `${(completed / questions.length) * 100}%`;
}

function renderQuestion(moveFocus = false) {
  const item = questions[currentQuestion];
  answered = false;
  questionView.hidden = false;
  resultView.hidden = true;
  feedback.hidden = true;
  feedback.classList.remove("is-wrong");
  nextButton.hidden = true;
  answerHint.hidden = false;
  questionCount.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  questionText.textContent = item.question;
  updateProgress(currentQuestion);
  answersContainer.replaceChildren();

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = `${String.fromCharCode(65 + index)}) ${answer}`;
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.append(button);
  });

  nextButton.replaceChildren(document.createTextNode(
    currentQuestion === questions.length - 1 ? "Ver mi resultado " : "Siguiente pregunta "
  ));
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "→";
  nextButton.append(arrow);
  if (moveFocus) questionText.focus({ preventScroll: true });
}

// 4. Comprobar la respuesta y explicar el resultado sin avanzar automáticamente.
function selectAnswer(selectedIndex) {
  if (answered || finished) return;
  answered = true;
  const item = questions[currentQuestion];
  const isCorrect = selectedIndex === item.correctAnswer;
  if (isCorrect) score += 1;

  answersContainer.querySelectorAll("button").forEach((button, index) => {
    button.disabled = true;
    if (index === item.correctAnswer) {
      button.classList.add("is-correct");
      button.setAttribute("aria-label", `${button.textContent}. Respuesta correcta.`);
    } else if (index === selectedIndex) {
      button.classList.add("is-wrong");
      button.setAttribute("aria-label", `${button.textContent}. Tu respuesta, incorrecta.`);
    }
  });

  feedback.classList.toggle("is-wrong", !isCorrect);
  document.querySelector("#feedback-icon").textContent = isCorrect ? "✓" : "!";
  document.querySelector("#feedback-title").textContent = isCorrect ? "¡Correcto!" : "¡Casi! Sigue aprendiendo";
  document.querySelector("#feedback-description").textContent = isCorrect
    ? item.explanation
    : `La respuesta correcta es ${item.answers[item.correctAnswer]}. ${item.explanation}`;
  document.querySelector("#encouragement").textContent = isCorrect ? "¡Sigue así!" : "¡La próxima puede ser tuya!";
  feedback.hidden = false;
  nextButton.hidden = false;
  answerHint.hidden = true;
  updateProgress(currentQuestion + 1);
  // El foco pasa al siguiente paso; el mensaje se anuncia con aria-live.
  nextButton.focus({ preventScroll: true });
}

function showResults() {
  finished = true;
  questionView.hidden = true;
  resultView.hidden = false;
  document.querySelector("#score").textContent = score;
  let title;
  let message;
  if (score === questions.length) {
    title = "¡Eres una estrella del rock!";
    message = "¡Puntaje perfecto! Tu conocimiento musical merece una ovación. Sigue descubriendo nueva música.";
  } else if (score >= 3) {
    title = "¡Tú pones el ritmo!";
    message = "¡Muy bien! Sabes de música y hoy aprendiste un poco más. ¿Te animas a conseguir el puntaje perfecto?";
  } else {
    title = "¡La música se aprende jugando!";
    message = "Cada pregunta es una oportunidad para descubrir algo nuevo. Vuelve a jugar y demuestra lo que aprendiste.";
  }
  document.querySelector("#result-title").textContent = title;
  document.querySelector("#result-message").textContent = message;
  document.querySelector("#result-title").focus({ preventScroll: true });
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  finished = false;
  renderQuestion(true);
}

function goToQuiz() {
  if (finished) restartQuiz();
  document.querySelector("#quiz").scrollIntoView({ block: "center" });
  const target = answered ? nextButton : answersContainer.querySelector("button");
  target.focus({ preventScroll: true });
}

// 5. Eventos de navegación, siguiente pregunta y reinicio.
nextButton.addEventListener("click", () => {
  if (!answered || finished) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion(true);
  } else {
    showResults();
  }
});
document.querySelector("#restart-button").addEventListener("click", restartQuiz);
document.querySelector("#play-button").addEventListener("click", goToQuiz);

const dialogContent = {
  about: {
    title: "Un proyecto con mucho ritmo",
    description: "Mini Quiz de Música es un juego para músicos, fans y curiosos. Fue creado con HTML, CSS y JavaScript para aprender desarrollo web y descubrir datos de música mientras juegas."
  },
  how: {
    title: "¿Cómo funciona?",
    description: "Cinco preguntas, tres opciones y muchas ganas de aprender. Cada respuesta correcta suma un punto. No hay límite de tiempo: ¡juega a tu ritmo!"
  }
};
document.querySelectorAll("[data-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.dialog;
    document.querySelector("#dialog-title").textContent = dialogContent[type].title;
    document.querySelector("#dialog-description").textContent = dialogContent[type].description;
    document.querySelector("#dialog-steps").hidden = type !== "how";
    dialog.showModal();
  });
});
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
document.querySelector("#dialog-play").addEventListener("click", () => {
  dialog.close();
  goToQuiz();
});
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (
    event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom
  )) dialog.close();
});

// Primera pregunta al abrir index.html. No hace falta servidor ni conexión a Internet.
renderQuestion();
