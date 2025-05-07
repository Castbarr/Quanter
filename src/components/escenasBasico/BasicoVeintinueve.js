import Phaser from "phaser";
import Swal from "sweetalert2";
import {mostrarPuntos} from '../Puntos'

class BasicoVeintinueve extends Phaser.Scene {
    constructor() {
        super({ key: 'BasicoVeintinueve' });
    }
    preload(){
    }
    create(){
        const sonidos = this.registry.get('sonidos');

        this.cameras.main.fadeIn(500, 0, 0, 0);
        sonidos.mmm.play();
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
            flecha.setVisible(true);
            sonidos.musicaEnfoque.play(); // Detener la música de fondo
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
                title: '¡Esta es la salida de emergencia!',
                html: `<p>¡Lo logramos!.¡Vamos a fuera!</p>`,
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                imageUrl: globalThis.personaje, // Ruta de la imagen
                imageWidth: 100, // Ancho de la imagen
                imageHeight: 100, // Alto de la imagen
                imageAlt: 'personaje', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
                        sonidos.vamos.play();
                    }
                })
        });
        });


        this.add.image(500, 300, 'salidaEmergencia');
        mostrarPuntos(this); // Mostrar puntos en la escena
        


        const flecha = this.add.image(500, 300, 'flecha').setInteractive();
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
            sonidos.abriendoPuerta.play(); // Reproducir la música de fondo
            sonidos.correr.play(); // Reproducir la música de fondo
            this.cameras.main.fadeOut(3000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoTreinta'); // Cambia a la escena BasicoDos
            });
        });   
        



    }
}
export default BasicoVeintinueve;