import Phaser from "phaser";
import {mostrarPuntos} from '../Puntos'

class BasicoTreintaiuno extends Phaser.Scene {
    constructor() {
        super({ key: 'BasicoTreintaiuno' });
    }
    preload(){
    }
    create(){
        const sonidos = this.registry.get('sonidos');

        this.cameras.main.fadeIn(2000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
        fondo.setTint(0xff0000); 
        sonidos.laser.play();
        sonidos.musicaEnfoque.play(); // Reproducir la música de fondo
        this.time.delayedCall(1000, () => { // Cambiado a función flecha
            sonidos.musicaEnfoque.play(); // Detener la música de fondo
            const puntos = this.registry.get('puntos');
            if(puntos > 0){
            this.scene.start('BasicoTreintaidos'); // Ahora `this` es correcto
            }
            else{
            this.scene.start('JuegoPerdido');
            sonidos.sonidoGameOver.play();
            }
        });
        });

        const fondo = this.add.image(500, 300, 'robotSeguridad');
        mostrarPuntos(this); // Mostrar puntos en la escena
        }


}
export default BasicoTreintaiuno;