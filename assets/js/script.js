const btnPlay = document.getElementById('btnPlay');
const btnPlayAgain = document.getElementById('btnPlayAgain');
const containerPlay = document.querySelector('.form__play');
const containerPlayAgain = document.querySelector('.form__playAgain');
const containerEasy = document.getElementById('container-easy');
const containerHard = document.getElementById('container-hard');
const getSquare = document.getElementsByClassName('square');
const gatName = document.querySelector('#name-input');
const btnGatName = document.querySelector('#btnGatName');
const leadInfo = document.getElementById('leadInfo');
const leadNameInfo = document.querySelector('.nameLead');
const leadTimeInfo = document.querySelector('.timeLead');
const winnerObj = {};
let timeoutID = null;
let squareNumber = getSquare.length;
let nameValue = null,
  dataToStore = null,
  level = null,
  lower = 1,
  upper = 25,
  item = null,
  squareNumberByLevel = 25;
(countRed = 0), (countGreen = 0), (timeToClick = 1000), (items = []);

btnPlayAgain.addEventListener('click', function() {
  showStoredData();
  item = null;
  resetGame();
  randomNomber();
  letsPlay();
});

btnPlay.addEventListener('click', function() {
  nameValue = gatName.value;
  showStoredData();
  // check if level choosed and entered name
  if ((level === 'easy' || level === 'hard') && nameValue.length >= 1) {
    document.getElementById('hello-text').innerHTML = 'Lets play ' + nameValue;
    randomNomber();
    letsPlay();
  } else {
    alert('Please choose the level and enter your name!');
  }
});

function letsPlay() {
  timeoutID = setTimeout(function loop() {
    if (item === 0) {
      return;
    }
    item = items.shift();
    let square = document.getElementById(item.id);
    square.style.backgroundColor = 'lightblue';
    // debugger;
    // mark the item ready
    item.ready = true;
    setTimeout(() => {
      // hasn't been clicked within given period
      if (!item.clicked) {
        square.style.backgroundColor = 'red';
        countRed++;
        if (countRed > Math.floor(squareNumberByLevel / 2)) {
          document.getElementById('hello-text').innerHTML = 'AI is a winner :(';
          item = 0;
          resetGame();
          // put the button 'Play again'
          containerPlay.style.display = 'none';
          containerPlayAgain.style.display = 'block';
          winnerObj.name = 'AI';
          winnerObj.time = 'rightNow';
        }
      }
      // mark it not ready after given period
      item.ready = false;
    }, timeToClick);

    if (items.length) {
      setTimeout(loop, 3000);
    }
    square.addEventListener('click', function() {
      if (item.ready) {
        item.clicked = true;
        square.style.backgroundColor = 'green';
        countGreen++;

        if (countGreen > Math.floor(squareNumberByLevel / 2)) {
          document.getElementById('hello-text').innerHTML =
            nameValue + ' you are a winner!!!';
          item = 0;
          resetGame();
          // put the button 'Play again'
          containerPlay.style.display = 'none';
          containerPlayAgain.style.display = 'block';
          winnerObj.name = nameValue;
          winnerObj.time = 'rightNow';
          storeData();
        }
      }
    });
  }, 3000);
}

function storeData() {
  dataToStore = JSON.stringify(winnerObj);
  localStorage.setItem('Winner', dataToStore);
}

function showStoredData() {
  let showWinner = JSON.parse(localStorage.getItem('Winner'));
  leadNameInfo.innerHTML = showWinner.name;
  leadTimeInfo.innerHTML = showWinner.time;
  leadInfo.style.display = 'block';
}

function randomNomber() {
  while (items.length <= upper - lower) {
    let random = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    if (!items.find(u => u.id === random)) {
      items.push({
        id: random,
        ready: false,
        clicked: false
      });
    }
  }
}

function resetGame() {
  level = document.getElementById('select-level').value;
  resetData();
  if (level === 'easy') {
    containerEasy.style.display = 'flex';
    containerHard.style.display = 'none';
    lower = 26;
    upper = 40;
    squareNumberByLevel = 15;
    timeToClick = 1000;
  } else if (level === 'hard') {
    containerEasy.style.display = 'none';
    containerHard.style.display = 'flex';
    lower = 1;
    upper = 25;
    squareNumberByLevel = 25;
    timeToClick = 900;
  }
}

function resetData() {
  items = [];
  countRed = 0;
  countGreen = 0;
  for (let i = 0; i < squareNumber; i++) {
    getSquare[i].style.backgroundColor = 'wheat';
  }
}
