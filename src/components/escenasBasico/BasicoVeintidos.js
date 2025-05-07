import Phaser from "phaser";
import { mostrarPuntos } from "../Puntos";
import Swal from "sweetalert2";

class BasicoVeintidos extends Phaser.Scene {
    constructor() {
        super({ key: "BasicoVeintidos" });
    }
    preload() {
    }
    create(){
        const sonidos = this.registry.get("sonidos");


        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.cameras.main.once('camerafadeincomplete', () => {
          sonidos.musicaEnfoque.play(); // Reproducir el sonido de abrir puerta
        });
        this.add.image(500, 300, "almacenDesenfocado");
        mostrarPuntos(this);


        const respuestas = this.cache.json.get('respuestas'); // Obtener el contenido del archivo JSON
        const respuestaCorrecta = Phaser.Math.RND.pick(respuestas.respuestasCorrectasOnce); // Obtener la respuesta correcta del JSON
        const respuestaIncorrecta = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasOnce); // Obtener la respuesta incorrecta del JSON
        let respuestaIncorrectaDos = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasOnce); // Obtener la respuesta incorrecta del JSON
        while (respuestaIncorrecta === respuestaIncorrectaDos) {
            respuestaIncorrectaDos = Phaser.Math.RND.pick(respuestas.respuestasIncorrectasOnce); // Obtener la respuesta incorrecta del JSON
        }
        const grupoRespuestas = [respuestaCorrecta, respuestaIncorrecta, respuestaIncorrectaDos]; // Agrupar las respuestas
        Phaser.Utils.Array.Shuffle(grupoRespuestas); // Mezclar las respuestas


        const caja = this.add.image(500, 300, "fuentePoderCaja");
        caja.setScale(0.1); // Cambiar el tamaño de la caja
        this.tweens.add({
            targets: caja,
            scale: 1, // Cambiar el tamaño de la caja
            duration: 1000,
        });


        const flecha = this.add.image(40, 300, 'flecha').setInteractive();
        flecha.angle = -90; // Rotar la flecha 45 grados
        flecha.setScale(0.2); // Cambiar el tamaño de la flecha
        flecha.setVisible(true);
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
            sonidos.musicaFlecha.play();
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoVeintiuno'); // Cambia a la escena BasicoDos
            });
        });


       const opciones = {
            'a': grupoRespuestas[0],
            'b': grupoRespuestas[1],
            'c': grupoRespuestas[2],
        };
        const pregunta = this.add.image(500, 300, 'pregunta').setInteractive();
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
            sonidos.tecladoDigital.play();
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
              html: `<h5><strong>¡Selecciona la afirmación correcta sobre la fuente de alimentación!</strong></h5>`,
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
                sonidos.no.play();
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
                  Swal.close(); // Cerrar el modal
                  this.scene.start('BasicoTreinta'); // Reinicia la escena si los puntos son cero
                  sonidos.peligroFinal.play();
                  sonidos.musicaFondo.stop();
                  }
                } else {
                 sonidos.si.play();
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
                  title: '¡Sobresaliente!',
                  html: `<p>Fuente de poder obtenida. ¡Tengo todos los componentes! a colocarlos</p>`,
                  confirmButtonText: 'Continuar',
                  allowOutsideClick: false,
                  imageUrl:'assets/FuenteDeAlimentacion.png', // Ruta de la imagen;
                  imageWidth: 180, // Ancho de la imagen
                  imageHeight: 120, // Alto de la imagen
                  imageAlt: 'Exclamación', // Texto alternativo
                }).then((result) => {
                  if (result.isConfirmed) {
                    sonidos.vamos.play();
                    sonidos.armandoPC.play();
                    this.cameras.main.fadeOut(2000, 0, 0, 0);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('BasicoVeintitres'); // Cambia a la escena BasicoDos
                    });
                  }
                });
                }
              }
              });
              
            });


        const libro = this.add.image(890, 100, 'libro').setInteractive();
        libro.setScale(0.2); // Cambiar el tamaño del libro
        libro.setVisible(true);
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
            sonidos.musicaLibro.play();
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
                 title: 'La fuente de alimentación',
                 html:`<p>La fuente de alimentación, tambien conocida como fuente de poder o PSU(por sus siglas en inglés: Power Supply Unit),
                 es el componente que se encarga de darle energía a toda la computadora.
                 Toma la corriente eléctrica del enchufe y la convierte en voltajes adecuados para que funcionen el procesador,
                 la placa base, el disco duro, la tarjeta gráfica y todo lo demás. Sin ella, ningún componente podría encender ni hacer nada.
                 Es como el cargador interno del equipo, y es fundamental para que todo reciba la energía necesaria de forma segura.</p>`,
                 confirmButtonText: 'Continuar',
                 allowOutsideClick: false,
                 background: 'transparent url(./assets/Pergamino.png)',
             }).then((result) => {
                if (result.isConfirmed) {
                    sonidos.musicaLibro.play();
                    pregunta.setVisible(true);
                }
            }) 
         });




    }



}
export default BasicoVeintidos;