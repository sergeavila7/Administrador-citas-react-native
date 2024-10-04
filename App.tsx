import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const App = (): JSX.Element => {
  const {title, titleBold} = styles;
  return (
    <SafeAreaView>
      <Text style={title}>Administrador de Citas</Text>
      <Text style={titleBold}>Veterinaria</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  titleBold: {
    fontWeight: '900',
    color: '#6D2869',
  },
});

export default App;
