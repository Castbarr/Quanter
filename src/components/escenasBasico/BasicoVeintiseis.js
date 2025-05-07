import Phaser from "phaser";
import {mostrarPuntos} from '../Puntos'

class BasicoVeintiseis extends Phaser.Scene {
    constructor() {
        super({ key: 'BasicoVeintiseis' });
    }
    preload(){
    }
    create(){
        const sonidos = this.registry.get('sonidos');

        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.time.delayedCall(500, () => {
        sonidos.musicaEnfoque.play(); // Reproducir la música de fondo
        sonidos.quitarCerrojo.play();
        const cam = this.cameras.main;
        cam.setBounds(0, 0, 1000, 600);
        cam.setZoom(1);
        // Zoom automático al entrar en la escena
        cam.zoomTo(2, 1000); // Zoom in
        cam.pan(500, 300, 1000, 'Power2');
        this.time.delayedCall(2000, () => { // Cambiado a función flecha
            cam.zoomTo(1, 1000); // Zoom out
            sonidos.musicaEnfoque.play(); // Detener la música de fondo
            this.scene.start('BasicoVeintisiete'); // Ahora `this` es correcto
        });
        });

        this.add.image(500, 300, 'fondoPuerta');
        mostrarPuntos(this); // Mostrar puntos en la escena
        }


}
export default BasicoVeintiseis;