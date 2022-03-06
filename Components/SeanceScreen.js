import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { stepDecrement } from '../store/reducers/counterReducer';
import styles from '../assets/styles/SeanceScreenStyles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { clearCounter } from '../store/reducers/counterReducer';

export default function SeanceScreen({ navigation }) {
    const serie = useSelector((state) => state.counter.serie)
    const rep = useSelector((state) => state.counter.rep)
    const recup = useSelector((state) => state.counter.recup)
    const step = useSelector((state) => state.counter.step)
    const diffDays = useSelector((state) => state.counter.diffDays)
    const fill = useSelector((state) => state.counter.fill)
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            {step > 0 ?
                <View style={styles.container}>
                    <View style={styles.main_container}>
                        {step%2 === 0 ?
                            <CountdownCircleTimer
                                isPlaying
                                duration={parseInt(recup)}
                                colors={'#1780f7'}
                                onComplete={() => dispatch(stepDecrement())}
                            >
                                {({ remainingTime }) => <Text style={styles.pushup_text}>{remainingTime}</Text>}
                            </CountdownCircleTimer>
                        :serie*rep < diffDays && step == 1 ?
                            <View>
                                {fill ? 
                                    <Text style={styles.pushup_text}>{parseInt(rep)+parseInt(diffDays-(serie*rep))}x pompes</Text>
                                :
                                    <Text style={styles.pushup_text}>{diffDays-(serie*rep)}x pompes</Text>
                                }
                            </View>
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
                <View style={styles.container}>
                    <View style={styles.main_container}>
                        <Text style={styles.pushup_text}>Félicitation !</Text>
                        <Text style={styles.pushup_text}>Le défi quotidien est réussi avec brio !</Text>
                        <Pressable
                            style={{marginTop: 40}}
                            onPress={() => {
                                dispatch(clearCounter())
                                navigation.navigate('Pompes calculator')
                            }}
                        >
                            <Text style={styles.button_text}>Retourner au menu</Text>
                        </Pressable>
                    </View>
                </View>
            }
        </View>
    );
}