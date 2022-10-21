import sendData from './option.js'





const timer = document.querySelector('.timer')
const score = document.querySelector('.score')
const accuracy = document.querySelector('.accuracy')


const visibleWord = document.querySelector('.visible-word')
const correctWord = document.querySelector('.correct-word')
const speechWord = document.querySelector('.speech-word')
const microphone = document.querySelector('.microphone')
const info = document.querySelector(".info");
const dictionary = document.querySelector(".words");
const beating = document.querySelector('.beating')
const juice = document.querySelector('.progress-juice')

// BTNS
const next = document.querySelector('.btns .next')
const see = document.querySelector('.btns .see')

const retry = document.querySelector('.microphone .retry')
const micro = document.querySelector('.microphone .record')
// INFO

const data = sendData(localStorage.getItem('lang'),+localStorage.getItem('num'))

// console.log(data)


// VARIABLES
let play = 0
let sentances = +localStorage.getItem('num')-1
let i = 20
let bonus = i
let curr = 0
// INITIAL 
visibleWord.textContent = (data)[curr].front
correctWord.textContent = (data)[curr].back

see.addEventListener('click',()=>{
    // console.log('here')
   correctWord.style.opacity=1 
})
// NEXT SENTANCE BTNS
next.addEventListener('click', () => {
    micro.classList.add('active')
    retry.classList.remove('active')
    speechWord.textContent=''
    dictionary.textContent=''
    correctWord.style.opacity=0
    if (curr < sentances) {
        curr++
        visibleWord.textContent = (data)[curr].front
        correctWord.textContent = (data)[curr].back
        i = 15

    } else {
        // console.log('see results')
    }
    juice.style.width = `${(curr / sentances) * 100}%`
})



setInterval(() => {
    if (i > 0) {
        timer.textContent = i
        bonus = i
        i -= 1
    } else {
        bonus = 0
    }
    timer.textContent = i
}, 1000);

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if (SpeechRecognition) {
    // console.log("Your Browser supports speech Recognition");

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = localStorage.getItem('lang');




    //   // searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
    //   // searchFormInput.style.paddingRight = "50px";

    microphone.classList.add('start')
    //   console.log(micBtn.classList)
    //   // const micBtn = micBtn.firstElementChild;


    micro.classList.add('active')
    retry.classList.remove('active')
    microphone.addEventListener("click", micBtnClick);
    function micBtnClick() {
        micro.classList.add('active')
        retry.classList.remove('active')

        beating.style.display = 'none'
        if (microphone.classList.contains("start")) { // Start Voice Recognition
            recognition.start(); // First time you have to allow access to mic!
            beating.style.display = 'flex'
        }
        else {
            recognition.stop();
            beating.style.display = 'none'

        }
    }

    recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}

    function startSpeechRecognition() {
        // console.log('199')
        microphone.classList.remove("start");
        microphone.classList.add("recording");
        beating.style.display = 'flex'
        // searchFormInput.focus();
        // console.log("Voice activated, SPEAK");
    }

    recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
    function endSpeechRecognition() {
        microphone.classList.remove("recording");
        microphone.classList.add("start");

        beating.style.display = 'none'
        // beating.classList.remove("beating");
        // searchFormInput.focus();
        // console.log("Speech recognition service disconnected");
    }
    // RESULT
    recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
    function resultOfSpeechRecognition(event) {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;

        if (transcript.toLowerCase().trim() === "stop recording") {
            recognition.stop();
        }
        // else if(!searchFormInput.value) {
        //  myWord.textContent = transcript;
        // }
        else {
            if (transcript.toLowerCase().trim() === "go") {
                searchForm.submit();
            }
            else if (transcript.toLowerCase().trim() === "reset input") {
                speechWord.textContent = "";
            }
            else {
                speechWord.textContent = transcript;
            }
        }
        speechWord.textContent = transcript;
        

        let correct = []
        const rex = correctWord.textContent.toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
        const right = rex.split('.').join('').split(' ')
        const speech = speechWord.textContent.toLowerCase().split(' ')
        speech.forEach(t => {
            // console.log(right, t, right.includes(t))
            if (right.includes(t.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ''))) correct.push(t)

        })
        play++
        // console.log(play)
        // console.log(right, speech)
        dictionary.textContent =''
        right.forEach(el=>{
            let div = document.createElement('div')
            div.classList.add('word')
            div.textContent =el
            dictionary.appendChild(div)
        })
        speechWord.textContent=''
        speech.forEach(el=>{
            let div = document.createElement('div')
            if(correct.includes(el)){
                div.classList.add('right')
            }else{
                div.classList.add('wrong')
            }
            div.textContent =el
           speechWord.appendChild(div) 
        })
        // SOUND
        function sound(src) {
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
            this.play = function () {
                this.sound.play();
            }
            this.stop = function () {
                this.sound.pause();
            }
        }
        let audio = new sound('./assets/sound/correct.mp3');
        if ((correct.length / right.length) < 0.2) {
            audio = new sound('./assets/sound/failure.mp3');
            retry.classList.add('active')
            micro.classList.remove('active')
            score.textContent = (((correct.length / right.length) * 100)) + (+score.textContent);

        } else {
            retry.classList.add('active')
            micro.classList.remove('active')
            next.style.display = 'flex'
            audio = new sound('./assets/sound/correct.mp3');
            score.textContent = (((correct.length / right.length) * 100) + bonus) + (+score.textContent);
        }

        accuracy.textContent = `${(correct.length / right.length) * 100}%`
        accuracy.style.color = `${(correct.length / right.length) < 0.2 ? 'red' : 'green'}`

        audio.play();
        microphone.classList.remove("recording");
        microphone.classList.add("start");
        beating.style.display = 'none'
        correctWord.style.opacity=1
        recognition.stop();



    }

    //   info.textContent = 'Voice Commands: "stop recording", "reset input", "go"';

}
else {
    // console.log("Your Browser does not support speech Recognition");
    info.textContent = "Your Browser does not support Speech Recognition";
    info.style.display = 'flex'
}
