<template>
  <q-page>
    <q-header v-show="showHeader" elevated class="bg-primary text-white" height-hint="98">
  <q-toolbar>
    <q-toolbar-title>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>
      Quanter
    </q-toolbar-title>
  </q-toolbar>

  <q-tabs align="center">
    <q-route-tab to="/page1" label="Page One" />
    <q-btn color="white" text-color="black" label="Jugar" @click="changeScene"/>
    <q-route-tab to="/page3" label="Page Three" />
  </q-tabs>
</q-header>
   <div id="game-container"></div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import game from 'src/components/game.js';

onMounted(() => {
const gameContainer = document.getElementById('game-container');
if (gameContainer) {
  gameContainer.appendChild(game.canvas);
}
});

const showHeader = ref(false);

function toggleHeader() {
  showHeader.value = !showHeader.value;
}

onMounted(() => {
  document.addEventListener('click', toggleHeader);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', toggleHeader);
});

function changeScene() {
  const juegoIniciado = game.scene.keys['Menu'];
  if (juegoIniciado) {
    juegoIniciado.scene.start('InicioJuego');
  }
}
</script>
<style scoped>
</style>
