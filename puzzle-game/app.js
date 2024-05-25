
const scriptAttribute = document.createElement("script");
scriptAttribute.src = "https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js";
document.head.appendChild(scriptAttribute);

const caseStyle = document.createElement("style");
caseStyle.innerHTML = `
body{
    position: relative; 
    margin: 0;
    padding: 0;
}

.overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
    opacity: 0.7;
    background-color: #a7a7a7;
}

.container{
    position: fixed;
    width: 78%;
    max-width: 800px;
    right: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 998;
}

.firstContainer, .secondContainer{
    height: 350px;
    width: 100%;
    display: flex;
}

.firstContainer{
    margin-top: 2px;
    align-items: flex-end;
}

.secondContainer{
    align-items: flex-start;
}

.box{
    width: 33.33%;
    height: auto;
    max-width: 350px;
    max-height: 350px;
    position:relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none; 
    user-select: none; 
    cursor: pointer;
}

h1{
    position: absolute;
    top: 1000px;
    color: rgb(72, 42, 42);
}

img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
}

.popup-close{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none; 
    user-select: none; 
    cursor: pointer;
}

.spin-animation{
    animation-name: spin ;
    animation-duration: 2s;
    animation-direction: forwards;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(720deg); }
}
`;
document.head.append(caseStyle);

const html = document.createElement("div");
html.innerHTML = `
<div class="overlay">  </div>
          <div class="container">
            <span class="popup-close" id="closeButton">&#x2716;</span>
          <div class="firstContainer"> 
          <div class="box" id="box1"> <img src="https://r.resimlink.com/ulavZCPW2LhE.jpg" alt=""/> </div>
          <div class="box" id="box2"> <img src="https://r.resimlink.com/g3hUV_ruxQ.jpg" alt=""/> </div>
          <div class="box" id="box3"> <img src="https://r.resimlink.com/XAb-D.jpg" alt=""/> </div>
        </div>
        <div class="secondContainer">
          <div class="box" id="box4"> <img src="https://r.resimlink.com/xBKX5p-DTQ.jpg" alt=""/> </div>
          <div class="box" id="box5"> <img src="https://r.resimlink.com/q7pMeCD6KQ.jpg" alt=""/> </div>
          <div class="box" id="box6"> <img src="https://r.resimlink.com/jWvP1or6-SQ.jpg" alt=""/> </div>
        </div>
`;
document.body.append(html);

var overlay = document.querySelector(".overlay");
var container = document.querySelector(".container");
var firstContainer = document.querySelector(".firstContainer");
var secondContainer = document.querySelector(".secondContainer");
const box1= document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");
const box5 = document.querySelector("#box5");
const box6 = document.querySelector("#box6");
var closeButton = document.getElementById("closeButton");
var overlayColor = getComputedStyle(overlay).backgroundColor;

const boxArray = [box1,box2,box3,box4,box5,box6];
var positionArray = [];
var rotationDegrees= [];

var popupControl = true;
closeButton.addEventListener(`click`, finishFunction);

function finishFunction(){
  if(popupControl){
    container.remove();
    popupControl = false;
    overlay.remove();
  }
}

scriptAttribute.onload = function(){
const jsConfetti = new JSConfetti();


window.addEventListener(`scroll`, function(){
  overlay.style.height = document.documentElement.scrollHeight + `px`;
});

window.addEventListener('resize', resizeHeight);
window.onload = resizeHeight();

function resizeHeight() {
  boxArray.forEach(box => {
    var computedStyle = getComputedStyle(box);
    var widthValue = parseFloat(computedStyle.width);
    box.style.height = widthValue + `px`; 
  });

  var boxWidth = parseFloat((getComputedStyle(box1).width));
  firstContainer.style.height = boxWidth + `px`;
  secondContainer.style.height = boxWidth + `px`;
}

let i = 0;
boxArray.forEach(box => {  
  positionArray[i] = Math.floor(Math.random() * 4);
  if(positionArray[i] === 0){
    positionArray[i]++;
  }

  var randomRotation = positionArray[i]*90;
    i++;
  box.style.transform = `rotate(${randomRotation}deg)`;
});

boxArray.forEach((box, index) => {
  box.addEventListener("click", function() {
    clickEvent(box, index);
  });
});

function gifMethod(){
  console.log("Kazandınız!");
}

function clickEvent(box,index){
    positionArray[index]++;
    box.classList.remove("spin-animation");

    for(let i = 0 ; i<positionArray[index] ; i++){
        let rotationDegree = 90*positionArray[index]
        box.style.transform = `rotate(${rotationDegree}deg)`;
        box.style.transition = ` background-color 1s, transform 1s`
    }
    activateSpinAnimation(index);
}

function activateSpinAnimation(index) {
  const rotationDegrees = boxArray.map((box) => parseInt(box.style.transform.slice(7, -4)) % 360);

  if (rotationDegrees.every((degree) => degree === 0)) {
    boxArray.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add("spin-animation");}, 1012);
    });
    setTimeout(() => {
      confettiFY();}, 1100);
      
      boxArray.forEach(box =>{
        box.style.pointerEvents = `none`;
      })
      
      gifMethod();
  }
  jsConfetti.remove;
}

function confettiFY(){
  jsConfetti.addConfetti({
    emojis: ['⚡️', '💫','💥'],
    confettiRadius: 5,
    confettiNumber: 650,
    emojiSize: 12
  });
}
}
