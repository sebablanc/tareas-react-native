import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const Tarea = ({tarea, eliminarTarea, editarTarea}) => {

    return (
        <View style={[styles.tarea, styles[tarea.estado.replace(' ', '')]]}>
            
            <View style={styles.dosColumnas}>
                <View style={styles.dataColumna}>
                    <Text style={[styles.label, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>Fecha:</Text>
                    <Text style={[styles.texto, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>{tarea.fecha}</Text>
                </View>

                <View style={styles.dataColumna}>
                    <Text style={[styles.label, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>Hora:</Text>
                    <Text style={[styles.texto, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>{tarea.hora}</Text>
                </View>
            </View>

            <View style={styles.dosColumnas}>
                <View style={styles.dataColumna}>
                    <Text style={[styles.label, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>Nombre:</Text>
                    <Text style={[styles.texto, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>{tarea.nombre}</Text>
                </View>

                <View style={styles.dataColumna}>
                    <Text style={[styles.label, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>Sector:</Text>
                    <Text style={[styles.texto, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>{tarea.sector}</Text>
                </View>
            </View>

            <View>
                <Text style={[styles.label, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>Descripcion:</Text>
                <Text style={[styles.texto, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>{tarea.descripcion}</Text>
            </View>

            <View>
                <Text style={[styles.label, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>Estado:</Text>
                <Text style={[styles.texto, tarea.estado === 'Finalizado' ? styles.textoClaro : null ]}>{tarea.estado}</Text>
            </View>

            <View style={styles.botonera}>
                <TouchableHighlight
                    onPress={()=>{eliminarTarea(tarea.id)}}
                    style={[styles.btnAcciones, styles.btnEliminar]}
                    >
                    <Text style={[styles.btnTexto, styles.textoClaro]}>Eliminar &times;</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={()=>{editarTarea(tarea)}}
                    style={[styles.btnAcciones, styles.btnEditar]}
                    >
                    <Text style={[styles.btnTexto, styles.textoClaro]}>Editar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default Tarea;

const styles = StyleSheet.create({
    tarea: {
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 20
    },
    dosColumnas: {
        flex: 1,
        flexDirection: 'row',
        flexBasis: '50%'
    },
    dataColumna: {
        width: '50%',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
    texto: {
        fontSize: 16,
        textAlign: 'center',
    },
    botonera:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 0
    },
    btnAcciones:{
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        width: '45%',
        marginRight: 15,
        marginLeft: 5
    },
    btnEditar: {
        backgroundColor: '#886D8C',
    },
    btnEliminar: {
        backgroundColor: '#A62E4F',
    },
    btnTexto: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textoClaro: {
        color: '#FFFFFF'
    },
    EnAnálisis: {
        backgroundColor: '#FFFFFF'
    },
    ParaDesarrollar: {
        backgroundColor: '#5478F5',
    },
    EnCurso: {
        backgroundColor: '#419EF5'
    },
    EnPausa: {
        backgroundColor: '#D3F549'
    },
    EnPruebas: {
        backgroundColor: '#65FF4D'
    },
    Finalizado: {
        backgroundColor: 'green'
    }
})