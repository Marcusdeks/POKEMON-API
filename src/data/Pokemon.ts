export interface Pokemon {
  id: number;
  name: string;
  image: string;
  sprites: any;
  types: any[];
  stats: any[];
}
/*export interface Pokemon {
  id: number;
  nombre: string;
  //propietario: "DC" | "Marvel"; //de esta forma despues podremos agregar
  // facilmente una mas, pues nos dejaria sumarle por ejemplo "Pony Comics"
  tipo: PokemonTipo;
}

export type PokemonTipo = {{}}; //por exportar, solo estructura

const pokemon: Pokemon[] = [
  {
    id: 1,
    nombre: "Batman",
    tipo: { },
  },
  {
    id: 2,
    nombre: "Spiderman",
    tipo: {},
  },
  {
    id: 3,
    nombre: "Superman",
    tipo: {},
  },
  {
    id: 4,
    nombre: "Flash",
    tipo: {},
  },
  {
    id: 5,
    nombre: "Wolverine",
    tipo: {},
  },
];

export const tipo = [] as const; //as const es para que el array sea de tipo literal, es decir, que cada elemento del array sea de un tipo específico y no de un tipo genérico como string. De esta forma, propietario[0] es de tipo "DC" y propietario[1] es de tipo "Marvel", en lugar de ser ambos de tipo string.
export default pokemon;
*/
