import Phaser from "phaser";
import Swal from "sweetalert2";
import {mostrarPuntos} from '../Puntos'

class InicioBasico extends Phaser.Scene {
    constructor() {
        super({ key: 'InicioBasico' });
    }
    preload(){
    }
    create(){
        const sonidos = this.registry.get('sonidos');

        this.cameras.main.fadeIn(500, 0, 0, 0);
        sonidos.uf.play();
        this.time.delayedCall(1000, () => {
        sonidos.musicaEnfoque.play(); // Reproducir la música de fondo
        const cam = this.cameras.main;
        cam.setBounds(0, 0, 1000, 600);
        cam.setZoom(1);
        // Zoom automático al entrar en la escena
        cam.zoomTo(2, 1000); // Zoom in
        cam.pan(500, 300, 1000, 'Power2');
        this.time.delayedCall(2000, function () {
            cam.zoomTo(1, 1000); // Zoom out
            informacion.setVisible(true);
            sonidos.musicaEnfoque.play(); // Detener la música de fondo
        });
        });

        this.add.image(500, 300, 'fondoPuerta');
        mostrarPuntos(this); // Mostrar puntos en la escena

        const informacion = this.add.image(503, 260, 'informacion').setInteractive();
        informacion.setAlpha(.1);
        informacion.setScale(0.3); // Cambiar el tamaño del cuadro
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
            alpha: .2,           // Aparece
            duration: 1000,      
            ease: 'Sine.easeInOut',
            yoyo: true,         // Regresa a su tamaño original
            repeat: -1          // Infinito
        });
        informacion.on('pointerdown', () => {
            sonidos.mmm.play(); // Reproducir la música de fondo
            informacion.setVisible(false); // Ocultar el cuadro de información
            Swal.fire({
                  showClass:{
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
                 title: '¡Estoy atrapado!',
                 html:`
                 <p>Tengo que encontrar la computadora de seguridad.¡Es mi unica oportunidad!</p>
                 `,
                 confirmButtonText: 'Continuar',
                 allowOutsideClick: false,
                 imageUrl: globalThis.personaje, // Ruta de la imagen
                 imageWidth: 100, // Ancho de la imagen
                 imageHeight: 100, // Alto de la imagen
                 imageAlt: 'Exclamación', // Texto alternativo   
             }).then((result) => {
                 if (result.isConfirmed) {
                     sonidos.musicaInformacion.play(); // Detener la música de fondo
                     libro.setVisible(true);
                 }
             }) 
         });


        const flecha = this.add.image(900, 300, 'flecha').setInteractive();
        flecha.angle = 90; // Rotar la flecha 45 grados
        flecha.setScale(0.2); // Cambiar el tamaño de la flecha
        flecha.setVisible(false);
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
            sonidos.musicaFlecha.play(); // Reproducir la música de fondo
            sonidos.caminando.play(); // Reproducir la música de fondo
            this.cameras.main.fadeOut(3000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoDos'); // Cambia a la escena BasicoDos
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
            sonidos.musicaLibro.play(); // Reproducir la música de fondo
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
                 title: '¿Qué es una computadora?',
                 html:`<p>Una computadora es una máquina electrónica que procesa información y ejecuta tareas según instrucciones.
                 Es esencialmente un cerebro digital que ayuda en el trabajo, el entretenimiento y la comunicación.</p>`,
                 confirmButtonText: 'Continuar',
                 allowOutsideClick: false,
                 background: 'transparent url(./assets/Pergamino.png)',
             }).then((result) => {
                if (result.isConfirmed) {
                    sonidos.musicaLibro.play(); // Detener la música de fondo
                    flecha.setVisible(true);
                }
            }) 
         });

    }
}
export default InicioBasico;