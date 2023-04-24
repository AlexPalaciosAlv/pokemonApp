import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SimplePokemon} from '../interfaaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  //importamos de la librería ImageColors y la usamos para los colores de fondo de cada tarjeta según plataforma
  const [bgColor, setBgColor] = useState('grey');
  const navigation = useNavigation();
  //para actualizaciones de estado cuando scrolleamos rapido y se carga el color, se aplica en el useEffect
  const isMounted = useRef(true);

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {fallback: 'grey'}).then(colors => {
      if (!isMounted) return;
      if (colors.platform === 'android') {
        setBgColor(colors.dominant || 'grey');
      } else if (colors.platform === 'ios') {
        setBgColor(colors.background || 'grey');
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor, //llamamos al color de fondo, que se modifica con el useEffect
        }}>
        {/* nombre Pokemon y id */}
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -20,
    right: -20,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
