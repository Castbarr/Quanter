import Phaser from "phaser";
import {mostrarPuntos} from '../Puntos'
import Swal from "sweetalert2";

class BasicoTres extends Phaser.Scene{
    constructor(){
        super({ key: 'BasicoTres' });
    }
    preload(){
        this.load.image('oficinaSeguridad', './assets/OficinaSeguridad.png');
        this.load.image('flecha', './assets/flecha.png');
        this.load.image('informacion', './assets/Exclamacion.png');
        this.load.image('pregunta', './assets/Globo.png');
    }
    create(){
        this.add.image(500, 300, 'oficinaSeguridad');
        mostrarPuntos(this);


        const flecha = this.add.image(80, 300, 'flecha').setInteractive();
        flecha.setScale(0.2);
        flecha.angle = -90;
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
            this.scene.start('BasicoDos'); 
        });


        const pregunta = this.add.image(550, 250, 'pregunta').setInteractive();
        pregunta.setScale(0.8);
        pregunta.setVisible(false);
        pregunta.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            pregunta.setScale(0.9); // Aumentar tamaño al pasar el ratón
        });
        pregunta.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            pregunta.setScale(0.8); // Volver al tamaño original 
        });
        this.tweens.add({
            targets: pregunta,
            alpha: .2,           // Aparece
            duration: 1000,      
            ease: 'Sine.easeInOut',
            yoyo: true,         // Regresa a su tamaño original
            repeat: -1          // Infinito
        });
        pregunta.on('pointerdown', () => {
            Swal.fire({
                title: '¿Qué es una Computadora?',
                input: 'radio',
                position: 'center-end',
                inputOptions: {
                  'a': 'Es un dispositivo electrónico que procesa datos y realiza cálculos',
                  'b': 'Es un dispositivo que solo sirve para navegar por Internet',
                  'c': 'Es un dispositivo que solo sirve para jugar videojuegos',
                },
                inputValidator: (value) => {
                  if (!value) {
                    return '¡Debes seleccionar una respuesta!';
                  }
                },
                showCancelButton: true,
                confirmButtonText: 'Responder',
                preConfirm: (respuesta) => {
                  const puntos = this.registry.get('puntos');
                  if (respuesta !== 'a') {
                    Swal.fire('Incorrecto', `Puntos restantes: ${puntos - 1}`, 'error');
                    this.registry.set('puntos', puntos - 1);
                  } else {
                     Swal.fire('¡Correcto!', 'Muy bien resuelto', 'success');
                      this.scene.start('BasicoDos');
                  }
                }
              });
              
            });


        const informacion = this.add.image(450, 300, 'informacion').setInteractive();
        informacion.setScale(0.4);
        informacion.setAlpha(.1); 
        informacion.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            informacion.setScale(0.5); // Aumentar tamaño al pasar el ratón
        });
        informacion.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            informacion.setScale(0.4); // Volver al tamaño original 
        });
        this.tweens.add({
            targets: informacion,
            alpha: .3,           // Aparece
            duration: 1000,      
            ease: 'Sine.easeInOut',
            yoyo: true,         // Regresa a su tamaño original
            repeat: -1          // Infinito
        });
        informacion.on('pointerdown', () => {
            Swal.fire({
                title: '¡Responde la pregunta de seguridad!',
                text: 'Me está pidiendo que responda una pregunta de opción múltiple para poder ingresar.¡Si no la resuelvo no podré ingresar!',
                confirmButtonText: 'Continuar',
                position: 'bottom',
                imageUrl: './assets/Personaje.png', // Ruta de la imagen
                imageWidth: 100, // Ancho de la imagen
                imageHeight: 100, // Alto de la imagen
                imageAlt: 'Exclamación', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
                        pregunta.setVisible(true);
                    }
                }) 
            });



    }
}
export default BasicoTres;