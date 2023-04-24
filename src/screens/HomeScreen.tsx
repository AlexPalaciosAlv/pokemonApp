import React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from '../theme/appTheme';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {FlatList} from 'react-native-gesture-handler';
import {FadeInImage} from '../components/FadeInImage';
import {PokemonCard} from '../components/pokemonCard';

export const HomeScreen = () => {
  //usesafearea es para responsive, se adapta mejor a la posicion
  const {top} = useSafeAreaInsets();

  //hook que llama a la API y nos da la info de los pokemons
  const {loadPokemons, simplePokemonList} = usePokemonPaginated();

  //flatlist saca el nombre/IMAGEN de pokemons
  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          //header
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom:10
              }}>
              Pokedex
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          //infinite scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={<ActivityIndicator style={{height: 100}} />} //para el logo de cargando
        />
      </View>
    </>
  );
};
