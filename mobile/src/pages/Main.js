import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Linking, Image, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Constanst from 'expo-constants';

import api from '../services/api';

import whatsappIcon from '../assets/whatsappIcon.png'
import instagramIcon from '../assets/instagramIcon.png'

function Main() {
    const [contacts, setContacts] = useState([]);

    const navigation = useNavigation();

    function navigateToForm(params) {
        navigation.navigate('Form', params);
    }

    async function loadContacts() {
        const response = await api.get('contacts');
        setContacts(response.data);
    }


    async function handleDeleteContact(contactId) {
        await api.delete(`contact/${contactId}`);

        setContacts(contacts.filter(contact => contact.id != contactId))
    }

    async function openWhatsap(whatsappNumber) {
        const suported = await Linking.canOpenURL(`whatsapp://send?phone=55${whatsappNumber}`);
        if (suported) {
            Linking.openURL(`whatsapp://send?phone=55${whatsappNumber}`);
        } else {
            Linking.openURL(`https://api.whatsapp.com/send?phone=55${whatsappNumber}`);
        }
    }

    async function openInstagram(instagramUser) {
        const suported = await Linking.canOpenURL(`intent://instagram.com/_u/${instagramUser}/#Intent;package=com.instagram.android;scheme=https;end`);
        if (suported) {
            Linking.openURL(`intent://instagram.com/_u/${instagramUser}/#Intent;package=com.instagram.android;scheme=https;end`);
        } else {
            Linking.openURL(`instagram.com/${instagramUser}`);
        }
    }
    function formatWhatsappNumber(contactWhatsapp) {
        if (contactWhatsapp === '') {
            return;
        }
        let formatedWhatsappNumber = '(xx) xxxxx-xxxx'
        for (let i = 0; i < contactWhatsapp.length; i++) {
            formatedWhatsappNumber = formatedWhatsappNumber.replace('x', contactWhatsapp[i]);
        }
        return formatedWhatsappNumber;
    }

    useEffect(() => {
        loadContacts();
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Contatos</Text>

                <TouchableOpacity onPress={() => navigateToForm({ method: 'post',setContacts })} style={styles.addContactButton}><Feather name='plus-circle' size={35} color='green' /></TouchableOpacity>
            </View>
            <View style={styles.contactList}>

                <FlatList
                    data={contacts}
                    keyExtractor={contact => String(contact.id)}
                    renderItem={({ item: contact }) => (
                        <View style={styles.contactCard}>
                            <View style={styles.contactCardHeader}>
                                <Text style={styles.contactName}>{contact.name}</Text>
                            </View>

                            <View style={styles.contactCardBody}>
                                <View style={styles.socialMedia}>
                                    <Text style={styles.contactSocialMedia}>WhatsApp: {formatWhatsappNumber(contact.whatsapp)} </Text>
                                    {contact.whatsapp !== '' && <TouchableOpacity onPress={() => openWhatsap(contact.whatsapp)}><Image style={styles.mediaIcon} source={whatsappIcon} /></TouchableOpacity>}
                                </View>
                                <View style={styles.socialMedia}>
                                    <Text style={styles.contactSocialMedia}>Instagram: @{contact.instagram}</Text>
                                    {contact.instagram !== '' && <TouchableOpacity onPress={() => openInstagram(contact.instagram)}><Image style={styles.mediaIcon} source={instagramIcon} /></TouchableOpacity>}
                                </View>
                            </View>

                            <View style={styles.contactCardFooter}>
                                <TouchableOpacity onPress={() => navigateToForm({ method: 'put', contact,setContacts})} style={styles.editContactButton}><Feather name='edit' size={28} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteContact(contact.id)} style={styles.deleteContactButton}><Feather name='trash' size={28} color='#8b0000' /></TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e6f0',
        paddingTop: Constanst.statusBarHeight + 10
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#000f40',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    headerTitle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        letterSpacing: 0.2,
        padding: 15,
    },
    contactList: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        marginTop: 20
    },
    contactCard: {
        display: 'flex',
        alignItems: 'center',
        width: 350,
        height: 220,
        backgroundColor: '#eee',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 20
    },
    contactCardHeader: {
        alignItems: 'center',
        width: 350,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    contactName: {
        textAlign: 'center',
        fontSize: 20,
        padding: 8,
        letterSpacing: 1
    },
    contactCardBody: {
        width: 350,
        alignItems: 'center',
        marginBottom: 10
    },
    socialMedia: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    contactSocialMedia: {
        fontSize: 18,
        marginRight: 8,
    },
    mediaIcon: {
        width: 20,
        height: 20,
    },
    contactCardFooter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 350,
        marginTop: 20,
    },
    editContactButton: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    deleteContactButton: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#8b0000',
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
    addContactButton: {
        padding: 15
    }

});
export default Main;