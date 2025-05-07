import Phaser from "phaser";
import { mostrarPuntos } from '../Puntos';
import Swal from "sweetalert2";

class BasicoVeinticinco extends Phaser.Scene {
    constructor() {
        super({ key: 'BasicoVeinticinco' });
    }
    preload() {
    }

    create() {
        const sonidos = this.registry.get('sonidos'); // Obtener el objeto de sonidos del registro

        this.cameras.main.fadeIn(500, 0, 0, 0);
        sonidos.suspiro.play(); // Reproducir el sonido de suspiro
        this.add.image(500, 300, 'computadoraSeguridad');
        mostrarPuntos(this);
        const imagen = this.add.image(521, 232, 'monitorCamaras');
        imagen.displayWidth = 645;
        imagen.displayHeight = 430;
        

        const respuestas = this.cache.json.get('respuestas'); // Obtener el contenido del archivo JSON
        const respuestaCorrecta = Phaser.Math.RND.pick(respuestas.respuestasCorrectasTrece);  ; // Obtener la respuesta correcta del JSON
        const respuestaIncorrecta = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasTrece); // Obtener la respuesta incorrecta del JSON
        let respuestaIncorrectaDos = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasTrece); // Obtener la respuesta incorrecta del JSON
        while (respuestaIncorrecta === respuestaIncorrectaDos) {
                    respuestaIncorrectaDos = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasTrece); // Obtener la respuesta incorrecta del JSON
                }
        const grupoRespuestas = [respuestaCorrecta, respuestaIncorrecta, respuestaIncorrectaDos]; // Agrupar las respuestas
        Phaser.Utils.Array.Shuffle(grupoRespuestas); // Mezclar las respuestas


        const flecha = this.add.image(40, 300, 'flecha').setInteractive();
        flecha.setScale(0.2);
        flecha.setVisible(true);
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
            sonidos.musicaFlecha.play(); // Reproducir el sonido de la flecha
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoVeinticuatro'); // Cambia a la escena BasicoDos
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
            sonidos.musicaLibro.play(); // Reproducir el sonido del libro
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
                  title: 'Tipos de software',
                  html:`<p>Existen varios tipos de software, cada uno con una función diferente. Está el software de sistema, como los sistemas operativos,
                  que hacen que toda la computadora funcione. Luego está el software de aplicación, que son los programas que usamos para hacer tareas específicas,
                  como escribir documentos, editar fotos o navegar por internet. También existe el software de programación,
                  que son las herramientas que usan los programadores para crear otros programas.
                  Cada tipo de software cumple un rol para que podamos usar la tecnología de forma sencilla y práctica.</p>`,
                 confirmButtonText: 'Continuar',
                 allowOutsideClick: false,
                 background: 'transparent url(./assets/Pergamino.png)',
             }).then((result) => {
                if (result.isConfirmed) {
                    sonidos.musicaLibro.play(); // Reproducir el sonido del libro
                }
            });
         });


        const candadoCerrado = this.add.image(530, 230, 'candadoCerrado').setInteractive();
        candadoCerrado.setScale(0.2);
        candadoCerrado.setAlpha(.4);
        candadoCerrado.setVisible(true); 
        candadoCerrado.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            candadoCerrado.setScale(0.25); // Aumentar tamaño al pasar el ratón
        });
        candadoCerrado.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            candadoCerrado.setScale(0.2); // Volver al tamaño original 
        });
        this.tweens.add({
            targets: candadoCerrado,
            alpha: 1,           // Aparece
            duration: 1000,      
            ease: 'Sine.easeInOut',
            yoyo: true,         // Regresa a su tamaño original
            repeat: -1          // Infinito
        });
        candadoCerrado.on('pointerdown', () => {
            sonidos.mmm.play(); // Reproducir el sonido de "mmm"
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
                title: '¡Desactivemos toda la seguridad!',
                html: `<p>Ya solo falta esto. Me queda poco tiempo, la seguridad extrema esta a punto de activarse. ¡De prisa</p>`,
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                imageUrl: globalThis.personaje, // Ruta de la imagen
                imageWidth: 100, // Ancho de la imagen
                imageHeight: 100, // Alto de la imagen
                imageAlt: 'personaje', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
                        sonidos.musicaInformacion.play(); // Reproducir el sonido de la información
                        libro.setVisible(true);
                        flecha.setVisible(true); // Mostrar la flecha al hacer clic en el cuadro de información
                        pregunta.setVisible(true); // Mostrar la pregunta al hacer clic en el cuadro de información
                    }
                }) 
        });



        const candadoAbierto = this.add.image(530, 230, 'candadoAbierto').setInteractive();
        candadoAbierto.setScale(0.2);
        candadoAbierto.setAlpha(.4);
        candadoAbierto.setVisible(false); 
        candadoAbierto.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            candadoAbierto.setScale(0.25); // Aumentar tamaño al pasar el ratón
        });
        candadoAbierto.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            candadoAbierto.setScale(0.2); // Volver al tamaño original 
        });
        this.tweens.add({
            targets: candadoAbierto,
            alpha: 1,           // Aparece
            duration: 1000,      
            ease: 'Sine.easeInOut',
            yoyo: true,         // Regresa a su tamaño original
            repeat: -1          // Infinito
        });
        candadoAbierto.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoVeintiseis'); // Cambia a la escena BasicoDos
            });
             
        });



        const opciones = {
            'a': grupoRespuestas[0],
            'b': grupoRespuestas[1],
            'c': grupoRespuestas[2],
        };                        
        const pregunta = this.add.image(530, 160, 'pregunta').setInteractive();
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
        sonidos.tecleando.play(); // Reproducir el sonido de teclado digital
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
            imageUrl: './assets/MonitorContrasenaDos.png', // Ruta de la imagen
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
                sonidos.no.play(); // Reproducir el sonido de "no"
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
                        this.scene.start('BasicoTreinta'); // Reinicia la escena si los puntos son cero
                        sonidos.peligroFinal.play();
                        sonidos.musicaFondo.stop();
                    }
                } else {
                    sonidos.si.play(); // Reproducir el sonido de "si"
                    candadoCerrado.setVisible(false);
                    candadoAbierto.setVisible(true);

                
                }
            }
            });
            
        });


    }
}
export default BasicoVeinticinco;