import Phaser from "phaser";
import { mostrarPuntos } from "../Puntos";
import Swal from "sweetalert2";

class BasicoOnce extends Phaser.Scene{
    constructor(){
        super({ key: "BasicoOnce" });
    }
    preload(){
    }
    create(){
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.image(500, 300, "almacenMonitorApagado");
        mostrarPuntos(this);

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
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoDiez'); // Cambia a la escena BasicoDos
            });
        });



        const cpuCaja = this.add.image(590, 220, 'procesadorCaja').setInteractive();
        cpuCaja.setScale(0.3);
        cpuCaja.setAlpha(.2);
        cpuCaja.setVisible(true); 
        cpuCaja.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            cpuCaja.setAlpha(1); // Aumentar tamaño al pasar el ratón
        });
        cpuCaja.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            cpuCaja.setAlpha(.2); // Volver al tamaño original 
        });
        cpuCaja.on('pointerdown', () => {
            // informacion.setVisible(false); // Ocultar el cuadro de información
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
                title: '¡El procesador!',
                html: `<p>Decifremos el codigo de seguridad. ¡Hagamoslo!</p>`,
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                imageUrl: globalThis.personaje, // Ruta de la imagen
                imageWidth: 100, // Ancho de la imagen
                imageHeight: 100, // Alto de la imagen
                imageAlt: 'personaje', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.scene.start('BasicoDoce'); 
                    }
                }) 
        });
    }




}
export default BasicoOnce;