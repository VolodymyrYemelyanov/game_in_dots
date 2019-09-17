const btn = document.getElementById('btn');
const containerEasy = document.getElementById('container-easy');
const containerHard = document.getElementById('container-hard');
const getSquare = document.getElementsByClassName('square');
const gatName = document.querySelector('#name-input');
const btnGatName = document.querySelector('#btnGatName');
let squareNumber = getSquare.length;
let nameValue = null,
  level = null,
  lower = 1,
  upper = 25,
  countRed = 0,
  countGreen = 0,
  timeToClick = 1000,
  items = [];

btn.addEventListener('click', function() {
  nameValue = gatName.value;
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
  setTimeout(function loop() {
    let item = items.shift();
    let square = document.getElementById(item.id);
    square.style.backgroundColor = 'lightblue';

    // mark the item ready
    item.ready = true;
    setTimeout(() => {
      // hasn't been clicked within given period
      if (!item.clicked) {
        square.style.backgroundColor = 'red';
        countRed++;
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
      }
    });

    if (countGreen > Math.floor(upper / 2)) {
      console.log('Geen is winner!');
    } else if (countRed > Math.floor(upper / 2)) {
      console.log('Red is winner!');
    }
  }, 3000);
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

function getSelecValue() {
  level = document.getElementById('select-level').value;
  if (level === 'easy') {
    containerEasy.style.display = 'flex';
    containerHard.style.display = 'none';
    lower = 26;
    upper = 40;
    timeToClick = 1500;
    resetData();
  } else if (level === 'hard') {
    containerEasy.style.display = 'none';
    containerHard.style.display = 'flex';
    lower = 1;
    upper = 25;
    timeToClick = 1000;
    resetData();
  }
}

// function getSelecValue() {
// 	return null;
// }

function resetData() {
  items = [];
  countRed = 0;
  countGreen = 0;
  for (let i = 0; i < squareNumber; i++) {
    getSquare[i].style.backgroundColor = 'wheat';
  }
}
