// javascript for mainpage
const showBtn = document.getElementById("show");
const hiddenBtn = document.getElementById("btn-hidden");
const addContainer = document.getElementById("add-container");
const cardContainer = document.getElementById("card-container");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const currentEl = document.getElementById("current");
const clearBtn = document.getElementById("clear");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");

const addCard = document.getElementById("add-card");

let currentActiveCard = 0;
let cardsEl = []; // เก็บจำนวนคำถามทั้งหมด
const cardData = getCardData();

function createCard() {
  cardData.forEach((data, index) => {
    createSingleCard(data, index);
  });
}

function createSingleCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index == 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
    <div class="inner-card">
                <div class="inner-card-front">
                    <p>${data.question}</p>
                </div>
                <div class="inner-card-back">
                    <p>${data.answer}</p>
                </div>
    </div>
    `;
  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  cardsEl.push(card);
  cardContainer.appendChild(card);
  updateCurrentQuestion();
}

function updateCurrentQuestion() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

createCard();
// card.addEventListener('click',()=>card.classList.toggle("show-answer"));
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hiddenBtn.addEventListener("click", () =>
  addContainer.classList.remove("show")
);
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardsEl.length - 1) {
    // จำนวน 4 , 0,1,2,3
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentQuestion();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    // จำนวน 4 , 0,1,2,3
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = "card active";
  updateCurrentQuestion();
});

addCard.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createSingleCard(newCard);
    questionEl.value = "";
    answerEl.value = "";
    addContainer.classList.remove("show");
    cardData.push(newCard);
    setCardData(cardData);
  }
});

function setCardData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

function getCardData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardContainer.innerHTML = "";
  window.location.reload();
});

// js for sound effects
const backgroundMusic = document.getElementById("background-music");
const toggleSoundButton = document.getElementById("toggle-sound");
const soundOnImage = document.getElementById("sound-on-img");
const soundOffImage = document.getElementById("sound-off-img");

// Initialize a variable to track the sound state
let isSoundOn = true;

// Function to toggle sound on and off
function toggleSound() {
  if (isSoundOn) {
    backgroundMusic.play();
    soundOnImage.style.display = "none";
    soundOffImage.style.display = "inline";
  } else {
    backgroundMusic.pause();
    soundOnImage.style.display = "inline";
    soundOffImage.style.display = "none";
  }
  isSoundOn = !isSoundOn;
}

// Add a click event listener to the button
toggleSoundButton.addEventListener("click", toggleSound);

// Initialize the button state and images
if (isSoundOn) {
  soundOnImage.style.display = "inline";
  soundOffImage.style.display = "none";
} else {
  soundOnImage.style.display = "none";
  soundOffImage.style.display = "inline";
}

// JavaScript to handle the popup functionality
const openPopupButton1 = document.getElementById("openPopup2");
const closePopupButton1 = document.getElementById("closePopup2");
const popupContainer = document.getElementById("popupContainer");

openPopupButton1.addEventListener("click", () => {
  popupContainer.style.display = "flex";
});

closePopupButton1.addEventListener("click", () => {
  popupContainer.style.display = "none";
});
