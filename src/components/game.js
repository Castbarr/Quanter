import Phaser from 'phaser';
import EscenaArranque from './EscenaArranque';
import MenuPrincipal from './MenuPrincipal';
import Portada from './Portada';
import InicioBasico from './escenasBasico/InicioBasico';
import BasicoDos from './escenasBasico/BasicoDos';
import BasicoTres from './escenasBasico/BasicoTres';


const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    EscenaArranque,         // 👈 Esta inicia primero
    Portada,
    MenuPrincipal,
    InicioBasico,
    BasicoDos,
    BasicoTres
  ]
};

const game = new Phaser.Game(config);
export default game;