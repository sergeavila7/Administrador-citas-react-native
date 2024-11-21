import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface PatientProps {
  item: {
    id: number;
    patient: string;
    date: Date;
  };
  setModalVisible: (visible: boolean) => void;
  patientEdit: (id: number) => void;
  patientDelete: (id: number) => void;

}

const Patient = ({ item, patientEdit, patientDelete, setModalVisible }: PatientProps) => {
  const { container, label, text, dateText, btn, btnEdit, btnDelete, btnText, containerBtns } = styles;
  const { patient, date, id } = item;

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <View style={container}>
      <Text style={label}>Paciente</Text>
      <Text style={text}>{patient}</Text>
      <Text style={dateText}>{formatDate(date)}</Text>
      <View style={containerBtns}><Pressable style={[btn, btnEdit]} onLongPress={() => { patientEdit(id), setModalVisible(true) }}><Text style={btnText}>Editar</Text></Pressable>
        <Pressable style={[btn, btnDelete]} onPress={() => patientDelete(id)}>
          <Text style={btnText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94a388',
    borderBottomWidth: 1,
  },
  label: { color: '#374151', textTransform: 'uppercase', fontWeight: '700' },
  text: { color: '#6D28d9', fontSize: 20, fontWeight: '700', marginBottom: 10 },
  dateText: { color: '#374151' },
  containerBtns: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  btnEdit: {
    backgroundColor: '#F59E0B'

  },
  btnDelete: { backgroundColor: '#EF4444' },
  btnText: { textTransform: 'uppercase', fontWeight: '700', fontSize: 12, color: '#FFF' }
});

export default Patient;
