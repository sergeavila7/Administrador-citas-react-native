import React, {Dispatch, FC, SetStateAction, useState} from 'react';
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
}

export const Form: FC<FormProps> = ({
  modalVisible,
  setModalVisible,
  patients,
  setPatients,
}) => {
  const {
    title,
    titleBold,
    container,
    input,
    field,
    label,
    containerDate,
    btnNewDate,
    btnNewDateText,
    btnCalcel,
    btnCalcelText,
  } = styles;

  const [data, setData] = useState<Patient>({
    patient: '',
    owner: '',
    phone: '',
    date: new Date(),
    email: '',
    symptoms: '',
  });

  const handleChange = (fieldName: keyof Patient) => (value: any) => {
    setData(prevForm => ({
      ...prevForm,
      [fieldName]: fieldName === 'date' ? new Date(value) : value, // Si es 'date', pasamos el objeto Date tal cual
    }));
  };

  const handleDate = () => {
    const missingFields = Object.keys(data).filter(
      key => !data[key as keyof Patient] && key !== 'date', // No validar 'date' por ser un objeto Date
    );

    if (missingFields.length > 0) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
    } else {
      const newPatient: Patient = {
        ...data,
      };
      setPatients([...patients, newPatient]);
      setModalVisible(false);
    }
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={container}>
        <ScrollView>
          <Text style={title}>
            Nueva <Text style={titleBold}>Cita</Text>
          </Text>
          <Pressable style={btnCalcel} onPress={() => setModalVisible(false)}>
            <Text style={btnCalcelText}>X Cancelar</Text>
          </Pressable>
          <View style={field}>
            <Text style={label}>Nombre paciente</Text>
            <TextInput
              style={input}
              placeholder="Nombre Paciente"
              placeholderTextColor={'#666'}
              onChangeText={handleChange('patient')}
            />
          </View>
          <View style={field}>
            <Text style={label}>Nombre Propietario</Text>
            <TextInput
              style={input}
              placeholder="Nombre Propietario"
              placeholderTextColor={'#666'}
              onChangeText={handleChange('owner')}
            />
          </View>
          <View style={field}>
            <Text style={label}>Email</Text>
            <TextInput
              style={input}
              placeholder="Email"
              placeholderTextColor={'#666'}
              onChangeText={handleChange('email')}
            />
          </View>
          <View style={field}>
            <Text style={label}>Telefono Propietario</Text>
            <TextInput
              style={input}
              placeholder="Telefono propietario"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              onChangeText={handleChange('phone')}
              maxLength={10}
            />
          </View>
          <View style={field}>
            <Text style={label}>Fecha Alta</Text>
            <View style={containerDate}>
              <DatePicker
                date={data.date}
                locale="es"
                onDateChange={handleChange('date')}
              />
            </View>
          </View>
          <View style={field}>
            <Text style={label}>Sintomas</Text>
            <TextInput
              style={input}
              placeholder="Sintomas"
              placeholderTextColor={'#666'}
              onChangeText={handleChange('symptoms')}
              multiline
              numberOfLines={4}
            />
          </View>
          <Pressable style={btnNewDate} onPress={handleDate}>
            <Text style={btnNewDateText}>Agregar paciente</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#6D28D9', flex: 1, paddingBottom: 30},
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  titleBold: {fontWeight: '900'},
  field: {marginTop: 40, marginHorizontal: 30},
  label: {color: '#FFF', marginBottom: 10, fontSize: 20, fontWeight: '600'},
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
