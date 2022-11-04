const gameBoard = document.getElementById('game-board')

const LBLOCK0 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 7, y: 0 }]
const LBLOCK1 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 7, y: 2 }]
const LBLOCK2 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 5, y: 2 }]
const LBLOCK3 = [{ x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
const LBlocks = [LBLOCK0, LBLOCK1, LBLOCK2, LBLOCK3]

const SBLOCK0 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }, { x: 7, y: 0 }]
const SBLOCK1 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
const SBLOCK2 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }, { x: 7, y: 0 }]
const SBLOCK3 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
const SBlocks = [SBLOCK0, SBLOCK1, SBLOCK2, SBLOCK3]

const JBLOCK0 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const JBLOCK1 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 5, y: 0 }]
const JBLOCK2 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 7, y: 2 }]
const JBLOCK3 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 5, y: 2 }]
const JBlocks = [JBLOCK0, JBLOCK1, JBLOCK2, JBLOCK3]

const IBLOCK0 = [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const IBLOCK1 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }]
const IBLOCK2 = [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const IBLOCK3 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }]
const IBlocks = [IBLOCK0, IBLOCK1, IBLOCK2, IBLOCK3]

const ZBLOCK0 = [{ x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const ZBLOCK1 = [{ x: 5, y: 2 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }]
const ZBLOCK2 = [{ x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const ZBLOCK3 = [{ x: 5, y: 2 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }]
const ZBlocks = [ZBLOCK0, ZBLOCK1, ZBLOCK2, ZBLOCK3]

const OBLOCK0 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }]
const OBLOCK1 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }]
const OBLOCK2 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }]
const OBLOCK3 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }]
const OBlocks = [OBLOCK0, OBLOCK1, OBLOCK2, OBLOCK3]

const TBLOCK0 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }, { x: 7, y: 1 }]
const TBLOCK1 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 7, y: 1 }]
const TBLOCK2 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 6, y: 2 }]
const TBLOCK3 = [{ x: 5, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
const TBlocks = [TBLOCK0, TBLOCK1, TBLOCK2, TBLOCK3]

const BLOCKS = [LBlocks, SBlocks, JBlocks, IBlocks, ZBlocks, OBlocks, TBlocks]
const copy = [LBlocks, SBlocks, JBlocks, IBlocks, ZBlocks, OBlocks, TBlocks]
const names = ["LBlock", "SBlock", "JBlock", "IBlock", "ZBlock", "OBlock", "TBlock"]

const setBlocks = [{ x: 0, y: 17 }, { x: 1, y: 17 }, { x: 2, y: 17 }, { x: 3, y: 17 }, { x: 4, y: 17 },
                   { x: 5, y: 17 }, { x: 6, y: 17 }, { x: 7, y: 17 }, { x: 8, y: 17 }, { x: 9, y: 17 }]

let gameOver = false
let done = true

var score = 0

function update(BLOCKS, setBlocks) {
    let end = false

    for (let t = 0; t <= setBlocks.length - 1; t ++) {
        if ( // the block would hit another block or the ground
        (BLOCKS[a][b][0].y + 1 == setBlocks[t].y && BLOCKS[a][b][0].x == setBlocks[t].x) ||
        (BLOCKS[a][b][1].y + 1 == setBlocks[t].y && BLOCKS[a][b][1].x == setBlocks[t].x) ||
        (BLOCKS[a][b][2].y + 1 == setBlocks[t].y && BLOCKS[a][b][2].x == setBlocks[t].x) ||
        (BLOCKS[a][b][3].y + 1 == setBlocks[t].y && BLOCKS[a][b][3].x == setBlocks[t].x)
        ) {
        end = true // end the blocks updating
        }
    }

    if (end) // it now becomes one of the set blocks
    {
        setBlocks.push(BLOCKS[a][b][0])
        setBlocks.push(BLOCKS[a][b][1])
        setBlocks.push(BLOCKS[a][b][2])
        setBlocks.push(BLOCKS[a][b][3])

        if ( // it covers the area where the next block might spawn
        (BLOCKS[a][b][0].y == 0 && (BLOCKS[a][b][0].x == 4 || BLOCKS[a][b][0].x == 5 || BLOCKS[a][b][0].x == 6 || BLOCKS[a][b][0].x == 7)) ||
        (BLOCKS[a][b][1].y == 0 && (BLOCKS[a][b][1].x == 4 || BLOCKS[a][b][1].x == 5 || BLOCKS[a][b][1].x == 6 || BLOCKS[a][b][1].x == 7)) ||
        (BLOCKS[a][b][2].y == 0 && (BLOCKS[a][b][2].x == 4 || BLOCKS[a][b][2].x == 5 || BLOCKS[a][b][2].x == 6 || BLOCKS[a][b][2].x == 7)) ||
        (BLOCKS[a][b][3].y == 0 && (BLOCKS[a][b][3].x == 4 || BLOCKS[a][b][3].x == 5 || BLOCKS[a][b][3].x == 6 || BLOCKS[a][b][3].x == 7))
        ) {
        gameOver = true // end the game
        }

        BLOCKS = copy

        done = true // if not game over, end the updating
        score ++

    }
    else{ // move the block down by one every second roughly

        console.log("new y positions:")
        console.log(BLOCKS[a][b][0].y + 1) // for debugging
        console.log(BLOCKS[a][b][1].y + 1)
        console.log(BLOCKS[a][b][2].y + 1)
        console.log(BLOCKS[a][b][3].y + 1)
        
        for (let e = 0; e <= 3; e++){
        for (let f = 0; f <= 3; f++){

        BLOCKS[a][e][f].y = BLOCKS[a][e][f].y + 1

        }}
    }
    
}


const styles = ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7']

function draw(a, b) {

    //console.log(`Blocks but in draw: ${BLOCKS}`)    
    //console.log(`a but in draw: ${a}`)    
    //console.log(`b but in draw: ${b}`)
    let g = 0

    BLOCKS[a][b].forEach(segment => {
        const Block = Blok[g]
        Block.style.gridRowStart = segment.y
        Block.style.gridColumnStart = segment.x
        g ++
  })
}

let a
let b

let Blok = []

function spawn() {
  Blok = []
  a = Math.floor(Math.random() * 7)
  b = 0
  console.log(`spawning ${names[a]}`)

  BLOCKS[a][b].forEach(segment => {
    const Block = document.createElement('div')
    Block.style.gridRowStart = segment.y
    Block.style.gridColumnStart = segment.x

    Block.classList.add(styles[a])
    Blok.push(Block)
    
    gameBoard.appendChild(Block)
  })

  done = false
}

let lastRenderTime = 0
let speed = localStorage.difficulty

function main (currentTime) {
    
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')) {
        window.location.reload()
        }
        return
      }
    if (done) {
        spawn()}
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / speed) {return} // 1/speed

    lastRenderTime = currentTime

    //console.log(`setBlocks: ${setBlocks}`) // debug
    //console.log(`Blocks: ${BLOCKS}`)

    update(BLOCKS, setBlocks)

    //console.log(`a in main: ${a}`)
    draw(a, b)
    
}

window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':
        for (let t = 0; t <= setBlocks.length - 1; t ++) {
        if ( // the block would hit another block or the ground
        (BLOCKS[a][b+1][0].y + 1 == setBlocks[t].y && BLOCKS[a][b+1][0].x == setBlocks[t].x) ||
        (BLOCKS[a][b+1][1].y + 1 == setBlocks[t].y && BLOCKS[a][b+1][1].x == setBlocks[t].x) ||
        (BLOCKS[a][b+1][2].y + 1 == setBlocks[t].y && BLOCKS[a][b+1][2].x == setBlocks[t].x) ||
        (BLOCKS[a][b+1][3].y + 1 == setBlocks[t].y && BLOCKS[a][b+1][3].x == setBlocks[t].x)
        ){break}}
        b ++ // localStorage.b ++
        if (b == 4) {b = 0}
        break
      case 'ArrowDown':
        speed = 2 * localStorage.difficulty
        break
      case 'ArrowLeft':
        //b = localStorage.b
        for (let t = 0; t <= setBlocks.length - 1; t ++) {
        if ( // the block would hit another block or the ground
        (BLOCKS[a][b][0].y == setBlocks[t].y && BLOCKS[a][b][0].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][1].y == setBlocks[t].y && BLOCKS[a][b][1].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][2].y == setBlocks[t].y && BLOCKS[a][b][2].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][3].y == setBlocks[t].y && BLOCKS[a][b][3].x - 1 == setBlocks[t].x)
        ){break}}

        if(BLOCKS[a][b][0].x - 1 != 0 &&
           BLOCKS[a][b][1].x - 1 != 0 &&
           BLOCKS[a][b][2].x - 1 != 0 &&
           BLOCKS[a][b][3].x - 1 != 0){

            for (let e = 0; e <= 3; e++){
                for (let f = 0; f <= 3; f++){
        
                BLOCKS[a][e][f].x = BLOCKS[a][e][f].x - 1
        
                }}}
        break
      case 'ArrowRight':
        //b = localStorage.b
        for (let t = 0; t <= setBlocks.length - 1; t ++) {
        if ( // the block would hit another block or the ground
        (BLOCKS[a][b][0].y == setBlocks[t].y && BLOCKS[a][b][0].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][1].y == setBlocks[t].y && BLOCKS[a][b][1].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][2].y == setBlocks[t].y && BLOCKS[a][b][2].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][3].y == setBlocks[t].y && BLOCKS[a][b][3].x + 1 == setBlocks[t].x)
        ){break}}
        if(BLOCKS[a][b][0].x + 1 != 11 &&
           BLOCKS[a][b][1].x + 1 != 11 &&
           BLOCKS[a][b][2].x + 1 != 11 &&
           BLOCKS[a][b][3].x + 1 != 11){

            for (let e = 0; e <= 3; e++){
                for (let f = 0; f <= 3; f++){
        
                BLOCKS[a][e][f].x = BLOCKS[a][e][f].x + 1
        
                }}}
        break
      case 'w':
        for (let t = 0; t <= setBlocks.length - 1; t ++) {
            if ( // the block would hit another block or the ground
            (BLOCKS[a][b+1][0].y + 1 == setBlocks[t].y && BLOCKS[a][b+1][0].x == setBlocks[t].x) ||
            (BLOCKS[a][b+1][1].y + 1 == setBlocks[t].y && BLOCKS[a][b+1][1].x == setBlocks[t].x) ||
            (BLOCKS[a][b+1][2].y + 1 == setBlocks[t].y && BLOCKS[a][b+1][2].x == setBlocks[t].x) ||
            (BLOCKS[a][b+1][3].y + 1 == setBlocks[t].y && BLOCKS[a][b+1][3].x == setBlocks[t].x)
            ){break}}

        b ++ // localStorage.b ++
        if (b == 4) {b = 0}
        break
      case 's':
        speed = 2 * localStorage.difficulty
        break
      case 'a':
        //b = localStorage.b
        for (let t = 0; t <= setBlocks.length - 1; t ++) {
        if ( // the block would hit another block or the ground
        (BLOCKS[a][b][0].y == setBlocks[t].y && BLOCKS[a][b][0].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][1].y == setBlocks[t].y && BLOCKS[a][b][1].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][2].y == setBlocks[t].y && BLOCKS[a][b][2].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][3].y == setBlocks[t].y && BLOCKS[a][b][3].x - 1 == setBlocks[t].x)
        ){break}}

        if(BLOCKS[a][b][0].x - 1 != 0 &&
           BLOCKS[a][b][1].x - 1 != 0 &&
           BLOCKS[a][b][2].x - 1 != 0 &&
           BLOCKS[a][b][3].x - 1 != 0){
 
            for (let e = 0; e <= 3; e++){
                for (let f = 0; f <= 3; f++){
        
                BLOCKS[a][e][f].x = BLOCKS[a][e][f].x - 1
        
                }}}
        break
      case 'd':
        //b = localStorage.b
        for (let t = 0; t <= setBlocks.length - 1; t ++) {
        if ( // the block would hit another block or the ground
        (BLOCKS[a][b][0].y == setBlocks[t].y && BLOCKS[a][b][0].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][1].y == setBlocks[t].y && BLOCKS[a][b][1].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][2].y == setBlocks[t].y && BLOCKS[a][b][2].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][3].y == setBlocks[t].y && BLOCKS[a][b][3].x + 1 == setBlocks[t].x)
        ){break}}

        if(BLOCKS[a][b][0].x + 1 != 11 &&
           BLOCKS[a][b][1].x + 1 != 11 &&
           BLOCKS[a][b][2].x + 1 != 11 &&
           BLOCKS[a][b][3].x + 1 != 11){
 
            for (let e = 0; e <= 3; e++){
                for (let f = 0; f <= 3; f++){
        
                BLOCKS[a][e][f].x = BLOCKS[a][e][f].x + 1
        
                }}}
        break
      case ' ':
        speed = 1000 * localStorage.difficulty
    }
  })

  window.addEventListener('keyup', e => {
    switch (e.key) {
      case 'ArrowDown':
        speed = localStorage.difficulty
        break
      case 's':
        speed = localStorage.difficulty
        break
      case ' ':
        speed = localStorage.difficulty
    }
  })

  window.requestAnimationFrame(main)