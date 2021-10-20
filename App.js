import React, { useState } from 'react';
import Home from './pages/home';
import Form from './pages/form';

const App = () => {

	//definiendo state de página activa
	const [page, setPage] = useState('HOME');
	const [pageAnterior, setPageAnterior] = useState('HOME');
	const [tareaAEditar, setTareaAEditar] = useState();
	
	//definir el state de tareas
	const [tareas, setTareas] = useState([
		{id: 1, nombre: 'Marcos', sector: 'Dep UX/UI', descripcion: 'Hacer una prueba de la aplicación', estado: 'En Análisis', fecha: '', hora: ''},
		{id: 2, nombre: 'María', sector: 'Dep Dev', descripcion: 'Test con Jest', estado: 'En Análisis', fecha: '', hora: ''},
		{id: 3, nombre: 'Seba', sector: 'Dep Dev', descripcion: 'Desarrollo de API Back', estado: 'En Análisis', fecha: '', hora: ''}
	]);

	//Eliminar las tareas del state
	const eliminarTarea = (id) =>{
		setTareas(tareasActuales => {
			return tareasActuales.filter(tarea => tarea.id !== id);
		})
	}

	const guardarTarea = (tareaAGuardar) => {

		if(tareaAGuardar.id === null){
			const ultimoID = tareas[tareas.length - 1].id;
			tareaAGuardar.id = ultimoID+1;
			setTareas([...tareas, tareaAGuardar]);
		} else {
			const tareasActuales = tareas;
			const index = tareasActuales.findIndex((tarea) => { return tarea.id === tareaAGuardar.id })
			tareasActuales.splice(index, 1);
			tareasActuales.push(tareaAGuardar);
			tareasActuales.sort((a, b)=> a.id > b.id);
			setTareas(tareasActuales);
		}
	}

	const changePage = (pageToGo) => {
		setPageAnterior(page);
		setPage(pageToGo);
	}

	const goToEditar = (e) => {
		setTareaAEditar(e);
		changePage('FORM');
	}

	function cambiarVista() {
		switch (page.toUpperCase()){
			case 'HOME':
				return (
					<Home tareas={tareas} eliminarTarea={eliminarTarea} editarTarea={goToEditar} />
				);
			case 'FORM':
				return (
					<Form
						tarea={tareaAEditar}
						changePage={changePage}
						volver={()=> changePage(pageAnterior) }
						guardarTarea={(e)=> guardarTarea(e) }
					/> 
				);
			default:
				return (
					<Home tareas={tareas} eliminarTarea={eliminarTarea} changePage={changePage} editarTarea={goToEditar} />
				);
		}
	}

	return (
		cambiarVista()
	);
}

export default App;