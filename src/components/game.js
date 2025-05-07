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
import BasicoDieciocho from './escenasBasico/BasicoDieciocho';
import BasicoDiecinueve from './escenasBasico/BasicoDiecinueve';
import BasicoVeinte from './escenasBasico/BasicoVeinte';
import BasicoVeintiuno from './escenasBasico/BasicoVeintiuno';
import BasicoVeintidos from './escenasBasico/BasicoVeintidos';
import BasicoVeintitres from './escenasBasico/BasicoVeintitres';
import BasicoVeinticuatro from './escenasBasico/BasicoVeinticuatro';
import BasicoVeinticinco from './escenasBasico/BasicoVeinticinco';
import BasicoVeintiseis from './escenasBasico/BasicoVeintiseis';
import BasicoVeintisiete from './escenasBasico/BasicoVeintisiete';
import BasicoVeintiocho from './escenasBasico/BasicoVeintiocho';
import BasicoVeintinueve from './escenasBasico/BasicoVeintinueve';
import BasicoTreinta from './escenasBasico/BasicoTreinta';
import BasicoTreintaiuno from './escenasBasico/BasicoTreintaiuno';
import BasicoTreintaidos from './escenasBasico/BasicoTreintaidos';
import JuegoGanado from './escenasBasico/JuegoGanado';
import JuegoPerdido from './escenasBasico/JuegoPerdido';




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
    BasicoOnce, BasicoDoce, BasicoTrece, BasicoCatorce, BasicoQuince, BasicoDieciseis, BasicoDiecisiete, BasicoDieciocho, BasicoDiecinueve,
    BasicoVeinte, BasicoVeintiuno, BasicoVeintidos, BasicoVeintitres, BasicoVeinticuatro, BasicoVeinticinco, BasicoVeintiseis, BasicoVeintisiete,
    BasicoVeintiocho, BasicoVeintinueve, BasicoTreinta, BasicoTreintaiuno, BasicoTreintaidos, JuegoGanado, JuegoPerdido
  ]
};

const game = new Phaser.Game(config);
export default game;