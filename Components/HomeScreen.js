import { Text, View, Pressable, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react'
import styles from '../assets/styles/AppStyles'
import getDifferenceInDays from '../methods/getDifferenceInDays';
import { useSelector, useDispatch } from 'react-redux'
import { serieModifie, repModifie, recupModifie } from '../store/reducers/counterReducer';

export default function HomeScreen() {    
    const [diffDays, setDiffDays] = useState(null)
    const [modal, setModal] = useState(false)
    
    const serie = useSelector((state) => state.counter.serie)
    const rep = useSelector((state) => state.counter.rep)
    const recup = useSelector((state) => state.counter.recup)
    const dispatch = useDispatch()

	return (
		<KeyboardAvoidingView 
            style={styles.container} 
            behavior='padding' 
            contentContainerStyle={{flex: 1}}
        >
            <Modal
                animationType='fade'
                visible={modal}
                onRequestClose={() => setModal(!modal)}
            >
                <Pressable 
                    style={styles.modal_container}
                    onPress={() => setModal(!modal)}
                >
                    <Pressable style={styles.modal_view}>
                        <View style={styles.modal_title_view}>
                            <Text>Commencer la séance :</Text>
                            <Text style={styles.modal_title_desc}>{diffDays} pompes</Text>
                        </View>
                        <View style={styles.input_view}>
                            <TextInput
                                style={styles.input}
                                value={serie}
                                onChangeText={text => dispatch(serieModifie(text))}
                                placeholder='Nombre de séries'
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.input_view}>
                            <TextInput
                                style={styles.input}
                                value={rep}
                                onChangeText={text => dispatch(repModifie(text))}
                                placeholder='Nombre de répétitions'
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.input_view}>
                            <TextInput
                                style={styles.input}
                                value={recup}
                                onChangeText={text => dispatch(recupModifie(text))}
                                placeholder='Temps de récupération (min)'
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.desc_view}>
                            {serie !== '' &&
                                <Text style={styles.series}>Séries : {serie}</Text>
                            }
                            {rep !== '' &&
                                <Text style={styles.series}>Répétitions : {rep}</Text>
                            }
                            {serie !== '' && rep !== '' &&
                                <Text style={[styles.series, styles.multiplication]}>Soit {serie*rep} pompes</Text>
                            }
                            {serie !== '' && rep !== '' && serie*rep < diffDays &&
                                <View style={styles.desc_view}>
                                    <Text style={styles.series}>+ 1 série de {diffDays-(serie*rep)} pompes</Text>
                                    <Text style={[styles.series, styles.multiplication]}>Soit {serie*rep}+{diffDays-(serie*rep)} = {(serie*rep)+(diffDays-(serie*rep))} pompes</Text>
                                </View>
                            }
                            {recup !== '' &&
                                <Text style={styles.series}>Récupération : {recup} min</Text>
                            }
                        </View>
                        <Pressable
                            style={styles.start_modal}
                            disabled={serie*rep > diffDays}
                        >
                            {serie === '' || rep === '' || recup === '' ?
                                <Text style={styles.error_text}>Tous les champs ne sont pas remplis</Text>
                            : !serie.match(/^[0-9]+$/) || !rep.match(/^[0-9]+$/) || !recup.match(/^[0-9]+$/) ?
                                <Text style={[styles.error_text]}>Veuillez entrer des nombres</Text>
                            : serie*rep > diffDays &&
                                <Text style={styles.error_text}>Le nombre de pompes est trop élevé</Text>
                            }
                            <Text style={styles.start_text}>Commencer</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
            <View style={styles.title}>
                <Text>POMPES CALCULATOR</Text>
            </View>
            <View style={styles.calendar_view}>
                <Calendar 
                    style={styles.calendar}
                    minDate='2022-01-01'
                    maxDate='2022-12-31'
                    onDayPress={day => setDiffDays(getDifferenceInDays(day))}
                    enableSwipeMonths={true}
                    firstDay={1}
                />
            </View>
            <View style={styles.result_container}>
                {diffDays ?
                    <View style={styles.result_view}>
                        <Text>Vous devez effectuer {diffDays} pompes</Text>
                        <Pressable 
                            style={styles.start_session_touchable}
                            onPress={() => setModal(true)}
                        >
                            <Text style={styles.start_session_text}>Commencer la session</Text>
                        </Pressable>
                    </View>
                : <Text>Appuyez sur une date pour commencer</Text>}
            </View>
		</KeyboardAvoidingView>
	);
} 