import Phaser from "phaser";
//import {mostrarPuntos} from '../Puntos'

class JuegoGanado extends Phaser.Scene {
    constructor() {
        super({ key: 'JuegoGanado' });
    }
    preload(){
    }
    create(){
        const sonidos = this.registry.get('sonidos');
        const puntos = this.registry.get('puntos');
        const puntosIniciales = this.registry.get('puntosIniciales');
        let calificacion = 0;

        let calificacionInicial = 10/puntosIniciales * puntos;
        calificacionInicial = Math.round(calificacionInicial);
        

        if (calificacionInicial === 1 || calificacionInicial === 2 || calificacionInicial === 3){
            calificacion = 6;
        }
        else if(calificacionInicial === 4 || calificacionInicial === 5){
            calificacion = 7;
        }
        else if(calificacionInicial === 6 || calificacionInicial === 7){
            calificacion = 8;
        }
        else if(calificacionInicial === 8 || calificacionInicial === 9){
            calificacion = 9;
        }
        else if(calificacionInicial === 10){
            calificacion = 10;
        }
        

        this.cameras.main.fadeIn(2000, 0, 0, 0);
        this.time.delayedCall(2000, () => {
        fondo.setTint(0xFFFF00); 
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
        this.add.image(250, 400, 'aprobado').setScale(.5);
        });
        this.time.delayedCall(2000, () => {
            this.add.text(600, 300, 'Juega de nuevo', {
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

        const fondo = this.add.image(500, 300, 'fondoFinalGanador');
       
        

        

        
        }


}
export default JuegoGanado;