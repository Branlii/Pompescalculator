import { Text, View, Pressable, Modal, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react'
import styles from '../assets/styles/HomeScreenStyles'
import getDifferenceInDays from '../methods/getDifferenceInDays';
import { useSelector, useDispatch } from 'react-redux'
import { 
    serieModifie, 
    repModifie, 
    recupModifie, 
    stepCreate, 
    diffDaysModifie,
    clearCounter,
    fillModifie,
} from '../store/reducers/counterReducer';
import BouncyCheckbox from "react-native-bouncy-checkbox";



export default function HomeScreen({ navigation }) {
    const [modal, setModal] = useState(false)
    const [marked, setMarked] = useState({})
    
    const serie = useSelector((state) => state.counter.serie)
    const rep = useSelector((state) => state.counter.rep)
    const recup = useSelector((state) => state.counter.recup)
    const diffDays = useSelector((state) => state.counter.diffDays)
    const fill = useSelector((state) => state.counter.fill)
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
                    onPress={() => {
                        dispatch(clearCounter())
                        setMarked({})
                        setModal(!modal)
                    }}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
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
                                    onChangeText={text => {
                                        dispatch(serieModifie(text))
                                        if (rep === '' && text.match(/^[0-9]+$/)) {
                                            dispatch(repModifie(Math.floor(diffDays/text).toString()))
                                        }
                                    }}
                                    placeholder='Nombre de séries'
                                    keyboardType='phone-pad'
                                />
                            </View>
                            <View style={styles.input_view}>
                                <TextInput
                                    style={styles.input}
                                    value={rep}
                                    onChangeText={text => dispatch(repModifie(text))}
                                    placeholder={'Nombre de répétitions'}
                                    keyboardType='phone-pad'
                                />
                            </View>
                            <View style={styles.input_view}>
                                <TextInput
                                    style={styles.input}
                                    value={recup}
                                    onChangeText={text => dispatch(recupModifie(text))}
                                    placeholder='Temps de récupération (sec)'
                                    keyboardType='phone-pad'
                                />
                            </View>
                            <BouncyCheckbox
                                style={{marginVertical: 10}}
                                size={15}
                                textComponent={
                                    <Text style={{marginLeft: 5, fontSize: 13}}>Défi oublié la veille ?</Text>
                                }
                                fillColor='#1780f7'
                                onPress={(isCheck) => {
                                    if (isCheck) {
                                        dispatch(diffDaysModifie(diffDays*2-1))
                                    } else {
                                        dispatch(diffDaysModifie(Math.floor(diffDays/2)+1))
                                    }
                                }}
                            />
                            <BouncyCheckbox
                                style={{marginVertical: 10}}
                                size={15}
                                textComponent={
                                    <Text style={{marginLeft: 5, fontSize: 13}}>Combler ?</Text>
                                }
                                fillColor='#1780f7'
                                onPress={() => dispatch(fillModifie())}
                            />                        
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
                                        {!fill ? 
                                            <View>
                                                <Text style={styles.series}>+ 1 série de {diffDays-(serie*rep)} pompes</Text>
                                                <Text style={[styles.series, styles.multiplication]}>Soit {serie*rep}+{diffDays-(serie*rep)} = {(serie*rep)+(diffDays-(serie*rep))} pompes</Text>
                                            </View>
                                        :
                                            <View>
                                                <Text style={styles.series}>Avec {parseInt(rep)+parseInt(diffDays-(serie*rep))} pour la dernière rep</Text>
                                                <Text style={[styles.series, styles.multiplication]}>Soit {(serie-1)*rep}+{parseInt(rep)+parseInt(diffDays-(serie*rep))} = {(serie*rep)+(diffDays-(serie*rep))} pompes</Text>
                                            </View>
                                        }
                                        
                                    </View>
                                }
                                {recup !== '' &&
                                    <Text style={styles.series}>Récupération : {recup} sec</Text>
                                }
                            </View>
                            <Pressable
                                style={styles.start_modal}
                                disabled={serie*rep > diffDays}
                            >
                                {serie === '' || rep === '' || recup === '' ?
                                    <Text style={styles.error_text}>Tous les champs ne sont pas remplis</Text>
                                : !serie.match(/^[0-9]+$/) || !rep.match(/^[0-9]+$/) || !recup.match(/^[0-9]+$/) ?
                                    <Text style={styles.error_text}>Veuillez entrer des nombres</Text>
                                : serie*rep > diffDays ?
                                    <Text style={styles.error_text}>Le nombre de pompes est trop élevé</Text>
                                :
                                    <Pressable
                                        onPress={() => {
                                            if (serie*rep < diffDays && !fill) {
                                                dispatch(stepCreate((serie*2)+1))
                                            } else {
                                                dispatch(stepCreate((serie*2)-1))
                                            }
                                            navigation.navigate('Séance')
                                            setMarked({})
                                            setModal(false)
                                        }}
                                    >
                                        <Text style={styles.start_text}>Commencer</Text>
                                    </Pressable>
                                }
                            </Pressable>
                        </Pressable>
                    </ScrollView>
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
                    markedDates={marked}
                    onDayPress={day => {
                        setMarked({[day.dateString]: {selected: true}})
                        dispatch(diffDaysModifie(getDifferenceInDays(day)))
                    }}
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