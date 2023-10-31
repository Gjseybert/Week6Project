const { expect } = require('chai');

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

function createDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function dealHands(deck) {
  shuffleDeck(deck);
  const player1Hand = deck.slice(0, 26);
  const player2Hand = deck.slice(26);
  return [player1Hand, player2Hand];
}

function getCardValue(card) {
  const rankToValue = { A: 14, K: 13, Q: 12, J: 11 };
  return rankToValue[card.rank] || parseInt(card.rank);
}

function playRound(player1Card, player2Card) {
  const player1Value = getCardValue(player1Card);
  const player2Value = getCardValue(player2Card);

  if (player1Value > player2Value) {
    return 1;
  } else if (player2Value > player1Value) {
    return 2;
  } else {
    return 0; // It's a tie
  }
}

function playWar() {
  const deck = createDeck();
  const [player1Hand, player2Hand] = dealHands(deck);
  let player1Score = 0;
  let player2Score = 0;

  for (let i = 0; i < 26; i++) {
    const player1Card = player1Hand[i];
    const player2Card = player2Hand[i];

    console.log(`Round ${i + 1}:`);
    console.log(`Player 1 plays ${player1Card.rank} of ${player1Card.suit}`);
    console.log(`Player 2 plays ${player2Card.rank} of ${player2Card.suit}`);

    const roundWinner = playRound(player1Card, player2Card);
    if (roundWinner === 1) {
      player1Score++;
      console.log('Player 1 wins the round!\n');
    } else if (roundWinner === 2) {
      player2Score++;
      console.log('Player 2 wins the round!\n');
    } else {
      console.log("It's a tie!\n");
    }
  }

  console.log('Game Over');
  console.log(`Player 1 Score: ${player1Score}`);
  console.log(`Player 2 Score: ${player2Score}`);

  return { player1Score, player2Score };
}

// Run the game
playWar();
