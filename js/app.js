// Create a list that holds all of your cards
const listOfCards = [
  "anchor",
  "paper-plane-o",
  "diamond",
  "bolt",
  "cube",
  "leaf",
  "bicycle",
  "bomb"
];
// Keep count of moves
let moveCount = 0;
// List of cards that are flipped and open
let openList = [];
// Multiply list by two and merge lists
let shuffledList = shuffle([...listOfCards, ...listOfCards]);
// Select deck of cards
const deck = document.querySelector(".deck");
// Select restart import { connect } from 'react-redux'
const restart = document.querySelector(".restart");
// Select Move count
const moves = document.querySelector(".moves");
// Select Solid Stars
const stars = document.querySelector(".stars");

// Shuffle list of cards
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Create and append cards to deck
function createCards(shuffledList) {
  // Create fragment for cards to append to
  const fragment = document.createDocumentFragment();
  // Dynamically create cards with for of loop
  for (const card of shuffledList) {
    const listItem = document.createElement("li");
    listItem.className = "card";

    const item = document.createElement("i");
    item.className = `fa fa-${card}`;

    listItem.appendChild(item);
    fragment.appendChild(listItem);
  }
  // Append fragment to deck
  deck.appendChild(fragment);
}

// Handle click event
function clickHandler(e) {
  const card = e.target;
  const cardName = e.target.firstChild.classList[1];

  if (card.nodeName === "LI") {
    flipAndOpen(card);
    trackCount();
    addToOpenList(cardName);
  }
}

// Flip and show cards
function flipAndOpen(card) {
  card.classList.add("open", "show");
}

// Increment move count
function trackCount() {
  moveCount++;
  // Making Move "singular" or "plural" based on count
  moveCount === 1
    ? (moves.textContent = `${moveCount} Move`)
    : (moves.textContent = `${moveCount} Moves`);
}

// Add card to list of open listOfCards
function addToOpenList(cardName) {
  openList.push(cardName);
  if (openList.length === 2) {
    compareCards();
  }
}

function keepCardsOpen(openCards) {
  for (const card of openCards) {
    setTimeout(function() {
      card.classList.add("match");
      card.classList.remove("show", "open");
    }, 0);
  }
}

function hideCards(openCards) {
  for (const card of openCards) {
    card.classList.add("no-match");
    setTimeout(function() {
      card.classList.remove("show", "open", "no-match");
    }, 1000);
  }
}

function removeAStar() {
  const solidStars = stars.querySelectorAll(".fa-star");
  solidStars[solidStars.length - 1].remove();
}

function compareCards() {
  const openCards = deck.querySelectorAll(".show, .open");
  if (openList[0] === openList[1]) {
    keepCardsOpen(openCards);
  } else {
    hideCards(openCards);
    removeAStar();
  }
  openList = [];
}

createCards(shuffledList);

deck.addEventListener("click", e => clickHandler(e));

/*
    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

restart.addEventListener("click", function() {
  // set move count to 0
  moveCount = 0;
  moves.textContent = `${moveCount} Moves`;
  // erase all cards from deck
  deck.innerHTML = "";
  // shuffleList again
  shuffledList = shuffle([...listOfCards, ...listOfCards]);
  // create cards with new set of shuffled cards
  createCards(shuffledList);
  // delete all solidStars
  stars.innerHTML = "";
  // create 3 solidStars
  for (let i = 0; i < 3; i++) {
    const solidStars = document.createElement("li");
    const starIcon = document.createElement("i");
    starIcon.classList.add("fa", "fa-star");
    solidStars.appendChild(starIcon);
    stars.appendChild(solidStars);
  }
});
