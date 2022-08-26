function checkClass() {
    let Class = document.getElementById(`player${id}-col${col}-case-${cell}`).getAttribute('class');
    if (Class === 'vibrate') {
        document.getElementById(`player${id}-col${col}-case-${cell}`).classList.remove('vibrate');
        document.getElementById(`player${id}-col${col}-case-${cell}`).classList.add('vibrate');
    }
    else {
        document.getElementById(`player${id}-col${col}-case-${cell}`).classList.add('vibrate');
    }
}

window.addEventListener('load', function () {
    var SeaSound = document.getElementById('SeaSound')
    SeaSound.volume = 0.1
    SeaSound.loop = "true"
}, false)

$("#btn-rules").on('click', function () {
    var rulesBookSound = document.getElementById('rulesBookSound');
    rulesBookSound.volume = 0.1;
    rulesBookSound.play();
    const oppacity = document.getElementById('oppacity');
    const image = document.getElementById('rulesImg');
    const imageBack = document.getElementById('returnToTheGame');
    oppacity.style.display = "block";
    image.style.display = "block";
    imageBack.style.display = "block";
    image.style.animation = 'fadeIn 3s';
    imageBack.style.animation = 'fadeIn 3s';
})

$("#returnToTheGame").on('click', function () {
    var closeRulesBook = document.getElementById('closeRulesBook');
    closeRulesBook.volume = 0.1;
    closeRulesBook.play();
    const oppacity = document.getElementById('oppacity');
    const image = document.getElementById('rulesImg');
    const imageBack = document.getElementById('returnToTheGame');
    oppacity.style.display = "none";
    image.style.display = "none";
    imageBack.style.display = "none";
})

const bg = document.getElementById('backg');
const input = document.getElementById('bgInput');

const time = new Date().getHours() + 1;

// const time = 8;
if (time >= 8 && time < 13) {
    bg.setAttribute('src', 'assets/bg1.png');
    input.setAttribute('src', 'assets/input1.png');
}
else if (time >= 13 && time < 18) {
    bg.setAttribute('src', 'assets/bg2.png');
    input.setAttribute('src', 'assets/input2.png');
}
else {
    bg.setAttribute('src', 'assets/bg3.png');
    input.setAttribute('src', 'assets/input3.png');
}

$('#randomName').on('click', () => {
    const name = ["Jackson", "Bobby", "Molly", "Rascass", "Mortane", "Barbasse", "Edward", "Morgane", "Shanks"];
    document.getElementById('input').value = name[Math.round(Math.random() * 8)];
})



$('#redirectionSolo').on('click', () => {
    window.location.href = window.location.origin + `/soloGame.html?id=${document.getElementById('input').value}`
})
$('#redirectionMulti').on('click', () => {
    window.location.href = window.location.origin + `/multiGame.html?id=${document.getElementById('input').value}`
})

