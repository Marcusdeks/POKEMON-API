import axios from "axios";

export const pokeApiEx = "https://pokeapi.co/api/v2/pokemon";

const normalize = (poke: any) => ({
  name: poke.name,
  id: poke.id,
  image: poke.sprites.front_default,
  sprites: poke.sprites,
  types: poke.types,
  stats: poke.stats,
}); //todos los datos que necesitas en 1

export const getPorTipo = async (tipo: string, num: number) => {
  const resp = await axios.get(`https://pokeapi.co/api/v2/type/${tipo}`);

  // paginar aquí: 10 por página
  const start = num * 10;
  const end = start + 10;
  const nexPokes = resp.data.pokemon.slice(start, end);

  return await Promise.all(
    nexPokes.map(async (item: any) => {
      const detalle = await axios.get(item.pokemon.url).then((res) => res.data);
      return normalize(detalle);
    }),
  );
};

export const getPrimeros10 = async (num: number) => {
  const resp = await axios.get(`${pokeApiEx}?limit=10&offset=${num * 10}`);

  return await Promise.all(
    resp.data.results.map(async (poke: any) => {
      const detalle = await axios.get(poke.url).then((resul) => resul.data);
      return normalize(detalle);
    }),
  );
};

export const getPorIdONombre = async (idONombre: string) => {
  try {
    const resp = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${idONombre}`,
    );
    return [normalize(resp.data)];
  } catch {
    alert("Pokemon no encontrado");
    return [];
  }
};

/*
<script setup lang="ts">
import { ref } from "vue";
import { pokeApiEx } from "../apiPoke/apiPoke.ts";

export const pokeData = ref<any>({});
export const pokeID = ref("");

export const buscadPokemon = async () => {
  try {
    const buscadPokemon = await fetch(`${pokeApiEx}/${pokeID.value}`);
    const pokemon = await buscadPokemon.json();
    pokeData.value = pokemon;
    console.log(pokeData.value);
    return pokemon;
  } catch (error) {
    alert("Pokemon no encontrado");
  }
};
</script>
*/
