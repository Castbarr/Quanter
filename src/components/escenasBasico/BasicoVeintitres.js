import Phaser from "phaser";
import { mostrarPuntos } from "../Puntos";
import Swal from "sweetalert2";

class BasicoVeintitres extends Phaser.Scene {
    constructor() {
        super({ key: "BasicoVeintitres" });
    }   
    preload() {
    }
    create() {
        const sonidos = this.registry.get("sonidos");

        this.add.image(500, 300, "almacenMonitorApagado");
        this.add.image(593, 305, "pantallaContrasena");
        mostrarPuntos(this);

        this.cameras.main.setAlpha(0);
        this.time.delayedCall(5000, () => { // 2000 ms = 2 segundos de pantalla completamente oscura
            // 3. Hacer el fade in después del tiempo
            this.cameras.main.fadeIn(1000);
            this.cameras.main.setAlpha(1);
        });
        


        this.cameras.main.once('camerafadeincomplete', () => {
            sonidos.caminando.play(); // Reproducir el sonido de abrir puerta
            this.time.delayedCall(1000, () => {
            sonidos.musicaEnfoque.play(); // Reproducir el sonido de abrir puerta
            const cam = this.cameras.main;
            const originalX = cam.midPoint.x;
            const originalY = cam.midPoint.y;
            const originalZoom = cam.zoom;
            // 2. Pan + Zoom hacia la zona objetivo
            const targetX = 600;
            const targetY = 310;
            const zoomLevel = 2;
            const duration = 2000;
            cam.pan(targetX, targetY, duration, 'Power2');
            cam.zoomTo(zoomLevel, duration, 'Power2');
            // 3. Luego de terminar el zoom, volver atrás
            cam.once('camerazoomcomplete', () => {
                // Esperar un poco antes de volver (ej: 500ms)
                this.time.delayedCall(100, () => {
                sonidos.musicaEnfoque.play(); // Detener el sonido de abrir puerta
                cam.pan(originalX, originalY, duration, 'Power2');
                cam.zoomTo(originalZoom, duration, 'Power2');
                informacion.setVisible(true); // Mostrar el cuadro de información
                flecha.setVisible(true); // Hacer visible la flecha
                });
            });
            });
        });



        const flecha = this.add.image(40, 300, 'flecha').setInteractive();
        flecha.angle = -90; // Rotar la flecha 45 grados
        flecha.setScale(0.2); // Cambiar el tamaño de la flecha
        flecha.setVisible(false);
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
            this.scene.start('BasicoVeintidos'); // Cambia a la escena BasicoDos
            });
        });



        const informacion = this.add.image(592, 300, 'informacion').setInteractive();
        informacion.setScale(0.2);
        informacion.setAlpha(.1);
        informacion.setVisible(false); 
        informacion.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            informacion.setScale(0.3); // Aumentar tamaño al pasar el ratón
        });
        informacion.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            informacion.setScale(0.2); // Volver al tamaño original 
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
            sonidos.si.play(); // Reproducir el sonido de abrir puerta
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
                title: '¡Listo!',
                html: `<p>Computadora armada.¡Ingresemos!</p>`,
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                imageUrl: globalThis.personaje, // Ruta de la imagen
                imageWidth: 100, // Ancho de la imagen
                imageHeight: 100, // Alto de la imagen
                imageAlt: 'personaje', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
                        sonidos.vamos.play();
                        this.cameras.main.fadeOut(2000, 0, 0, 0);
                        this.cameras.main.once('camerafadeoutcomplete', () => {
                        sonidos.musicaFondo.stop();
                        this.scene.start('BasicoVeinticuatro'); // Cambia a la escena BasicoDos
                        });
                    }
                }) 
        });






    }
}
export default BasicoVeintitres;