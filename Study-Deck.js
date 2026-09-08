const cardText = document.getElementById("card-text");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const prevBtn=document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const flashcard = document.getElementById("flashcard");
let isFlipped = false;

const cardsFromLocalStorage = JSON.parse(localStorage.getItem("myStudyDeck"));

let myDeck;

if (cardsFromLocalStorage) {
    myDeck = cardsFromLocalStorage;
} else {
    // Start with a completely empty deck!
    myDeck = [];
}

let currentIndex = 0;

function renderCard() {
  if(myDeck.length==0){
    cardText.textContent="Add a card to start studying!";
  }
  else{
  cardText.textContent = myDeck[currentIndex].question;
  }
}

function flipCard() {
    // 1. Safety check
    if (myDeck.length === 0) return;

    // 2. Add the CSS class to start the 90-degree turn
    flashcard.classList.add("flipping");

    // 3. Wait exactly 300 milliseconds (0.3s) for the CSS transition to finish
    setTimeout(function() {
        
        // Swap the text while the card is sideways
        if (!isFlipped) {
            cardText.textContent = myDeck[currentIndex].answer;
            isFlipped = true;
        } else {
            cardText.textContent = myDeck[currentIndex].question;
            isFlipped = false;
        }

        // 4. Remove the class so it rotates back to flat, revealing the new text
        flashcard.classList.remove("flipping");
        
    }, 300); 
}
flashcard.addEventListener("click", flipCard);

function nextButton() {
    if (myDeck.length === 0) return;

    // 1. Start the flip animation
    flashcard.classList.add("flipping");

    // 2. Wait 300ms for the card to turn sideways
    setTimeout(function() {
        
        // Your exact logic
        if (currentIndex === myDeck.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex += 1;
        }
        isFlipped = false;
        renderCard();
        
        // 3. Remove the class to flatten the card out
        flashcard.classList.remove("flipping");
        
    }, 300);
}

nextBtn.addEventListener("click", nextButton);

function saveCard() {
    // 1. Create the object with the EXACT keys renderCard is looking for
    const pair = { 
        question: questionInput.value, 
        answer: answerInput.value 
    };
    
    myDeck.push(pair);
    // NEW: Shrink-wrap the array into a string and save it to the browser
    localStorage.setItem("myStudyDeck", JSON.stringify(myDeck));
    
    // 3. Clear the actual HTML elements on the screen
    questionInput.value = "";
    answerInput.value = "";

    renderCard();
}

saveBtn.addEventListener("click", saveCard);

function deleteCard(){
  if(myDeck.length===0)
    return;
  myDeck.splice(currentIndex,1); /*    this is used to delete 1 index element
   on the current index*/ 
  localStorage.setItem("myStudyDeck", JSON.stringify(myDeck));
  if(currentIndex===myDeck.length)
    currentIndex=0;
  isFlipped=false;
  renderCard();
}

deleteBtn.addEventListener("click",deleteCard);

function prevButton() {
    if (myDeck.length === 0) return;

    // 1. Start the flip animation
    flashcard.classList.add("flipping");

    // 2. Wait 300ms for the card to turn sideways
    setTimeout(function() {
        
        // Your exact logic
        if (currentIndex === 0) {
            currentIndex = myDeck.length - 1;
        } else {
            currentIndex -= 1;
        }
        isFlipped = false;
        renderCard();
        
        // 3. Remove the class to flatten the card out
        flashcard.classList.remove("flipping");
        
    }, 300);
}
prevBtn.addEventListener("click",prevButton);

renderCard();
