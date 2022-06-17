/* eslint-disable func-names */
/* eslint-disable no-undef */
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');
const inputField = document.getElementById('input');
const arrowUP = document.getElementById('arrowUP');
const arrowDOWN = document.getElementById('arrowDOWN');
const image = document.getElementById('image');
const imgRef = document.getElementsByClassName('active')[0];
let currentIndex = imgRef.dataset.index;


console.log(currentIndex);

minusButton.addEventListener('click', (event) => {
  event.preventDefault();
  const currentValue = Number(inputField.value) || 0;
  inputField.value = currentValue - 1;
});

plusButton.addEventListener('click', (event) => {
  event.preventDefault();
  const currentValue = Number(inputField.value) || 0;
  inputField.value = currentValue + 1;
});

arrowUP.addEventListener('click', (event) => {
  event.preventDefault();
  currentIndex = Number(currentIndex);
  currentIndex -= 1;
  console.log(currentIndex);
});

arrowDOWN.addEventListener('click', (event) => {
  event.preventDefault();
  currentIndex = Number(currentIndex);
  currentIndex += 1;
  console.log(currentIndex);
});

image.addEventListener('click', (event) => {
  event.preventDefault();
});

$('.activeSize').click(function () {
  $(this).addClass('selected').siblings().removeClass('selected');
});
