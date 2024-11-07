import React, {FC, useState} from 'react';
import {
  Text,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
} from 'react-native';

interface FormProps {
  modalVisible: boolean;
}

export const Form: FC<FormProps> = ({modalVisible}) => {
  const {title, titleBold, container, input, field, label} = styles;
  const [data, setData] = useState({
    patient: '',
    owner: '',
    phone: '',
    email: '',
    symptoms: '',
  });

  const handleChange = (fieldName: keyof typeof data) => (text: string) => {
    setData(prevForm => ({...prevForm, [fieldName]: text}));
  };
  console.log(data);

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={container}>
        <ScrollView>
          <Text style={title}>
            Nueva <Text style={titleBold}>Cita</Text>
          </Text>
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
});
