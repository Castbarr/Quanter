import Phaser from "phaser";
import { mostrarPuntos } from '../Puntos';
import Swal from "sweetalert2";
import 'animate.css';

class BasicoCinco extends Phaser.Scene {
    constructor() {
        super({ key: 'BasicoCinco' });
    }
    preload() {
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.image(500, 300, 'computadoraSeguridad');
        mostrarPuntos(this);

        const respuestas = this.cache.json.get('respuestas'); // Obtener el contenido del archivo JSON
        const respuestaCorrecta = Phaser.Math.RND.pick(respuestas.respuestasCorrectasTres);  ; // Obtener la respuesta correcta del JSON
        const respuestaIncorrecta = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasTres); // Obtener la respuesta incorrecta del JSON
        const respuestaIncorrectaDos = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasTres); // Obtener la respuesta incorrecta del JSON
        const grupoRespuestas = [respuestaCorrecta, respuestaIncorrecta, respuestaIncorrectaDos]; // Agrupar las respuestas
        Phaser.Utils.Array.Shuffle(grupoRespuestas); // Mezclar las respuestas


        const flecha = this.add.image(80, 300, 'flecha').setInteractive();
        flecha.setScale(0.2);
        flecha.setVisible(true);
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
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoCuatro'); // Cambia a la escena BasicoDos
            }); 
        });



        const libro = this.add.image(920, 100, 'libro').setInteractive();
        libro.setScale(0.2); // Cambiar el tamaño del libro
        libro.setVisible(false);
        libro.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            libro.setScale(0.3); // Aumentar tamaño al pasar el ratón
        });
        libro.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            libro.setScale(0.2); // Volver al tamaño original 
        });
        this.tweens.add({
            targets: libro,
            alpha: .2,           // Aparece
            duration: 1000,      
            ease: 'Sine.easeInOut',
            yoyo: true,         // Regresa a su tamaño original
            repeat: -1          // Infinito
        });
        libro.on('pointerdown', () => {
            Swal.fire({
                showClass: {
                    popup: `
                      animate__animated
                      animate__fadeInTopRight
                      animate__faster  `
                  },
                  hideClass: {
                    popup: `
                      animate__animated
                      animate__fadeOutTopRight
                      animate__faster
                    `
                  },
                 html: `
                 <h5 style="margin:0; padding:0"><strong>Hardware: ¡La parte física de la computadora!</strong></h5>
                 <br>
                 <h6 style="margin:0; padding:0; text-align: left"><strong>Componentes internos:</strong></h6>
                 <ul style="text-align: left;">
                     <li>Placa base (MotherBoard)</li>
                     <li>Procesador (CPU)</li>
                     <li>Memoria RAM</li>
                     <li>Disco duro</li>
                     <li>Tarjeta gráfica</li>
                     <li>Fuente de alimentación</li>
                     <li>Refrigeración</li>
                     </ul>`,
                 confirmButtonText: 'Continuar',
                 allowOutsideClick: false,
                 background: 'transparent url(./assets/Pergamino.png)',
             })
         });


        const informacion = this.add.image(530, 230, 'informacion').setInteractive();
        informacion.setScale(0.4);
        informacion.setAlpha(.1);
        informacion.setVisible(true); 
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
                title: '¡La carpeta de seguridad!',
                html: `<p>Esta protegida.¡Veamos!</p>`,
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                imageUrl: globalThis.personaje, // Ruta de la imagen
                imageWidth: 100, // Ancho de la imagen
                imageHeight: 100, // Alto de la imagen
                imageAlt: 'personaje', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
                        //pregunta.setVisible(true);
                        libro.setVisible(true);
                        flecha.setVisible(true); // Mostrar la flecha al hacer clic en el cuadro de información
                        pregunta.setVisible(true); // Mostrar la pregunta al hacer clic en el cuadro de información
                    }
                }) 
        });



        const opciones = {
            'a': grupoRespuestas[0],
            'b': grupoRespuestas[1],
            'c': grupoRespuestas[2],
        };                        
        const pregunta = this.add.image(750, 100, 'pregunta').setInteractive();
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
            html: `<p>¡Seleciona una respuesta!</p>`,
            input: 'radio',
            allowOutsideClick: false,
            imageUrl: './assets/MonitorCarpeta.png', // Ruta de la imagen
            imageWidth: 288, // Ancho de la imagen
            imageHeight: 225, // Alto de la imagen
            imageAlt: 'Exclamación', // Texto alternativo
            inputOptions: opciones,
            inputValidator: (value) => {
                if (!value) {
                return '¡Debes seleccionar una respuesta!';
                }
            },
            showCancelButton: false,
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
                        Swal.close(); // Cerrar el modal de incorrecto
                        this.scene.start('Portada'); // Reinicia la escena si los puntos son cero
                    }
                } else {
                    Swal.fire({
                    showClass: {
                        popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster  `
                        },
                    hideClass: {
                    popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                    `
                        },
                    title: '¡Desbloqueada!',
                    html: `<p>Veamos que dice.</p>`,
                    confirmButtonText: 'Continuar',
                    allowOutsideClick: false,
                    imageUrl: globalThis.personaje, // Ruta de la imagen
                    imageWidth: 100, // Ancho de la imagen
                    imageHeight: 100, // Alto de la imagen
                    imageAlt: 'Exclamación', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
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
                            title: 'Protocolo de seguridad',
                            html:`
                            <h6 style="margin:0; padding:0; text-align: left"><strong>Sobre la computadora de seguridad:</strong></h6>
                            <p style="margin:0; padding:0; text-align: left">La computadora de seguridad se encuentra en el área del almacén. 
                               La seguridad de nuestras instalaciones es primordial, por ello tomamos la decisión de retirar de ella sus 
                               componentes internos de hardware y distribuirlos ahí mismo por toda el área, pero dentro de contenedores 
                               que solo se abren con una pregunta de seguridad.
                            </p>`,
                            confirmButtonText: 'Continuar',
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                libro.setVisible(false); // Ocultar el libro al hacer clic en el cuadro de información
                                pregunta.setVisible(false); // Ocultar la pregunta al hacer clic en el cuadro de información
                                flechaDos.setVisible(true); // Mostrar la flecha al hacer clic en el cuadro de información
                                Swal.fire({
                                    showClass: {
                                        popup: `
                                          animate__animated
                                          animate__fadeInUp
                                          animate__faster  `
                                      },
                                    hideClass: {
                                    popup: `
                                        animate__animated
                                        animate__fadeOutDown
                                        animate__faster
                                    `
                                        },
                                    title: '¡Perfecto!',
                                    html: `<p>Vayamos al almacen.</p>`,
                                    confirmButtonText: 'Continuar',
                                    allowOutsideClick: false,
                                    imageUrl:globalThis.personaje, // Ruta de la imagen
                                    imageWidth: 100, // Ancho de la imagen
                                    imageHeight: 100, // Alto de la imagen
                                    imageAlt: 'Exclamación', // Texto alternativo
                                }); 
                            }
                        }); 
                    }
                });
                
                }
            }
            });
            
        });




        const flechaDos = this.add.image(900, 300, 'flecha').setInteractive();
        flechaDos.angle = 90; // Rotar la flecha 45 grados
        flechaDos.setScale(0.2); // Cambiar el tamaño de la flecha
        flechaDos.setVisible(false);
        flechaDos.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            flechaDos.setScale(0.3); // Aumentar tamaño al pasar el ratón
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
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoSeis'); 
            });
        });

    }
}
export default BasicoCinco;