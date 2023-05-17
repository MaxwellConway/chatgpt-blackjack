// Blackjack Game Logic

// Card variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"],
  values = [
    "Ace",
    "King",
    "Queen",
    "Jack",
    "Ten",
    "Nine",
    "Eight",
    "Seven",
    "Six",
    "Five",
    "Four",
    "Three",
    "Two",
  ];

// DOM variables
let textArea = document.getElementById("text-area"),
  newGameButton = document.getElementById("new-game-button"),
  hitButton = document.getElementById("hit-button"),
  stayButton = document.getElementById("stay-button");

// Game variables
let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];

// Helper function to get a random card from the deck
function getRandomCard() {
  let randomIndex = Math.floor(Math.random() * deck.length);
  return deck.splice(randomIndex, 1)[0];
}

// Helper function to get the numeric value of a card
function getCardNumericValue(card) {
  switch (card.value) {
    case "Ace":
      return 1;
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    default:
      return 10;
  }
}

// Helper function to get the score of a hand
function getScore(hand) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < hand.length; i++) {
    let card = hand[i];
    score += getCardNumericValue(card);
    if (card.value === "Ace") {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

// Function to update the text area with the current game state
function updateText() {
  textArea.innerText =
    "Dealer cards:\n" +
    dealerCards[0].value +
    " of " +
    dealerCards[0].suit +
    "\n\n" +
    "Player cards:\n" +
    getHandString(playerCards) +
    "\n\n";

  if (gameOver) {
    textArea.innerText += "Game over!\n\n";
    if (playerWon) {
      textArea.innerText += "You win!";
    } else {
      textArea.innerText += "Dealer wins!";
    }
    newGameButton.style.display = "inline";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
  } else {
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    newGameButton.style.display = "none";
  }
}

// Function to get a string representation of a hand
function getHandString(hand) {
  let handString = "";
  for (let i = 0; i < hand.length; i++) {
    handString += hand[i].value + " of " + hand[i].suit;
    if (i !== hand.length - 1) {
      handString += ", ";
    }
  }
  return handString;
}

// Event listener for the new game button
newGameButton.addEventListener("click", function () {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = {
        suit: suits[i],
        value: values[j],
      };
      deck.push(card);
    }
  }

  dealerCards = [getRandomCard(), getRandomCard()];
  playerCards = [getRandomCard(), getRandomCard()];

  updateText();
});

// Event listener for the hit button
hitButton.addEventListener("click", function () {
  playerCards.push(getRandomCard());
  let currentScore = getScore(playerCards);
  if (currentScore > 21) {
    gameOver = true;
    playerWon = false;
  }
  if (playerScore > 21) {
    gameOver = true;
    playerWon = false;
  }
  updateText();
});

// Event listener for the stay button
stayButton.addEventListener("click", function () {
  gameOver = true;
  while (getScore(dealerCards) < 17) {
    dealerCards.push(getRandomCard());
  }
  let dealerScore = getScore(dealerCards);
  if (dealerScore > 21) {
    playerWon = true;
  } else if (playerScore > dealerScore) {
    playerWon = true;
  } else {
    playerWon = false;
  }
  updateText();
});
