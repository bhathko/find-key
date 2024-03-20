import characterModel from '../models/character.model';

export class CharacterController {
    constructor() {
    }

    moveUp(): void {
      characterModel.y -= characterModel.speed;
    }

    moveDown(): void {
      characterModel.y += characterModel.speed;
    }

    moveLeft(): void {
      characterModel.x -= characterModel.speed;
    }

    moveRight(): void {
      characterModel.x += characterModel.speed;
    }

}