/**
 * typewriter.js
 *
 * This script handles the typewriter animation effect for displaying rotating text on a webpage.
 * The text rotates through an array of strings, simulating typing and deleting each string one by one.
 * It can be used to highlight different skills or topics dynamically on a webpage.
 *
 * Key functionalities:
 * - Typewriter effect with typing and deleting animation.
 * - Ability to handle custom text provided via the `data-type` attribute or fallback to default text.
 * - Automatic detection and parsing of JSON strings for custom text input.
 */

const text = ["Backend Development", "Frontend Development", "App Development", "Game Development", "Computational Intelligence", "Reinforcement Learning"];

/**
 * @param {HTMLElement} el - The HTML element where the typewriter effect will be applied.
 * @param {Array} toRotate - The array of strings that will be rotated through in the typewriter effect.
 * @param {number} period - The period (in ms) between switching to the next string in the array.
 */
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

/**
 * Handles the main logic for typing and deleting text.
 * It adjusts the typing speed, handles the deletion process, and schedules the next tick.
 */
TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;  // Random typing speed to simulate human typing

  if (this.isDeleting) {
    delta /= 2;  // Speed up deleting
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;  // Pause after full text is typed out
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;  // Start typing the next string
    this.loopNum++;
    delta = 500;  // Small pause before starting the next word
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

/**
 * onload event listener
 * 
 * Starts the typewriter effect when the window finishes loading.
 */
window.onload = function () {
  startTypewriter();
};

/**
 * Initializes the typewriter effect on elements with the class "typewriter".
 * It reads the `data-type` attribute to get the custom text strings if provided, otherwise uses the default text array.
 * 
 * @returns {void}
 */
function startTypewriter() {
  var elements = document.getElementsByClassName("typewriter");
  for (var i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute('data-type') || text;
    toRotate = isJsonString(toRotate) ? JSON.parse(toRotate) : toRotate;
    var period = 2000;
    if (toRotate) {
      new TxtType(elements[i], toRotate, period);
    }
  }
}

/**
 * Checks if a given string is a valid JSON string.
 * 
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is valid JSON, false otherwise.
 */
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
