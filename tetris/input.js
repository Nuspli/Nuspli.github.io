import { b } from './tetris.js'
import { BLOCKS } from './tetris.js'
import { a } from './tetris.js'

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      b ++
      BLOCKS[a][b][0].x = 1
      BLOCKS[a][b][1].x = 1
      BLOCKS[a][b][2].x = 1
      BLOCKS[a][b][3].x = 1
      break
    case 'ArrowDown':
      localStorage.difficulty *= 2
      break
    case 'ArrowLeft':
      BLOCKS[a][b][0].x -= 1
      BLOCKS[a][b][1].x -= 1
      BLOCKS[a][b][2].x -= 1
      BLOCKS[a][b][3].x -= 1
      break
    case 'ArrowRight':
      BLOCKS[a][b][0].x += 1
      BLOCKS[a][b][1].x += 1
      BLOCKS[a][b][2].x += 1
      BLOCKS[a][b][3].x += 1
      break
    case 'w':
      b ++
      break
    case 's':
      localStorage.difficulty *= 2
      break
    case 'a':
      BLOCKS[a][b][0].x -= 1
      BLOCKS[a][b][1].x -= 1
      BLOCKS[a][b][2].x -= 1
      BLOCKS[a][b][3].x -= 1
      break
    case 'd':
      BLOCKS[a][b][0].x += 1
      BLOCKS[a][b][1].x += 1
      BLOCKS[a][b][2].x += 1
      BLOCKS[a][b][3].x += 1
      break
    case 'spaceBar':
      localStorage.difficulty = 1000
  }
})