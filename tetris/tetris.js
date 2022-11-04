import { dead } from "./game.js"
export let done = true

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

export const BLOCKS = [LBlocks, SBlocks, JBlocks, IBlocks, ZBlocks, OBlocks, TBlocks]

let a = 0
export let b = 0
let end = false

export var score = 0

export function update(BLOCKS) {
  let setBlocks = [{ x: 0, y: 16 }, { x: 1, y: 16 }, { x: 2, y: 16 }, { x: 3, y: 16 }, { x: 4, y: 16 },
                   { x: 5, y: 16 }, { x: 6, y: 16 }, { x: 7, y: 16 }, { x: 8, y: 16 }, { x: 9, y: 16 }]

  done = false

  for (let t = 0; t <= setBlocks.length; t ++) {
    if (
    BLOCKS[a][b][0].y + 1 == setBlocks[t].y && BLOCKS[a][b][0].x == setBlocks[t].x ||
    BLOCKS[a][b][1].y + 1 == setBlocks[t].y && BLOCKS[a][b][1].x == setBlocks[t].x ||
    BLOCKS[a][b][2].y + 1 == setBlocks[t].y && BLOCKS[a][b][2].x == setBlocks[t].x ||
    BLOCKS[a][b][3].y + 1 == setBlocks[t].y && BLOCKS[a][b][3].x == setBlocks[t].x
    ) {
      end = true
    }
  }

  if (end) 
  {
    setBlocks.push(BLOCKS[a][b][0])
    setBlocks.push(BLOCKS[a][b][1])
    setBlocks.push(BLOCKS[a][b][2])
    setBlocks.push(BLOCKS[a][b][3])

    if (
      BLOCKS[a][b][0].y == 0 && (BLOCKS[a][b][0].x == 4 || BLOCKS[a][b][0].x == 5 || BLOCKS[a][b][0].x == 6 || BLOCKS[a][b][0].x == 7) ||
      BLOCKS[a][b][1].y == 0 && (BLOCKS[a][b][1].x == 4 || BLOCKS[a][b][1].x == 5 || BLOCKS[a][b][1].x == 6 || BLOCKS[a][b][1].x == 7) ||
      BLOCKS[a][b][2].y == 0 && (BLOCKS[a][b][2].x == 4 || BLOCKS[a][b][2].x == 5 || BLOCKS[a][b][2].x == 6 || BLOCKS[a][b][2].x == 7) ||
      BLOCKS[a][b][3].y == 0 && (BLOCKS[a][b][3].x == 4 || BLOCKS[a][b][3].x == 5 || BLOCKS[a][b][3].x == 6 || BLOCKS[a][b][3].x == 7)
    ) {
      dead = true
    }

    done = true
    score ++
    return
  }
}

export function draw(gameBoard) {
  BLOCKS[a][b].forEach(segment => {
    const Block = document.createElement('div')
    Block.style.gridRowStart = segment.y
    Block.style.gridColumnStart = segment.x

    if (a == 0) {Block.classList.add('block1')}
    if (a == 1) {Block.classList.add('block2')}
    if (a == 2) {Block.classList.add('block3')}
    if (a == 3) {Block.classList.add('block4')}
    if (a == 4) {Block.classList.add('block5')}
    if (a == 5) {Block.classList.add('block6')}
    if (a == 6) {Block.classList.add('block7')}
    
    gameBoard.appendChild(Block)
  })
}

export function spawn() {
  update(BLOCKS)
}
