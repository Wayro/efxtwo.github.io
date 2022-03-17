console.log('working')

const stayButton = document.getElementById('stayButton');
const hitButton = document.getElementById('hitButton');
const startButton = document.getElementById('startButton');
const playersHold = document.getElementById('playersCards');
const dealersHold = document.getElementById('dealersCards');
const playerValue = document.getElementById('playerValue');
const dealerValue = document.getElementById('dealerValue');

let cardSuites = ['clubs','hearts','diamonds','spades'];
let cardNums = ['ace',2,3,4,5,6,7,8,9,10,'jack','queen','king'];
let deck = [];
let initialGame = true;
let cardCount = 0;
let gameStatus = 0;
let dealerHidden = 0;
let dealerUp = 0;

function createdeck(){
    for(suit in cardSuites){
        for(nums in cardNums){
        let cardValue = nums > 9 ? 10 : parseInt(nums) + 1;

        let card = {
            suites: cardSuites[suit],
            number: cardNums[nums],
            value: cardValue
        };  
        deck.push(card);
        }
    }
}
function shuffleDeck(array) {    //shuffling the deck, order of cards get re-arranged
    for (var i = array.length - 1; i > 0; i--){
          var j = Math.floor(Math.random() * (i + 1));  // getting random values
          var temp = array[i]; // a temporary holder to hold the value of i
          array[i] = array[j];  // re-creating the value of i by a random value
          array[j] = temp;
      }
      return array;
  }

function dealCards(){
    let playersHand =[];
    let dealersHand = [];
    let dealerCounter = 0;
	let dealersUpValue = 0;
    gameStatus = 1;
    playersHold.innerHTML = '';
    dealersHold.innerHTML = '';
    if(initialGame){
		createdeck();
		shuffleDeck(deck);
		cardCount = 0;
		initialGame = false;
	}
    
    for(i=0; i<2; i++){
        playersHand.push(deck[cardCount]);
        playersHold.innerHTML += `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
        // playerCounter = parseInt(playerCounter) + parseInt(`${deck[cardCount].value}`);
        cardCount++;
        dealersHand.push(deck[cardCount]);
        if (i == 0){
            dealersHold.innerHTML += `<img src=PNG-cards/pokemoncard.png>`;
            dealerHidden = cardCount;
        } else{
            dealersHold.innerHTML += `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
            dealersUpValue = parseInt(dealersUpValue)+parseInt(`${deck[cardCount].value}`);
            dealerUp = cardCount;
        }
        cardCount++;
    }
    let playerCounter = aceCheck(playersHand);
    dealerCounter = aceCheck(dealersHand);
    if ((playerCounter == 21 && playersHand.length == 2) || (dealerCounter == 21 && dealersHand.length == 2)){
        dealerCounter = dealerCounter;
        gameOver(dealerCounter, playerCounter);
    } else {
		playerValue.innerHTML = playerCounter;
		if(dealersUpValue == 1){
			dealerValue.innerHTML = '1 or 11';
		} else {
			dealerValue.innerHTML = dealersUpValue;
		}
	}
    cardCounter();
}

function cardCounter(){
    if (cardCount > 29){
        initialGame = true;
    }
}

function startGame(){
    dealCards();
    //console.log(JSON.stringify(deck))
};

function aceCheck(whosCard){
    let checkValue = 0;
    let hasAce = false;

    for(let i in whosCard){
        if (whosCard[i].number == 'ace' && !hasAce){
            hasAce = true;
            checkValue = checkValue + 10;
        }
        checkValue = checkValue + whosCard[i].value;
        console.log(i+'-'+whosCard[i].key+' CARD VALUE: '+whosCard[i].value);
    }

    if (hasAce && checkValue > 21){
        checkValue = checkValue - 10;
    }
       return checkValue; 
}

function gameOver(dealerCount, playerCount){
    gameStatus = 0;
    dealersHold.innerHTML = `<img src=PNG-cards/${deck[dealerHidden].number}_of_${deck[dealerHidden].suites}.png><img src=PNG-cards/${deck[dealerUp].number}_of_${deck[dealerUp].suites}.png>`;
    dealerValue.innerHTML = dealerCount;
    playerValue.innerHTML = playerCount;
}

startButton.addEventListener('click',startGame)