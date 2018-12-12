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
// List of matched pair of cards
let matchedCardsList = [];
// Multiply list by two and merge lists
let shuffledList = shuffle([...listOfCards, ...listOfCards]);
// Select countDownTimer
let countDownTimer = document.querySelector(".timer");
// Select deck of cards
const deck = document.querySelector(".deck");
// Select restart icon
const restartButton = document.querySelector(".restart");
// Select Move count
const moves = document.querySelector(".moves");
// Select Solid Stars
const stars = document.querySelector(".stars");

// Shuffle list of cards
function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    let temporaryValue = array[currentIndex];
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

function gameLost() {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  // create <h2> "You lost... with # of moves!"
  const mainHeading = document.createElement("h2");
  mainHeading.textContent = `You lost with ${moveCount} Moves`;
  container.append(mainHeading);
  // create <p> "Try again"
  const subHeading = document.createElement("p");
  subHeading.textContent = `Try Again!!`;
  container.append(subHeading);
  // create button to play again
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Press to play again";
  playAgainButton.classList.add("play-again");
  container.append(playAgainButton);

  // add "click" event listener to playAgainButton
  playAgainButton.addEventListener("click", function() {
    // reloading html to replay game
    location.reload();
  });
}

function gameWon() {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  // create <h2> "You won!"
  const mainHeading = document.createElement("h2");
  mainHeading.textContent = `Congratulations! You won!`;
  container.append(mainHeading);
  // create <p> "Play again"
  const subHeading = document.createElement("p");
  // grab to display number of stars remaining
  const solidStars = stars.querySelectorAll(".fa-star");
  const pluralize = solidStars.length === 1 ? `star` : `stars`;
  subHeading.textContent = `With ${moveCount} moves and
  ${solidStars.length} ${pluralize} remaining`;
  container.append(subHeading);
  // create button to play again
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Press to play again";
  playAgainButton.classList.add("play-again");
  container.append(playAgainButton);

  // add "click" event listener to playAgainButton
  playAgainButton.addEventListener("click", function() {
    // reloading html to replay game
    location.reload();
  });
}

function restart() {
  // remove all cards from openList
  openList = [];
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
  for (let i = 0; i < 5; i++) {
    const solidStars = document.createElement("li");
    const starIcon = document.createElement("i");
    starIcon.classList.add("fa", "fa-star");
    solidStars.appendChild(starIcon);
    stars.appendChild(solidStars);
  }

  // select and delete timers
  const restartList = countDownTimer.parentElement.children;
  for (const el of restartList) {
    if (el.nodeName === "SPAN") {
      el.remove();
    }
  }
  // recreate countDownTimer Element
  countDownTimer = document.createElement("span");
  countDownTimer.setAttribute("class", "timer");
  countDownTimer.textContent = "2:00";
  // append to restart element
  const restart = document.querySelector(".restart");
  restart.appendChild(countDownTimer);
  // create 2 min count down timer
  createTimer(2, countDownTimer);
}

// Handle click event
function clickHandler(e) {
  const card = e.target;
  // make sure user is unable to select a matched card
  const includesMatch = card.className.split(" ").includes("match");
  const includesShow = card.className.split(" ").includes("show");

  if (card.nodeName === "LI" && !includesMatch && !includesShow) {
    // grab card className to compare to
    const cardName = card.firstChild.classList[1];

    flipAndOpen(card);
    addToOpenList(cardName);
  }

  // Set difficulty to hard (game ends with 0 stars)
  // if (stars.childElementCount === 0) {
  //   gameLost();
  // }

  if (matchedCardsList.length === 8) {
    gameWon();
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

// Add card to list of openList
function addToOpenList(cardName) {
  openList.push(cardName);
  if (openList.length === 2) {
    compareCards(cardName);
    trackCount();
  }
}

function keepCardsOpen(openCards) {
  for (const card of openCards) {
    card.classList.add("match");
    card.classList.remove("show", "open");
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
  if (solidStars.length > 1) {
    solidStars[solidStars.length - 1].parentElement.remove();
  }
}

function compareCards(cardName) {
  const openCards = deck.querySelectorAll(".show, .open");
  if (openList[0] === openList[1]) {
    keepCardsOpen(openCards);
    // add matched cards to matchedCardsList to keep count
    matchedCardsList.push(cardName);
  } else {
    hideCards(openCards);
    removeAStar();
  }
  openList = [];
}

// create timer
function createTimer(min, display) {
  const start = Date.now();

  const timer = setInterval(function() {
    let diff = min * 60 - (((Date.now() - start) / 1000) | 0);
    let minutes = (diff / 60) | 0;
    let seconds = diff % 60 | 0;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (diff <= 10) {
      display.classList.add("timer", "warning");
    }

    if (diff <= 0) {
      // const timerID = timer;
      clearInterval(timer);
      gameLost();
    }
  });

  setTimeout(timer, 1000);
}

function startGame() {
  createCards(shuffledList);
  // create timer with 2 minutes
  createTimer(2, countDownTimer);
}

startGame();
deck.addEventListener("click", e => clickHandler(e));

restartButton.addEventListener("click", () => restart());
