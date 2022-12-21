let mainBtn = document.querySelector(".main-btn");
let main = document.querySelector(".main-container");
let quizBox = document.querySelector(".quiz-container");
window.onload = function () {
  function removeMain() {
    $(main).fadeOut(400);
    setTimeout(gamePage, 450);
  }

  mainBtn.addEventListener("click", removeMain);

  function gamePage() {
    window.location.href =
      "https://seungjin051.github.io/2022-2_FrontEnd_Assignment/game.html";
  }

  $(".main-team").click(function () {
    $(".modal").fadeIn();
  });

  $(".modal-close").click(function () {
    $(".modal").fadeOut();
  });
};
