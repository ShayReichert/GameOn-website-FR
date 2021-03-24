// --- DOM Elements ---
const btnSuccess = document.querySelectorAll(".close_modal");

// --- EVENT LISTENER ---
btnSuccess.forEach((btn) => btn.addEventListener("click", closeSuccessModal));

// --- FUNCTIONS ---
function closeSuccessModal() {
  document.location.href = "/starterOnly/";
}

// Automatic redirection after 5 seconds
window.onload = function () {
  setTimeout(function () {
    closeSuccessModal();
  }, 5000);
};
