import { Character } from "./Character.js"
import { positions } from "./positions.js"

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')


const order = ['hongo', 'estrella', 'hongo', 'flor', 'hoja']
const btStart = document.querySelector('.bt-start')
const btStop = document.querySelector('.bt-stop')

btStart.addEventListener('click', start)
//btStop.addEventListener('click', stop)
let pjsTop = []
function start() {
    pjsTop.forEach(pj => pj.setVelX(14))
}

function createPjs() {
    for (let i = 0; i < 5; i++) {
        const imhObj = new Image();
        imhObj.src = '../assets/' + order[i] + 'top.png'
        pjsTop.push(new Character(i * 320, 0, imhObj.width, imhObj.height, -1, imhObj))
    }
}

function index(i){
    if(i === 0){
        return 4
    }else{
        return i-1
    }
}
function rePosition() {
    for (let i = 0; i < 5; i++) {0
      if(!pjsTop[i].inScene){
        pjsTop[i].x = pjsTop[index(i)].x + pjsTop[index(i)].width
      }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pjsTop.forEach(pj => pj.draw(ctx))
}

function update() {
    pjsTop.forEach(pj => pj.update())
    rePosition();
}


function gameloop() {
    draw()
    update()
    requestAnimationFrame(gameloop);
}

createPjs();
gameloop()