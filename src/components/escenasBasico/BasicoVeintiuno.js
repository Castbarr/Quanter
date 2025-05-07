import Phaser from "phaser";
import { mostrarPuntos } from "../Puntos";
import Swal from "sweetalert2";

class BasicoVeintiuno extends Phaser.Scene{
    constructor(){
        super({ key: "BasicoVeintiuno" });
    }
    preload(){
    }
    create(){
        const sonidos = this.registry.get("sonidos");


        this.add.image(500, 300, "almacenMonitorApagado");
        mostrarPuntos(this);


        this.cameras.main.fadeIn(500, 0, 0, 0);
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
            sonidos.musicaFlecha.play();
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoVeinte'); // Cambia a la escena BasicoDos
            });
        });



        const discoCaja = this.add.image(840, 210, 'fuentePoderCaja').setInteractive();
        discoCaja.setScale(0.3);
        discoCaja.setAlpha(.2);
        discoCaja.setVisible(true); 
        discoCaja.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            discoCaja.setAlpha(1); // Aumentar tamaño al pasar el ratón
            sonidos.musicaEnfoqueDos.play(); 
        });
        discoCaja.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            discoCaja.setAlpha(.2); // Volver al tamaño original
        });
        discoCaja.on('pointerdown', () => {
            sonidos.mmm.play();
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
                title: '¡La fuente de alimentación!',
                html: `<p>Es la ultima pieza. ¡De prisa! a descifrar el codigo</p>`,
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
                        this.scene.start('BasicoVeintidos'); 
                        }); 
                    }
                }) 
        });
    }




}
export default BasicoVeintiuno;