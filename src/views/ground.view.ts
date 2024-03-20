import { GroundModel } from "../models/ground.model";
import * as PIXI from 'pixi.js';

export class GroundView {
  ground: GroundModel;
  groundView: PIXI.Graphics;
  constructor(ground: GroundModel) {
    this.ground = ground;
    this.groundView = new PIXI.Graphics();
    this.draw();
  }

  draw(): void {
    this.ground.isFakeGround ? this.drawFakeGround() : this.drawGround();
  }

  drawFakeGround(): void {
    this.groundView.beginFill(0x000000);
    this.groundView.drawRect(this.ground.x, this.ground.y, 100, 100);
    this.groundView.endFill();
    console.log('fake ground', this.ground.x, this.ground.y)
  }

  drawGround(): void {
    this.groundView.beginFill(0x00FF00);
    this.groundView.drawRect(this.ground.x, this.ground.y, 100, 100);
    this.groundView.endFill();

    console.log('ground', this.ground.x, this.ground.y)
  }
} 