<script setup lang="ts">
import { ref, createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import MenuFiltro from "@/components/MenuFiltro.vue";

const pinia = createPinia();
const app = createApp(App);
const pokemons = ref<any[]>([]);

const GuardarTipoSelec = (pokemonsReci: any[]) => {
  pokemons.value = pokemonsReci;
};
app.use(pinia);
</script>

<template>
  <MenuFiltro />
</template>
<
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

<!--
<ul class="tipo list-inside">
            Tip>o/s
            <li
              v-for="(tipo, index) in pokeData.types"
              :key="index"
              :style="{ color: pokeTipoColores[tipo.type.name] }"
            >
              <span>{{ tipo.type.name }}</span>
            </li>
          </ul>
          <ul class="estadis">
            Estadísticas
            <li v-for="(estadisticas, index) in pokeData.stats" :key="index">
              <span
                >{{ estadisticas.stat.name }}:
                {{ estadisticas.base_stat }}</span
              >
            </li>
          </ul>




          <div v-for="poke in displayedItems" :key="poke.name">
      <div
        :style="{
          backgroundColor: pokeTipoColores[poke.types?.[0]?.type?.name],
        }"
        class="w-150 p-3 flex items-start gap-1 min-h-[230px] border-b-2 border-r-2"
      >
        <div class="imagen">
          <p class="font-bold capitalize">{{ poke.name }} -#{{ poke.id }}</p>
          <img :src="poke.image" :alt="poke.name" class="ml-8" />
         Creacion boton para cambiar imagen
          <div class="cambioImagen">
            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              @click="changePokeImg(poke, 'normal')"
            >
              Normal
            </button>

            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              v-if="poke.sprites?.front_shiny"
              @click="changePokeImg(poke, 'shiny')"
            >
              Shiny
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              :style="{
                visibility: poke.sprites.front_female ? 'visible' : 'hidden',
              }"
              @click="changePokeImg(poke, 'female')"
            >
              Female
            </button>
          </div>
        </div>
        <button
          type="button"
          @click="verTipo(poke)"
          class="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
        >
          Datos
        </button>
        <div
          v-if="poke.tipoInfo"
          class="max-h-[188px] flex gap-3 font-family-rainyhearts"
        >
          <ul>
            <span
              class="inline-block list-inside bg-violet-500 borderer-[4px border black] w-[90px] pl-[5px] pb-[2px] font-bold"
              >Tipo/s</span
            >
            <li
              v-for="(tipo, index) in poke.tipoInfo.types"
              :key="index"
              :style="{ backgroundColor: pokeTipoColores[tipo.type.name] }"
              class="py-1 px-4 border rounded uppercase text-center border-b-4 border-black"
            >
              {{ tipo.type.name }}
            </li>
          </ul>
          <ul
            class="estadis list-inside bg-violet-500 borderer-[4px border black]"
          >
            <span class="font-bold">Estadísticas</span>
            <li
              v-for="(stats, index) in poke.tipoInfo.stats"
              :key="index"
              :style="{ backgroundColor: pokeTipoColores[stats.stat.name] }"
              class="border border-b-2 border-black bg-amber-200 pl-1"
            >
              <span>{{ stats.stat.name }}: {{ stats.base_stat }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
-->
