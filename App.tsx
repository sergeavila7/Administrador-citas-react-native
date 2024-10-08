import React from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, Modal} from 'react-native';

const App = (): JSX.Element => {
  const {container, title, titleBold, btnNewDate, btnTextNewDate} = styles;
  const newDateHandler = () => {
    console.log('Click');
  };
  return (
    <SafeAreaView style={container}>
      <Text style={title}>Administrador de Citas</Text>
      <Text style={titleBold}>Veterinaria</Text>
      <Pressable onPress={newDateHandler} style={btnNewDate}>
        <Text style={btnTextNewDate}>Nueva Cita</Text>
      </Pressable>
      <Modal animationType="slide" visible={false}>
        <Text>Desde modal</Text>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  titleBold: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 30,
    color: '#6D28D9',
  },
  btnNewDate: {
    backgroundColor: '#6D28D9',
    padding: 20,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextNewDate: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

export default App;
