import React, {useEffect} from 'react';
import {useState} from 'react';
import {PokemonFull} from '../interfaaces/pokemonInterfaces';
import {pokemonApi} from '../api/pokemonApi';

//hook para traer la infromación de  cualquier pokemon
export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  //guardamos la info de todo el pokemon que está en la interfaz
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull); //éste pokemon es para evitar los errores

  const loadPokemon = async () => {
    const resp = await pokemonApi.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemon(resp.data); //coge los datos de la url, previa llamada desde axios en la api, y los pone por defecto en el useState
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {
    isLoading,
    pokemon,
  };
};
