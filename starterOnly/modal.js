// --- DOM Elements ---
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const names = document.querySelectorAll(".name-input");
const email = document.querySelector("#email");
const quantity = document.querySelector("#quantity");
const birthDate = document.querySelector("#birthdate");
const checkboxes = document.querySelectorAll("[tabindex]");
const requiredCheckbox = document.querySelector("#checkbox1");
const radios = Array.from(
  document.querySelectorAll("#location .checkbox-input")
);
const submitBtn = document.querySelector(".btn-submit");

// --- EVENT LISTENER ---
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", closeModal);
names.forEach((input) => input.addEventListener("keyup", checkName));
email.addEventListener("keyup", checkEmail);
quantity.addEventListener("keyup", checkQuantity);
birthDate.addEventListener("keyup", checkBirthDate);
checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("keyup", toggleCheck)
);
requiredCheckbox.addEventListener("click", checkRequired);
radios.forEach((radio) => radio.addEventListener("click", checkRadio));
submitBtn.addEventListener("click", handleSubmit);

// --- FUNCTIONS ---
function editNav() {
  const nav = document.getElementById("myTopnav");
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
  }
}

// modal form
function launchModal() {
  modalbg.style.display = "block";
}
function closeModal() {
  modalbg.style.display = "none";
}

function checkName() {
  const formData = this.parentNode;
  const inputLenght = this.value.length;
  const minLength = this.getAttribute("minlength");

  if (inputLenght >= minLength) {
    formData.setAttribute("data-error-visible", "false");
  } else if (inputLenght < minLength) {
    formData.setAttribute("data-error-visible", "true");
  }
}

function checkWithRegex(element, regex) {
  const formData = element.parentNode;
  const input = element.value;
  const isValid = regex.test(input);

  if (isValid) {
    formData.setAttribute("data-error-visible", "false");
  } else {
    formData.setAttribute("data-error-visible", "true");
  }
}

function checkEmail() {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  checkWithRegex(this, regex);
}

function checkQuantity() {
  const regex = /^(\d?[0-9]|[1-9]0)$/;
  checkWithRegex(this, regex);
}

function checkBirthDate() {
  const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
  checkWithRegex(this, regex);
}

// accessibility improvment
function toggleCheck(e) {
  const input = this.parentNode.attributes[1].nodeValue;
  const element = document.querySelector(`#${input}`);

  // on "Enter" key pressed
  if (e.keyCode === 13) {
    element.click();
  }
}

function checkRequired() {
  const formData = this.parentNode;

  if (this.checked) {
    formData.setAttribute("data-error-visible", "false");
  } else {
    formData.setAttribute("data-error-visible", "true");
  }
}

function checkRadio() {
  const isRadioChecked = radios.some((radio) => radio.checked);
  const radioContainer = document.querySelector("#location");

  if (isRadioChecked) {
    radioContainer.setAttribute("data-error-visible", "false");
  } else {
    radioContainer.setAttribute("data-error-visible", "true");
  }

  return isRadioChecked;
}

function handleSubmit() {
  const errors = document.querySelectorAll("[data-error-visible]");
  const isRadioChecked = checkRadio();

  if (!errors || isRadioChecked) {
    return true;
  } else {
    return false;
  }
}
