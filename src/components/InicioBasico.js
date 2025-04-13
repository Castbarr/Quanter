import Phaser from "phaser";
import Swal from "sweetalert2";

class InicioBasico extends Phaser.Scene {
    constructor() {
        super({ key: 'InicioBasico' });
    }
    preload(){
        this.load.image('fondoPuerta', './assets/PuertaBasico.png');
    }
    create(){
        this.add.image(500, 300, 'fondoPuerta');

        this.input.on('pointerdown', () => {
           Swal.fire({
                title: '¡Estoy atrapado!',
                text: 'Tengo que encontrar la computadora de seguridad.¡Es mi unica oportunidad!',
                confirmButtonText: 'Continuar',
            })
             
        });
    }
}
export default InicioBasico;