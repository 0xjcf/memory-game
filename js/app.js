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

// Multiply list by two and merge lists
const shuffledList = shuffle([...listOfCards, ...listOfCards]);

// Dynamically create cards and append to fragment -> deck
const fragment = document.createDocumentFragment();

for (const card of shuffledList) {
  const listItem = document.createElement("li");
  listItem.className = "card";

  const item = document.createElement("i");
  item.className = `fa fa-${card}`;

  listItem.appendChild(item);
  fragment.appendChild(listItem);
}

const deck = document.querySelector(".deck");
deck.appendChild(fragment);

// Handle click event
function clickHandler(e) {
  const card = e.target;
  if (card.nodeName === "LI") {
    flipAndOpen(card);
    trackCount();
  }
}

// Flip and show cards
function flipAndOpen(card) {
  card.classList.add("open", "show");
}

// Increment move count
function trackCount() {
  moveCount++;
  const moves = document.querySelector(".moves");
  // Making Move "singular" or "plural" based on count
  moveCount === 1
    ? (moves.textContent = `${moveCount} Move`)
    : (moves.textContent = `${moveCount} Moves`);
}

deck.addEventListener("click", e => clickHandler(e));

/*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *
 * + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *
 * + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
