/*
Acceptance Criteria
GIVEN I need a new, secure password
WHEN I click the button to generate a password

THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria

THEN I select which criteria to include in the password
WHEN prompted for the length of the password

THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN prompted for character types to include in the password

THEN I choose lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt

THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered

THEN a password is generated that matches the selected criteria
WHEN the password is generated

THEN the password is either displayed in an alert or written to the page
*/


// Uppercase always checked to produce a password
function AtLeastOneCheckbox() {
  var isUppercase = document.getElementById("uppercase").checked;
  var isLowercase = document.getElementById("lowercase").checked;
  var isDigits = document.getElementById("digits").checked;
  var isSymbols = document.getElementById("symbols").checked;
  var boolMask = [isUppercase,isLowercase,isDigits,isSymbols]
  switch(true){
   case (boolMask[0]===false && boolMask[1]===false && boolMask[2]===false && boolMask[3]===false) : document.getElementById("uppercase").checked=true;
   break;
  }
};

window.setInterval(AtLeastOneCheckbox, 1);  

//Display the value of the length slider
var slider1 = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider1.value;
slider1.oninput = function() {
output.innerHTML = this.value;
}

// Assignment Code
var generateBtn = document.querySelector("#generate");
var generateCopyPassword = document.querySelector("#Copy-password");
const checkAllCheckboxes = document.querySelector("#select-all");

// https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
//Copy Generated passwoord to Clipboard
function copyPassword () {
  var copyText = document.getElementById("password");
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  /* Copy the text inside the text field */
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
  }
 
function generatePassword(length){  
  var isUppercase = document.getElementById("uppercase").checked;
  var isLowercase = document.getElementById("lowercase").checked;
  var isDigits = document.getElementById("digits").checked;
  var isSymbols = document.getElementById("symbols").checked;    

  var all = "";
  var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercase = "abcdefghijklmnopqrstuvwxyz";
  var digits = "0123456789";
  var symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

  //Add to Array deoending on which checkbox is checked
  isUppercase ? all = all.concat(uppercase) : null;
  isLowercase ? all = all.concat(lowercase) : null;
  isDigits ? all = all.concat(digits) : null;
  isSymbols ? all = all.concat(symbols) : null;

  //Shuffle the string
  var shuffled = all.split('').sort(function(){return 0.5-Math.random()}).join('');
  // console.log(shuffled);
  var password = '';
  for (var i = 0; i < length; i++) {
      //Re-Shuffle the string at each iteration
      var reShuffled = shuffled.split('').sort(function(){return 0.5-Math.random()}).join('');
      var character = Math.floor(Math.random() * reShuffled.length);
      password += reShuffled.charAt(character);
      // console.log(reShuffled);
  }
  return password;
}

// Write password to the #password input
function writePassword() {
var password = generatePassword(slider1.value);
  // var password = slider1.value;
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

//Checks all criterias when Select All is clicked
function check(checked = true) {
  const cbs = document.querySelectorAll('input[name="criteria"]');
  cbs.forEach((cb) => {
      cb.checked = checked;
  });
}

function checkAll() {
  check();
  // reassign click event handler
  this.onclick = uncheckAll;
}

function uncheckAll() {
  check(false);
  // reassign click event handler
  this.onclick = checkAll;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
generateCopyPassword.addEventListener("click", copyPassword);
checkAllCheckboxes.onclick = checkAll;