import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import { Form } from './src/components/index';
import Patient from './src/components/Patient';

interface Patient {
  id: number;
  patient: string;
  owner: string;
  phone: string;
  date: Date;
  email: string;
  symptoms: string;
}
const defaultPatient: Patient = {
  id: 1,
  patient: 'Rex', // Nombre del paciente
  owner: 'Juan Pérez', // Nombre del dueño
  phone: '123456789', // Teléfono del dueño
  date: new Date(), // Fecha actual
  email: 'juan@correo.com', // Correo del dueño
  symptoms: 'Tos y fiebre', // Síntomas del paciente
};
const App = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Tipo booleano para el modal
  const [patients, setPatients] = useState<Patient[]>([defaultPatient]);
  const [patient, setPatient] = useState<Patient>();
  const {
    container,
    title,
    titleBold,
    btnNewDate,
    btnTextNewDate,
    notPatient,
    list,
  } = styles;


  const newDateHandler = () => {
    setModalVisible(true);
  };

  const patientEdit = (id: number) => {
    const patientEdit = patients.filter(patient => patient.id === id)
    setPatient(patientEdit[0])
    console.log('patient ....', patientEdit);

  }

  return (
    <SafeAreaView style={container}>
      <Text style={title}>Administrador de Citas</Text>
      <Text style={titleBold}>Veterinaria</Text>
      <Pressable onPress={newDateHandler} style={btnNewDate}>
        <Text style={btnTextNewDate}>Nueva Cita</Text>
      </Pressable>
      {patients.length === 0 ? (
        <Text style={notPatient}>No hay pacientes aún</Text>
      ) : (
        <FlatList
          style={list}
          data={patients}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }: { item: Patient }) => {
            return <Patient item={item} patientEdit={patientEdit} setModalVisible={setModalVisible} />;
          }}
        />
      )}
      <Form
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        patients={patients}
        setPatients={setPatients}
        patient={patient}
        setPatient={setPatient}
      />
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
  notPatient: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  list: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
