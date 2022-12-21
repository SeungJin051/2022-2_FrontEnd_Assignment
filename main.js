window.onload = function () {
  $(".main-team").click(function () {
    $(".modal").fadeIn();
  });

  $(".modal-close").click(function () {
    $(".modal").fadeOut();
  });
};
