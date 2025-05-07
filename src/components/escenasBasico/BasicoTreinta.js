import Phaser from "phaser";
import {mostrarPuntos} from '../Puntos'

class BasicoTreinta extends Phaser.Scene {
    constructor() {
        super({ key: 'BasicoTreinta' });
    }
    preload(){
    }
    create(){
        const sonidos = this.registry.get('sonidos');

        this.cameras.main.fadeIn(2000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
        fondo.setTint(0xff0000);  // Tinte rojo
        sonidos.musicaEnfoque.play(); // Reproducir la música de fondo
        sonidos.laser.play();
        laserUno.setVisible(true);
        laserDos.setVisible(true);
        laserTres.setVisible(true);
        laserCuatro.setVisible(true);
        laserCinco.setVisible(true);
        laserSeis.setVisible(true);
        laserSiete.setVisible(true);
        this.time.delayedCall(1000, () => { // Cambiado a función flecha
            sonidos.musicaEnfoque.play(); // Detener la música de fondo
            this.scene.start('BasicoTreintaiuno'); // Ahora `this` es correcto
        });
        });

        const fondo = this.add.image(500, 300, 'pasillo');
        mostrarPuntos(this); // Mostrar puntos en la escena


        const laserUno = this.add.image(400, 350, 'laser');
        laserUno.angle = 45;
        laserUno.setScale(.05);
        laserUno.setVisible(false);

        const laserDos = this.add.image(550, 350, 'laser');
        laserDos.angle = -45;
        laserDos.setScale(.05);
        laserDos.setVisible(false);

        const laserTres = this.add.image(530, 400, 'laser');
        laserTres.angle = 0;
        laserTres.setScale(.1);
        laserTres.setVisible(false);
        laserTres.setAlpha(.7);

        const laserCuatro = this.add.image(435, 325, 'laser');
        laserCuatro.angle = -30;
        laserCuatro.setScale(.1);
        laserCuatro.setVisible(false);
        laserCuatro.setAlpha(.7);

        const laserCinco = this.add.image(470, 325, 'laser');
        laserCinco.angle = -35;
        laserCinco.setScale(.2);
        laserCinco.setVisible(false);
        laserCinco.setAlpha(.8);

        const laserSeis = this.add.image(470, 325, 'laser');
        laserSeis.angle = 35;
        laserSeis.setScale(.2);
        laserSeis.setVisible(false);
        laserSeis.setAlpha(.8);

        const laserSiete = this.add.image(470, 500, 'laser');
        laserSiete.angle = 0;
        laserSiete.setScale(.3);
        laserSiete.setVisible(false);
        laserSiete.setAlpha(.9);

        }


}
export default BasicoTreinta;