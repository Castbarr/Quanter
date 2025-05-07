import Phaser from "phaser";
import { mostrarPuntos } from "../Puntos";
import Swal from "sweetalert2";

class BasicoNueve extends Phaser.Scene {
    constructor() {
        super({ key: "BasicoNueve" });
    }   
    preload() {
    }
    create() {
        const sonidos = this.registry.get("sonidos");

        this.add.image(500, 300, "almacenMonitorApagado");
        mostrarPuntos(this);

        this.cameras.main.fadeIn(500, 0, 0, 0);
        sonidos.musicaFondo.stop(); // Detener la música de fondo
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



        const flecha = this.add.image(90, 300, 'flecha').setInteractive();
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
            sonidos.abriendoPuerta.play(); // Reproducir el sonido de abrir puerta
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            sonidos.musicaFondo.play(); // Reproducir la música de fondo
            this.scene.start('BasicoOcho'); // Cambia a la escena BasicoDos
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
            sonidos.oH.play(); // Reproducir el sonido de abrir puerta
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
                title: '¡Esta es la computadora de seguridad!',
                html: `<p>Ahora debo buscar las piezas que le faltan.¡A buscar!</p>`,
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                imageUrl: globalThis.personaje, // Ruta de la imagen
                imageWidth: 100, // Ancho de la imagen
                imageHeight: 100, // Alto de la imagen
                imageAlt: 'personaje', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
                        sonidos.musicaInformacion.play(); // Reproducir el sonido de abrir puerta
                    }
                }) 
        });




        const tarjetaBase = this.add.image(380, 250, 'tarjetaMadreCaja').setInteractive();
        tarjetaBase.setScale(0.3);
        tarjetaBase.setAlpha(.3);
        tarjetaBase.setVisible(true); 
        tarjetaBase.on('pointerover', () => {
            sonidos.musicaEnfoqueDos.play(); // Reproducir el sonido de abrir puerta
            this.input.setDefaultCursor('pointer');
            tarjetaBase.setAlpha(1); // Aumentar tamaño al pasar el ratón
        });
        tarjetaBase.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            tarjetaBase.setAlpha(.3); // Volver al tamaño original 
        });
        tarjetaBase.on('pointerdown', () => {
            sonidos.mmm.play(); // Reproducir el sonido de abrir puerta
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
                title: '¡La placa base!',
                html: `<p>Podré sacarla de la caja si decifro el código de seguridad. ¡Intentemoslo!</p>`,
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                imageUrl: globalThis.personaje, // Ruta de la imagen
                imageWidth: 100, // Ancho de la imagen
                imageHeight: 100, // Alto de la imagen
                imageAlt: 'personaje', // Texto alternativo
                }).then((result) => {
                    if (result.isConfirmed) {
                        sonidos.vamos.play(); // Reproducir el sonido de abrir puerta
                        this.cameras.main.fadeOut(2000, 0, 0, 0);
                        this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('BasicoDiez'); 
                        });
                    }
                
                });
        });




    }
}
export default BasicoNueve;