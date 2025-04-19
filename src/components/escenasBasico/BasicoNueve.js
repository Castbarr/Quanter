import Phaser from "phaser";
import { mostrarPuntos } from "../Puntos";

class BasicoNueve extends Phaser.Scene {
    constructor() {
        super({ key: "BasicoNueve" });
    }   
    preload() {
    }
    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.image(500, 300, "almacen");
        mostrarPuntos(this);

        const flecha = this.add.image(90, 300, 'flecha').setInteractive();
        flecha.angle = -90; // Rotar la flecha 45 grados
        flecha.setScale(0.2); // Cambiar el tamaño de la flecha
        flecha.setVisible(true);
        flecha.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            flecha.setScale(0.3); // Aumentar tamaño al pasar el ratón
        });
        flecha.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            flecha.setScale(0.2); // Volver al tamaño original 
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
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoOcho'); // Cambia a la escena BasicoDos
            });
        });

    }
}
export default BasicoNueve;