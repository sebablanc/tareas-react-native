import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import Tarea from '../components/tarea';

const Home = ({tareas, eliminarTarea, editarTarea}) => {
    return (
		<View style={styles.contenedor}>
			<Text style={styles.titulo}>Administrador de Tareas</Text>
            
            <TouchableHighlight 
                onPress={()=>{editarTarea(null)}}
                style={styles.nuevaTarea}>
                <Text style={styles.textoNuevaTarea}>Nueva Tarea &#10133;</Text>
            </TouchableHighlight>

			<Text style={styles.titulo}>
				{tareas.length > 0 ? 'Administre  sus tareas' : 'No hay tareas, agregue una'}
			</Text>
			
            <FlatList 
				data={tareas}
				renderItem={({item})=><Tarea tarea={item} eliminarTarea={eliminarTarea} editarTarea={editarTarea} />}

				keyExtractor={tarea=>tarea.id}
				/>
			{/*tareas.map(tarea => (

				<View>
					<Text>{tarea.descripcion}</Text>
				</View>
			))*/}
		</View>
	);
}

export default Home;

const styles = StyleSheet.create({
	contenedor: {
		backgroundColor: '#3E2C41',
		flex: 1
	},
	titulo:{
		color: '#FFFFFF',
		marginTop: 20,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	},
    nuevaTarea: {
        backgroundColor: '#83518C',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    textoNuevaTarea: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    }
});
