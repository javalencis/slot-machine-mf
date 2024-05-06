import { CharacterBot } from "./CharacterBot.js"
import { CharacterMid } from "./CharacterMid.js"
import { CharacterTop } from "./CharacterTop.js"
import { msn } from "./msnCupon.js"


const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')


const order = ['donald', 'mickey', 'minnie', 'pluto']
const orderMid = ['pluto', 'donald', 'mickey', 'minnie']
const btStart = document.querySelector('.bt-start')
const btStop = document.querySelector('.bt-stop')
const contModal = document.querySelector('.container-modal')
const contentMsn = document.querySelector('.content-msn')
const contentCupon = document.querySelector('.content-cupon')
const bgCanvas = new Image()
bgCanvas.src = '../assets/bgcontainer.png'


let pairedPjs = []

btStart.addEventListener('click', start)
btStop.addEventListener('click', stop)
let pjsTop = []
let pjsMid = []
let pjsBot = []
let attempts = 3

const stateGames = {
    start: true,
    play: false,
    stopTop: false,
    stopMid: false,
    stopBot: false,
    end: false
}

function start() {
    pjsTop.forEach(pj => pj.setVelX(8))
    pjsMid.forEach(pj => pj.setVelX(8))
    pjsBot.forEach(pj => pj.setVelX(7))
    stateGames.start = false;
    stateGames.play = true;
    btStop.style.display = 'block'
    btStart.style.display = 'none'
}

function stop() {
    if (attempts === 0) return;
    switch (attempts) {
        case 1:
            pjsBot.forEach(pj => pj.stop())
            stateGames.stopBot = true;
            attempts--
            break;
        case 2:
            pjsMid.forEach(pj => pj.stop())
            stateGames.stopMid = true;
            attempts--
            break;
        case 3:
            pjsTop.forEach(pj => pj.stop())
            stateGames.stopTop = true;
            attempts--
            break;
    }
}


function createPjs() {
    for (let i = 0; i < 4; i++) {
        const imgObj = new Image();
        imgObj.src = '../assets/' + order[i] + 'top.png'
        pjsTop[i] = (new CharacterTop(i * 320, 0, imgObj.width, imgObj.height, -1, imgObj))
    }
    for (let i = 0; i < 4; i++) {
        const imgObj = new Image();
        imgObj.src = '../assets/' + orderMid[i] + 'mid.png'
        pjsMid[i] = (new CharacterMid((i * 320) - 320, 107, imgObj.width, imgObj.height, 1, imgObj))
    }
    for (let i = 0; i < 4; i++) {
        const imgObj = new Image();
        imgObj.src = '../assets/' + order[i] + 'bot.png'
        pjsBot[i] = (new CharacterBot(i * 320, 214, imgObj.width, imgObj.height, -1, imgObj))
    }
}

function indexLeft(i) {
    if (i === 0) {
        return 3
    } else {
        return i - 1
    }
}
function indexRight(i) {
    if (i === 3) {
        return 0
    } else {
        return i + 1
    }
}

function rePosition() {
    for (let i = 0; i < 4; i++) {
        if (!pjsTop[i].inScene) {
            pjsTop[i].x = pjsTop[indexLeft(i)].x + pjsTop[indexLeft(i)].width
        }
        if (!pjsMid[i].inScene) {
            pjsMid[i].x = pjsMid[indexRight(i)].x - pjsMid[indexRight(i)].width
        }
        if (!pjsBot[i].inScene) {
            pjsBot[i].x = pjsBot[indexLeft(i)].x + pjsBot[indexLeft(i)].width
        }
    }
}

function paired(index, list) {
    if (index === 4) {
        index = 0
    }
    if (index === -1) {
        index = 3
    }
    console.log('1');
    pairedPjs.push(list[index])


}

function checkPairing(listPjs, listOrder) {
    listPjs.map((pj, index) => (
        (pj.x >= -2 && pj.x <= 2) && (
            paired(index + 1, listOrder)
        )))
}

function isEqual() {
    if (pairedPjs.length !== 3) {
        return false;
    }

    if (pairedPjs[0] === pairedPjs[1] && pairedPjs[1] === pairedPjs[2]) {
        return true;
    } else {
        return false;
    }
}

function manageStatesGame() {

    if (stateGames.start) {
        createPjs();
    }

    rePosition();
    if (stateGames.stopTop) {
        if (CharacterTop.stopMoveTop) {
            checkPairing(pjsTop, order)
            stateGames.stopTop = false;

        }
    }
    if (stateGames.stopMid) {
        if (CharacterMid.stopMoveMid) {
            checkPairing(pjsMid, orderMid)
            stateGames.stopMid = false;


        }
    }
    if (stateGames.stopBot) {
        if (CharacterBot.stopMoveBot) {
            checkPairing(pjsBot, order)
            stateGames.stopBot = false;
            setTimeout(() => {

                stateGames.end = true;
            }, 1500);
        }
    }

    if (stateGames.end) {
        contModal.style.display = 'flex'
    
        if (isEqual()) {
            if (pairedPjs[0] === 'mickey') {
                contentMsn.innerHTML = msn.mickey.mensaje
                contentCupon.innerHTML = msn.mickey.cupon
            } else if (pairedPjs[0] === 'minnie') {
                contentMsn.innerHTML = msn.minnie.mensaje
                contentCupon.innerHTML = msn.minnie.cupon
            } else if (pairedPjs[0] === 'donald') {
                contentMsn.innerHTML = msn.donald.mensaje
                contentCupon.innerHTML = msn.donald.cupon
            } else {
                contentMsn.innerHTML = msn.pluto.mensaje
                contentCupon.style.display='none'
            }
        } else {
            contentMsn.innerHTML = msn.nothing.mensaje
            contentCupon.style.display='none'
        }
    }
}

function drawBg() {
    ctx.drawImage(bgCanvas, 0, 0, canvas.width, canvas.height);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pjsTop.forEach(pj => pj.draw(ctx))
    pjsMid.forEach(pj => pj.draw(ctx))
    pjsBot.forEach(pj => pj.draw(ctx))
    drawBg()
}

function update() {
    manageStatesGame()
    pjsTop.forEach(pj => pj.update())
    pjsMid.forEach(pj => pj.update())
    pjsBot.forEach(pj => pj.update())
}


function gameloop() {
    draw()
    update()
    requestAnimationFrame(gameloop);
}

gameloop()