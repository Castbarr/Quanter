import Phaser from "phaser";

class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu" });
  }

  preload() {
    this.load.image('fondo', './bg.png');
  }

  create() {
    this.add.image(400, 300, 'fondo');
  }
}

export default Menu;