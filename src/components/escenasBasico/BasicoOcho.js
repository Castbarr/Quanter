import Phaser from "phaser";
import { mostrarPuntos } from "../Puntos";
//import Swal from "sweetalert2";

class BasicoOcho extends Phaser.Scene {
    constructor() {
        super({ key: "BasicoOcho" });
    }   
    preload() {
        this.load.image("puertaAlmacen", "./assets/PuertaAlmacen.png");
        this.load.image("flecha", "./assets/flecha.png");
        this.load.image("informacion", "./assets/Exclamacion.png");
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.image(500, 300, "puertaAlmacen");
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
            this.scene.start('BasicoSiete'); // Cambia a la escena BasicoDos
            });
        });

    }
}
export default BasicoOcho;