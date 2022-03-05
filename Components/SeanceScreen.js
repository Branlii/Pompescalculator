import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { stepDecrement } from '../store/reducers/counterReducer';
import styles from '../assets/styles/SeanceScreenStyles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function SeanceScreen() {
    const rep = useSelector((state) => state.counter.rep)
    const recup = useSelector((state) => state.counter.recup)
    const step = useSelector((state) => state.counter.step)

    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            {step > 0 ?
                <View style={styles.container}>
                    <View style={styles.main_container}>
                        {step%2 === 0 ?
                            <CountdownCircleTimer
                                isPlaying
                                duration={parseInt(recup*60)}
                                colors={'#1780f7'}
                            >
                                {({ remainingTime }) => <Text style={styles.pushup_text}>{remainingTime}</Text>}
                            </CountdownCircleTimer>
                        :
                            <Text style={styles.pushup_text}>{rep}x pompes</Text>
                        }
                    </View>
                    <Pressable 
                        style={styles.button_contaier}
                        onPress={() => dispatch(stepDecrement())}
                    >
                        <Text style={styles.button_text}>Suivant</Text>
                    </Pressable>
                </View>
            :
            <Text>FINITO</Text>}
        </View>
    );
}