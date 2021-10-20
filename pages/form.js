import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, FlatList, Pressable, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Form = ({tarea, volver, guardarTarea}) => {
    const [nombre, setNombre] = useState(tarea && tarea.nombre ? tarea.nombre : '');
    const [sector, setSector] = useState(tarea && tarea.sector ? tarea.sector : '');
    const [descripcion, setDescripcion] = useState(tarea && tarea.descripcion ? tarea.descripcion : '');
    const [estadoTarea, setEstadoTarea] = useState(tarea && tarea.estado ? tarea.estado : 'En Análisis');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [fecha, setFecha] = useState(tarea && tarea.fecha ? tarea.fecha : '');
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [time, setTime] = useState(tarea && tarea.hora ? tarea.hora : '');


    const toggleDatePicker = () => {
      setDatePickerVisibility(!isDatePickerVisible);
    };

    const toggleTimePicker = () => {
        setTimePickerVisibility(!isTimePickerVisible);
      };
  
    const handleDateConfirm = date => {
        console.log(date.toLocaleString('es-ES'));
        const opciones = {day: "2-digit", month: "long",year: "numeric"};
        setFecha(date.toLocaleDateString('es-ES', opciones));
        toggleDatePicker();
    };

    const handleTimeConfirm = (time) => {
        const opciones = {hour: 'numeric', minute: '2-digit'};
        setTime(time.toLocaleTimeString('en-US', opciones));
        toggleTimePicker();
    };

    const estados = [
        {key: 0, label:"En Análisis"},
        {key: 1, label:"Para Desarrollar"},
        {key: 2, label:"En Curso"},
        {key: 3, label:"En Pausa"},
        {key: 4, label:"En Pruebas"},
        {key: 5, label:"Finalizado"},
    ];

    const submitTarea = () => {

        //Verifico que se hayan cargado datos
        if(nombre.trim() == '' || sector.trim() == '' || descripcion.trim() == ''){
            //TODO: mostrar mensajes
            console.log('faltan datos');
            Alert.alert('Error', 'Todos los campos son obligatorios', [{text: 'OK'}])
            return;
        }

        guardarTarea({
            id: tarea && tarea.id ? tarea.id : null,
            nombre: nombre,
            sector: sector,
            descripcion: descripcion,
            estado: estadoTarea,
            fecha: fecha,
            hora: time,
        });

        volver();

    }

    return(
        <View style={styles.contenedor}>
            <Pressable
                style={styles.flechaVolver}
                onPress={() => { volver(); }}
                >
                <Text style={styles.flechaTexto}>&#8617;</Text>
            </Pressable>
            <Text style={styles.titulo}>Nueva Tarea</Text>
            <TextInput
                style={styles.input}
                onChangeText={(e)=>{ setNombre(e) }}
                value={nombre}
                placeholder="Nombre: "
                />

            <TextInput
                style={styles.input}
                onChangeText={(e)=>{ setSector(e) }}
                value={sector}
                placeholder="Sector: "
                />

            <TextInput
                multiline
                style={styles.textArea}
                value={descripcion}
                placeholder="Descripción: "
                onChangeText={(e)=>{ setDescripcion(e)}}
                />

            <View style={[styles.pickerContainer]}>
                <Text style={[styles.pickerText, fecha==''? styles.grayText : '']}>{fecha=='' ? 'Ingrese una fecha' : fecha}</Text>
                <TouchableHighlight 
                    style={styles.pickerBtn}
                    onPress={toggleDatePicker} >
                        <Text style={styles.pickerBtnIcon}>&#x1f5d3;</Text>
                </TouchableHighlight>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={toggleDatePicker}
                    locale="es-ES"
                />
            </View>

            <View style={[styles.pickerContainer]}>
                <Text style={[styles.pickerText, time==''? styles.grayText : '']}>{time=='' ? 'Ingrese una hora' : time}</Text>
                <TouchableHighlight 
                    style={styles.pickerBtn}
                    onPress={toggleTimePicker} >
                        <Text style={styles.pickerBtnIcon}>&#x23f2;</Text>
                </TouchableHighlight>
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={toggleTimePicker}
                    locale="es-ES"
                />
            </View>

            <FlatList
                style={styles.opcionesEstado}
                data={estados}
                numColumns={2}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={item.key}
                        onPress={() => setEstadoTarea(item.label)}
                        style={[styles.tarjetaEstado, estadoTarea==item.label ? styles.shine : '']}
                        >
                        <Text style={styles.centrarTexto}>{item.label}</Text>
                    </TouchableHighlight>
                )}
            />

            <TouchableHighlight
                onPress={() => { submitTarea() }}
                style={[styles.btnFormulario, styles.btnGuardarFondo]}
                >
                <Text style={[styles.centrarTexto, styles.btnTexto]}>Guardar</Text>
            </TouchableHighlight>

        </View>
    );
}

const styles = StyleSheet.create({
	contenedor: {
		backgroundColor: '#3E2C41',
		flex: 1
	},
	titulo:{
		color: '#FFFFFF',
		marginTop: 10,
        marginBottom: 20,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	},
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        color: '#000000'
    },
    textArea: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
        color: '#000000'
    },
    opcionesEstado: {
        marginHorizontal: 2
    },
    tarjetaEstado: {
        backgroundColor: '#FFFFFF',
        width: 182,
        margin: 10,
        padding: 10,
        opacity: 0.7
    },
    centrarTexto: {
        textAlign: 'center',
    },
    shine: {
        elevation: 1,
        opacity: 1
    },
    btnFormulario: {
        width: '90%',
        margin: 15,
        padding: 10,
        borderRadius: 10,
    },
    btnGuardarFondo: {
        backgroundColor: '#83518C'
    },
    btnTexto: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    flechaVolver: {
        marginVertical: 2,
        marginHorizontal: 20,
        position: 'absolute',
        zIndex: 99999
    },
    flechaTexto: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
    pickerContainer: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5
    },
    pickerText: {
        width: '90%',
        color: '#000000',
    },
    pickerBtn: {
        backgroundColor: '#886D8C',
        width: 50,
        height: 38,
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    pickerBtnIcon: {
        fontSize: 30,
        color: 'white',
        top: -4
    },
    grayText: {
        color: 'gray'
    }
});

export default Form;