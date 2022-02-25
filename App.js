import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react'

function getDifferenceInDays(date) {
    const start = new Date(2022, 0, 1)
    const diffTime = Math.abs(start - date.timestamp)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}

export default function App() {
    const [diffDays, setDiffDays] = useState(null)
    const [modal, setModal] = useState(false)

	return (
		<View style={styles.container}>
            <Modal
                visible={modal}
                transparent={true}
            >
                <Pressable 
                    style={styles.modal_container}
                    onPress={() => setModal(!modal)}
                >
                    <Pressable style={styles.modal_view}>
                        <Text>Commencer la session</Text>
                    </Pressable>
                </Pressable>
            </Modal>
            <View style={styles.title}>
                <Text>POMPES CALCULATOR</Text>
            </View>
            <View style={styles.calendar_view}>
                <Calendar 
                    style={styles.calendar}
                    onDayPress={day => setDiffDays(getDifferenceInDays(day))}
                    enableSwipeMonths={true}
                    firstDay={1}
                />
            </View>
            <View style={styles.result_container}>
                {diffDays &&
                    <View style={styles.result_view}>
                        <Text>Vous devez effectuer {diffDays} pompes</Text>
                        <Pressable 
                            style={styles.start_session_touchable}
                            onPress={() => setModal(true)}
                        >
                            <Text style={styles.start_session_text}>Commencer la session</Text>
                        </Pressable>
                    </View>
                }
            </View>
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
    },
    modal_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(128, 128, 128, 0.4)',
    },
    modal_view: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        flex: 2,
        justifyContent: 'center',
    },
    calendar_view: {
        flex: 4,
    },
    calendar: {
        borderRadius: 10,
    },
    result_container: {
        flex: 2,
    },
    result_view: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 30,
    },
    start_session_touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#1780f7',
        marginVertical: 20,
    },
    start_session_text: {
        color: '#1780f7',
    },
});