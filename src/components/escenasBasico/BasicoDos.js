import Phaser from "phaser";

class BasicoDos extends Phaser.Scene {
    constructor(){
        super({ key: 'BasicoDos' });
    }
    preload(){
        this.load.image('fondoBasicoDos', './assets/Pasillo.png');
        this.load.image('flecha', './assets/flecha.png');
        this.load.image('exclamacion', './assets/Exclamacion.png');

    }
    create(){
        this.add.image(500, 300, 'fondoBasicoDos')
        const flecha = this.add.image(90, 300, 'flecha').setInteractive();
        flecha.setScale(0.3);
        flecha.angle = -90;
        flecha.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            flecha.setScale(0.4); // Aumentar tamaño al pasar el ratón
        });
        flecha.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            flecha.setScale(0.3); // Volver al tamaño original 
        });
        this.tweens.add({
            targets: flecha,
            alpha: .2,           // Aparece
            duration: 1000,      
            ease: 'Sine.easeInOut',
            yoyo: true,         // Regresa a su tamaño original
            repeat: -1          // Infinito
        });
        flecha.on('pointerdown', () => {
            this.scene.start('InicioBasico'); // Cambia a la escena IncioBasico
        });


        const flechaDos = this.add.image(440, 500, 'flecha').setInteractive();
        flechaDos.setScale(0.3);


        const exclamacion = this.add.image(440, 350, 'exclamacion');
        exclamacion.setScale(0.5);

       
    }

}
export default BasicoDos;