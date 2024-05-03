import { Character } from "./Character.js"
import { CharacterBot } from "./CharacterBot.js"
import { CharacterMid } from "./CharacterMid.js"
import { CharacterTop } from "./CharacterTop.js"
import { positions } from "./positions.js"

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')


const order = ['donald', 'mickey', 'minnie', 'pluto']
const orderMid = [ 'pluto', 'donald', 'mickey', 'minnie']
const btStart = document.querySelector('.bt-start')
const btStop = document.querySelector('.bt-stop')

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

}

function start() {
    pjsTop.forEach(pj => pj.setVelX(14))
    pjsMid.forEach(pj => pj.setVelX(18))
    pjsBot.forEach(pj => pj.setVelX(16))
    stateGames.start = false;
    stateGames.play = true;
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
        imgObj.src = 'https://www.tiendamic.com/gamification/little/game-mickey-and-friends/assets/' + order[i] + 'top.png'
        pjsTop[i] = (new CharacterTop(i * 320, 0, imgObj.width, imgObj.height, -1, imgObj))
    }
    for (let i = 0; i < 4; i++) {
        const imgObj = new Image();
        imgObj.src = 'https://www.tiendamic.com/gamification/little/game-mickey-and-friends/assets/' + orderMid[i] + 'mid.png'
        pjsMid[i] = (new CharacterMid((i * 320) - 320, 107, imgObj.width, imgObj.height, 1, imgObj))
    }
    for (let i = 0; i < 4; i++) {
        const imgObj = new Image();
        imgObj.src = 'https://www.tiendamic.com/gamification/little/game-mickey-and-friends/assets/' + order[i] + 'bot.png'
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
    if (index === 5) {
        index = 0
    }
    if (index === -1) {
        index = 4
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
        }
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pjsTop.forEach(pj => pj.draw(ctx))
    pjsMid.forEach(pj => pj.draw(ctx))
    pjsBot.forEach(pj => pj.draw(ctx))
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