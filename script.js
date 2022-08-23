const minutesDisplay = document.querySelector('#minutes');
const secondsDisplay = document.querySelector('#seconds');
const buttonIncrementMinutes = document.querySelector('.increment_minutes');
const buttonDecrementMinutes = document.querySelector('.decrement_minutes');
const buttonPlay = document.querySelector('.play');
const buttonStop = document.querySelector('.stop');
const buttonToggleMode = document.getElementById("toggle_mode");
const buttonFloresta = document.querySelector('#floresta');
const buttonChuva = document.querySelector('#chuva');
const buttonCafeteria = document.querySelector('#cafeteria');
const buttonLareira = document.querySelector('#lareira');

const buttonPressAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")

const AudioFloresta = new Audio("../audios/Floresta.wav")
const AudioChuva = new Audio("../audios/Chuva.wav")
const AudioCafeteria = new Audio("../audios/Cafeteria.wav")
const AudioLareira = new Audio("../audios/Lareira.wav")

const soundPad = document.querySelector('sound_pad');

let timerTimeOut;
let OriginalMinutes = Number(minutesDisplay.textContent);
function buttonDecrementState(){
  Number(minutesDisplay.textContent) <= 0 ? buttonDecrementMinutes.disabled = true : buttonDecrementMinutes.disabled = false
}

function buttonPlayState(state){
  buttonPlay.disabled = !state;
  buttonStop.disabled = state;
}

function buttonStopState(state){
  buttonStop.disabled = !state;
  buttonPlay.disabled = state;
}

function formatDisplay(Number){
  return String(Number).padStart(2,"0");
}

function updateTimerDisplay(minutes, seconds){
  minutesDisplay.textContent = formatDisplay(minutes);
  secondsDisplay.textContent = formatDisplay(seconds);
}

function countdown(){
  timerTimeOut = setTimeout(function(){
    let newMinutes = Number(minutesDisplay.textContent);
    let newSeconds = Number(secondsDisplay.textContent);
    let isFinished = newMinutes <= 0 && newSeconds <= 0;
    if(isFinished){
      kitchenTimer.play();
      updateTimerDisplay(OriginalMinutes, 0);
      buttonStopState(false);
      buttonPlayState(true);
      return
    }
    
    if(newSeconds <= 0){
      newSeconds = 60;
      newMinutes--;
    }

    newSeconds--;
    updateTimerDisplay(newMinutes,newSeconds);
    countdown();
    
  }, 5);
}

buttonFloresta.addEventListener('click', function(){
  buttonFloresta.classList.toggle("active");
  AudioFloresta.loop = true;
  AudioFloresta.paused ? AudioFloresta.play() : AudioFloresta.pause()
});

buttonChuva.addEventListener('click', function(){
  buttonChuva.classList.toggle("active");
  AudioChuva.loop = true;
  AudioChuva.paused ? AudioChuva.play() : AudioChuva.pause()
});

buttonCafeteria.addEventListener('click', function(){
  buttonCafeteria.classList.toggle("active");
  AudioCafeteria.loop = true;
  AudioCafeteria.paused ? AudioCafeteria.play() : AudioCafeteria.pause()
});

buttonLareira.addEventListener('click', function(){
  buttonLareira.classList.toggle("active");
  AudioLareira.loop = true;
  AudioLareira.paused ? AudioLareira.play() : AudioLareira.pause()
});

//Darkmode change
buttonToggleMode.addEventListener("change", function(){
  document.body.classList.toggle("dark");
});

//Event para botão de Play
buttonPlay.addEventListener('click', function(){
  buttonPressAudio.play();
  buttonPlayState(false);
  countdown();
});

//Event para botão de Stop
buttonStop.addEventListener('click', function(){
  buttonPressAudio.play();
  buttonStopState(false);
  clearTimeout(timerTimeOut);
  updateTimerDisplay(OriginalMinutes, 0);
});

//Event para Incrementar os minutos
buttonIncrementMinutes.addEventListener('click', function(){
  buttonPressAudio.play();
  let minutes = Number(minutesDisplay.textContent);
  let seconds = secondsDisplay.textContent;

  newMinutes = minutes + 5;
  OriginalMinutes = OriginalMinutes + 5;
  updateTimerDisplay(newMinutes, seconds)
  buttonDecrementState();
});

//Event para Decrementar os minutos
buttonDecrementMinutes.addEventListener('click', function(){
  buttonPressAudio.play();
  let minutes = Number(minutesDisplay.textContent);
  let seconds = secondsDisplay.textContent;
  if(Number(minutes) !== 0){
     newMinutes = minutes - 5;
     OriginalMinutes = OriginalMinutes - 5;
     newMinutes >= 0 ? updateTimerDisplay(newMinutes, seconds) : updateTimerDisplay(0, seconds)
  }
 buttonDecrementState();
});