import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Pokemon } from "@/data/Pokemon";
import { getPorIdONombre, getPrimeros10, getPorTipo } from "@/apiPoke/apiPoke";

export const usePokeStore = defineStore("pokePi", () => {
  const pokePi = ref(<Pokemon[]>[]);
  const cache = ref<Record<string, Pokemon>>({});

  const addToCache = (pokemons: Pokemon[]) => {
    pokemons.forEach((pokemon) => {
      cache.value[pokemon.name] = pokemon;
    });
  };

  // Obtener los primeros 10 pokemons, paginados de 10 en 10
  const get10Pokes = async (currentPage: number) => {
    const pokes10: Pokemon[] = await getPrimeros10(currentPage);
    addToCache(pokes10);
    pokePi.value = pokes10;
    return pokes10;
  };
  // Obtener pokemons por tipo, paginados de 10 en 10
  const getTipo = async (tipo: string, num: number) => {
    const pokeTipos: Pokemon[] = await getPorTipo(tipo, num);
    addToCache(pokeTipos);
    pokePi.value = pokeTipos;
    return pokeTipos;
  };

  // Guardar cada pokemon en el cache por nombre
  const setPokemons = async (pokeID: string) => {
    const pokemons: Pokemon[] = await getPorIdONombre(pokeID);
    addToCache(pokemons);

    pokePi.value = pokemons;
  };

  // Busca primero en cache, hacer fetch si no lo tiene

  return {
    //getters
    pokeList: computed(() => pokePi.value),
    //actions
    get10Pokes,
    getTipo,
    setPokemons,
  };
});

/*
 const getPokemon = async (name: string): Promise<Pokemon | null> => {
    if (cache.value[name]) return cache.value[name];
    try {
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await resp.json();
      const pokemon: Pokemon = {
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        sprites: data.sprites,
        types: data.types,
        stats: data.stats,
      };
      cache.value[name] = pokemon;
      return pokemon;
    } catch {
      return null;
    }
  };*/
