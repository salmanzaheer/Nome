import Timer from './timer.js';

const titleDisplay = document.querySelector('.title');
const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.measures-subtract');
const addBeat = document.querySelector('.measures-add');
const measureCount = document.querySelector('.measures-count');

const click1 = new Audio('MetronomeUp.wav');
const click2 = new Audio('Metronome.wav');


let bpm = 120;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;

decreaseTempoBtn.addEventListener('click', () => {
    if(bpm <= 20) {return}
    bpm--;
    updateMetronome();
});

increaseTempoBtn.addEventListener('click', () => {
    if(bpm >= 220) {return}
    bpm++;
    updateMetronome();
});

tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    updateMetronome();
});

subtractBeats.addEventListener('click', () => {
    if(beatsPerMeasure <= 2) {return}
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});
addBeat.addEventListener('click', () => {
    if(beatsPerMeasure >= 12) {return}
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

startStopBtn.addEventListener('click', () => {
    count = 0;
    if(!isRunning){
        metronome.start();
        titleDisplay.setAttribute('font-weight', 'bold');
        isRunning = true;
        startStopBtn.textContent = "STOP";
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = "START";
    }

});

function updateMetronome()
{
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;

    metronome.timeInterval = 60000/bpm;

    if(bpm >= 10 && bpm <= 60) {
        tempoText.textContent = 'Oh this that kinda party';
    }
    if(bpm >= 61 && bpm <= 89) {
        tempoText.textContent = 'Yeahh some deep house shit';
    }
    if(bpm >= 90 && bpm <= 115) {
        tempoText.textContent = 'Man yous just plain boring, aint ya?';
    }
    if(bpm >= 116 && bpm <= 130) {
        tempoText.textContent = 'Nobody likes EDM anymore';
    }
    if(bpm >= 131 && bpm <= 154) {
        tempoText.textContent = 'Pack it up, Skrillex.';
    }
    if(bpm >= 155 && bpm <= 200) {
        tempoText.textContent = 'Did the blow just kick in?';
    }
    if(bpm >= 201 && bpm <= 220) {
        tempoText.textContent = "you're fuckin' crazy!";
    }
}

function playClick() {
    console.log(count);
    if(count === beatsPerMeasure){
        count = 0;
    }
    if(count === 0) {
        click1.play();
        click1.currentTime = 0;
    } else {
        click2.play();
        click2.currentTime = 0;
    }
    count++;

}

//timer instance
const metronome = new Timer(playClick, 60000/bpm, { immediate: true});

