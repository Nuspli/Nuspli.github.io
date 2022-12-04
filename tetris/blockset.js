/*  each block is defined on its future spawn position
    BLOCKS consists of 7 block types (L, S, J, I, Z, O, T)
    each block type has 4 different rotations   ...0
                                                ...1
                                                ...2
                                                ...3
    each rotation is made of 4 squares with defined x | y coordinates on the game boards grid
    there is a copy - co[] which is used to reset the movements done in BLOCKS[] every time
    a Block hits the ground -> more on that in game.js
*/

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
const ZBLOCK1 = [{ x: 7, y: 0 }, { x: 7, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
const ZBLOCK2 = [{ x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const ZBLOCK3 = [{ x: 7, y: 0 }, { x: 7, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
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
const cZBLOCK1 = [{ x: 7, y: 0 }, { x: 7, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
const cZBLOCK2 = [{ x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 7, y: 1 }]
const cZBLOCK3 = [{ x: 7, y: 0 }, { x: 7, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 2 }]
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

export const co = [cLBlocks, cSBlocks, cJBlocks, cIBlocks, cZBlocks, cOBlocks, cTBlocks]

// only the ground parts are set blocks at the start, the game board is 10x20 -> 21 is the bottom border

export const setBlocks = [{ x: 1, y: 21 }, { x: 2, y: 21 }, { x: 3, y: 21 }, { x: 4, y: 21 }, { x: 5, y: 21 }, 
                          { x: 6, y: 21 }, { x: 7, y: 21 }, { x: 8, y: 21 }, { x: 9, y: 21 }, { x: 10, y: 21 }]

// each block has its coresponding style defined in tetris.html

export const styles = ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7']
