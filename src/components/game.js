import Phaser from 'phaser';
import EscenaArranque from './EscenaArranque';
import MenuPrincipal from './MenuPrincipal';
import Portada from './Portada';
import InicioBasico from './escenasBasico/InicioBasico';
import BasicoDos from './escenasBasico/BasicoDos';
import BasicoTres from './escenasBasico/BasicoTres';
import BasicoCuatro from './escenasBasico/BasicoCuatro';
import BasicoCinco from './escenasBasico/BasicoCinco';
import BasicoSeis from './escenasBasico/BasicoSeis';
import BasicoSiete from './escenasBasico/BasicoSiete';
import BasicoOcho from './escenasBasico/BasicoOcho';
import BasicoNueve from './escenasBasico/BasicoNueve';


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
    EscenaArranque, Portada, MenuPrincipal, 
    InicioBasico, BasicoDos, BasicoTres, BasicoCuatro, BasicoCinco, BasicoSeis, BasicoSiete, BasicoOcho, BasicoNueve
  ]
};

const game = new Phaser.Game(config);
export default game;