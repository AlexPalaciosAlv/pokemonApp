import React, {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {Result} from '../interfaaces/pokemonInterfaces';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
} from '../interfaaces/pokemonInterfaces';

//peticion a la API
export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=40';
  const nextPageUrl = useRef(url);

  //para la llamada usamos la constante que hicimos de axios, luego get y url
  //marcamos que la api devuelve informacion tipada de tipo PokemonPaginatedResponse(la que hemos puesto en la interfaz creada)
  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );
    //cuando en el useeffect se llame a LoadPokemons, cada vez nextpageurl tendrá el valor de la página siguiente, y así se irá recargando
    nextPageUrl.current = resp.data.next;
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
    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {isLoading, simplePokemonList, loadPokemons};
};
