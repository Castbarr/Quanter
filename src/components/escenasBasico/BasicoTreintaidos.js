import Phaser from "phaser";
import Swal from "sweetalert2";
import { mostrarPuntos } from '../Puntos';

class BasicoTreintaidos extends Phaser.Scene {
    constructor() {
        super({ key: 'BasicoTreintaidos' });
    }

    preload() {
        // Asegúrate de precargar todos los assets que usarás aquí si aún no están cargados
    }

    create() {
        const sonidos = this.registry.get('sonidos');

        // Fade de entrada
        this.cameras.main.fadeIn(2000, 0, 0, 0);
        sonidos.si.play();

        this.time.delayedCall(1000, () => {
            sonidos.musicaEnfoque.play(); // Reproducir música

            const cam = this.cameras.main;
            cam.setBounds(0, 0, 1000, 600);
            cam.setZoom(1);
            cam.zoomTo(2, 1000); // Zoom in
            cam.pan(500, 400, 1000, 'Power2');

            this.time.delayedCall(2000, () => {
                cam.zoomTo(1, 1000); // Zoom out

                // Asegúrate de no superponer música si ya está sonando
                if (sonidos.musicaEnfoque.isPlaying) {
                    sonidos.musicaEnfoque.stop();
                }
                sonidos.musicaEnfoque.play();
                sonidos.si.play();
                sonidos.musicaFondo.stop();
                sonidos.peligroFinal.stop();

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
                    title: '¡Eres el mejor!',
                    html: `<p>¡Logramos salir!.¡GANAMOS!</p>`,
                    confirmButtonText: 'Continuar',
                    allowOutsideClick: false,
                    imageUrl: globalThis.personaje,
                    imageWidth: 100,
                    imageHeight: 100,
                    imageAlt: 'personaje',
                }).then((result) => {
                    if (result.isConfirmed) {
                        sonidos.sonidoVictoriaFinal.play();
                        this.cameras.main.fadeOut(3000, 0, 0, 0);
                        this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('JuegoGanado'); // Cambia a la escena BasicoDos
                        });
                    }
                });
            });
        });

        // Imagen de fondo o principal
        this.add.image(500, 300, 'frenteCorporacion');

        // Mostrar puntos
        mostrarPuntos(this);
    }
}

export default BasicoTreintaidos;
