import Phaser from 'phaser';
class MenuPrincipal extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuPrincipal' });
  }

  preload() {
    this.load.image('icono', 'favicon.ico');
  }

  create() {
    this.add.image(500, 300, 'icono');
    }
}

export default MenuPrincipal;
