const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    
    //hide all colors
    newDiv.classList.add('colorhidden');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let hasFlippedCard = false;
//only be able to change at most 2 cards at a time
let lockBoard = false;
let firstCard, secondCard;

// TODO: Implement this function!
function handleCardClick(event) {
  if (lockBoard) return;
  //if double-clicked on the same card, do not apply second click to secondCard
  if (this === firstCard) return;
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  //change background color to be the color of the class it is
  const clickedDiv = event.target;
  clickedDiv.classList.remove('colorhidden');
  const bgColor = event.target.classList;
  clickedDiv.style.backgroundColor = bgColor;
  
  if (!hasFlippedCard){
    //first card flipped
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
    //second card flipped
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }

  function checkForMatch(){
    let isMatch = firstCard.classList.item(0) === secondCard.classList.item(0);

    isMatch ? disableCards() : unflipCards();
  }
    //this if statement below is shortened by using a ternary operator above in checkForMatch
    // if(firstCard.classList.item(0) === secondCard.classList.item(0)){
    //   disableCards();
    // } else {
    //   unflipCards();
    //   }

  //clicking on two matching cards should be a "match" - those cards should stay face up
  function disableCards(){
    firstCard.removeEventListener('click',handleCardClick);
    secondCard.removeEventListener('click',handleCardClick);

    resetBoard();
  }

  //when clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide again.
  //make sure to use a setTimeout so that you can execute code after 1 second
  function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
      firstCard.style.backgroundColor = firstCard.classList.item(1);
      secondCard.style.backgroundColor = secondCard.classList.item(1);
      resetBoard();
    }, 1000);
  }

  function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
  

// when the DOM loads
createDivsForColors(shuffledColors);
