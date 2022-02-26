import { Text, View, Pressable, Modal, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react'
import styles from './assets/styles/AppStyles'
import getDifferenceInDays from './methods/getDifferenceInDays';

export default function App() {
    const [diffDays, setDiffDays] = useState(null)
    const [modal, setModal] = useState(false)
    const [serie, setSerie] = useState('')
    const [rep, setRep] = useState('')
    const [recup, setRecup] = useState('')

	return (
		<View style={styles.container}>
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
                            <Text>Commencer la session :</Text>
                            <Text style={styles.modal_title_desc}>{diffDays} pompes</Text>
                        </View>
                        <View style={styles.input_view}>
                            <TextInput
                                style={styles.input}
                                value={serie}
                                onChangeText={text => setSerie(text)}
                                placeholder='Nombre de séries'
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.input_view}>
                            <TextInput
                                style={styles.input}
                                value={rep}
                                onChangeText={text => setRep(text)}
                                placeholder='Nombre de répétitions'
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.input_view}>
                            <TextInput
                                style={styles.input}
                                value={recup}
                                onChangeText={text => setRecup(text)}
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
                            {serie*rep > diffDays &&
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
		</View>
	);
}