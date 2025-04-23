import Phaser from 'phaser';
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
      this.load.image('fondoBasicoDos', './assets/Pasillo.png');
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
      this.load.json('respuestas', './assets/respuestas.json');
    }
  
    create() {
      // Inicializar puntos globales
      this.registry.set('puntos', 0);
  
      globalThis.personaje = this.convertirBase64('personaje', this);


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
  