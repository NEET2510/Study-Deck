const cardText = document.getElementById("card-text");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const flashcard = document.getElementById("flashcard");
let isFlipped = false;

const cardsFromLocalStorage = JSON.parse(localStorage.getItem("myStudyDeck"));

let myDeck;

if (cardsFromLocalStorage) {
  myDeck = cardsFromLocalStorage;
} else {
  myDeck = [];
}

let currentIndex = 0;

function renderCard() {
  if (myDeck.length == 0) {
    cardText.textContent = "Add a card to start studying!";
  } else {
    cardText.textContent = myDeck[currentIndex].question;
  }
}

function flipCard() {
  if (myDeck.length === 0) return;

  flashcard.classList.add("flipping");

  setTimeout(function () {
    if (!isFlipped) {
      cardText.textContent = myDeck[currentIndex].answer;
      isFlipped = true;
    } else {
      cardText.textContent = myDeck[currentIndex].question;
      isFlipped = false;
    }

    flashcard.classList.remove("flipping");
  }, 300);
}
flashcard.addEventListener("click", flipCard);

function nextButton() {
  if (myDeck.length === 0) return;

  flashcard.classList.add("flipping");

  setTimeout(function () {
    if (currentIndex === myDeck.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    isFlipped = false;
    renderCard();

    flashcard.classList.remove("flipping");
  }, 300);
}

nextBtn.addEventListener("click", nextButton);

function saveCard() {
  const pair = {
    question: questionInput.value,
    answer: answerInput.value,
  };

  myDeck.push(pair);
  localStorage.setItem("myStudyDeck", JSON.stringify(myDeck));

  questionInput.value = "";
  answerInput.value = "";

  renderCard();
}

saveBtn.addEventListener("click", saveCard);

function deleteCard() {
  if (myDeck.length === 0) return;
  myDeck.splice(currentIndex, 1); /*    this is used to delete 1 index element
   on the current index*/
  localStorage.setItem("myStudyDeck", JSON.stringify(myDeck));
  if (currentIndex === myDeck.length) currentIndex = 0;
  isFlipped = false;
  renderCard();
}

deleteBtn.addEventListener("click", deleteCard);

function prevButton() {
  if (myDeck.length === 0) return;

  flashcard.classList.add("flipping");

  setTimeout(function () {
    if (currentIndex === 0) {
      currentIndex = myDeck.length - 1;
    } else {
      currentIndex -= 1;
    }
    isFlipped = false;
    renderCard();

    flashcard.classList.remove("flipping");
  }, 300);
}
prevBtn.addEventListener("click", prevButton);

renderCard();
