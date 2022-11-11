const gameBoard = document.getElementById('game-board')
const previewBoard = document.getElementById('preview-board')

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
const JBLOCK1 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 7, y: 0 }]
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

const cLBLOCK0 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 7, y: 0 }]
const cLBLOCK1 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 7, y: 2 }]
const cLBLOCK2 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 5, y: 2 }]
const cLBLOCK3 = [{ x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
const cLBlocks = [cLBLOCK0, cLBLOCK1, cLBLOCK2, cLBLOCK3]

const cSBLOCK0 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }, { x: 7, y: 0 }]
const cSBLOCK1 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
const cSBLOCK2 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }, { x: 7, y: 0 }]
const cSBLOCK3 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
const cSBlocks = [cSBLOCK0, cSBLOCK1, cSBLOCK2, cSBLOCK3]

const cJBLOCK0 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const cJBLOCK1 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 7, y: 0 }]
const cJBLOCK2 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 7, y: 2 }]
const cJBLOCK3 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 5, y: 2 }]
const cJBlocks = [cJBLOCK0, cJBLOCK1, cJBLOCK2, cJBLOCK3]

const cIBLOCK0 = [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const cIBLOCK1 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }]
const cIBLOCK2 = [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const cIBLOCK3 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }]
const cIBlocks = [cIBLOCK0, cIBLOCK1, cIBLOCK2, cIBLOCK3]

const cZBLOCK0 = [{ x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const cZBLOCK1 = [{ x: 5, y: 2 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }]
const cZBLOCK2 = [{ x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const cZBLOCK3 = [{ x: 5, y: 2 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }]
const cZBlocks = [cZBLOCK0, cZBLOCK1, cZBLOCK2, cZBLOCK3]

const cOBLOCK0 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }]
const cOBLOCK1 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }]
const cOBLOCK2 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }]
const cOBLOCK3 = [{ x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }]
const cOBlocks = [cOBLOCK0, cOBLOCK1, cOBLOCK2, cOBLOCK3]

const cTBLOCK0 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }, { x: 7, y: 1 }]
const cTBLOCK1 = [{ x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 7, y: 1 }]
const cTBLOCK2 = [{ x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 6, y: 2 }]
const cTBLOCK3 = [{ x: 5, y: 1 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
const cTBlocks = [cTBLOCK0, cTBLOCK1, cTBLOCK2, cTBLOCK3]

const co = [cLBlocks, cSBlocks, cJBlocks, cIBlocks, cZBlocks, cOBlocks, cTBlocks]

const names = ["LBlock", "SBlock", "JBlock", "IBlock", "ZBlock", "OBlock", "TBlock"]

const setBlocks = [{ x: 1, y: 21 }, { x: 2, y: 21 }, { x: 3, y: 21 }, { x: 4, y: 21 },{ x: 5, y: 21 }, 
                   { x: 6, y: 21 }, { x: 7, y: 21 }, { x: 8, y: 21 }, { x: 9, y: 21 }, { x: 10, y: 21 }]

let gameOver = false
let done = true

var score = 0
let end = false

function update() {
    end = false

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
        setBlocks.push({ x: BLOCKS[a][b][0].x, y: BLOCKS[a][b][0].y })
        setBlocks.push({ x: BLOCKS[a][b][1].x, y: BLOCKS[a][b][1].y })
        setBlocks.push({ x: BLOCKS[a][b][2].x, y: BLOCKS[a][b][2].y })
        setBlocks.push({ x: BLOCKS[a][b][3].x, y: BLOCKS[a][b][3].y })

        for (let s = 0; s <= 3; s++){

          let filled0 = 0
          let filled1 = 0
          let filled2 = 0
          let filled3 = 0
          let filleds = [filled0, filled1, filled2, filled3]
          let clears = []

          for (let q = 10; q <= setBlocks.length - 1; q++){
            if (setBlocks[q].y == BLOCKS[a][b][s].y){
              filleds[s] ++
            }
          }

          if (filleds[s] == 10) {
            //temp.push(s)
            for (let q = 10; q <= setBlocks.length - 1; q++){
              if (setBlocks[q].y == BLOCKS[a][b][s].y){

                cBlok[q].remove()
                clears.push(q)
              }
            }
            clears.reverse()
            for (let q = 0; q <= 9; q++){

              setBlocks.splice(clears[q], 1)
              
              cBlok.splice(clears[q], 1)
            }

            for (let z = 0; z <= setBlocks.length - 1; z++){
              if (setBlocks[z].y != 21 && setBlocks[z].y < BLOCKS[a][b][s].y){
                setBlocks[z].y += 1
              }}
           
              for (let g = 10; g <= cBlok.length - 1; g++){


                  if (Number(cBlok[g].style.gridRowStart) < BLOCKS[a][b][s].y){
                    cBlok[g].style.gridRowStart = Number(cBlok[g].style.gridRowStart) + 1
                  }

                }
             score += 1000
          }
        }

        if ( // it covers the area where the next block might spawn
        (BLOCKS[a][b][0].y == 0 && (BLOCKS[a][b][0].x == 4 || BLOCKS[a][b][0].x == 5 || BLOCKS[a][b][0].x == 6 || BLOCKS[a][b][0].x == 7)) ||
        (BLOCKS[a][b][1].y == 0 && (BLOCKS[a][b][1].x == 4 || BLOCKS[a][b][1].x == 5 || BLOCKS[a][b][1].x == 6 || BLOCKS[a][b][1].x == 7)) ||
        (BLOCKS[a][b][2].y == 0 && (BLOCKS[a][b][2].x == 4 || BLOCKS[a][b][2].x == 5 || BLOCKS[a][b][2].x == 6 || BLOCKS[a][b][2].x == 7)) ||
        (BLOCKS[a][b][3].y == 0 && (BLOCKS[a][b][3].x == 4 || BLOCKS[a][b][3].x == 5 || BLOCKS[a][b][3].x == 6 || BLOCKS[a][b][3].x == 7))
        ) {
        gameOver = true // end the game
        }

        done = true // if not game over, end the updating
        score += 10

          for (let e = 0; e <= 3; e++){
            for (let f = 0; f <= 3; f++){
    
            BLOCKS[a][e][f].x = co[a][e][f].x
            BLOCKS[a][e][f].y = co[a][e][f].y
    
            }
          }
    }
    else{
        
        for (let e = 0; e <= 3; e++){
        for (let f = 0; f <= 3; f++){

        BLOCKS[a][e][f].y = BLOCKS[a][e][f].y + 1

        }}
        
        draw(a, b)

        drawPoints()
        
    }
}

function drawPoints() {
  document.getElementById('score').innerHTML = 'Score: ' + score
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

let a = -1
let b

let Blok = []
const cBlok = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let next
let cnext = []

function spawn() {

  if (a == -1) {a = Math.floor(Math.random() * 7)}else{
    a = next
    for (let i = 0; i <= 3; i++){
      cnext[i].remove()
    }
  }
  next = Math.floor(Math.random() * 7)
  Blok = []
  b = 0

  cnext = []

  BLOCKS[next][b].forEach(segment => {

    const Block = document.createElement('div')
    Block.style.gridRowStart = segment.y - 4
    Block.style.gridColumnStart = segment.x - 4

    Block.classList.add(styles[next])
    cnext.push(Block)
    
    previewBoard.appendChild(Block)
  })

  BLOCKS[a][b].forEach(segment => {
    const Block = document.createElement('div')
    
    Block.style.gridColumnStart = segment.x
    Block.style.gridRowStart = segment.y

    Block.classList.add(styles[a])
    Blok.push(Block)
    cBlok.push(Block)
    
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

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / speed) {return}

    lastRenderTime = currentTime

    if (done) {
      speed = localStorage.difficulty
      spawn()}

    update()

    
}

function sub () {
  draw(a, b)
}

let why = true

window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':
        why = true

        for (let t = 0; t <= setBlocks.length - 1; t ++) {

        if ( // the block would hit another block
        (BLOCKS[a][(b + 1) % 4][0].y == setBlocks[t].y && BLOCKS[a][(b + 1) % 4][0].x == setBlocks[t].x) ||
        (BLOCKS[a][(b + 1) % 4][1].y == setBlocks[t].y && BLOCKS[a][(b + 1) % 4][1].x == setBlocks[t].x) ||
        (BLOCKS[a][(b + 1) % 4][2].y == setBlocks[t].y && BLOCKS[a][(b + 1) % 4][2].x == setBlocks[t].x) ||
        (BLOCKS[a][(b + 1) % 4][3].y == setBlocks[t].y && BLOCKS[a][(b + 1) % 4][3].x == setBlocks[t].x)
        ){why = false; break}}
        if(BLOCKS[a][(b + 1) % 4][0].x == 11 ||
           BLOCKS[a][(b + 1) % 4][1].x == 11 ||
           BLOCKS[a][(b + 1) % 4][2].x == 11 ||
           BLOCKS[a][(b + 1) % 4][3].x == 11 ||
           BLOCKS[a][(b + 1) % 4][0].x == 0 ||
           BLOCKS[a][(b + 1) % 4][1].x == 0 ||
           BLOCKS[a][(b + 1) % 4][2].x == 0 ||
           BLOCKS[a][(b + 1) % 4][3].x == 0){break}
        if(why && !done){
        b = (b + 1) % 4
        sub()}
        break
      case 'ArrowDown':
        speed = 5 * localStorage.difficulty
        break
      case 'ArrowLeft':
        why = true
        //b = localStorage.b
        for (let t = 0; t <= setBlocks.length - 1; t ++) {
        if ( // the block would hit another block or the ground
        (BLOCKS[a][b][0].y == setBlocks[t].y && BLOCKS[a][b][0].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][1].y == setBlocks[t].y && BLOCKS[a][b][1].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][2].y == setBlocks[t].y && BLOCKS[a][b][2].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][3].y == setBlocks[t].y && BLOCKS[a][b][3].x - 1 == setBlocks[t].x)
        ){why = false; break}}

        if (why && !done) {
        if(BLOCKS[a][b][0].x - 1 != 0 &&
           BLOCKS[a][b][1].x - 1 != 0 &&
           BLOCKS[a][b][2].x - 1 != 0 &&
           BLOCKS[a][b][3].x - 1 != 0){

        for (let e = 0; e <= 3; e++){
            for (let f = 0; f <= 3; f++){
    
            BLOCKS[a][e][f].x = BLOCKS[a][e][f].x - 1
    
            }}}
        sub()}
        break
      case 'ArrowRight':
        why = true
        //b = localStorage.b
        for (let t = 0; t <= setBlocks.length - 1; t ++) {
        if ( // the block would hit another block or the ground
        (BLOCKS[a][b][0].y == setBlocks[t].y && BLOCKS[a][b][0].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][1].y == setBlocks[t].y && BLOCKS[a][b][1].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][2].y == setBlocks[t].y && BLOCKS[a][b][2].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][3].y == setBlocks[t].y && BLOCKS[a][b][3].x + 1 == setBlocks[t].x)
        ){why = false; break}}

        if (why && !done) {
        if(BLOCKS[a][b][0].x + 1 != 11 &&
          BLOCKS[a][b][1].x + 1 != 11 &&
          BLOCKS[a][b][2].x + 1 != 11 &&
          BLOCKS[a][b][3].x + 1 != 11){
          
            for (let e = 0; e <= 3; e++){
                for (let f = 0; f <= 3; f++){
        
                BLOCKS[a][e][f].x = BLOCKS[a][e][f].x + 1
        
                }}}
                sub()}
        break
      case 'w':
        why = true

        for (let t = 0; t <= setBlocks.length - 1; t ++) {

        if ( // the block would hit another block
        (BLOCKS[a][(b + 1) % 4][0].y == setBlocks[t].y && BLOCKS[a][(b + 1) % 4][0].x == setBlocks[t].x) ||
        (BLOCKS[a][(b + 1) % 4][1].y == setBlocks[t].y && BLOCKS[a][(b + 1) % 4][1].x == setBlocks[t].x) ||
        (BLOCKS[a][(b + 1) % 4][2].y == setBlocks[t].y && BLOCKS[a][(b + 1) % 4][2].x == setBlocks[t].x) ||
        (BLOCKS[a][(b + 1) % 4][3].y == setBlocks[t].y && BLOCKS[a][(b + 1) % 4][3].x == setBlocks[t].x)
        ){why = false; break}}
        if(BLOCKS[a][(b + 1) % 4][0].x == 11 ||
           BLOCKS[a][(b + 1) % 4][1].x == 11 ||
           BLOCKS[a][(b + 1) % 4][2].x == 11 ||
           BLOCKS[a][(b + 1) % 4][3].x == 11 ||
           BLOCKS[a][(b + 1) % 4][0].x == 0 ||
           BLOCKS[a][(b + 1) % 4][1].x == 0 ||
           BLOCKS[a][(b + 1) % 4][2].x == 0 ||
           BLOCKS[a][(b + 1) % 4][3].x == 0){break}
        if(why && !done){
        b = (b + 1) % 4
        sub()}
        break
      case 's':
        speed = 2 * localStorage.difficulty
        break
      case 'a':
        why = true
        //b = localStorage.b
        for (let t = 0; t <= setBlocks.length - 1; t ++) {
        if ( // the block would hit another block or the ground
        (BLOCKS[a][b][0].y == setBlocks[t].y && BLOCKS[a][b][0].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][1].y == setBlocks[t].y && BLOCKS[a][b][1].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][2].y == setBlocks[t].y && BLOCKS[a][b][2].x - 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][3].y == setBlocks[t].y && BLOCKS[a][b][3].x - 1 == setBlocks[t].x)
        ){why = false; break}}

        if (why && !done) {
        if(BLOCKS[a][b][0].x - 1 != 0 &&
           BLOCKS[a][b][1].x - 1 != 0 &&
           BLOCKS[a][b][2].x - 1 != 0 &&
           BLOCKS[a][b][3].x - 1 != 0){

        for (let e = 0; e <= 3; e++){
            for (let f = 0; f <= 3; f++){
    
            BLOCKS[a][e][f].x = BLOCKS[a][e][f].x - 1
    
            }}}
        sub()}
        break
      case 'd':
        why = true
        //b = localStorage.b
        for (let t = 0; t <= setBlocks.length - 1; t ++) {
        if ( // the block would hit another block or the ground
        (BLOCKS[a][b][0].y == setBlocks[t].y && BLOCKS[a][b][0].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][1].y == setBlocks[t].y && BLOCKS[a][b][1].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][2].y == setBlocks[t].y && BLOCKS[a][b][2].x + 1 == setBlocks[t].x) ||
        (BLOCKS[a][b][3].y == setBlocks[t].y && BLOCKS[a][b][3].x + 1 == setBlocks[t].x)
        ){why = false; break}}

        if (why && !done) {
        if(BLOCKS[a][b][0].x + 1 != 11 &&
          BLOCKS[a][b][1].x + 1 != 11 &&
          BLOCKS[a][b][2].x + 1 != 11 &&
          BLOCKS[a][b][3].x + 1 != 11){
          
            for (let e = 0; e <= 3; e++){
                for (let f = 0; f <= 3; f++){
        
                BLOCKS[a][e][f].x = BLOCKS[a][e][f].x + 1
        
                }}}
                sub()}
        break
    }
  })

  window.addEventListener('keypress', e=> {
    switch (e.key) {
    case ' ':
        speed = 10000 * localStorage.difficulty
    }    
  })

  window.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      speed = 10000 * localStorage.difficulty
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
    }
  })

  window.requestAnimationFrame(main)