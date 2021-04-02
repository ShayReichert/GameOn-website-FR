// --- DOM Elements ---
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const names = document.querySelectorAll(".name-input");
const email = document.querySelector("#email");
const birthDate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const checkboxes = document.querySelectorAll("[tabindex]");
const requiredCheckbox = document.querySelector("#checkbox1");
const radios = Array.from(document.querySelectorAll("#location .checkbox-input"));
const submitBtn = document.querySelector(".btn-submit");

// --- EVENT LISTENER ---
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", closeModal);
names.forEach((input) => input.addEventListener("keyup", checkName));
email.addEventListener("keyup", checkEmail);
quantity.addEventListener("keyup", checkQuantity);
birthDate.addEventListener("keyup", checkBirthDate);
checkboxes.forEach((checkbox) => checkbox.addEventListener("keyup", toggleCheck));
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

// errors checker
function checkWithRegex(element, regex) {
  const formData = element.parentNode;
  const input = element.value;
  const isValid = regex.test(input);

  if (isValid) {
    formData.setAttribute("data-error-visible", "false");
    formData.setAttribute("data-validate", "yes");
  } else {
    formData.setAttribute("data-error-visible", "true");
    formData.setAttribute("data-validate", "no");
  }
}

function checkName() {
  const regex = /\w\w+/;
  checkWithRegex(this, regex);
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

  // check if the birthdate's year is not the current year
  const formData = this.parentNode;
  const currentYear = new Date().getFullYear();
  const inputYear = new Date(this.value).getFullYear();
  const isValidYear = inputYear < currentYear;

  if (isValidYear) {
    formData.setAttribute("data-error-visible", "false");
    formData.setAttribute("data-validate", "yes");
  } else {
    formData.setAttribute("data-error-visible", "true");
    formData.setAttribute("data-validate", "no");
  }
}

function checkRequired() {
  const formData = this.parentNode;

  if (this.checked) {
    formData.setAttribute("data-error-visible", "false");
    formData.setAttribute("data-validate", "yes");
  } else {
    formData.setAttribute("data-error-visible", "true");
    formData.setAttribute("data-validate", "no");
  }
}

function checkRadio() {
  const isRadioChecked = radios.some((radio) => radio.checked);
  const radioContainer = document.querySelector("#location");

  if (isRadioChecked) {
    radioContainer.setAttribute("data-error-visible", "false");
    radioContainer.setAttribute("data-validate", "yes");
  } else {
    radioContainer.setAttribute("data-error-visible", "true");
    radioContainer.setAttribute("data-validate", "no");
  }

  return isRadioChecked;
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

function handleSubmit(e) {
  const invalides = document.querySelectorAll("[data-validate='no']").length;
  const isRadioChecked = checkRadio();
  const inputs = document.querySelectorAll("form input");
  const modalContent = document.querySelector(".modal-body");

  e.preventDefault();

  //check if a input is empty
  inputs.forEach((input) => {
    input.value ? "" : input.parentNode.setAttribute("data-error-visible", "true");
  });

  if (!invalides && isRadioChecked) {
    modalContent.innerHTML = `
        <div class="content">
          <div class="success-body">
            <h1>Merci d'avoir soumis votre inscription !</h1>
          </div>
        </div>
        <button class="btn-close button">Fermer</button>
  `;

    handleSuccess();
  } else {
    return false;
  }
}

function handleSuccess() {
  const buttonClose = document.querySelector(".btn-close");
  buttonClose.addEventListener("click", () => (modalbg.style.display = "none"));
}
