import Phaser from 'phaser';
class InicioJuego extends Phaser.Scene {
  constructor() {
    super({ key: 'InicioJuego' });
  }

  preload() {
    this.load.image('icono', '/icons/favicon-128x128.png');
  }

  create() {
    this.add.image(400, 300, 'icono');
    }
}

export default InicioJuego;