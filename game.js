import { update as updateBlock, draw as drawBlock} from './tetris.js'
import { score } from './tetris.js'
import { done } from './tetris.js'
import { spawn } from './tetris.js'

const first_speed = localStorage.difficulty
let lastRenderTime = 0
let gameOver = false
export let dead = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
    window.location.reload()
    }
    return
  }

  if (done) {
    spawn()
  }
  else {let speed = localStorage.difficulty

  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / speed) return

  lastRenderTime = currentTime

  update()
  draw()
  }
}

function drawPoints() {
  document.getElementById('score').innerHTML = 'Score: ' + score
}

main(0)

function update() {
  updateBlock()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawBlock(gameBoard)
  drawPoints()
}

function checkDeath() {
  gameOver = dead
}