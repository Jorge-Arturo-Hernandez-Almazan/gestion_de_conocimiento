'use strict'

//const User = use('App/Models/User')
const {validate}= use('Validator')
const Hash = use('Hash')
const Database = use('Database')

class AccesosRutaController {
	
	async obtenerAccesosRol({params,response}){
		
		let id_rol = params.id;
		
		const accesos = await Database.raw('SELECT funcionalidad.*, grupo_funcionalidad.nombre as grupo, funcionalidad_rol.estado as estado, funcionalidad_rol.id_rol as rol  FROM funcionalidad_rol INNER JOIN funcionalidad ON funcionalidad.id = funcionalidad_rol.id_funcionalidad INNER JOIN grupo_funcionalidad ON funcionalidad.id_grupo = grupo_funcionalidad.id WHERE funcionalidad_rol.id_rol = ?', [id_rol]);
		
		return response.json(accesos[0]);

	}
	
	async guardarconfiguracion({request,response}){
		
		const idruta = Number(request.post().idruta);
		const valor = Number(request.post().valorruta);
		const idrol = Number(request.post().idrol);
		
		
		await Database.raw('UPDATE funcionalidad_rol SET estado = ? WHERE id_rol = ? AND id_funcionalidad = ? ',[valor, idrol, idruta ])
	
		
		return "success";
	}
	
	async pasarSession({view, session}){
		let prueba = session.get('prueba')
		return view.render('app', {prueba: prueba})
		
	}
	
	
	async AbirArbol({view, request}){
		var parametros = request.get();
		return view.render('arbol', {all:parametros});
	}
	
}

module.exports = AccesosRutaController
