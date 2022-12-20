//전역변수 영역
let draggingCard = null; //드래깅 중인 카드 객체로 설정
let dragOverBox = null; //드래깅 객체가 올라간 객체 등록
let dragOverCard = null;
let quizNo = Math.floor(Math.random() * 14);

//=====================================================================
//words 배열에 있는 단어들로 카드를 생성하는 HTML문장을 완성하는 함수
function getCardsFromWords(words) {
  let cardsHTML = "";
  let aCardHTML = "";
  let count = 1;

  for (let word of words) {
    aCardHTML = `<div draggable="true" class="card" originalOrder="${count++}">${word}</div>`;
    cardsHTML += aCardHTML;
  }
  //box 안에 위에서 생성한 카드들을 추가한다.
  document.querySelector(".box").innerHTML = cardsHTML;
}

function selectQuiz() {
  const shuffleArray = (array) => {
    for (let loop = array.length - 1; loop >= 0; loop--) {
      let randomNum = Math.floor(Math.random() * (loop + 1));
      let randomArrayItem = array[randomNum];

      array[randomNum] = array[loop];
      array[loop] = randomArrayItem;
    }
  };
  if (quizNo >= quizSet.quiz.length) {
    console.log("퀴즈 번호가 범위를 벗어났습니다.");
  }
  let words = quizSet.quiz[quizNo].eng.split(" ");
  let korWords = quizSet.quiz[quizNo].kor;
  document.querySelector(".kor-text").innerHTML = korWords;

  let resultText = quizSet.quiz[quizNo].eng;
  document.querySelector(".result-text").innerHTML = resultText;

  shuffleArray(words);
  getCardsFromWords(words);
}
//=====================================================================
//=====================================================================
function compareAnswer() {
  cardContents = document.querySelectorAll(".card");
  let myAnswer = "";
  for (let item of cardContents) {
    myAnswer += item.innerText;
  }
  console.log(myAnswer);

  let answerContents = quizSet.quiz[quizNo].eng.split(" ");
  let answer = "";
  console.log("eng " + answerContents);

  for (let item of answerContents) {
    answer += item;
  }
  console.log(answer);

  if (myAnswer == answer) {
    alert("정답입니다.");
    location.reload();
    if (localStorage.counter == undefined) {
      localStorage.setItem("counter", 0);
    }
    localStorage.counter++;
  } else {
    alert("다시 생각해보세요.");
  }
}
//=====================================================================
//=====================================================================

//=====================================================================
//class card 객체 이벤트 핸들러 영역
function onDragStartCard() {
  draggingCard = this;
  this.classList.add("draggingCard");
  draggingCard.classList.add("vibration");
}

function onDragEndCard(event) {
  event.preventDefault(); //웹 브라우저의 default처리를 하지 못하도록 한다.
  this.classList.remove("draggingCard");
  draggingCard = null;
  this.classList.remove("vibration");

  //dragOverBox가 null이 아니면 처리할 내용
  if (dragOverBox) {
    dragOverBox.classList.remove("overBox");
    dragOverBox = null;
  }
  //dragOverCard가 null이 아니면 처리할 내용
  if (dragOverCard) {
    dragOverCard.classList.remove("overCard");
    dragOverCard = null;
  }
}

function onDragOverCard(event) {
  event.preventDefault();
  event.stopPropagation(); //dragover 이벤트가 부모 노드로 전파되는 것을 차단
  dragOVerCard = this;
}

function onDragLeaveCard(event) {
  event.preventDefault();
  dragOverCard = null;
  this.classList.remove("overCard");
}

function onDropCard() {
  this.parentNode.insertBefore(draggingCard, this);
  draggingCard.classList.remove("vibration");
}
//=====================================================================
//class box 객체 이벤트 핸들러 영역
function onDragOverBox(event) {
  event.preventDefault();
  dragOverBox = this;
  this.classList.add("overBox");
}

function onDragLeaveBox(event) {
  event.preventDefault();
  dragOverBox = null;
  this.classList.remove("overBox");
}

function onDropBox() {
  dragOverBox.appendChild(draggingCard);
}

//=====================================================================
window.onload = function () {
  //카운트 횟수 출력
  let nowCount = localStorage.getItem("counter");
  document.getElementById("myCount").innerHTML = `정답 개수 : ${nowCount}`;
  //단어 카드들을 먼저 생성한다.
  //getCardsFromWords(quizWords);
  selectQuiz();
  //card 객체 이벤트 핸들러 연결하기
  let cardArray = document.querySelectorAll(".card");
  let boxArray = document.querySelectorAll(".drop-container");

  for (let card of cardArray) {
    card.addEventListener("dragstart", onDragStartCard);
    card.addEventListener("dragend", onDragEndCard);
    card.addEventListener("dragover", onDragOverCard);
    card.addEventListener("dragleave", onDragLeaveCard);
    card.addEventListener("drop", onDropCard);
  }

  for (let box of boxArray) {
    box.addEventListener("dragover", onDragOverBox);
    box.addEventListener("dragleave", onDragLeaveBox);
    box.addEventListener("drop", onDropBox);
  }

  $(".show-result-text").click(function () {
    // $(".show-result-text").toggle();
    // $(".result-text").toggle();
    if ($(".show-result-text").css("display") == "block") {
      $(".show-result-text").toggle();
      $(".result-text").fadeToggle();
    }
  });

  $(".result-text").click(function () {
    // $(".show-result-text").toggle();
    // $(".result-text").toggle();
    if ($(".result-text").css("display") == "block") {
      $(".show-result-text").fadeToggle();
      $(".result-text").toggle();
    }
  });

  $(".modal-btn").click(function () {
    $(".modal").fadeIn();
  });

  $(".modal-content").click(function () {
    $(".modal").fadeOut();
  });
};
//=====================================================================
