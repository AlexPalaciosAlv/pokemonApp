import React, {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {Result} from '../interfaaces/pokemonInterfaces';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
} from '../interfaaces/pokemonInterfaces';


///SE HACE EN BASE A USEPOKEMON PAGINATED, SE COPIA EL CODIGO Y SE MODIFICA

//peticion a la API
export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  //para la llamada usamos la constante que hicimos de axios, luego get y url
  //marcamos que la api devuelve informacion tipada de tipo PokemonPaginatedResponse(la que hemos puesto en la interfaz creada)
  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1200',
    );
    //cuando en el useeffect se llame a LoadPokemons, cada vez nextpageurl tendrá el valor de la página siguiente, y así se irá recargando
    mapPokemonListToSimplePokemon(resp.data.results);
  };

  //funcion para impromir los nombres de los pokemons. Extraemos los datos mapeando el patametro pokemonList que es resp.data.results (todos los datos)
  const mapPokemonListToSimplePokemon = (pokemonList: Result[]) => {
    //pokemonList.forEach(poke => console.log(poke.url));
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2]; //sacamos así la penultima posicion de la url troceada, que es la que coincide con el id
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {
        id,
        picture,
        name,
      };
    });

    //asi vemos los pokemons anteriores y nuevos para el scroll infinito
    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {isFetching, simplePokemonList};
};
