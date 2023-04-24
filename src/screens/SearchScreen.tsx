import React, {useEffect} from 'react';
import {Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInputs} from '../components/SearchInputs';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {FlatList} from 'react-native-gesture-handler';
import {Text, Dimensions} from 'react-native';
import {styles as globalStyles, styles} from '../theme/appTheme';
import {PokemonCard} from '../components/pokemonCard';
import {Loading} from '../components/Loading';
import {useState} from 'react';
import {SimplePokemon} from '../interfaaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

//Pantalla de busqueda, dentro esta la caja de busqueda para escribir
export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();

  //lo que mostraré en el flatlist de aquí abajo
  const [pokeminFiltrered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term)!;
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  //cargando...
  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInputs
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 30,
        }}
      />
      {/* copiamos el flatlist de homescreen y lo modificamos */}
      <View style={{marginHorizontal: -20}}>
        <FlatList
          data={pokeminFiltrered}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          //header
          ListHeaderComponent={
            <Text
              style={{
                ...globalStyles.title,
                ...globalStyles.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 10,
                marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
              }}>
              {term}
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
        />
      </View>
    </View>
  );
};
