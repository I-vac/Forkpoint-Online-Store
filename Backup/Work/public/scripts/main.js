/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-undef */
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');
const inputField = document.getElementById('input');
const arrowUP = document.querySelectorAll('.carousel .arrowUP');
const arrowDOWN = document.querySelectorAll('.carousel .arrowDOWN');
const image = document.querySelectorAll('.carousel .image');
const imgRef = document.querySelector('.carousel .active');
const images = Array.from(document.getElementsByClassName('image'));
const currencySelector = document.querySelector('.chooseCurrency');
const options = Array.from(document.getElementsByClassName('options'));
const priceElement = document.querySelector('.productPrice');
const acc = document.getElementsByClassName('accordion');
let currentIndex;
// let previous;
// $('select[class=chooseCurrency]').focus(function () {
//   previous = this.value;
// }).change(() => {
//   console.log('prev value', previous);
// });
if (imgRef) {
  currentIndex = imgRef.dataset.index;
}
function ChangeClassActive(selectedElement) {
  images.forEach((image) => {
    image.classList.remove('active');
  });
  selectedElement.classList.add('active');
  document.querySelector('.mainImage').src = selectedElement.src;
}

arrowUP.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    currentIndex = Number(currentIndex);
    currentIndex -= 1;
    const selectedElement = document.querySelector(`[data-index="${currentIndex}"]`);
    ChangeClassActive(selectedElement);
    console.log(selectedElement);
  });
});

arrowDOWN.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    currentIndex = Number(currentIndex);
    currentIndex += 1;
    const selectedElement = document.querySelector(`[data-index="${currentIndex}"]`);
    ChangeClassActive(selectedElement);
    console.log(selectedElement);
  });
});


image.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.mainImage').src = event.target.src;
    ChangeClassActive(event.target);
  });
});

if (minusButton) {
  minusButton.addEventListener('click', (event) => {
    event.preventDefault();
    const currentValue = Number(inputField.value) || 0;
    inputField.value = currentValue - 1;
  });
}

if (plusButton) {
  plusButton.addEventListener('click', (event) => {
    event.preventDefault();
    const currentValue = Number(inputField.value) || 0;
    inputField.value = currentValue + 1;
  });
}

if (currencySelector) {
  currencySelector.addEventListener('change', (event) => {
    event.preventDefault();
    previouslySelectedCurrency = event.target.options[event.target.selectedIndex].textContent;
    const selectedElement = event.target.options[event.target.selectedIndex];
    options.forEach((options) => {
      options.classList.remove('selected');
    });
    selectedElement.classList.add('selected');
    document.querySelector('.selected').textContent = selectedElement.value;
    const selectedCurrency = selectedElement.value;
    const priceValue = priceElement.dataset.price;
    console.log(priceValue);
    console.log('selected currency', selectedCurrency);


    const json = {
      priceValue,
      selectedCurrency,
    };

    // $.ajax({
    //   type: 'POST',
    //   url: '/convert-currency',
    //   dataType: 'json',
    //   data: json,
    //   success: (data) => {
    //     console.log('SUCCESS: ', data);
    //   },
    //   error: (data) => {
    //     console.log('ERROR: ', data);
    //   },
    // });

    fetch(`/convert-currency?price=${priceValue}&selectedCurrency=${selectedCurrency}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((json) => {
        console.log('Success:', json);
        priceElement.textContent = json.newPrice;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}


$('.activeSize').click(function () {
  $(this).addClass('selected').siblings().removeClass('selected');
});

$('.color img').click(function () {
  $(this).addClass('selected').siblings().removeClass('selected');
});

$('.content img').click(function () {
  $(this).toggleClass('selected');
});

$('.filterSizes').click(function () {
  $(this).toggleClass('selected');
});

$('.menuitem').click(function () {
  $(this).addClass('active').siblings().removeClass('active');
});


let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
}
