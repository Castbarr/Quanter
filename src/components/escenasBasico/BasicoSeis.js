import Phaser from "phaser";
import { mostrarPuntos } from "../Puntos";

class BasicoSeis extends Phaser.Scene {
    constructor() {
        super({ key: "BasicoSeis" });
    }   
    preload() {
    }
    create() {
        const sonidos = this.registry.get("sonidos");

        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.image(500, 300, "oficinaSeguridadInterna");
        mostrarPuntos(this);

        const flecha = this.add.image(900, 300, 'flecha').setInteractive();
        flecha.angle = 90; // Rotar la flecha 45 grados
        flecha.setScale(0.2); // Cambiar el tamaño de la flecha
        flecha.setVisible(true);
        flecha.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            flecha.setScale(0.25); // Aumentar tamaño al pasar el ratón
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
            sonidos.abriendoPuerta.play(); // Reproducir el sonido de abrir puerta
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            sonidos.musicaFondo.play(); // Reproducir la música de fondo
            this.scene.start('BasicoSiete'); // Cambia a la escena BasicoDos
            });
        });


        const flechaDos = this.add.image(90, 300, 'flecha').setInteractive();
        flechaDos.setScale(0.2);
        flechaDos.setVisible(true);
        flechaDos.angle = -90; 
        flechaDos.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            flechaDos.setScale(0.25); // Aumentar tamaño al pasar el ratón
        });
        flechaDos.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            flechaDos.setScale(0.2); // Volver al tamaño original 
        });
        this.tweens.add({
            targets: flechaDos,
            alpha: .2,           // Aparece
            duration: 1000,      
            ease: 'Sine.easeInOut',
            yoyo: true,         // Regresa a su tamaño original
            repeat: -1          // Infinito
        });
        flechaDos.on('pointerdown', () => {
            sonidos.musicaFlecha.play(); // Reproducir el sonido de flecha
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoCinco');  
            }); 
        });
    }
}
export default BasicoSeis;