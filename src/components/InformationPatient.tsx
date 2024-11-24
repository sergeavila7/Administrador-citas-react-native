import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { formatDate } from '../helpers';

interface Patient {
    id: number;
    patient: string;
    owner: string;
    phone: string;
    date: Date;
    email: string;
    symptoms: string;
}

interface InformationPatientProps {
    patient: Patient | undefined;
    setModalPatient: (visible: boolean) => void;
    setPatient: (patient: Patient | undefined) => void;
}

export const InformationPatient = ({ patient, setModalPatient, setPatient }: InformationPatientProps) => {
    if (!patient) {
        return (
            <View>
                <Text>No se encontró la información del paciente.</Text>
            </View>
        );
    }

    const { patient: name, owner, phone, date, email, symptoms } = patient;

    const { container, content, title, titleBold, text, btnClose, btnCloseText } = styles

    return (
        <SafeAreaView style={container}>
            <Text style={title}>Informacion {''}
                <Text style={titleBold}>Paciente</Text>
            </Text>
            <View>
                <Pressable
                    style={btnClose}
                    onPress={() => {
                        setModalPatient(false)
                        setPatient(undefined);
                    }}>
                    <Text style={btnCloseText}>X Cerrar</Text>
                </Pressable>
            </View>
            <View style={content}>
                <Text style={text}>
                    <Text style={titleBold}>Paciente: </Text>
                    {name}
                </Text>
                <Text style={text}>
                    <Text style={titleBold}>Propietario: </Text>
                    {owner}
                </Text>
                <Text style={text}>
                    <Text style={titleBold}>Email: </Text>
                    {email}
                </Text>
                <Text style={text}>
                    <Text style={titleBold}>Teléfono: </Text>
                    {phone}
                </Text>
                <Text style={text}>
                    <Text style={titleBold}>Fecha Alta: </Text>
                    {formatDate(date)}
                </Text>
                <Text style={text}>
                    <Text style={titleBold}>Síntomas: </Text>
                    {symptoms}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F59E0B',
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF',
    },
    titleBold: { fontWeight: '900' },
    btnClose: {
        backgroundColor: '#E06900',
        marginTop: 15,
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10,
    },
    btnCloseText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    content: {
        marginTop: 20,
        backgroundColor: '#FFF',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: '#333333',
        padding: 4,
    }
});