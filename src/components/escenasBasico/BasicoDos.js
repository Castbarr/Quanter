import Phaser from "phaser";
import {mostrarPuntos} from '../Puntos'
import Swal from "sweetalert2";

class BasicoDos extends Phaser.Scene {
    constructor(){
        super({ key: 'BasicoDos' });
    }
    preload(){
        this.load.image('fondoBasicoDos', './assets/Pasillo.png');
        this.load.image('flecha', './assets/flecha.png');
        this.load.image('informacion', './assets/Exclamacion.png');

    }
    create(){
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.image(500, 300, 'fondoBasicoDos')
        mostrarPuntos(this);

        const flecha = this.add.image(80, 300, 'flecha').setInteractive();
        flecha.setScale(0.2);
        flecha.angle = -90;
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
            this.scene.start('InicioBasico'); // Cambia a la escena BasicoDos
            }); 
        });


        const flechaDos = this.add.image(440, 500, 'flecha').setInteractive();
        flechaDos.setScale(0.2);
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
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('BasicoTres'); // Cambia a la escena BasicoDos
            });  
        });


        const informacion = this.add.image(440, 350, 'informacion').setInteractive();
        informacion.setScale(0.4);
        informacion.setAlpha(.1);
        informacion.setVisible(true);
        informacion.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            informacion.setScale(0.5); // Aumentar tamaño al pasar el ratón
        });
        informacion.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            informacion.setScale(0.4); // Volver al tamaño original 
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
            informacion.setVisible(false);
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
                title: '¡Debo ir a la oficina de seguridad!',
                text: 'Ahí debe estar la computadora.¡Necesito darme prisa!',
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                imageUrl: './assets/Personaje.png', // Ruta de la imagen
                imageWidth: 100, // Ancho de la imagen
                imageHeight: 100, // Alto de la imagen
                imageAlt: 'Exclamación', // Texto alternativo
            }).then((result) => {
                if (result.isConfirmed) {
                    flechaDos.setVisible(true);
                }
            }) 
        });
        

       
    }

}
export default BasicoDos;