export class CharacterModel {
  public x: number;
  public y: number;
  public speed: number;

  constructor() {
    this.x = 100;
    this.y = 100;
    this.speed = 5;
  }
}

const characterModel = new CharacterModel();

export default characterModel;