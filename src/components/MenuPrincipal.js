import Phaser from 'phaser';
import {mostrarPuntos} from './Puntos'
class MenuPrincipal extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuPrincipal' });
  }

  preload() {
  }

  create() {
    this.add.image(500, 300, 'fondoMenu');
    const sonidos = this.registry.get('sonidos');
    mostrarPuntos(this);

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
      sonidos.click.play(); // Reproducir sonido de clic
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('InicioBasico');
      const puntos = this.registry.get('puntos');
      const puntosIniciales = this.registry.get('puntosIniciales');
        if(puntos === 0) {
        this.registry.set('puntos', puntos +7);
        this.registry.set('puntosIniciales', puntosIniciales +7)
        } 
      });
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
    botonMedio.on('pointerdown', () => {
      sonidos.click.play(); // Reproducir sonido de clic
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('InicioBasico');
      const puntos = this.registry.get('puntos');
      const puntosIniciales = this.registry.get('puntosIniciales');
        if(puntos === 0) {
        this.registry.set('puntos', puntos +5);
        this.registry.set('puntosIniciales', puntosIniciales +5)
        } 
      });
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
    botonAvanzado.on('pointerdown', () => {
      sonidos.click.play(); // Reproducir sonido de clic
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('InicioBasico');
      const puntos = this.registry.get('puntos');
      const puntosIniciales = this.registry.get('puntosIniciales');
        if(puntos === 0) {
        this.registry.set('puntos', puntos +3);
        this.registry.set('puntosIniciales', puntosIniciales +3)
        } 
      });
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
