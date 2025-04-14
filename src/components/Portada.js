import Phaser from "phaser";

class Portada extends Phaser.Scene {
  constructor() {
    super({ key: "Portada" });
  }

  preload() {
    this.load.image('fondo', './assets/FondoJuegoComputacion.png');
    this.load.image('logoCompu', './assets/LogoCompu.png');
    this.load.image('flecha', './assets/flecha.png');
  }

  create() {
    this.add.image(500, 300, 'fondo');
    const logo = this.add.image(500, 300, 'logoCompu');
     // Creamos el texto fuera de la pantalla (a la derecha)
     const text = this.add.text(1250, 450, '¡Bienvenido!...Click en la pantalla', {
      font: '32px Arial',
      fill: '#ffffff'
  }).setOrigin(0.5);
     // Ejemplo de animación: fade in + zoom + rotación
     logo.setAlpha(0);      // Empieza invisible
     logo.setScale(0.5);    // Empieza más pequeño
     logo.setAngle(0);      // Sin rotación
     text.setAlpha(0);   
 
     this.tweens.add({
         targets: logo,
         alpha: 1,           // Aparece
         scale: 1,           // Se agranda
         angle: 360,         // Gira completamente
         ease: 'Power2',
         duration: 2000,     // 2 segundos
         yoyo: false,
         repeat: 0
     });
       // Tween para mover el texto al centro después de 1 segundo (1000 ms)
    this.tweens.add({
      targets: text,
      x: 500,              // Centro horizontal de la pantalla
      ease: 'Power2',
      duration: 1500,      // 1.5 segundos de duración
      delay: 1000,         // 1 segundo de retraso antes de comenzar
  });
  this.tweens.add({
    targets: text,
    alpha: 1,         
    duration: 1000,      
    ease: 'Sine.easeInOut',
    yoyo: true,         // Regresa a su tamaño original
    repeat: -1          // Infinito
});
let flecha; // Variable para almacenar la referencia a la imagen

this.input.on('pointerdown', () => {
  if (!flecha) { // Verifica si la imagen ya fue creada
    flecha = this.add.image(900, 100, 'flecha');
    flecha.setScale(0.3); // Escala inicial 

    this.tweens.add({
      targets: flecha,
      y: '+=20',          // Se mueve 20 píxeles hacia abajo
      duration: 600,      // Tiempo del movimiento
      ease: 'Sine.easeInOut',
      yoyo: true,         // Vuelve hacia atrás
      repeat: -1          // Infinito
    });
  }
});


  }
}

export default Portada;