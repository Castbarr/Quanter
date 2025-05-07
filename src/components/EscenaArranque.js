import Phaser from 'phaser';
// Dentro del script de tu componente Vue
import 'animate.css';

export default class EscenaArranque extends Phaser.Scene {
    constructor() {
      super('EscenaArranque');
    }

    preload() {
      // Cargar imágenes y recursos necesarios
      this.load.image('personaje', './assets/Personaje.png');
      this.load.image('fondoPuerta', './assets/PuertaBasico.png');
      this.load.image('flecha', './assets/flecha.png');
      this.load.image('informacion', './assets/Exclamacion.png');
      this.load.image('libro', './assets/Libro.png');
      this.load.image('fondo', './assets/FondoJuegoComputacion.png');
      this.load.image('logoCompu', './assets/LogoCompu.png');
      this.load.image('fondoMenu', './assets/imgMenu/FondoMenu.png');
      this.load.image('logoMenu', './assets/imgMenu/LogoMenu.png');
      this.load.image('botonBasico', './assets/imgMenu/BotonBasico.png');
      this.load.image('botonMedio', './assets/imgMenu/BotonMedio.png');
      this.load.image('botonAvanzado', './assets/imgMenu/BotonAvanzado.png');
      this.load.image('pasillo', './assets/Pasillo.png');
      this.load.image('oficinaSeguridad', './assets/OficinaSeguridad.png');
      this.load.image('pregunta', './assets/Globo.png');
      this.load.image('oficinaSeguridadInterna', './assets/OficinaSeguridadInterna.png');
      this.load.image('computadoraSeguridad', './assets/ComputadoraFrente.png');
      this.load.image("pasilloDos", "./assets/PasilloDos.png");
      this.load.image("puertaAlmacen", "./assets/PuertaAlmacen.png");
      this.load.image("almacen", "./assets/Almacen.png");
      this.load.image("mano", "./assets/mano.gif");
      this.load.image("discoCaja", "./assets/DiscoCaja.png");
      this.load.image("fuentePoderCaja", "./assets/FuentePoderCaja.png");
      this.load.image("memoriaCaja", "./assets/MemoriaCaja.png");
      this.load.image("procesadorCaja", "./assets/ProcesadorCaja.png");
      this.load.image("refrigeracionCaja", "./assets/RefrigeracionCaja.png");
      this.load.image("tarjetaGraficaCaja", "./assets/TarjetaGraficaCaja.png");
      this.load.image("tarjetaMadreCaja", "./assets/TarjetaMadreCaja.png");
      this.load.image("almacenMonitorApagado", "./assets/AlmacenMonitorApagado.png");
      this.load.image("almacenDesenfocado", "./assets/AlmacenDesenfocado.png");
      this.load.image('pantallaContrasena', './assets/PantallaContrasena.png');
      this.load.image('contrasenaPC', './assets/ContrasenaPC.png');
      this.load.image('monitorCamaras', './assets/MonitorCamaras.png');
      this.load.image('candadoAbierto', './assets/CandadoAbierto.png');
      this.load.image('candadoCerrado', './assets/CandadoCerrado.png');
      this.load.image('salidaEmergencia', './assets/SalidaEmergencia.png');
      this.load.image('laser', './assets/Laser.png');
      this.load.image('robotSeguridad', './assets/RobotSeguridad.png');
      this.load.image('frenteCorporacion', './assets/FrenteCorporacion.png');
      this.load.image('fondoFinalGanador', './assets/FondoFinalGanador.png');
      this.load.image('fondoFinalPerdedor', './assets/FondoFinalPerdedor.png');
      this.load.image('pergamino', './assets/Pergamino.png');
      this.load.image('aprobado', './assets/Aprobado.png');
      this.load.image('reprobado', './assets/Reprobado.png');
      this.load.json('respuestas', './assets/respuestas.json');
      this.load.audio('musicaFondo', './assets/sonidos/MusicaFondo.mp3');
      this.load.audio('click', './assets/sonidos/Click.mp3');
      this.load.audio('musicaEnfoque', './assets/sonidos/MusicaPuertaInicial.mp3');
      this.load.audio('musicaInformacion', './assets/sonidos/Informacion.mp3');
      this.load.audio('musicaLibro', './assets/sonidos/Libro.mp3');
      this.load.audio('musicaFlecha', './assets/sonidos/Flecha.mp3');
      this.load.audio('uf', './assets/sonidos/Uf.mp3');
      this.load.audio('mmm', './assets/sonidos/Mmm.mp3');
      this.load.audio('suspiro', './assets/sonidos/Suspiro.mp3');
      this.load.audio('tecladoDigital', './assets/sonidos/TecladoDigital.mp3');
      this.load.audio('si', './assets/sonidos/Siii.mp3');
      this.load.audio('abriendoPuerta', './assets/sonidos/AbriendoPuerta.mp3');
      this.load.audio('oH', './assets/sonidos/OooH.mp3');
      this.load.audio('musicaLibro', './assets/sonidos/MusicaLibro.mp3');
      this.load.audio('no', './assets/sonidos/Nooo.mp3');
      this.load.audio('caminando', './assets/sonidos/Caminando.mp3');
      this.load.audio('mmmDos', './assets/sonidos/MmmDos.mp3');
      this.load.audio('correr', './assets/sonidos/Correr.mp3');
      this.load.audio('tecleando', './assets/sonidos/Tecleando.mp3');
      this.load.audio('vamos', './assets/sonidos/Vamos.mp3');
      this.load.audio('oHDos', './assets/sonidos/OooHDos.mp3');
      this.load.audio('musicaEnfoqueDos', './assets/sonidos/EnfoqueDos.mp3');
      this.load.audio('armandoPC', './assets/sonidos/ArmandoCosas.mp3');
      this.load.audio('quitarCerrojo', './assets/sonidos/QuitarCerrojo.mp3');
      this.load.audio('peligroFinal', './assets/sonidos/PeligroFinal.mp3');
      this.load.audio('laser', './assets/sonidos/Laser.mp3');
      this.load.audio('sonidoVictoriaFinal', './assets/sonidos/SonidoVictoriaFinal.mp3');
      this.load.audio('sonidoGameOver', './assets/sonidos/SonidoGameOver.mp3');

    }
  
    create() {

      const sonidos = {
          musicaFondo: this.sound.add('musicaFondo', { loop: true, volume: 0.1 }),
          click: this.sound.add('click', { volume: 1 }),
          musicaEnfoque: this.sound.add('musicaEnfoque', { volume: 1 }),
          musicaInformacion: this.sound.add('musicaInformacion', { volume: 0.5 }),
          musicaLibro: this.sound.add('musicaLibro', { volume: 1 }),
          musicaFlecha: this.sound.add('musicaFlecha', { volume: 1 }),
          uf: this.sound.add('uf', { volume: 1 }),
          mmm: this.sound.add('mmm', { volume: 0.5 }),
          suspiro: this.sound.add('suspiro', { volume: 0.5 }),
          tecladoDigital: this.sound.add('tecladoDigital', { volume: 1 }),
          si: this.sound.add('si', { volume: 0.5 }),
          abriendoPuerta: this.sound.add('abriendoPuerta', { volume: 1 }),
          oH: this.sound.add('oH', { volume: 0.5 }),
          no: this.sound.add('no', { volume: 0.5 }),
          caminando: this.sound.add('caminando', { volume: 0.7 }),
          mmmDos: this.sound.add('mmmDos', { volume: 1 }),
          correr: this.sound.add('correr', { volume: 1 }),
          tecleando: this.sound.add('tecleando', { volume: 1 }),
          vamos: this.sound.add('vamos', { volume: .5 }),
          oHDos: this.sound.add('oHDos', { volume: 0.5 }),
          musicaEnfoqueDos: this.sound.add('musicaEnfoqueDos', { volume: 1 }),
          armandoPC: this.sound.add('armandoPC', { volume: 1 }),
          quitarCerrojo: this.sound.add('quitarCerrojo', { volume: 1 }),
          peligroFinal: this.sound.add('peligroFinal', { loop: true, volume: 0.7 }),
          laser: this.sound.add('laser', { volume: 0.7 }),
          sonidoGameOver: this.sound.add('sonidoGameOver', { loop: true, volume: 0.7 }),
          sonidoVictoriaFinal: this.sound.add('sonidoVictoriaFinal', { loop: true, volume: 0.7 }),

      }
      // Inicializar puntos globales
      this.registry.set('puntos', 0);
      this.registry.set('puntosIniciales', 0)
      this.registry.set('sonidos', sonidos);
  
      globalThis.personaje = this.convertirBase64('personaje', this);

      const musicaFondo = this.registry.get('sonidos').musicaFondo;
      musicaFondo.play(); // Reproducir la música de fondo


      this.scene.start('Portada'); // Cambia a la escena de portada
    }

  convertirBase64(textureKey, scene) {
    const textura = scene.textures.get(textureKey).getSourceImage();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = textura.width;
    canvas.height = textura.height;
    ctx.drawImage(textura, 0, 0);

    return canvas.toDataURL();
  }
  
    
  }
  