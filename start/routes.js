 /** @type {typeof import('@adonisjs/framework/src/Route/Manager')}*/
	const Route = use('Route')     
	const User = use('App/Models/User')
	const Tema = use('App/Models/Tema')
	const Helpers = use('Helpers')
	const Database = use('Database')
	const Hash = use('Hash')
	
  Route.get('/', 'UserController.checklogin')
	Route.post('login','UserController.login')
	Route.get('logout','UserController.logout')

Route.get('/saludarvue', ({view})=> view.render('app') );
Route.get('/saludame/:nombre/:edad', 'SaludarController.metodoSaludar');

Route.get('/pruebapython', 'PonderacionController.pruebaPython');

  Route.get('temas/count','TemaController.temacount') 

///RUTAS DEL METODO DE PONDERACION

Route.get('/arbol/obtenerCaminos/:id', 'PonderacionController.getPaths');
Route.get('/arbol/obtenerResultados', 'PonderacionController.getResults');
Route.get('/arbol/obtenerRamas', 'PonderacionController.obtener_ramas');

Route.get('/imagen/pregunta/:id', 'PreguntaController.obtenerImagenesPregunta')

Route.get('/obtenercpts/:idhijo/:idpadres', 'CptController.obtenerCpts');
///////////////////////////////////////////////////

Route.get('/obtenerTodasLasImagenes', 'PreguntaController.obtenerTodasImagenes');
Route.get('/obtenerDatos', 'UserController.obtenerDatos');

Route.post('/verificarExistencia', 'UserController.verificarExistencia');


Route.get('/arbol/caminos', 'PonderacionController.obtener_caminos')

//RUTAS TEMPORALES PARA EL SIMULADOR
Route.get('/arbol/simulador/caminos', 'PonderacionController.obtener_caminos_simulador')

Route.get('/arbol/caminoslibreria', 'PonderacionController.obtener_caminos_red_bayesiana')


Route.post('/temas/guardarProbabilidades', 'TemaController.storeProbabilidades');
Route.get('/temas/obtenerEvidencias', 'TemaController.obtenerEvidencias')
Route.get('/temas/obtenerTotalTemas', 'TemaController.obtenerTotalNodos')
//Route.post('tema/actualizarColor','TemaController.actualizarColor')

///////////////////////////////////////////////////
Route.get('/preguntas/obtenerNumeroRespuestas/:id', 'PreguntaController.obtenerNumeroRespuestas');
///////////////////////////////////////////////////


Route.get('/historialprofesor', ({view}) =>  view.render('arbol_profesor') )


Route.get('/subirimagen', async ({view}) =>{
		
		const images = await Database.table('imagenes');
	
		return view.render('subir_imagenes.edge', {imagenes:images})	
});


Route.get('images/all', async ({ request, response }) => {
	
	const images = await Database.table('imagenes');
	
	return response.json(images)
	
});

Route.post('upload', async ({ request, response }) => {
  const profilePic = request.file('profile_pic', {
    types: ['image'],
    size: '2mb'
  })
  const name_pic = request.input('alias');
   const type=request.file('profile_pic').subtype;
   const name= `${new Date().getTime()}.${type}`
  await profilePic.move('public/preguntas/', {
		name: name
  })
  await Database.insert({nombre: name, alias:name_pic}).into('imagenes')
  if (!profilePic.moved()) {
    return profilePic.error()
  }
  response.redirect('/subirImagen')
})

Route.post('/subirr', 'UserController.subirimagen');

Route.post('editardatos', async ({ request, response, auth }) => {
  
	const nombre = request.input('nombre');
	const apaterno = request.input('apellidopaterno');
	const amaterno = request.input('apellidomaterno');
	
	const contrasena = await request.input('contrasena');
	const repcontrasena = await request.input('contrasena2');
	
	if(contrasena || repcontrasena){
	   
		if( contrasena == repcontrasena ){

		   const safePassword = await Hash.make(contrasena)

		   await Database.raw('UPDATE users SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, password = ? WHERE id = ?',[nombre, apaterno, amaterno, safePassword ,auth.user.id])

		   response.redirect('/perfil?e=1')

		}else{

			response.redirect('/perfil?e=2')
		}
		
		
	}else{
		await Database.raw('UPDATE users SET nombre = ?, apellido_paterno = ?, apellido_materno = ? WHERE id = ?',[nombre, apaterno, amaterno ,auth.user.id])
		response.redirect('/perfil?e=1')
	}
	
})


Route.post('subirfotoperfil', async ({ request, response, auth }) => {
  const profilePic = request.file('profile_pic', {
    types: ['image'],
    size: '2mb'
  })
   const type=request.file('profile_pic').subtype;
   const name= `${new Date().getTime()}.${type}`
  await profilePic.move('public/images/fotosperfil', {
		name: name
  })
	
	await Database.raw('UPDATE users SET foto = ? WHERE id = ?',[name, auth.user.id])
	
  if (!profilePic.moved()) {
    return profilePic.error()
  }
  response.redirect('/perfil')
})



//Route.get('historial', ({view}) =>  view.render('app'))
Route.get('/temas/posiblesNodosPadres/:id', 'TemaController.posiblesNodosPadres')
Route.get('/temas/obtenerPadres/:id', 'TemaController.obtenerPadres')
Route.get('/temas/obtenerPadresConNombre/:id', 'TemaController.obtenerPadresConNombre')
Route.get('/tema/relacionesPrimarias','TemaController.verrelacion')
Route.post('tema/addTema','TemaController.registrar');
Route.post('tema/actualizarColor','TemaController.actualizarColor')
Route.get('/tema/obtenerRadio','TemaController.obtenerRadio')
Route.post('tema/actualizarRadio/:radio', 'TemaController.actualizarRadio')
Route.get('/user/obtenerAlumnos','TemaController.obtenerAlumnos')
Route.get('/user/obtenerArbol/:id','TemaController.obtenerArbol')
Route.get('/obtenerConexiones/:id','TemaController.obtenerConexiones')

Route.get('/perfil', ({view}) =>  view.render('app'))



//////////////////////////////////////


/////////////////////////////////////////


Route.get('/alumno/app', ({view})=> view.render('app') );
Route.get('/experto/app', ({view})=> view.render('app') );
Route.get('/profesor/app', ({view})=> view.render('app') );

Route.get('/pruebaimagenes', ({view})=> view.render('app') );


Route.get('pregunta/showCalculadas','PreguntaController.mostrarPreguntasCalculadas')
Route.get('/preguntasCalculadas', ({view})=> view.render('app') );
Route.post('/preguntaCalculada/store','PreguntaController.storeCalculada')
Route.post('/preguntaCalculada/delete','PreguntaController.deleteCalculadas')
Route.post('pregunta/getComodines','PreguntaController.getComodines')
Route.post('/preguntaCalculada/update','PreguntaController.updateCalculadas')
Route.get('pregunta/showVcomodines','PreguntaController.valorcomodin')
///////////////////////////////////////////

Route.get('preguntasOpcionMultipleCalculadas', ({view}) => view.render('app'))
Route.get('pregunta/showMultiplesCalculadas','PreguntaController.mostrarPreguntasOpcionMultipleCalculadas')
Route.post('preguntaOpcionMultipleCalculadas/store','PreguntaController.storeMultipleCalculadas')
Route.post('preguntaOpcionMultipleCalculadas/update','PreguntaController.updateMultipleCalculadas')
Route.post('preguntaOpcionMultipleCalculadas/delete', 'PreguntaController.deleteCalculadasMultiples')

///////////////////////////////////////////////////////////////////

Route.get('/pregunta/opciones/:id', 'PreguntaController.obtenerOpciones');
Route.get('/pregunta/opcionescalculadasmultiples/:id', 'PreguntaController.obtenerOpcionesCalculadaMultiple');
Route.get('/pregunta/respuestas/:id', 'PreguntaController.obtenerRespuestas');
/////////////////////////////////////////

	Route.post('pregunta/add','PreguntaController.store')//
  Route.post('pregunta/addNumerica','PreguntaController.storeNumerica') //
  
  Route.get('questions/checkQuestionnaireStart','PreguntaController.checkQuestionnaireStart') //


	//Route.get('/cuestionario', ({view})=> view.render('app') ).middleware(['AccessValidator:1']);
	//Rutas de el ecuestionario

	Route.group(()=>{
		Route.get('/cuestionario', ({view})=> view.render('app') );
		Route.get('pregunta/showPreguntas/:id','PreguntaController.showPreguntas');
		Route.get('cuestionario/obtenerconfiguracion','PreguntaController.obtenerconfiguracion');
		///////////////////////////////////////////
		Route.get('topic/getopic','BayeController.NextTopic');
		//////////////////////////////////////////
		///////////////////////////////////////////
		Route.post('/score/add','PreguntaController.addScore');
		/////////////////////////////////////////
	}).middleware(['AccessValidator:1']);


  


	//Rutas generales 
    Route.group(()=>{
		
		/*Route.any('tablero', 
				  ({view}) => {
				  	let prueba = session.get('prueba')
				  	view.render('app', {prueba: prueba})
				  }  
				  
		)*/
		
		Route.any('/tablero', 'AccesosRutaController.pasarSession')
		
		
		Route.get('/usuario/geter','UserController.usuarioTipo')//obtiene el ud rol de usuario
		
		//AQUI ESTOY PONIENDO LAS RUTAS DE LOS ACCESOS POR MIENTRAS
		Route.get('/configurarAccesos', ({view}) =>  view.render('app'));
		Route.get('/accesos/:id','AccesosRutaController.obtenerAccesosRol')
		Route.post('/guardarAccesoRutas', 'AccesosRutaController.guardarconfiguracion');
		
	}).middleware(['VerificadorAuthRole:1,2,3,4'])



  //Rutas de Administrador, Experto, Profesor
  Route.group(()=>{
		Route.get('pregunta/showPN','PreguntaController.showPreguntasNumericas')
		Route.get('pregunta/showPAB','PreguntaController.showPreguntasAbiertas')
	}).middleware(['VerificadorAuthRole:1,2,3]'])

	Route.group(()=>{
			Route.post('tema/addTema','TemaController.registrar')
	}).middleware(['VerificadorAuthRole:1,2]'])

//Grupo de solo los temas (nodos)
  Route.group(()=>{
	  Route.post('tema/deleteTema1/:id','TemaController.deleteTemaAndHijos')
      Route.post('tema/deleteandcambiarPadre/:id','TemaController.deleteandcambiarPadre')//
      Route.post('tema/deleteTema','TemaController.deleteTemaAndHijos')
      Route.get('tema/all','TemaController.showall')
      Route.get('tema/showTemasOnlyNombreID','TemaController.showTemasOnlyNombreID')
      Route.post('tema/addTema','TemaController.registrar') //
      Route.post('tema/editarNodo/:id','TemaController.editarNodo')//
      Route.get('tema/deleteTema','TemaController.deleteTemaAndHijos')
      Route.post('tema/deleteandcambiarPadre/:id','TemaController.deleteandcambiarPadre')// //CCambiar padre y eliminar nodo
      Route.post('tema/editarNodo','TemaController.editarNodo') // //Se eidta el nodo y se puede cambiar el padre
      Route.get('tema/relacionesPrimarias','TemaController.verrelacion')	///Obtener relaciones primarias
		  Route.get('/historialexperto','AccesosRutaController.AbirArbol')
      Route.get('temas',({view})=> view.render('app'))
	  
	  
  }).middleware(['AccessValidator:2'])

	//rutas generales.
	Route.get('/preguntas/nodo','PreguntaController.preguntanodo')
	Route.get('/arbol',({view})=> view.render('arbol'))
	//Route.post('tema/deleteandcambiarPadre/:id','TemaController.deleteandcambiarPadre')//
	Route.post('tema/cambiarPadre/:id','TemaController.cambiarPadre')//
  Route.post('tema/hacerHijoPadre/:id','TemaController.hacerHijoPadre')// 
	Route.get('temas/arbol','TemaController.arbol') //
	//Route.post('tema/editarNodo/:id','TemaController.editarNodo')//
	Route.get('temas/:id','TemaController.show') //
	Route.post('tema/posicion','TemaController.posicion')// 


	//Rutas-Preguntas

	Route.post('pregunta/add','PreguntaController.store')//
  Route.post('pregunta/addNumerica','PreguntaController.storeNumerica') //
	Route.post('pregunta/delete','PreguntaController.delete')//
	//Route.get('temas', async () => {return await Tema.all()}) // DUDA SI BORRARLA//////////////////
	//Route.get('tema/all','TemaController.showOnlyTemas') //
  Route.get('configuracionCuestionario/margen','ConfiguracionController.cargarMargen') //
  //Route.get('tema/all','TemaController.showall')
  //Route.get('tema/showTemasOnlyNombreID','TemaController.showTemasOnlyNombreID')
  Route.get('pregunta/show','PreguntaController.showall')
 
  Route.post('tema/addsecundario','TemaController.registrar_secundario')
  Route.post('tema/deleteNodoSecundario','TemaController.deleteNodoSecundarioRelation')
  Route.post('alumno/add','UserController.realumno')
  Route.get('alumno/show','UserController.alumnos')
  Route.post('alumno/actualizar','UserController.actualizarA')
  Route.get('alumno/showp','UserController.alumnosP')
  Route.get('show/profesor','UserController.profesor')
  Route.get('show/experto','UserController.experto')

  Route.post('user/delete','UserController.delete')
  Route.post('user/deleteExperto','UserController.deleteExperto')
  Route.post('user/delete2','UserController.deletealumno')
  Route.post('user/delete3','UserController.deleteprofesor')


  Route.post('registrar','UserController.registrar')
  Route.get('admin/show','UserController.admins')
  Route.post('user/actualizar','UserController.actualizar')
  
  Route.get('app/cuestionario/obtenerconfiguracion','PreguntaController.obtenerconfiguracion')
	Route.post('app/pregunta/add','PreguntaController.store')//
	Route.post('app/preguntaOpcionMultiple/store','PreguntaController.storeMultiple')
	Route.post('app/preguntaOpcionMultiple/update','PreguntaController.updateMultiple')
	Route.get('app/pregunta/showMultiples','PreguntaController.mostrarPreguntasOpcionMultiple')
  
  
  	//Fin Froylán
	//RUTAS DE ADMINISTRADOR 
	Route.group(()=>{
		
		Route.get('profesor/count','UserController.profesorcount')
		Route.get('alumno/count','UserController.alumnocount')
		Route.get('admin/count','UserController.adminscount')
		Route.get('experto/count','UserController.expertocount')
		Route.get('pregunta/count','PreguntaController.preguntacount')
		Route.get('temas/count','TemaController.temacount') /////////////////////////////////////////
		
		
		Route.get('usuariosAdministrador', ({view}) =>  view.render('app'))//
		Route.get('usuariosAlumno', ({view}) =>  view.render('app'))//
		Route.get('usuariosExperto', ({view}) =>  view.render('app'))//
		Route.get('usuariosProfesor', ({view}) =>  view.render('app'))//

		//Rutas para el cuestionario 
		
		
		
		Route.get('configurarCuestionario', ({view})=> view.render('app') );
		Route.get('preguntas', ({view}) =>  view.render('app'))
		
		Route.get('preguntasAbiertas', ({view}) =>  view.render('app'))
		
		
		
		Route.get('preguntasNumericas', ({view}) =>  view.render('app'))
	
		//hasta aqui es alejandro
		Route.get('preguntasVerdaderoFalso', ({view}) =>  view.render('app'))
		Route.get('preguntasOpcionMultiple', ({view}) => view.render('app'))
		Route.get('resolverCuestionario',({view}) => view.render('app'))
		Route.get('historial', ({view}) =>  view.render('app'))
		Route.get('temas',({view})=> view.render('app'))
		
	
		Route.post('app/pregunta/add','PreguntaController.store')//
		Route.post('app/preguntaOpcionMultiple/store','PreguntaController.storeMultiple')
		Route.post('app/preguntaOpcionMultiple/update','PreguntaController.updateMultiple')
		Route.get('pregunta/showMultiples','PreguntaController.mostrarPreguntasOpcionMultiple')
		Route.post('tema/addsecundario','TemaController.registrar_secundario')
		Route.post('tema/deleteNodoSecundario','TemaController.deleteNodoSecundarioRelation')
		Route.post('alumno/add','UserController.realumno')
		Route.get('alumno/show','UserController.alumnos')
		Route.post('alumno/actualizar','UserController.actualizarA')
		Route.get('alumno/showp','UserController.alumnosP')
		Route.get('show/profesor','UserController.profesor')
		Route.get('show/experto','UserController.experto')
		Route.post('user/delete2','UserController.deletealumno')
		Route.post('user/delete3','UserController.deleteprofesor')
		Route.post('registrar','UserController.registrar')
		Route.get('admin/show','UserController.admins')
		Route.post('user/actualizar','UserController.actualizar')
		Route.post('user/delete','UserController.delete')
		Route.get('app/nodos', ({view}) =>  view.render('app'))
		Route.get('app/preguntas/contestar', ({view}) =>  view.render('app'))
		Route.get('app/preguntas/nodo', ({view}) =>  view.render('app'))
		//Route.get()
		//Route.post('tema/addTema','TemaController.registrar') //
		Route.post('tema/deleteandcambiarPadre/:id','TemaController.deleteandcambiarPadre')//
		Route.get('tema/editarNodo/:id:id2:nombre','TemaController.editarNodo')//
		Route.get('temas/arbol','TemaController.arbol')//
		Route.get('temas/:id','TemaController.show')//
		//rutas preguntas
		//OBTENER LAS CONFIGURACIONES DEL CUESTIONARIO
		// Route.get('cuestionario/obtenerconfiguracion','PreguntaController.obtenerconfiguracion') // Grupo Cuestionario
		
    Route.post('pregunta/update','PreguntaController.updateAN')
    Route.post('pregunta/updateAbierta','PreguntaController.updateAbierta')
    
		Route.post('pregunta/add','PreguntaController.store')//
		Route.post('preguntaOpcionMultiple/store','PreguntaController.storeMultiple')
		Route.post('preguntaOpcionMultiple/update','PreguntaController.updateMultiple')
		Route.get('/pregunta/showMultiples','PreguntaController.mostrarPreguntasOpcionMultiple')
		//Hasta aqui diego
		// Route.get('pregunta/showPreguntas','PreguntaController.showPreguntas') // Grupo Cuestionario
		Route.post('pregunta/eliminar','PreguntaController.delete')
		Route.post('preguntaOpcionMultiple/update', 'PreguntaController.updateMultiple')	
		Route.post('app/pregunta/delete','PreguntaController.delete')//
		//Route.get('temas', async () => {return await Tema.all()})
		Route.get('tema/hijos/:id','TemaController.showTemasHijos')
		// obtener arbol usuario
		Route.get('tema/arbolu','TemaController.showausuario')
		// agregar padre secundario
		
		//Route.get('');
		
		Route.get('obtenerconfiguracion', 'ConfiguracionController.obtenerConfiguracionCuestionario');
		
		Route.get('obtenerTotalPorPregunta', 'ConfiguracionController.obtenerTotalPreguntas');
		
		Route.post('guardarconfiguracion', 'ConfiguracionController.guardarconfiguracion');
		
	}).middleware(['VerificadorAuthRole:1'])

	//Route.post('tema/deleteTema','TemaController.deleteTemaAndHijos')

	//rutas del experto
	Route.group(()=>{
		
		Route.get('historial', ({view}) =>  view.render('app'))
		//Route.get('temas',({view})=> view.render('app'))
		Route.get('preguntas', ({view}) =>  view.render('app'))
		Route.get('preguntasAbiertas', ({view}) =>  view.render('app'))
		Route.get('preguntasNumericas', ({view}) =>  view.render('app'))
		//hasta aqui es alejandro
		Route.get('preguntasVerdaderoFalso', ({view}) =>  view.render('app'))
		Route.get('preguntasOpcionMultiple', ({view}) => view.render('app'))
		Route.get('app/nodos',({view}) => view.render('experto'))
		Route.get('app/informacionpersonal',({view}) => view.render('experto'))
		Route.get('app/preguntas',({view}) => view.render('experto'))
		Route.get('app/preguntasAbiertas', ({view}) =>  view.render('app'))
		Route.get('app/preguntasNumericas', ({view}) =>  view.render('app'))
		Route.get('app/ExamenPrueba',({view}) => view.render('app'))
		// Agregar padre secundario
		Route.post('tema/addsecundario','TemaController.registrar_secundario')
		// Ruta de agregar tema
		Route.post('tema/addTema','TemaController.registrar')//
		// EliminarTemayTodosSusHijos
		Route.post('prueba','TemaController.agregarTema')	
		//Route.get('tema/deleteTema','TemaController.deleteTemaAndHijos')
		//Route.post('tema/deleteandcambiarPadre/:id','TemaController.deleteandcambiarPadre')// //CCambiar padre y eliminar nodo
		//Route.post('tema/editarNodo','TemaController.editarNodo') // //Se eidta el nodo y se puede cambiar el padre
		//Route.get('tema/relacionesPrimarias','TemaController.verrelacion')	///Obtener relaciones primarias
		
	}).prefix('experto').middleware(['auth'])

	//rutas del profesor
	Route.group(()=>{
    	Route.get('resolverCuestionario',({view}) => view.render('app'))
		Route.get('/app/historialalumnosprofesor',({view})=>view.render('profesor'))
		Route.get('app/informacionpersonal',({view}) => view.render('profesor'))

		Route.get('app/historialalumnos',({view}) => view.render('profesor'))
	}).prefix('profesor').middleware(['auth'])
	
	//rutas del alumno
	Route.group(()=>{
    	Route.get('resolverCuestionario',({view}) => view.render('app'))
		Route.get('app/arbolalumno',({view}) => view.render('alumno'))
		Route.get('app/informacionpersonal',({view}) => view.render('alumno'))

		Route.get('app/historialalumnos',({view}) => view.render('alumno'))
	}).prefix('alumno').middleware(['auth'])





////Route.get('app/pregunta/showPAB','PreguntaController.showPreguntasAbiertas') comaentada por que no sabemos si se usa 
//Route.get('app/pregunta/showPN','PreguntaController.showPreguntasNumericas')  Comentada por que no sabemos si funcione o no 
//	Route.get('app/arbolalumno',({view}) => view.render('profesor'))
	//Route.get('app/arbol', ({view}) =>  view.render('app'))

//RUTAS ELIMINADAS POR FROYLAN
//Route.get('temas/arbol2','TemaController.arbol2')
//Route.get('temas/arbol2','TemaController.arbol2')
//Route.get('id/info','UserController.info')
//Route.post('pregunta/update','PreguntaController.update')
//Route.post('app/pregunta/update','PreguntaController.update')
//Route.get('pregunta/showP1','PreguntaController.showPreguntasAbiertas')

		//Route.get('app/resolvercuestionario',({view}) => view.render('alumno'))
		//Route.get('app/resolvercuestionario',({view}) => view.render('profesor'))
/////

