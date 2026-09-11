<template>
  <header class="p-3 border-b-2 bg-amber-300 flex">
    <a href="App.vue">
      <img
        src="@/assets/logo.png"
        alt="Pókemon logo"
        class="w-44 h-20 mr-4 mix-blend-multiply"
      />
    </a>
    <input
      type="text"
      placeholder="Search pokemon"
      class="border border-black object-cover mt-10 h-8 bg-white pl-1 placeholder:text-gray-400"
      v-model="pokeID"
      @keypress.enter="buscadPokemon"
      autofocus
    />
    <button
      @click="buscadPokemon"
      class="border border-black object-cover w-5 h-8 mt-10 bg-white"
    >
      ↓
    </button>

    <div class="ml-4 mt-11">
      <div
        class="POKEsELECT max-h-[70vh] max-w-[80px] border border-black bg-white pl-1 pr-1"
      >
        <select
          v-model="tipoSeleccionado"
          name="menuPoke"
          id="menuPoke"
          class="select"
        >
          <option
            :value="type"
            v-for="(color, type) in pokeTipoColores"
            :key="type"
            :style="{ backgroundColor: color }"
            class="option m-4 rounded-lg text-black uppercase text-center cursor-pointer absolute top-full left-0"
          >
            {{ type }}
          </option>
        </select>
        <br />
      </div>
    </div>
  </header>

  <main
    style="
      background-image: url(https://www.vhv.rs/dpng/d/513-5134879_pokeball-pixel-png-png-download-poke-ball-pixel.png);
    "
    class="bg-[length:120px_auto] bg-repeat"
  >
    <PokeCard :pokeSelected="displayedItems"></PokeCard>
    <!-- ------------------BOTONES PAGINA--------- -->

    <div
      v-if="displayedItems.length"
      class="controls flex items-center justify-center gap-4 p-4 mt-2 bg-amber-300 border border-black rounded"
    >
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-gray-500 hover:bg-gray-400 disabled:opacity-40 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
      >
        Previous
      </button>
      <span
        class="font-bold bg-white p-1 pl-4 pr-4 border border-black rounded text-center"
        >Page <br />{{ currentPage }}</span
      >
      <button
        @click="nextPage"
        :disabled="bloqBoton"
        class="bg-gray-500 hover:bg-gray-400 disabled:opacity-40 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
      >
        Next
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { pokeTipoColores } from "@/apiPoke/tailwindcssColorAtaque";
import { usePokeStore } from "@/stores/pokePinia";
import PokeCard from "@/components/PokeCard.vue";
const pokeID = ref("");
const tipoSeleccionado = ref("");
const pokeStore = usePokeStore();
//paginacion
const currentPage = ref(1);

//------------BOTONES PAGINAS ----------------
const displayedItems = computed(() => pokeStore.pokeList);
const bloqBoton = ref(false);
const cargarPagina = async () => {
  let pokes;

  if (tipoSeleccionado.value) {
    // empezar - 1 porque la API empieza desde offset 0
    pokes = await pokeStore.getTipo(
      tipoSeleccionado.value,
      currentPage.value - 1,
    );
  } else {
    pokes = await pokeStore.get10Pokes(currentPage.value - 1);
  }

  // desactivar botón Next
  bloqBoton.value = pokes.length < 10;
};

const nextPage = async () => {
  currentPage.value++;
  await cargarPagina();
  window.scrollTo(0, 0);
};

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    await cargarPagina();
    window.scrollTo(0, 0);
  }
};

//-------CAMBIAR TIPO POKEMON BUSCADO----------------
watch(tipoSeleccionado, async () => {
  currentPage.value = 1;
  await cargarPagina();
});

//------- BUSCAR POKEMON POR ID O NOMBRE ----------------
const buscadPokemon = async () => {
  await pokeStore.setPokemons(pokeID.value);
};

onMounted(async () => {
  await cargarPagina();
});
</script>

<!------- cargar PRIMEROS 20 POKEMONS ----------------
const cargarPrimeros20 = async (num: number) => {
  pokeStore.setPokemons(await getPrimeros20(currentPage.value - 1));
};-->

<!-------------------- CARTA DE POKEMON BUSCADA ----------------------------
    <div v-if="pokeData">
      <div v-for="pokemon in displayedItems" :key="pokemon.name"></div>
      <div
        :key="pokeData.name"
        :style="{
          backgroundColor: pokeTipoColores[pokeData.types?.[0]?.type?.name],
        }"
        class="w-150 p-3 flex items-start gap-1 min-h-[230px] border-b-2 border-r-2"
      >
        <div class="imagen">
          <p class="pokeName font-bold capitalize">
            {{ pokeData.name }} -#{{ pokeData.id }}
          </p>
          <img :src="pokeImg" :alt="pokeData.name" />
          <div class="cambioImagen">
            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              @click="changeImg('normal')"
            >
              Normal
            </button>

            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              v-if="pokeData?.sprites?.front_shiny"
              @click="changeImg('shiny')"
            >
              Shiny
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              :style="{
                visibility: pokeData?.sprites?.front_female
                  ? 'visible'
                  : 'hidden',
              }"
              @click="changeImg('female')"
            >
              Female
            </button>
          </div>
        </div>
        <button
          type="button"
          @click="verTipo(pokeData)"
          class="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
        >
          Datos
        </button>
        <div
          v-if="pokeData.tipoInfo"
          class="max-h-[188px] flex gap-3 font-family-rainyhearts"
        >
          <ul>
            <span
              class="inline-block list-inside bg-violet-500 borderer-[4px border black] w-[90px] pl-[5px] pb-[2px] font-bold"
              >Tipo/s</span
            >
            <li
              v-for="(tipo, index) in pokeData.tipoInfo.types"
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
              v-for="(stats, index) in pokeData.tipoInfo.stats"
              :key="index"
              :style="{ backgroundColor: pokeTipoColores[stats.stat.name] }"
              class="border border-b-2 border-black bg-amber-200 pl-1"
            >
              <span>{{ stats.stat.name }}: {{ stats.base_stat }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>------>

<!-------------------- CARTA DE POKEMON POR TIPO ----------------------------
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
        <div v-if="poke.tipoInfo" class="max-h-[188px] flex gap-3">
          <ul>
            <span
              class="inline-block bg-violet-500 w-[90px] pl-[5px] pb-[2px] font-bold"
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
          <ul class="list-inside bg-violet-500">
            <span class="font-bold">Estadísticas</span>
            <li
              v-for="(stats, index) in poke.tipoInfo.stats"
              :key="index"
              class="border border-b-2 border-black bg-amber-200 pl-1"
            >
              <span>{{ stats.stat.name }}: {{ stats.base_stat }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>------>
