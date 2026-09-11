<template>
  <!--Creacion caja pokemon-->
  <div v-if="pokeSelected.length" class="grid grid-cols-1 px-5 pt-2">
    <div v-for="poke in pokeSelected" :key="poke.name">
      <div
        :key="poke.name"
        :style="{
          backgroundColor: pokeTipoColores[poke.types?.[0]?.type?.name],
        }"
        class="w-140 p-3 border-b-2 border-r-2 flex items-start gap-1 min-h-[230px]"
      >
        <div class="imagen">
          <p
            class="font-bold capitalize borderer border-black-1 bg-yellow-100 w-max px-01 p-1 rounded"
          >
            {{ poke.name }} -#{{ poke.id }}
          </p>
          <div
            class="mt-1"
            :style="{
              backgroundImage: 'url(/src/assets/FondoPokeball.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }"
          >
            <img
              :src="poke.image"
              :alt="poke.name"
              class="ml-3 mt-1 pt-3 mb-4 w-30 center"
            />
          </div>
          <!-- Creacion boton para cambiar imagen-->
          <div class="cambioImagen grid grid-cols-3 gap-1">
            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              @click="changeImg(poke, 'normal')"
            >
              Normal
            </button>

            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              v-if="poke.sprites.front_shiny"
              @click="changeImg(poke, 'shiny')"
            >
              Shiny
            </button>

            <button
              v-if="poke.sprites.front_female"
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              @click="changeImg(poke, 'female')"
            >
              Female
            </button>
          </div>
        </div>
        <!-- Boton para mostrar/ocultar detalles -->
        <button
          type="button"
          @click="verTipo(poke)"
          class="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
        >
          Data
        </button>
        <div
          v-if="poke.tipoInfo"
          class="max-h-[188px] flex gap-3 font-family-rainyhearts"
        >
          <ul>
            <span
              class="inline-block list-inside bg-violet-500 borderer-[4px border black] w-[90px] pl-[5px] pb-[2px] font-bold"
              >Type/s</span
            >
            <li
              v-for="(tipo, index) in poke.tipoInfo.types"
              :key="index"
              :style="{ backgroundColor: pokeBotonesColor[tipo.type.name] }"
              class="py-1 px-4 border rounded uppercase text-center border-b-4 border-black"
            >
              {{ tipo.type.name }}
            </li>
          </ul>
          <ul
            class="estadis list-inside bg-violet-500 borderer-[4px border black]"
          >
            <span class="font-bold">Stats</span>
            <li
              v-for="(stats, index) in poke.tipoInfo.stats"
              :key="index"
              :style="{ backgroundColor: pokeBotonesColor[stats.stat.name] }"
              class="border border-b-2 border-black bg-amber-200 pl-1"
            >
              <span>{{ stats.stat.name }}: {{ stats.base_stat }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  pokeTipoColores,
  pokeBotonesColor,
} from "@/apiPoke/tailwindcssColorAtaque";
import { getTiposYEstadis } from "@/apiPoke/pokemon";

const props = defineProps<{
  pokeSelected: any[];
}>();

const changeImg = (poke: any, genero: string) => {
  if (genero === "female") {
    poke.image = poke.sprites.front_female;
  } else if (genero === "shiny") {
    poke.image = poke.sprites.front_shiny;
  } else {
    poke.image = poke.sprites.front_default;
  }
};

const verTipo = async (poke: any) => {
  if (poke.tipoInfo) {
    poke.tipoInfo = null; // Oculta la información si ya está visible
    return;
  } else {
    const datos = await getTiposYEstadis(poke.name);
    poke.tipoInfo = datos;
  }
};
</script>

<!--

        <button
          type="button"
          @click="botonToggle = !botonToggle"
          :class="[
            'relative inline-flex h-6 w-11 items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
            botonToggle ? 'bg-green-500' : 'bg-gray-300',
          ]"
        >
          <span>Datos</span>
        </button>

        <div
          v-if="botonToggle"
          class="max-h-[188px] flex gap-3 font-family-rainyhearts"
        >
          <ul class="tipo list-inside">
            <span
              class="inline-block list-inside bg-violet-500 borderer-[4px border black] w-[90px] pl-[5px] pb-[2px] font-bold"
              >Tipo/s</span
            >
            <li
              v-for="(tipo, index) in poke.types"
              :key="index"
              :style="{
                backgroundColor: pokeTipoColores[tipo.type.name],
              }"
              class="hover:bg-blue-400 py-2 px-4 border border-b-4 border-black-700 hover:border-blue-700 rounded"
            >
              <span
                class="text-center flex items-center justify-center uppercase"
              >
                {{ tipo.type.name }}
              </span>
            </li>
          </ul>
          <ul
            class="estadis list-inside bg-violet-500 borderer-[4px border black]"
          >
            <span class="font-bold">Estadísticas</span>
            <li
              v-for="(stats, index) in poke.stats"
              :key="index"
              class="border border-b-2 border-black bg-amber-200 pl-1"
            >
              <span>{{ stats.stat.name }}: {{ stats.base_stat }}</span>
            </li>
          </ul>
        </div>
-->
