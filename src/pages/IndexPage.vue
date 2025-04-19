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
      <p>Desarrollado por: <strong>Tu Nombre</strong></p>
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

