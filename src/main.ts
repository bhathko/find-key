import { Game } from './game'
import './assets/styles/global.css'
import { Application } from 'pixi.js'

const app = new Application({
  width: 501,
  height: 501,
})

document.querySelector('#canvas')?.appendChild(app.view as HTMLCanvasElement)

new Game(app).init()
