import { puntos } from './EstadoJuego.js'; // Importa el valor reactivo de puntos

export function mostrarPuntos(scene, x = 10, y = 10) {
    const puntosText = scene.add.text(x, y, `Puntos: ${scene.registry.get('puntos')}`, {
      fontSize: '18px',
      color: '#ffffff'
    });
  
    scene.registry.events.on('changedata', (parent, key, value) => {
      if (key === 'puntos' && puntosText && puntosText.active) {
        puntosText.setText(`Puntos: ${value}`);
        puntos.value = value; // Actualiza el valor reactivo de puntos
        console.log("puntos.value actualizado a:", puntos.value);
      }else{
        console.warn("Intentando actualizar puntosText cuando ya no está activo o existe.");
      }
    
    });
  
    return puntosText;
  }
  