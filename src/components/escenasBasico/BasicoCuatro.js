import Phaser from "phaser";
import {mostrarPuntos} from '../Puntos'
import Swal from "sweetalert2";

class BasicoCuatro extends Phaser.Scene {
    constructor(){
        super({ key: 'BasicoCuatro' });
    }
    preload(){
    }

    create(){
        const sonidos = this.registry.get('sonidos'); // Obtener el objeto de sonidos del registro
        
        this.add.image(500, 300, 'oficinaSeguridadInterna');
        mostrarPuntos(this);


        this.cameras.main.fadeIn(500, 0, 0, 0);
        sonidos.musicaFondo.stop(); // Reproducir la música de fondo
        sonidos.caminando.play(); // Reproducir el sonido de caminar
        this.time.delayedCall(1000, () => {
        sonidos.musicaEnfoque.play();
        const cam = this.cameras.main;
        const originalX = cam.midPoint.x;
        const originalY = cam.midPoint.y;
        const originalZoom = cam.zoom;
        // 2. Pan + Zoom hacia la zona objetivo
        const zoomLevel = 2;
        const duration = 2000;
        cam.pan(200, 300, duration, 'Power2');
        cam.zoomTo(zoomLevel, duration, 'Power2');
        // 3. Luego de terminar el zoom, volver atrás
        cam.once('camerazoomcomplete', () => {
            cam.pan(700, 300, duration, 'Power2');
            cam.once('camerapancomplete', () => {
            this.time.delayedCall(100, () => {
                sonidos.musicaEnfoque.play(); // Reproducir el sonido de enfoque
                cam.pan(originalX, originalY, duration, 'Power2');
                cam.zoomTo(originalZoom, duration, 'Power2');
                flecha.setVisible(true); 
                informacion.setVisible(true); 
            });
        });
        });
        });


        const respuestas = this.cache.json.get('respuestas'); // Obtener el contenido del archivo JSON
        const respuestaCorrecta = Phaser.Math.RND.pick(respuestas.respuestasCorrectasDos);  ; // Obtener la respuesta correcta del JSON
        const respuestaIncorrecta = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasDos); // Obtener la respuesta incorrecta del JSON
        let respuestaIncorrectaDos = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasDos); // Obtener la respuesta incorrecta del JSON
        while (respuestaIncorrecta === respuestaIncorrectaDos) {
                    respuestaIncorrectaDos = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasDos); // Obtener la respuesta incorrecta del JSON
                }
        const grupoRespuestas = [respuestaCorrecta, respuestaIncorrecta, respuestaIncorrectaDos]; // Agrupar las respuestas
        Phaser.Utils.Array.Shuffle(grupoRespuestas); // Mezclar las respuestas

        const flecha = this.add.image(80, 300, 'flecha').setInteractive();
        flecha.setScale(0.2);
        flecha.angle = -90;
        flecha.setVisible(false); // Ocultar la flecha inicialmente
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
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoTres'); // Cambia a la escena BasicoDos
            }); 
        });



        const informacion = this.add.image(665, 420, 'informacion').setInteractive();
                informacion.setScale(0.3);
                informacion.setAlpha(.1);
                informacion.setVisible(false); 
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
                    sonidos.mmm.play(); // Reproducir el sonido de mmm
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
                        title: '¡Computadoras bloqueadas!',
                        html: `<p>Necesito acceder una computadora para saber cual es la de seguridad
                        que desbloquea los accesos.¡Vere si acierto a la pregunta de desbloqueo!</p>`,
                        confirmButtonText: 'Continuar',
                        allowOutsideClick: false,
                        imageUrl: globalThis.personaje, // Ruta de la imagen
                        imageWidth: 100, // Ancho de la imagen
                        imageHeight: 100, // Alto de la imagen
                        imageAlt: 'Exclamación', // Texto alternativo
                        }).then((result) => {
                            if (result.isConfirmed) {
                                sonidos.musicaInformacion.play(); // Reproducir el sonido de información
                                pregunta.setVisible(true);
                                libro.setVisible(true);
                                flecha.setVisible(true); // Mostrar la flecha al hacer clic en el cuadro de información
                            }
                        }) 
                    });
        
        const opciones = {
            'a': grupoRespuestas[0],
            'b': grupoRespuestas[1],
            'c': grupoRespuestas[2],
        };                        
        const pregunta = this.add.image(750, 350, 'pregunta').setInteractive();
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
            sonidos.tecleando.play(); // Reproducir el sonido de teclado
            pregunta.setVisible(false); // Ocultar el cuadro de información 
            Swal.fire({
            showClass: {
                popup: `
                  animate__animated
                  animate__zoomIn
                  animate__faster  
                `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__zoomOut
                animate__faster
                `
            },
            html: `<p>¡Selecciona una respuesta!</p>`,
            input: 'radio',
            allowOutsideClick: false,
            imageUrl: './assets/MonitorSeguridad.png', // Ruta de la imagen
            imageWidth: 199, // Ancho de la imagen
            imageHeight: 156, // Alto de la imagen
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
                sonidos.no.play(); // Reproducir el sonido de no  
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
                    Swal.close(); // Cierra la alerta anterior
                    this.scene.start('Portada'); // Reinicia la escena si los puntos son cero
                }
                } else {
                sonidos.si.play(); // Reproducir el sonido de si
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
                    html: `<p>Computadora desbloqueada. ¡Logré entrar!</p>`,
                    confirmButtonText: 'Continuar',
                    allowOutsideClick: false,
                    imageUrl: globalThis.personaje, // Ruta de la imagen
                    imageWidth: 100, // Ancho de la imagen
                    imageHeight: 100, // Alto de la imagen
                    imageAlt: 'Exclamación', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
                    sonidos.musicaInformacion.play(); // Reproducir el sonido de información
                    this.cameras.main.fadeOut(500, 0, 0, 0);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('BasicoCinco'); // Cambia a la escena BasicoCinco
                    });
                    }
                });
                }
            }
            });
        });


        const libro = this.add.image(890, 100, 'libro').setInteractive();
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
            sonidos.musicaLibro.play(); // Reproducir el sonido de libro
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
                 title: 'Partes de la computadora',
                 html: `<p>Una computadora es una máquina compuesta por dos partes principales: el hardware y el software.
                 El hardware es todo lo que puedes tocar físicamente. El software, por otro lado, es la parte lógica, es decir,
                 los programas que hacen que el hardware funcione.</p>`,
                 confirmButtonText: 'Continuar',
                 allowOutsideClick: false,
                 background: 'transparent url(./assets/Pergamino.png)',
             }).then((result) => {
                if (result.isConfirmed) {
                    sonidos.musicaLibro.play(); // Reproducir el sonido de libro
                    flecha.setVisible(true);
                }
            }) 
         });






    }

}
export default BasicoCuatro;