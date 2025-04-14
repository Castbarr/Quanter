import Phaser from 'phaser';
class MenuPrincipal extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuPrincipal' });
  }

  preload() {
    this.load.image('fondoMenu', './assets/imgMenu/FondoMenu.png');
    this.load.image('logoMenu', './assets/imgMenu/LogoMenu.png');
    this.load.image('botonBasico', './assets/imgMenu/BotonBasico.png');
    this.load.image('botonMedio', './assets/imgMenu/BotonMedio.png');
    this.load.image('botonAvanzado', './assets/imgMenu/BotonAvanzado.png');
  }

  create() {
    this.add.image(500, 300, 'fondoMenu');

    const logoMenu = this.add.image(500, 100, 'logoMenu');
    logoMenu.setScale(0.5); // Escala inicial

    const botonBasico = this.add.image(500, 300, 'botonBasico').setInteractive();
    botonBasico.setScale(0.5);
    botonBasico.on('pointerover', () => {
      this.input.setDefaultCursor('pointer');
      botonBasico.setScale(0.55); // Aumentar tamaño al pasar el ratón
    });
    botonBasico.on('pointerout', () => {
      this.input.setDefaultCursor('default');
      botonBasico.setScale(0.5); // Volver al tamaño original 
    });
    botonBasico.on('pointerdown', () => {
      this.scene.start('InicioBasico'); // Cambia a la escena de InicioBasico
  });  

    const botonMedio = this.add.image(300, 300, 'botonMedio').setInteractive();
    botonMedio.setScale(0.5);
    botonMedio.on('pointerover', () => {
      this.input.setDefaultCursor('pointer');
      botonMedio.setScale(0.55); // Aumentar tamaño al pasar el ratón
    });
    botonMedio.on('pointerout', () => {
      this.input.setDefaultCursor('default');
      botonMedio.setScale(0.5); // Volver al tamaño original 
    });

    const botonAvanzado = this.add.image(700, 300, 'botonAvanzado').setInteractive();
    botonAvanzado.setScale(0.5);
    botonAvanzado.on('pointerover', () => {
      this.input.setDefaultCursor('pointer');
      botonAvanzado.setScale(0.55); // Aumentar tamaño al pasar el ratón
    });
    botonAvanzado.on('pointerout', () => {
      this.input.setDefaultCursor('default');
      botonAvanzado.setScale(0.5); // Volver al tamaño original 
    }); 

    const text = this.add.text(500, 500, 'Selecciona un nivel', {
      font: '32px Arial',
      fill: '#ffffff'
  }).setOrigin(0.5);
    text.setAlpha(0); // Empieza invisible
    this.tweens.add({
      targets: text,
      alpha: 1,         
      duration: 1000,      
      ease: 'Sine.easeInOut',
      yoyo: true,         
      repeat: -1          
  });
    
    }
    
}

export default MenuPrincipal;
