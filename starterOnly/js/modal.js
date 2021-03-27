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

// Errors check
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
  const errors = document.querySelectorAll("[data-error-visible]");
  const isRadioChecked = checkRadio();
  const mainContent = document.querySelector("main");

  if (!errors || isRadioChecked) {
    setTimeout(function () {
      mainContent.innerHTML = `
 <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-headline">
            Marathon national<br />
            de jeux vidéos
          </h1>
          <p class="hero-text">
            Vous aimez jouer ? Notre prochain évènement gaming est ouvert aux réservations... Places
            limitées !
          </p>
          <button class="btn-signup modal-btn">je m'inscris</button>
        </div>
        <div class="hero-img">
          <img src="img/bg_img.jpg" alt="img" />
        </div>
        <button class="btn-signup modal-btn">je m'inscris</button>
      </div>

      <div class="bground">
        <div class="content">
          <span class="close"></span>
          <div class="modal-body">
            <div class="content">
              <div class="success-body">
                <h1>Merci d'avoir soumis votre inscription !</h1>
              </div>
            </div>
            <button class="btn-close button">Fermer</button>
          </div>
        </div>
      </div>
  `;
    }, 1000);

    handleSuccess();
  } else {
    return false;
  }
}

function handleSuccess() {
  const buttonClose = document.querySelector(".btn-close");
  buttonClose.addEventListener("click", () => (modalbg.style.display = "none"));
}
