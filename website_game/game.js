let lastRenderTime = 0
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED } from './snake.js'

function main(currenTime) {
    const secondsSinceLastRender = (currenTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    window.requestAnimationFrame(main)
    lastRenderTime = currenTime
    console.log('Render')

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake
}

function draw() {
    drawSnake
}