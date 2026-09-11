import { pokeApiEx } from "./apiPoke";

export const getTiposYEstadis = async (nombrePokemon: string) => {
  const resp = await fetch(`${pokeApiEx}/${nombrePokemon}`);
  const detalle = await resp.json();
  return {
    name: detalle.name,
    types: detalle.types,
    stats: detalle.stats,
  };
};
