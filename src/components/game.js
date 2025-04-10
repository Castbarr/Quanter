import Phaser from 'phaser';
import MenuPrincipal from './MenuPrincipal';
import Portada from './Portada';

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene:[
    {create}, 
    Portada,
    MenuPrincipal
]
};

 function create() {
    this.scene.start('Portada');
}

const game = new Phaser.Game(config);

export default game;