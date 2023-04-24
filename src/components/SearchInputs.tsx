import React, {useEffect} from 'react';
import {View, StyleSheet, Text, StyleProp, ViewStyle} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {useDebounceValue} from '../hooks/useDebounceValue';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}
//caja de búsqueda
export const SearchInputs = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');

  //llamamos al tiempo que se imprime la búqueda, useeffect para que cada segundo y medio se active el efecto de busqueda
  const debouncedValue = useDebounceValue(textValue, 1500);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={{...styles.container, ...(style as any)}}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="buscar pokemon"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search-outline" color="grey" size={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'red',
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: 2,
  },
});
