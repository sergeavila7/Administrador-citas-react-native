import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { Form, InformationPatient, Patient } from './src/components/index';

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
  patient: 'Rex',
  owner: 'Juan Pérez',
  phone: '123456789',
  date: new Date(),
  email: 'juan@correo.com',
  symptoms: 'Tos y fiebre',
};
const App = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalPatient, setModalPatient] = useState<boolean>(false);
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
  }

  const patientDelete = (id: number) => {
    Alert.alert(
      'Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede eliminar',
      [{ text: 'Cancelar' }, {
        text: 'Si, Eliminar', onPress: () => {
          const updatedPatients = patients.filter(patient => patient.id !== id);
          setPatients(updatedPatients);
        }
      }]
    )
  };

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
            return (
              <Patient
                item={item}
                patientEdit={patientEdit}
                patientDelete={patientDelete}
                setModalVisible={setModalVisible}
                setModalPatient={setModalPatient}
                setPatient={setPatient}
              />
            )
          }}
        />
      )}

      {modalVisible && (
        <Form
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
      )}

      <Modal
        visible={modalPatient}
        animationType='slide' >
        <InformationPatient
          patient={patient}
          setPatient={setPatient}
          setModalPatient={setModalPatient}
        />
      </Modal>
    </SafeAreaView >
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
