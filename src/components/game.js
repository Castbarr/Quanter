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
import BasicoDiez from './escenasBasico/BasicoDiez';
import BasicoOnce from './escenasBasico/BasicoOnce';
import BasicoDoce from './escenasBasico/BasicoDoce';
import BasicoTrece from './escenasBasico/BasicoTrece';
import BasicoCatorce from './escenasBasico/BasicoCatorce';
import BasicoQuince from './escenasBasico/BasicoQuince';
import BasicoDieciseis from './escenasBasico/BasicoDieciseis';
import BasicoDiecisiete from './escenasBasico/BasicoDiecisiete';


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
    InicioBasico, BasicoDos, BasicoTres, BasicoCuatro, BasicoCinco, BasicoSeis, BasicoSiete, BasicoOcho, BasicoNueve, BasicoDiez,
    BasicoOnce, BasicoDoce, BasicoTrece, BasicoCatorce, BasicoQuince, BasicoDieciseis, BasicoDiecisiete
  ]
};

const game = new Phaser.Game(config);
export default game;