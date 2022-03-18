console.log('working')

const stayButton = document.getElementById('stayButton');
const hitButton = document.getElementById('hitButton');
const overLay = document.getElementById('overlay');
const gameResults = document.getElementById('gameResults');
const startButton = document.getElementById('startButton');
const playersHold = document.getElementById('playersCards');
const dealersHold = document.getElementById('dealersCards');
const playerValue = document.getElementById('playerValue');
const dealerValue = document.getElementById('dealerValue');
const dealersVisibleCards = document.getElementById('dealersVisibleCards');
const dealersHitCards = document.getElementById('dealersHitCards');

let cardSuites = ['clubs','hearts','diamonds','spades'];
let cardNums = ['ace',2,3,4,5,6,7,8,9,10,'jack','queen','king'];
let deck = [];
let initialGame = true;
let cardCount = 0;
let gameStatus = 0;
let dealerHidden = 0;
let dealerUp = 0;
let playersHand = [];
let dealersHand = [];

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
    overLay.style.display = 'none';
    hitButton.style.display = 'unset';
    stayButton.style.display = 'unset';
    let playersDealtHand = [];
    let dealersDealtHand = [];
    let dealerCounter = 0;
	let dealersUpValue = 0;
    gameStatus = 1;
    playersHold.innerHTML = '';
    dealersVisibleCards.innerHTML = '';
    dealersHitCards.innerHTML = '';
    playerValue.innerHTML = '';
    dealerValue.innerHTML = '';
    if(initialGame){
		createdeck();
		shuffleDeck(deck);
		cardCount = 0;
		initialGame = false;
	}
    
    let pCardFirst = [];
    let dCardFirst = [];
    let pCardSecond = [];
    let dCardSecond = [];
    for(i=0; i<2; i++){
        playersDealtHand.push(deck[cardCount]);
        if (i == 0){
            pCardFirstImg = `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
            pCardFirstValue = deck[cardCount].value;
            pCardFirst.push(pCardFirstImg,pCardFirstValue);
        } else {
            pCardSecondImg = `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
            pCardSecondValue = deck[cardCount].value;
            pCardSecond.push(pCardSecondImg,pCardSecondValue);
        }
        // playerCounter = parseInt(playerCounter) + parseInt(`${deck[cardCount].value}`);
        cardCount++;

        dealersDealtHand.push(deck[cardCount]);
        if (i == 0){
            dCardFirst.push('<img src=PNG-cards/pokemoncard.png>',0);
            dealerHidden = cardCount;
        } else{
            dCardSecondImg = `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
            dCardSecondValue = deck[cardCount].value;
            dCardSecond.push(dCardSecondImg,dCardSecondValue);
            dealersUpValue = parseInt(dealersUpValue)+parseInt(`${deck[cardCount].value}`);
            dealerUp = cardCount;
        }
        cardCount++;
    }
    delayTimer = .25;
    setTimeout(() => {playersHold.innerHTML = pCardFirst[0]; playerValue.innerHTML = pCardFirst[1]}, delayTimer*1000);
    setTimeout(() => {dealersVisibleCards.innerHTML = dCardFirst[0]}, delayTimer*1000*2);
    setTimeout(() => {playersHold.innerHTML += pCardSecond[0]; playerValue.innerHTML = parseInt(pCardSecond[1]+pCardFirst[1])}, delayTimer*1000*3);
    setTimeout(() => {dealersVisibleCards.innerHTML += dCardSecond[0]}, delayTimer*1000*4);
    setTimeout(() => {let playerCounter = aceCheck(playersDealtHand); dealerCounter = aceCheck(dealersDealtHand);if ((playerCounter == 21 && playersDealtHand.length == 2) || (dealerCounter == 21 && dealersDealtHand.length == 2)){
        dealerCounter = dealerCounter;
        gameOver();
    } else {
		playerValue.innerHTML = playerCounter;
		if(dealersUpValue == 1){
			dealerValue.innerHTML = '1 or 11';
		} else {
			dealerValue.innerHTML = dealersUpValue;
		}
	}}, delayTimer*1000*5);
    
    cardCounter();
    playersHand = playersDealtHand;
    dealersHand = dealersDealtHand;
    //console.log(playersHand);
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
        //console.log(i+'-'+whosCard[i].key+' CARD VALUE: '+whosCard[i].value);
    }

    if (hasAce && checkValue > 21){
        checkValue = checkValue - 10;
    }
       return checkValue; 
}

function gameOver(){
    dealerCount = aceCheck(dealersHand);
    playerCount = aceCheck(playersHand);
    gameStatus = 0;
    dealersVisibleCards.innerHTML = `<img src=PNG-cards/${deck[dealerHidden].number}_of_${deck[dealerHidden].suites}.png><img src=PNG-cards/${deck[dealerUp].number}_of_${deck[dealerUp].suites}.png>`;
    playerValue.innerHTML = playerCount;

    if(playerCount > 21){
        gameResults.innerHTML = 'You Lose<br />Player BUST';
        setTimeout(() => {overLay.style.display = 'unset';}, delayTimer*1000*2);
    } else if(playerCount <= 21 && dealerCount < 17){
        if(playerCount == 21 && playersHand.length == 2 && dealerCount != 21){
            gameResults.innerHTML = 'You Win!<br />Player BlackJack';
            setTimeout(() => {overLay.style.display = 'unset';}, delayTimer*1000*2);
        } else {
            console.log('Dealer, take a hit');
            function dealerHit(){
                dealersHand.push(deck[cardCount]);
                dealersHitCards.innerHTML += `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
                dealerValue.innerHTML = aceCheck(dealersHand);
                cardCount ++;
                gameOver();
            }
            setTimeout(() => {dealerHit()}, delayTimer*1000*2);
        }
    } else if(dealerCount > 22 && playerCount < 22){
        gameResults.innerHTML = 'You Win!<br />Dealer BUST';
        setTimeout(() => {overLay.style.display = 'unset';}, delayTimer*1000*2);
    } else if(dealerCount == 21 && dealersHand.length == 2 && playerCount != 21){
        gameResults.innerHTML = 'You Lose!<br />Dealer BlackJack';
        setTimeout(() => {overLay.style.display = 'unset';}, delayTimer*1000*2);
    } else if(playerCount == 21 && playersHand.length == 2 && dealerCount != 21){
        gameResults.innerHTML = 'You Win!<br />Player BlackJack';
        setTimeout(() => {overLay.style.display = 'unset';}, delayTimer*1000*2);
    } else if(playerCount == dealerCount){
        gameResults.innerHTML = 'Game Over<br />Player Dealer PUSH';
        setTimeout(() => {overLay.style.display = 'unset';}, delayTimer*1000*2);
    } else if(playerCount <= 21 && dealerCount >= 17 && dealerCount < 22){
        if(playerCount > dealerCount){
            gameResults.innerHTML = 'You Win!<br />Player has higher cards';
            setTimeout(() => {overLay.style.display = 'unset';}, delayTimer*1000*2);
        } else {
            gameResults.innerHTML = 'You Lose!<br />Dealer has higher cards';
            setTimeout(() => {overLay.style.display = 'unset';}, delayTimer*1000*2);
        }
    } 
    dealerValue.innerHTML = dealerCount;
    hitButton.style.display = "none";
    stayButton.style.display = "none";
}
startButton.addEventListener('click',startGame);
function hit(){
    if(gameStatus == 1){
        playersHand.push(deck[cardCount]);
        playersHold.innerHTML += `<img src=PNG-cards/${deck[cardCount].number}_of_${deck[cardCount].suites}.png>`;
        playerValue.innerHTML = aceCheck(playersHand);
        if(aceCheck(playersHand) >= 21){
            gameOver();
        }
        cardCount++;
        cardCounter();
        playersHand = playersHand;
    }
}
function stay(){
    if(gameStatus == 1){
        gameOver();
    }
}
hitButton.addEventListener('click',hit);
stayButton.addEventListener('click',stay);
