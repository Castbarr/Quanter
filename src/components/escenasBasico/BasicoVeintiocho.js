import Phaser from "phaser";
import { mostrarPuntos } from "../Puntos";
import Swal from "sweetalert2";

class BasicoVeintiocho extends Phaser.Scene {
    constructor() {
        super({ key: "BasicoVeintiocho" });
    }   
    preload() {
    }
    create() {
        const sonidos = this.registry.get("sonidos");
        sonidos.musicaFondo.setVolume(0.5);

        this.add.image(500, 300, "almacenMonitorApagado");
        this.add.image(593, 305, "pantallaContrasena");
        mostrarPuntos(this);

        

        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.once('camerafadeincomplete', () => {
            sonidos.peligroFinal.play();
            sonidos.musicaFondo.play();
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
                title: '¡Salgamos pronto de aquí!',
                html: `<p>Esta apunto de activarse la seguridad extrema. No alcanzo a salir por la puerta principal.
                Saldre por atras, por la de emergencia.¡Vamonos!</p>`,
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                imageUrl: globalThis.personaje, // Ruta de la imagen
                imageWidth: 100, // Ancho de la imagen
                imageHeight: 100, // Alto de la imagen
                imageAlt: 'personaje', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
                        sonidos.vamos.play();
                        flechaDos.setVisible(true);
                    }
                })
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
            sonidos.peligroFinal.stop();
            sonidos.musicaFondo.stop();
            sonidos.musicaFlecha.play();
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoVeintitres'); // Cambia a la escena BasicoDos
            });
        });



        const flechaDos = this.add.image(952, 300, 'flecha').setInteractive();
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
            sonidos.musicaFlecha.play();
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            sonidos.correr.play();
            this.scene.start('BasicoVeintinueve'); // Cambia a la escena BasicoDos
            });
        });









    }
}
export default BasicoVeintiocho;