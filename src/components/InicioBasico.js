import Phaser from "phaser";
import Swal from "sweetalert2";

class InicioBasico extends Phaser.Scene {
    constructor() {
        super({ key: 'InicioBasico' });
    }
    preload(){
        this.load.image('fondoPuerta', './assets/PuertaBasico.png');
        this.load.image('flecha', './assets/flecha.png');
        this.load.image('cuadroClick', './assets/cuadroClick.png');
        this.load.image('libro', './assets/Libro.png');
    }
    create(){
        this.add.image(500, 300, 'fondoPuerta');


        const cuadroClick = this.add.image(503, 260, 'cuadroClick').setInteractive();
        cuadroClick.setAlpha(.1);
        cuadroClick.setScale(0.6); // Cambiar el tamaño del cuadro
        cuadroClick.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            cuadroClick.setScale(0.65); // Aumentar tamaño al pasar el ratón
        });
        cuadroClick.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            cuadroClick.setScale(0.6); // Volver al tamaño original 
        });
        this.tweens.add({
            targets: cuadroClick,
            alpha: .2,           // Aparece
            duration: 1000,      
            ease: 'Sine.easeInOut',
            yoyo: true,         // Regresa a su tamaño original
            repeat: -1          // Infinito
        });
        cuadroClick.on('pointerdown', () => {
            Swal.fire({
                 title: '¡Estoy atrapado!',
                 text: 'Tengo que encontrar la computadora de seguridad.¡Es mi unica oportunidad!',
                 confirmButtonText: 'Continuar',
                 position: 'bottom',
             }).then((result) => {
                 if (result.isConfirmed) {
                     libro.setVisible(true);
                 }
             }) 
         });


        const flecha = this.add.image(900, 300, 'flecha').setInteractive();
        flecha.angle = 90; // Rotar la flecha 45 grados
        flecha.setScale(0.3); // Cambiar el tamaño de la flecha
        flecha.setVisible(false);
        flecha.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            flecha.setScale(0.4); // Aumentar tamaño al pasar el ratón
        });
        flecha.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            flecha.setScale(0.3); // Volver al tamaño original 
        });
        this.tweens.add({
            targets: flecha,
            alpha: .2,           // Aparece
            duration: 1000,      
            ease: 'Sine.easeInOut',
            yoyo: true,         // Regresa a su tamaño original
            repeat: -1          // Infinito
        });
        


        const libro = this.add.image(890, 100, 'libro').setInteractive();
        libro.setScale(0.3); // Cambiar el tamaño del libro
        libro.setVisible(false);
        libro.on('pointerover', () => {
            this.input.setDefaultCursor('pointer');
            libro.setScale(0.4); // Aumentar tamaño al pasar el ratón
        });
        libro.on('pointerout', () => {
            this.input.setDefaultCursor('default');
            libro.setScale(0.3); // Volver al tamaño original 
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
            Swal.fire({
                 title: '¿Qué es una computadora?',
                 text: 'Una computadora es como una gran caja de herramientas inteligente diseñada para ayudarte a hacer todo tipo de tareas.\
                 Piensa en ella como un conjunto de partes trabajando juntas: tiene un cerebro (procesador) que ejecuta instrucciones súper rápido,\
                 una memoria (RAM) para recordar cosas mientras trabaja, y un espacio para guardar tus archivos y programas (disco duro o SSD).\
                 Tú interactúas con ella a través de una pantalla, teclado, mouse, o incluso tu voz, y es capaz de conectarse con otros dispositivos\
                 o la internet para ampliar lo que puede hacer. Básicamente, es una máquina que combina tecnología y lógica para transformar tus ideas\
                 en acciones.',
                 confirmButtonText: 'Continuar',
                 position: 'top-end',
                 background: 'transparent url(./assets/Pergamino.png)',
             }).then((result) => {
                if (result.isConfirmed) {
                    flecha.setVisible(true);
                }
            }) 
         });

    }
}
export default InicioBasico;