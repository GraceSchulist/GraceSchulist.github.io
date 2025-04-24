
  //VARIABLES
  
  const keyContainer = document.getElementById('key-container');
  const instructionDiv = document.getElementById('instruction');
  const paletteDiv = document.getElementById('color-palette');
  const sequenceContainer = document.getElementById('sequence-container');
  const sequenceSlots = document.querySelectorAll('.sequence-slot');
  const submitButton = document.getElementById('submit-button');
  const phoneNumberDisplay = document.getElementById('phone-number');
  const resetButton = document.getElementById('reset-button');
  const easyButton = document.getElementById('easy-button');
  const mediumButton = document.getElementById('medium-button');
  const hardButton = document.getElementById('hard-button');
  const difficultyContainer = document.getElementById('difficulty-button-container');
  const inputSubmitBtn = document.getElementById('input-submit-btn');
  const numberInput = document.getElementById('number-input');
  const alertBox = document.getElementById('alert');
  const errorMessage = document.getElementById('error-message');
  const secondInstructions = document.getElementById('instruction-second');
  const instructionStatic = document.getElementById('instruction-static');

  let colorDigitKey = {};
  let digitColorKey = {};

  const baseColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan', 'magenta', 'lime', 'teal'];
  const targetLength = 10;

  let draggedItem = null;
  let colorPaletteItems = [];
  let submittedNumber = '';

  //FUNCTIONS & EVENT LISTENERS

  function generateColorKey() {
    colorDigitKey = {};
    digitColorKey = {};
    const shuffledColors = [...baseColors].sort(() => Math.random() - 0.5).slice(0, 10);
    const shuffledDigits = Array.from({ length: 10 }, (_, i) => i).sort(() => Math.random() - 0.5);

    keyContainer.innerHTML = '';
    paletteDiv.innerHTML = '';
    colorPaletteItems = [];

    for (let i = 0; i < 10; i++) {
      const digit = shuffledDigits[i].toString();
      const color = shuffledColors[i];
      colorDigitKey[color] = digit;
      digitColorKey[digit] = color;

      // Key div display
      const keyItem = document.createElement('div');
      keyItem.classList.add('key-item');
      const colorBoxForKey = document.createElement('div');
      colorBoxForKey.classList.add('color-box');
      colorBoxForKey.style.backgroundColor = color;
      const digitSpan = document.createElement('span');
      digitSpan.textContent = digit;
      keyItem.appendChild(colorBoxForKey);
      keyItem.appendChild(digitSpan);
      keyContainer.appendChild(keyItem);

      // Draggable color blocks
      const paletteColor = document.createElement('div');
      paletteColor.classList.add('color-box');
      paletteColor.style.backgroundColor = color;
      paletteColor.style.display = 'inline-block';
      paletteColor.draggable = true;
      paletteColor.dataset.color = color;
      paletteColor.addEventListener('dragstart', handleDragStart);
      colorPaletteItems.push(paletteColor);
      paletteDiv.appendChild(paletteColor);
    }

    //Show/hide the key
    keyContainer.style.display = 'none';
    instructionDiv.textContent = 'Memorize the color-digit key.';
  }

    //EASY, MEDIUM, AND HARD MODE BUTTON SCREEN

    easyButton.addEventListener('click', () => {
      keyContainer.style.display = 'block';
      paletteDiv.style.display = 'block';
      sequenceContainer.style.display = 'block';
      instructionStatic.style.display = 'block';
      phoneNumberDisplay.style.display = 'none';
      instructionDiv.style.display = 'none';
      sequenceSlots.forEach(slot => {
        slot.style.display = 'inline-block';
      })
      submitButton.style.display = 'block';
      resetButton.style.display = 'block';
      difficultyContainer.style.display = 'none';
      setTimeout(() => { 
        keyContainer.style.display = 'none';
      }, 3000);
    })

    mediumButton.addEventListener('click',() => {
      keyContainer.style.display = 'block';
      paletteDiv.style.display = 'block';
      sequenceContainer.style.display = 'block';
      phoneNumberDisplay.style.display = 'none';
      instructionStatic.style.display = 'block';
      instructionDiv.style.display = 'none';
      sequenceSlots.forEach(slot => {
        slot.style.display = 'inline-block';
      })
      submitButton.style.display = 'block';
      resetButton.style.display = 'block';
      difficultyContainer.style.display = 'none';
      setTimeout (() => {
        keyContainer.style.display = 'none';
      },2250);
    })

    hardButton.addEventListener('click',() => {
      keyContainer.style.display = 'block';
      paletteDiv.style.display = 'block';
      sequenceContainer.style.display = 'block';
      phoneNumberDisplay.style.display = 'none';
      instructionDiv.style.display = 'none';
      sequenceSlots.forEach(slot => {
        slot.style.display = 'inline-block';
      })
      submitButton.style.display = 'block';
      resetButton.style.display = 'block';
      instructionStatic.style.display = 'block';
      difficultyContainer.style.display = 'none';
      setTimeout(() => {
        keyContainer.style.display = 'none';
      }, 1500);
    })

  function handleDragStart(event) {
    draggedItem = event.target;
  }

  sequenceSlots.forEach(slot => {
    slot.addEventListener('dragover', handleDragOver);
    slot.addEventListener('drop', handleDrop);
  });

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    if (!draggedItem) return;
    if (event.target.classList.contains('sequence-slot') && event.target.innerHTML === '') {
      event.target.style.backgroundColor = draggedItem.style.backgroundColor;
      draggedItem = null; // Reset dragged item to display nothing
    }
  }

  submitButton.addEventListener('click', () => {
    const phoneInput = document.getElementById('number-input').value.trim();
  
    if (!/^\d{10}$/.test(phoneInput)) {
      alertBox.textContent = 'Please enter a valid 10-digit phone number (digits only).';
      return;
    }
  
    let enteredDigits = '';
    sequenceSlots.forEach(slot => {
      const backgroundColor = slot.style.backgroundColor;
      if (colorDigitKey.hasOwnProperty(backgroundColor)) {
        enteredDigits += colorDigitKey[backgroundColor];
      } else {
        enteredDigits += '?'; // Slot missing or unrecognized color
      }
    });
  
    phoneNumberDisplay.textContent = `You entered: ${formatPhoneNumber(enteredDigits)}`;
    phoneNumberDisplay.style.display = 'block';
  
    if (enteredDigits.includes('?') || enteredDigits.length !== 10) {
      alertBox.textContent = 'All slots must be filled. Press reset and try again.';
    } else if (enteredDigits === submittedNumber) {
      alertBox.textContent = '✅ Success! Your phone number matches the color sequence!';
    } else {
      alertBox.textContent = '❌ Incorrect color sequence for the entered phone number. Press reset and try again.';
      sequenceSlots.forEach(slot => {
        slot.style.backgroundColor = '';
      });
    }
  
    // //Show these elements
    // difficultyContainer.style.display = 'block';
    // instructionDiv.style.display = "block";
     alertBox.style.display = "block";
    // easyButton.style.display = 'inline';
    // mediumButton.style.display = 'inline';
    // hardButton.style.display = 'inline';

    // //Hide these elements
    // keyContainer.style.display = 'none';
    // paletteDiv.style.display = 'none';
    // sequenceContainer.style.display = 'none';
    // sequenceSlots.forEach(slot => {
    //   slot.style.display = 'none';
    // })

  });

  resetButton.addEventListener('click', () => {
    generateColorKey();
    sequenceSlots.forEach(slot => {
      slot.style.backgroundColor = '';
    });
    difficultyContainer.style.display = 'block';
    phoneNumberDisplay.textContent = '';
    instructionDiv.textContent = 'Memorize the color-digit key.';
    submittedNumber = '';

    //Show these elements
    difficultyContainer.style.display = 'block';
    instructionDiv.style.display = "block";
    alertBox.style.display = "block";
    easyButton.style.display = 'inline';
    mediumButton.style.display = 'inline';
    hardButton.style.display = 'inline';

    //Hide these elements
    keyContainer.style.display = 'none';
    paletteDiv.style.display = 'none';
    sequenceContainer.style.display = 'none';
    sequenceSlots.forEach(slot => {
      slot.style.display = 'none';
    })
    instructionStatic.style.display = 'none';
  });

  inputSubmitBtn.addEventListener('click', () => {
    const phoneNumber = numberInput.value.trim();

    if (!/^\d{10}$/.test(phoneNumber)) {
      alertBox.textContent = "Please enter a valid 10-digit phone number using only digits.";
      return;
    }

    alertBox.textContent = 'Phone number accepted.';
    phoneNumberDisplay.textContent = `Target Number: ${formatPhoneNumber(phoneNumber)}`;
    submittedNumber = phoneNumber;

    //Trigger new elements to appear on screen when submitb button is pushed
  generateColorKey();
  phoneNumberDisplay.textContent = '';

  errorMessage.style.display = 'block';
  instructionDiv.style.display = 'block';
  difficultyContainer.style.display = 'block';
  easyButton.style.display = 'inline';
  mediumButton.style.display = 'inline';
  hardButton.style.display = 'inline';
  secondInstructions.style.display = 'inline';
  })

  function formatPhoneNumber(numberString) {
    const parts = [];
    for (let i = 0; i < numberString.length; i += 1) {
      parts.push(numberString[i]);
      if ((i === 2 || i === 5) && i < numberString.length - 1) { //Insert a - into the array after every 3rd and 6th position to resemble a phone number
        parts.push('-');
      }
    }
    return parts.join('');
  }

  //Initial setup
  document.addEventListener('DOMContentLoaded', () => {
    keyContainer.style.display = 'none';
    instructionDiv.style.display = 'none';
    paletteDiv.style.display = 'none';
    sequenceContainer.style.display = 'none';
    sequenceSlots.forEach(slot => {
      slot.style.display = 'none';
    })
    submitButton.style.display = 'none';
    phoneNumberDisplay.style.display = 'none';
    resetButton.style.display = 'none';
    easyButton.style.display = 'none';
    mediumButton.style.display = 'none';
    hardButton.style.display = 'none';
    difficultyContainer.style.display = 'none';
    alertBox.style.display = 'none';
    errorMessage.style.display = 'none';
    secondInstructions.style.display = 'none';
    instructionStatic.style.display = 'none';
  })
  