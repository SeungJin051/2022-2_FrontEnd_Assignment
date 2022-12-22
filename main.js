window.onload = function () {
  let mainBtn = document.querySelector(".main-btn");

  function gamePage() {
    window.location.href =
      "https://seungjin051.github.io/2022-2_FrontEnd_Assignment/game.html";
  }

  // function removeMain() {
  //   $(main).fadeOut(400);
  //   setTimeout(gamePage, 450);
  // }

  $(mainBtn).click(function removeMain() {
    let main = document.querySelector(".main-container");
    $(main).fadeOut(400);
    setTimeout(gamePage, 450);
  });

  $(".main-team").click(function () {
    $(".modal").fadeIn();
  });

  $(".modal-close").click(function () {
    $(".modal").fadeOut();
  });
};
