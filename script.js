const msgEL = document.getElementById('msg'); 
const randomNum = getRandomNumber(); 
console.log('Number: ', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition;

//Start recognition and game
recognition.start();

//Generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

//Capture user's speech 
function onSpeak(e) {
    const msg = e.results[0][0].transcript; 
    writeMessage(msg);
    checkNumber(msg);
}

//Write what user speaks 
function writeMessage(msg) {
    msgEL.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
    `
}

//Check number == msg
function checkNumber(msg) {
    const num = +msg; 
    //check if it's a valid number 
    if (Number.isNaN(num))  {
        msgEL.innerHTML += '<div>That is not a valid number.</div>';
        return;
    } 

    //check if number is in range 
    if (num > 100 || num < 1) {
        msgEL.innerHTML += '<div>Number must be between 1 - 100.</div>'
    }

    //check if number == msg 
    if (num == randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number!<br><br>
            It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if (num > randomNum) {
        msgEL.innerHTML += '<div>GO LOWER</div>'; 
    } else {
        msgEL.innerHTML += '<div>GO HIGHER</div>';
    }
} 

//Speak result 
recognition.addEventListener('result', onSpeak); 

//End SR service 
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
})