import Phaser from "phaser";
import {mostrarPuntos} from '../Puntos'
import Swal from "sweetalert2";


class BasicoTres extends Phaser.Scene{
    constructor(){
        super({ key: 'BasicoTres' });
    }
    preload(){
    }
    create(){
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.image(500, 300, 'oficinaSeguridad');
        mostrarPuntos(this);

        const respuestas = this.cache.json.get('respuestas'); // Obtener el contenido del archivo JSON
        const respuestaCorrecta = Phaser.Math.RND.pick(respuestas.respuestasCorrectasUno);  ; // Obtener la respuesta correcta del JSON
        const respuestaIncorrecta = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasUno); // Obtener la respuesta incorrecta del JSON
        let respuestaIncorrectaDos = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasUno); // Obtener la respuesta incorrecta del JSON
        while (respuestaIncorrecta === respuestaIncorrectaDos) {
                    respuestaIncorrectaDos = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasUno); // Obtener la respuesta incorrecta del JSON
                }
        const grupoRespuestas = [respuestaCorrecta, respuestaIncorrecta, respuestaIncorrectaDos]; // Agrupar las respuestas
        Phaser.Utils.Array.Shuffle(grupoRespuestas); // Mezclar las respuestas


        const flecha = this.add.image(80, 300, 'flecha').setInteractive();
        flecha.setScale(0.2);
        flecha.angle = -90;
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
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoDos'); // Cambia a la escena BasicoDos
            });
        });


        const opciones = {
            'a': grupoRespuestas[0],
            'b': grupoRespuestas[1],
            'c': grupoRespuestas[2],
        };
        const pregunta = this.add.image(550, 250, 'pregunta').setInteractive();
        pregunta.setScale(0.7);
        pregunta.setVisible(false);
        pregunta.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            pregunta.setScale(0.8); // Aumentar tamaño al pasar el ratón
        });
        pregunta.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            pregunta.setScale(0.7); // Volver al tamaño original 
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
            pregunta.setVisible(false); // Ocultar el cuadro de información 
            Swal.fire({
                showClass: {
                    popup: `
                      animate__animated
                      animate__zoomIn
                      animate__faster  `
                  },
                hideClass: {
                    popup: `
                        animate__animated
                        animate__zoomOut
                        animate__faster
                    `
                        },
                title: '¿Qué es una Computadora?',
                input: 'radio',
                allowOutsideClick: false,
                inputOptions: opciones,
                inputValidator: (value) => {
                  if (!value) {
                    return '¡Debes seleccionar una respuesta!';
                  }
                },
                showCancelButton:false,
                confirmButtonText: 'Responder',
                preConfirm: (respuesta) => {
                  const respuestaSeleccionada = opciones[respuesta]; // Obtener la respuesta seleccionada
                  const puntos = this.registry.get('puntos');
                  if (respuestaSeleccionada !== respuestaCorrecta) {
                    pregunta.setVisible(true);  
                    Swal.fire({
                        title: '¡Incorrecto!',
                        html: `<p>Puntos restantes: ${puntos - 1}</p>`,
                        imageUrl: './assets/mano.gif', // Ruta de la imagen
                        imageWidth: 100, // Ancho de la imagen
                        imageHeight: 100, // Alto de la imagen
                        imageAlt: 'personaje', // Texto alternativo
                        confirmButtonText: 'Intentar de nuevo',
                        allowOutsideClick: false,
                    });
                    this.registry.set('puntos', puntos - 1); // Restar un punto
                    if (puntos === 1) {
                        Swal.close(); // Cierra la alerta de incorrecto
                        this.scene.start('Portada'); // Reinicia la escena si los puntos son cero
                      }
                  } else {
                     Swal.fire({
                        showClass: {
                            popup: `
                              animate__animated
                              animate__fadeInUp
                              animate__faster
                            `
                          },
                        hideClass: {
                            popup: `
                                animate__animated
                                animate__fadeOutDown
                                animate__faster
                        `
                          },
                        title: '¡Perfecto!',
                        html: `<p>Desbloqueada. ¡Entremos!</p>`,
                        confirmButtonText: 'Continuar',
                        allowOutsideClick: false,
                        imageUrl: globalThis.personaje,
                        imageWidth: 100, // Ancho de la imagen
                        imageHeight: 100, // Alto de la imagen
                        imageAlt: 'Exclamación', // Texto alternativo
                    }).then((result) => {
                        if (result.isConfirmed) {
                          this.cameras.main.fadeOut(500, 0, 0, 0);
                          this.cameras.main.once('camerafadeoutcomplete', () => {
                            this.scene.start('BasicoCuatro'); // Cambia a la escena BasicoDos
                          });
                        }
                      });
                  }
                }
              });
              
            });


        const informacion = this.add.image(450, 300, 'informacion').setInteractive();
        informacion.setScale(0.3);
        informacion.setAlpha(.1);
        informacion.setVisible(true); 
        informacion.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            informacion.setScale(0.4); // Aumentar tamaño al pasar el ratón
        });
        informacion.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            informacion.setScale(0.3); // Volver al tamaño original 
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
            informacion.setVisible(false); // Ocultar el cuadro de información
            Swal.fire({
                showClass: {
                    popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `
                  },
                hideClass: {
                    popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                `
                  },
                title: '¡Puerta bloqueada!',
                html: `<p>Necesito responder correctamente la pregunta de seguridad.¡Si no la resuelvo no podré ingresar!</p>`,
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                imageUrl: globalThis.personaje, // Ruta de la imagen
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