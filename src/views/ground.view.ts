import { GAME_CONFIG } from '../const/config.const'
import { GroundModel } from '../models/ground.model'
import * as PIXI from 'pixi.js'

export class GroundView {
  ground: GroundModel;
  groundView: PIXI.Graphics;
  constructor(ground: GroundModel) {
    this.ground = ground
    this.groundView = new PIXI.Graphics()
    this.drawGround()
  }

  drawFakeGround(): void {
    this.groundView.beginFill(0xf29f8f)
    this.groundView.lineStyle(1, 0x000000, 1)
    this.groundView.drawRect(this.ground.x + 1, this.ground.y, GAME_CONFIG.groundWidth, GAME_CONFIG.groundHeight)
    this.groundView.endFill()

    setTimeout(() => {
      this.drawGround()
    }, 5000)
  }

  drawGround(): void {
    this.groundView.beginFill(0xfed770)
    this.groundView.lineStyle(1, 0x000000, 1)
    this.groundView.drawRect(this.ground.x + 1, this.ground.y, GAME_CONFIG.groundWidth, GAME_CONFIG.groundHeight)
    this.groundView.endFill()
  }
}
