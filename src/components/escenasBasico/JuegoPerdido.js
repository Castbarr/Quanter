import Phaser from "phaser";
//import {mostrarPuntos} from '../Puntos'

class JuegoPerdido extends Phaser.Scene {
    constructor() {
        super({ key: 'JuegoPerdido' });
    }
    preload(){
    }
    create(){
        const sonidos = this.registry.get('sonidos');
        const puntos = this.registry.get('puntos');
        let calificacion = 0;

        this.cameras.main.fadeIn(2000, 0, 0, 0);
        this.time.delayedCall(2000, () => {
        fondo.setTint(0xff0000); 
        this.add.image(250, 300, 'pergamino').setScale(.4);
        this.add.text(210, 100, 'Boleta', {
            font: '24px Arial',
            fill: '#000000'
        });
        this.add.text(100, 200, `Puntos: ${puntos}\nCalificación: ${calificacion}`, {
            font: '20px Arial',
            fill: '#000000'
        });
        this.time.delayedCall(1000, () => {
        sonidos.musicaFlecha.play();
        this.add.image(250, 400, 'reprobado').setScale(.3);
        });
        this.time.delayedCall(2000, () => {
            this.add.text(600, 300, 'Intentalo de nuevo', {
                font: '24px Arial',
                fill: '#ffffff'
            });

            let flecha = this.add.image(800, 30, 'flecha');
            flecha.setScale(0.2); // Escala inicial 

            this.tweens.add({
            targets: flecha,
            y: '+=20',          // Se mueve 20 píxeles hacia abajo
            duration: 600,      // Tiempo del movimiento
            ease: 'Sine.easeInOut',
            yoyo: true,         // Vuelve hacia atrás
            repeat: -1          // Infinito
            });

        });
        
       
        });

        const fondo = this.add.image(500, 300, 'fondoFinalPerdedor');
       
        

        

        
        }


}
export default JuegoPerdido;