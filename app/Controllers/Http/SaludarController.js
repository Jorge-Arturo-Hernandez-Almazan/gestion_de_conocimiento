'use strict'

class SaludarController {
  
  async metodoSaludar({view,params,response}){
		
    let nombre = params.nombre;
    let edad = params.edad;
		//let id_rol = params.id;
		
		//const accesos = await Database.raw('SELECT funcionalidad.*, grupo_funcionalidad.nombre as grupo, funcionalidad_rol.estado as estado, funcionalidad_rol.id_rol as rol  FROM funcionalidad_rol INNER JOIN funcionalidad ON funcionalidad.id = funcionalidad_rol.id_funcionalidad INNER JOIN grupo_funcionalidad ON funcionalidad.id_grupo = grupo_funcionalidad.id WHERE funcionalidad_rol.id_rol = ?', [id_rol]);
		
    // 
    
    
		//return response.json("HOLA TU ERES " + nombre + " tienes " + edad + " años");
    return view.render('saludar')

  }
  
}

module.exports = SaludarController
