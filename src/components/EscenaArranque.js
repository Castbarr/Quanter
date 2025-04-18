import Phaser from 'phaser';
export default class EscenaArranque extends Phaser.Scene {
    constructor() {
      super('EscenaArranque');
    }
  
    create() {
      // Inicializar puntos globales
      this.registry.set('puntos', 0);
  
      // Ir a la escena inicial del juego
      this.scene.start('Portada');
    }
  }
  