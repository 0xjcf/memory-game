/*
 * Create a list that holds all of your cards
 */
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

/*
 * Keep count of moves
 */
let moveCount = 0;

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

// multiplying the list by two and merging the list together
const shuffledList = shuffle([...listOfCards, ...listOfCards]);
// creating a fragment to append child elements to
const fragment = document.createDocumentFragment();
// creating the elements dynamically with a for of loop
for (const card of shuffledList) {
  const listItem = document.createElement("li");
  listItem.className = "card";

  const item = document.createElement("i");
  item.className = `fa fa-${card}`;

  listItem.appendChild(item);

  fragment.appendChild(listItem);
}
// selecting ul element with class "deck"
const deck = document.querySelector(".deck");
deck.appendChild(fragment);
// click event to open and show card
function flipAndOpen(e) {
  const target = e.target;
  target.classList.add("open", "show");
  moveCount++
  const moves = document.querySelector('.moves');
  moves.textContent = moveCount;
}
deck.addEventListener("click", e => flipAndOpen(e));
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
