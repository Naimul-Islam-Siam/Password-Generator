const rangeSlider = document.getElementById('rangeSlider');
const rangeNumber = document.getElementById('rangeNumber');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeSymbolsElement = document.getElementById('includeSymbols');
const form = document.getElementById('form');
const submitBtn = document.getElementById('btn-submit');
const textInput = document.getElementById('text');


rangeSlider.addEventListener('input', syncRange);
rangeNumber.addEventListener('input', syncRange);
submitBtn.addEventListener('click', formAction);



const lowerCaseCodes = arrayRange(97, 122);
const upperCaseCodes = arrayRange(65, 90);
const numberCodes = arrayRange(48, 57);
const symbolCodes = arrayRange(33, 47).concat(
   arrayRange(58, 64).concat(
      arrayRange(91, 96).concat(
         arrayRange(123, 126)
      )
   )
);




function syncRange(e) {
   value = e.target.value;

   rangeSlider.value = value;
   rangeNumber.value = value;
};



function formAction(e) {
   e.preventDefault();
   const characterLength = rangeNumber.value;
   const includeNumbers = includeNumbersElement.checked;
   const includeUppercase = includeUppercaseElement.checked;
   const includeSymbols = includeSymbolsElement.checked;

   const password = generatePassword(characterLength, includeNumbers, includeUppercase, includeSymbols);

   textInput.value = password;
}



function generatePassword(characterLength, includeNumbers, includeUppercase, includeSymbols) {
   let characterCodes = lowerCaseCodes;
   if (includeNumbers) characterCodes = characterCodes.concat(numberCodes);
   if (includeUppercase) characterCodes = characterCodes.concat(upperCaseCodes);
   if (includeSymbols) characterCodes = characterCodes.concat(symbolCodes);

   const passwordArray = [];
   for (let i = 0; i < characterLength; i++) {
      const characterCode = characterCodes[Math.floor(Math.random() * characterCodes.length)];
      const character = String.fromCharCode(characterCode);
      passwordArray.push(character);
   }

   return passwordArray.join('');
}



function arrayRange(low, high) {
   const arr = [];

   for (let i = low; i <= high; i++) {
      arr.push(i);
   }

   return arr;
}


function copy() {
   textInput.select();
   textInput.setSelectionRange(0, 99999); /*For mobile devices*/

   /* Copy the text inside the text field */
   document.execCommand("copy");

   /* Alert the copied text */
   alert("Copied the text: " + textInput.value);
}