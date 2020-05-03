import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import Constanst from 'expo-constants';

import api from '../services/api'
import { set } from 'react-native-reanimated';

function Form() {
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [instagram, setInstagram] = useState('');
    const [id,setId] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    const formMethod = route.params.method;
    const { setContacts } = route.params;
    
    function getInputsValues() {
        if (name === '') {
            return Alert.alert(
                'Erro',
                'O nome é obrigatório');
        }

        if (whatsapp !== '') {
            if (isNaN(whatsapp)) {
                return Alert.alert('Erro', 'O contato do WhatsApp deve conter apenas números')
            } else if (whatsapp.length !== 11) {
                return Alert.alert('Erro', 'O contato deve ter 11 números');
            }
        }
        return {
            name,
            whatsapp,
            instagram
        }
    }

    async function handleFormSubmit() {
        const contactData = getInputsValues();

        formMethod === 'post' ?
            await api.post('contact', contactData) : await api.put(`contact/${id}`, contactData)

        const response = await api.get('contacts');

        setContacts(response.data);

        navigateBack();
    }

    function navigateBack() {
        navigation.navigate('Contacts')
    }
    useEffect(() => {
        if (formMethod === 'put') {
            const contact = route.params.contact;
            setId(contact.id);
            setName(contact.name);
            setWhatsapp(contact.whatsapp);
            setInstagram(contact.instagram);
        }
    }, []);

    return (
        <View style={styles.form}>
            <View style={styles.formHeader}>
                <Text style={styles.headerTitle}>Contato</Text>
                <TouchableOpacity onPress={navigateBack} style={styles.backPageButton}><Feather name='arrow-left-circle' size={40} color='grey' /></TouchableOpacity>
            </View>

            <View style={styles.formBody}>
                <View style={styles.inputGroup}>
                    <TextInput style={styles.formInput} value={name} onChangeText={texto => setName(texto)} placeholder='Nome' placeholderTextColor='black' />
                    <TextInput style={styles.formInput} value={whatsapp} onChangeText={texto => setWhatsapp(texto)} placeholder='WhatasApp' placeholderTextColor='black' />
                    <TextInput style={styles.formInput} value={instagram} onChangeText={texto => setInstagram(texto)} placeholder='Instagram' placeholderTextColor='black' />
                </View>

                <TouchableOpacity onPress={handleFormSubmit} style={styles.formSaveButon}>
                    <Text style={styles.formSaveButonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingTop: Constanst.statusBarHeight + 10,
        backgroundColor: '#e5e6f0',
    },
    formHeader: {
        backgroundColor: '#000f40',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        color: 'white',
        fontSize: 30,
        letterSpacing: 0.2,
        padding: 15,
    },
    backPageButton: {
        padding: 15
    },
    formBody: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formInput: {
        width: 350,
        borderColor: '#000a',
        borderWidth: 3,
        borderRadius: 5,
        marginTop: 15,
        padding: 12,
        fontSize: 18,
        textAlign: 'center',
    },
    formSaveButon: {
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'green'
    },
    formSaveButonText: {
        padding: 15,
        textAlign: 'center',
        fontSize: 16,
        letterSpacing: 1,
        color: 'white'
    },
    inputGroup: {
        flex: 1,
        justifyContent: 'center'
    }


});

export default Form;
