import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
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
        paddingHorizontal: 40,
        paddingVertical: 30,
        margin: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        justifyContent: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modal_title_view: {
        alignItems: 'center',
        marginBottom: 10,
    },
    modal_title_desc: {
        marginTop: 3,
        fontSize: 13,
        fontWeight: 'bold',
    },
    input_view: {
        marginVertical: 10,
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingLeft: 2,
        paddingRight: 15,
    },
    input: {
        fontSize: 12,
    },
    desc_view: {
        alignItems: 'center',
    },
    series: {
        fontSize: 13,
        fontStyle: 'italic',
        margin: 2,
        textAlign: 'center',
    },
    multiplication: {
        paddingBottom: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    error_text: {
        fontSize: 12,
        color: 'red',
        textAlign: 'center',
    },
    start_modal: {
        marginTop: 20,
        alignItems: 'center'
    },
    start_text: {
        color: '#1780f7',
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