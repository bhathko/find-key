export class GroundModel {
  public x: number;
  public y: number;
  public isFakeGround: boolean = false;

  constructor(x: number, y: number, isFakeGround: boolean) {
    this.x = 100 * x;
    this.y = 100 * y;
    this.isFakeGround = isFakeGround;
  }
}