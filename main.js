let mainBtn = document.querySelector(".main-btn");
let main = document.querySelector(".main-container");
let quizBox = document.querySelector(".quiz-container");
function removeMain() {
  $(main).fadeOut(400);
  setTimeout(gamePage, 450);
}

mainBtn.addEventListener("click", removeMain);

function gamePage() {
  window.location.href = "game.html";
}
