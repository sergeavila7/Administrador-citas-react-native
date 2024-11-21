import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react';
import {
  Text,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface Patient {
  id: number;
  patient: string;
  owner: string;
  phone: string;
  date: Date;
  email: string;
  symptoms: string;
}

interface FormProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  patients: Patient[];
  setPatients: Dispatch<SetStateAction<Patient[]>>;
  patient?: Patient;
  setPatient: Dispatch<SetStateAction<Patient | undefined>>;
}

export const Form: FC<FormProps> = ({
  modalVisible,
  setModalVisible,
  patients,
  setPatients,
  patient,
  setPatient,
}) => {
  const [data, setData] = useState<Patient>({
    id: Date.now(),
    patient: '',
    owner: '',
    phone: '',
    date: new Date(),
    email: '',
    symptoms: '',
  });

  useEffect(() => {
    if (patient) {
      setData({
        id: patient.id,
        patient: patient.patient,
        owner: patient.owner,
        phone: patient.phone,
        date: patient.date,
        email: patient.email,
        symptoms: patient.symptoms,
      });
    } else {
      setData({
        id: Date.now(),
        patient: '',
        owner: '',
        phone: '',
        date: new Date(),
        email: '',
        symptoms: '',
      });
    }

  }, [modalVisible, patient]);

  const handleChange = (fieldName: keyof Patient) => (value: any) => {
    setData((prevForm) => ({
      ...prevForm,
      [fieldName]: fieldName === 'date' ? new Date(value) : value,
    }));
  };

  const checkMissingFields = (data: Patient) => {
    return Object.keys(data).filter(
      (key) => !data[key as keyof Patient] && key !== 'date'
    );
  };

  const updatePatientList = (patients: Patient[], patient: Patient | undefined, newPatient: Patient) => {
    if (patient) {
      return patients.map((p) => (p.id === patient.id ? newPatient : p));
    }
    return [...patients, newPatient];
  };

  const handleSubmit = () => {
    const missingFields = checkMissingFields(data);

    if (missingFields.length > 0) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const newPatient: Patient = { ...data };
    const updatedPatients = updatePatientList(patients, patient, newPatient);

    setPatients(updatedPatients);
    setModalVisible(false);
    setPatient(undefined);
  };


  const handleCancel = () => {
    setModalVisible(false);
    setPatient(undefined);
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
            {patient ? 'Editar ' : 'Nueva '} <Text style={styles.titleBold}>Cita</Text>
          </Text>
          <Pressable style={styles.btnCalcel} onPress={handleCancel}>
            <Text style={styles.btnCalcelText}>X Cancelar</Text>
          </Pressable>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Paciente"
              placeholderTextColor={'#666'}
              value={data.patient}
              onChangeText={handleChange('patient')}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propietario"
              placeholderTextColor={'#666'}
              value={data.owner}
              onChangeText={handleChange('owner')}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'#666'}
              value={data.email}
              onChangeText={handleChange('email')}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Telefono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefono propietario"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              value={data.phone}
              onChangeText={handleChange('phone')}
              maxLength={10}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.containerDate}>
              <DatePicker
                date={data.date}
                locale="es"
                onDateChange={handleChange('date')}
              />
            </View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={styles.input}
              placeholder="Sintomas"
              placeholderTextColor={'#666'}
              value={data.symptoms}
              onChangeText={handleChange('symptoms')}
              multiline
              numberOfLines={4}
            />
          </View>
          <Pressable style={styles.btnNewDate} onPress={handleSubmit}>
            <Text style={styles.btnNewDateText}>
              {patient ? 'Actualizar' : 'Agregar'} paciente
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#6D28D9', flex: 1, paddingBottom: 30 },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  titleBold: { fontWeight: '900' },
  field: { marginTop: 40, marginHorizontal: 30 },
  label: { color: '#FFF', marginBottom: 10, fontSize: 20, fontWeight: '600' },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    color: 'black',
  },
  containerDate: {
    borderRadius: 10,
  },
  btnCalcel: {
    backgroundColor: '#5827A4',
    marginTop: 15,
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnCalcelText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  btnNewDate: {
    backgroundColor: '#F59E0B',
    marginTop: 15,
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNewDateText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
