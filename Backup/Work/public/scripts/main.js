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
    const selectedCurrency = selectedElement;
    const priceValue = selectedCurrency.dataset.currencyValue;
    priceElement.textContent = priceValue;
    console.log(priceValue);
    console.log('selected currency', selectedCurrency);
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

function sendSMS() {
  const quantity = document.querySelector('.input').value;
  const product = document.querySelector('.productName').textContent;
  const phoneNumber = '+359887692910';
  const message = `Thank you for your purchase! You have added ${quantity} of ${product} to your cart.`;

  // Make an HTTP request to the Twilio API
  fetch('/send-sms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber, message }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the Twilio API
      console.log('SMS sent successfully');
    })
    .catch(error => {
      console.error('Error sending SMS:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  // Get all the color swatches
  const colorSwatches = document.querySelectorAll(".colorSwatch");

  // Add click event listener to each color swatch
  colorSwatches.forEach(function(swatch) {
    swatch.addEventListener("click", function() {
      // Remove 'selected' class from all color swatches
      colorSwatches.forEach(function(swatch) {
        swatch.classList.remove("selected");
      });

      // Add 'selected' class to the clicked color swatch
      this.classList.add("selected");

      // Get the selected color from the src attribute of the clicked swatch
      const selectedColor = this.getAttribute("src").split("/").pop().split("_")[0];

      // Loop through each product item
      const productItems = document.querySelectorAll(".productItem");
      productItems.forEach(function(item) {
        // Get all the color variations for the current product item
        const colorVariations = item.querySelectorAll(".color_variations img");

        // Check if any color variation matches the selected color
        let hasMatch = false;
        colorVariations.forEach(function(variation) {
          const variationColor = variation.getAttribute("src");
          const variationColorCode = variationColor.split("/").pop().split("_")[0];
          console.log("selected color:", selectedColor);
          console.log("variation color:", variationColorCode);
          if (variationColorCode === selectedColor) {
            hasMatch = true;
          }
        });

        // Toggle the visibility of product item based on the color match
        if (hasMatch) {
          item.style.removeProperty("display");
        } else {
          item.style.display = "none";
        }
        console.log("product item visibility:", item.style.display);
      });
    });
  });

  // Add click event listener to the "Remove Filters" button
  const removeFiltersButton = document.getElementById("removeFiltersButton");
  removeFiltersButton.addEventListener("click", function() {
    // Remove 'selected' class from all color swatches
    colorSwatches.forEach(function(swatch) {
      swatch.classList.remove("selected");
    });

    // Show all product items
    const productItems = document.querySelectorAll(".productItem");
    productItems.forEach(function(item) {
      item.style.removeProperty("display");
    });
  });
});
