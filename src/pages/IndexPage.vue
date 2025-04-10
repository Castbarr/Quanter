<template>
  <q-page>
    <q-header v-show="showHeader" elevated class="bg-primary text-white" height-hint="98">
  <q-toolbar>
    <q-toolbar-title>
      <q-avatar>
        <img src="favicon.ico" alt="Logo" />
      </q-avatar>
      <span class="q-ml-xs">Compu-Apprende</span>
    </q-toolbar-title>
    <q-tabs align="center">
    <q-btn color="white" text-color="black" label="Reiniciar" @click="reiniciar"/>
    <q-btn color="white" text-color="black" label="Menú" @click="menuIniciado"/>
    <q-btn color="white" text-color="black" label="Iniciar"/>
  </q-tabs>
  </q-toolbar>

  
</q-header>
   <div id="game-container"></div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import game from '/src/components/game.js';

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

function menuIniciado() {
  const menuIniciado = game.scene.keys['Portada'];
  if (menuIniciado) {
    menuIniciado.scene.start('MenuPrincipal');
  }
}
function reiniciar() {
  const reiniciar = game.scene.keys['MenuPrincipal'];
  if (reiniciar) {
    reiniciar.scene.start('Portada');
  }
}
</script>
<style scoped>
</style>
