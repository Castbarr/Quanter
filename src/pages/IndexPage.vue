<template>
  <q-page>
    <!-- Zona sensible al hover -->
    <div 
      class="hover-zone"
      @mouseenter="showHeader = true"
      @mouseleave="hideHeaderIfNotOverHeader"
    ></div>

    <!-- Header -->
    <q-header
      ref="headerRef"
      v-show="showHeader"
      elevated
      class="bg-secondary text-white"
      height-hint="98"
      @mouseenter="showHeader = true"
      @mouseleave="hideHeaderIfNotOverHeader"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="favicon.ico" alt="Logo" />
          </q-avatar>
          <span class="q-ml-xs">Compu-Apprende</span>
        </q-toolbar-title>
        <q-tabs align="center">
          <q-btn flat color="primary" text-color="black" label="Sobre el Juego" @click="sobreElJuego"/>
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
import game from '/src/components/game.js';
import Swal from 'sweetalert2';

const showHeader = ref(false);
const headerRef = ref(null);

// Detecta si el mouse no está sobre el header antes de ocultarlo
function hideHeaderIfNotOverHeader() {
  requestAnimationFrame(() => {
    const header = headerRef.value?.$el
    if (!header || !header.matches(':hover')) {
      showHeader.value = false
    }
  })
}

onMounted(() => {
  const gameContainer = document.getElementById('game-container');
  if (gameContainer) {
    gameContainer.appendChild(game.canvas);
  }
});

function menuIniciado() {
  const menuIniciado = game.scene.keys['Portada'];
  if (menuIniciado) {
    menuIniciado.scene.start('MenuPrincipal');
  }
}

function reiniciar() {
  game.scene.getScenes(true).forEach(scene => {
    game.scene.stop(scene.scene.key);
  });
  game.scene.start('Portada');
}

function sobreElJuego(){
  Swal.fire({
    title: 'Sobre el Juego',
    html: `
      <p>Este juego es un proyecto educativo diseñado para ayudar a los estudiantes a aprender sobre los fundamentos de la computación.</p>
      <p>Desarrollado por: <strong>Tu Nombre</strong></p>
    `,
    grow: 'fullscreen',
  })
}
</script>

<style scoped>
.hover-zone {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10px; /* zona sensible, ajustable */
  z-index: 10000;
}
</style>
