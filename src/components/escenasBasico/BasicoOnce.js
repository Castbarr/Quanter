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
        const sonidos = this.registry.get("sonidos");


        this.add.image(500, 300, "almacenMonitorApagado");
        mostrarPuntos(this);


        this.cameras.main.fadeIn(1000, 0, 0, 0);
        sonidos.musicaFondo.play(); // Reproducir la música de fondo
        sonidos.caminando.play(); // Reproducir el sonido de caminar
        this.time.delayedCall(1000, () => {
        sonidos.musicaEnfoque.play();
        const cam = this.cameras.main;
        const originalX = cam.midPoint.x;
        const originalY = cam.midPoint.y;
        const originalZoom = cam.zoom;
        // 2. Pan + Zoom hacia la zona objetivo
        const zoomLevel = 1.5;
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
            sonidos.musicaFlecha.play(); // Reproducir el sonido de flecha
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
            sonidos.musicaEnfoqueDos.play(); // Reproducir el sonido de enfoque
        });
        cpuCaja.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            cpuCaja.setAlpha(.2); // Volver al tamaño original 
        });
        cpuCaja.on('pointerdown', () => {
            sonidos.mmmDos.play(); // Reproducir el sonido de mmm
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
                        sonidos.vamos.play(); // Reproducir el sonido de mmm
                        this.cameras.main.fadeOut(2000, 0, 0, 0);
                        this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('BasicoDoce'); 
                        });
                    }
                }) 
        });
    }




}
export default BasicoOnce;