<template>
  <q-page>

    <!-- Botón para mostrar/ocultar header -->
    <q-btn
      round
      dense
      icon="menu"
      color="primary"
      class="toggle-header-btn"
      @click="toggleHeader"
    />
    <div class="puntos-overlay">
      <q-badge color="red" :label="'Puntos: ' + puntos" class="text-lg" />
    </div>

    <!-- Header -->
    <q-header
      ref="headerRef"
      v-show="showHeader"
      elevated
      class="bg-secondary text-white"
      height-hint="98"
    >
      <q-toolbar>
        <q-toolbar-title style="padding-left: 40px;">
          <q-avatar>
            <img src="favicon.ico" alt="Logo" />
          </q-avatar>
          <span class="q-ml-xs">Compu-Apprende</span>
        </q-toolbar-title>
        <q-tabs align="center">
          <q-btn flat color="primary" text-color="black" label="Sobre el Juego" @click="sobreElJuego" />
          <q-btn flat color="primary" text-color="black" label="Menú" @click="menuIniciado" />
          <q-btn flat color="primary" text-color="black" label="Reiniciar" @click="reiniciar" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <!-- Juego -->
    <div id="game-container"></div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { puntos } from '../components/EstadoJuego.js';
import game from '/src/components/game.js';
import Swal from 'sweetalert2';

const showHeader = ref(false);
const headerRef = ref(null);

function toggleHeader() {
  showHeader.value = !showHeader.value;
}

onMounted(() => {
  const gameContainer = document.getElementById('game-container');
  if (gameContainer) {
    gameContainer.appendChild(game.canvas);
  }
});

function menuIniciado() {
  toggleHeader();
  const menuIniciado = game.scene.keys['Portada'];
  if (menuIniciado) {
    menuIniciado.scene.start('MenuPrincipal');
  }
}

function reiniciar() {
  toggleHeader();
  puntos.value = 0;
  game.scene.getScenes(true).forEach(scene => {
    game.scene.stop(scene.scene.key);
  });
  game.scene.start('Portada');
}

function sobreElJuego() {
  toggleHeader();
  Swal.fire({
    title: 'Sobre el Juego',
    html: `
      <p>Este juego es un proyecto educativo diseñado para ayudar a los estudiantes a aprender sobre los fundamentos de la computación.</p>
      <p>Desarrollado por: <strong>Juan Pablo Castillo Barrera @Castbarr_mentor</strong></p>
      <p>El presente, es el inicio de una serie de juegos educativos enfocados al aprendizaje de los fundamentos de la computación, 
      tocando temas de nivel muy básico y paulatinamente se irán introduciendo temas un poco más avanzados y de actualidad.</p>
      <h6>Sinopsis del juego:</h6>
      <p>El presente juego se desarrolla dentro de una corporación tecnológica a donde el protagonista fue a realizar un trabajo y por descuido
      lo dejan atrapado dentro de las instalaciones. Esto al finalizar el turno de labores dentro de dicha empresa. El problema principal y
      más peligroso es que a cierta hora después de desalojada la empresa, se activa una seguridad muy extrema dentro del complejo,
      la cual consiste en rayos láser en los pasillos y robots armados, los cuales tienen sensores que detectan los movimientos en las áreas y
      en base a ello atacan. La misión es desactivar la seguridad de las puertas para poder salir.</p>
      <h6>Modo de juego:</h6>
      <p>El juego tiene 3 niveles, la única diferencia es el nivel de créditos con que se cuenta al inicio. Los puntos, son los créditos con que
      se inicia en el nivel, en el nivel básico se cuentan con 7 puntos, el nivel medio nos da 5 y el nivel avanzado 3. Los puntos se pierden al 
      contestar las respuestas erróneamente. Se descuenta un punto por cada desacierto. Si te quedas sin puntos pierdes.</p>
      <h6>Mecánica de juego:</h6>
      <p>El juego utiliza señales visuales para guiarnos: el símbolo de triángulo con signo de admiración simboliza información de acción,
      la flecha verde significa la guia hacia donde debemos movernos o para retroceder si queremos, el signo de interrogación quiere decir pregunta,
      es donde tendremos que responder cuestiones  para seguir avanzando, el libro, que normalmente está en la parte superior derecha nos da toda 
      la información para responder las preguntas.</p>
      <p>¡Diviértete aprendiendo!</p>
    `,
    grow: 'fullscreen',
  });
}
</script>

<style scoped>
.toggle-header-btn {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 9999;
}

.puntos-overlay {
  position: fixed;
  top: 80px;
  left: 20px;
  z-index: 9999;
}
</style>

