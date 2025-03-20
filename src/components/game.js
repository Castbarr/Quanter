import Phaser from 'phaser';
import InicioJuego from './InicioJuego';
import Menu from './menu';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene:[
    {create}, 
    Menu,
    InicioJuego
]
};

 function create() {
    this.scene.start('Menu');
}

const game = new Phaser.Game(config);

export default game;