'use strict'
const Database = use('Database')


class SaludarController {
  
  async metodoSaludar({view,params,response}){
		
    let nombre = params.nombre;
    let edad = params.edad;

		let persona = {nombre:nombre, edad:edad};
		
    return view.render('saludar', {nombre:nombre, edad:edad} )

  }
  
  async obtenerPonderaciones(){
    
        let temas = await Database.raw('select DISTINCT temas.id as id, temas.nombre_tema as nombre, temas.nivel as nivel, relacion_nodo_alumnos.ponderacion, relacion_nodo_alumnos.clasificacion, relacion_nodo_alumnos.historial from temas inner join relacion_nodo_alumnos on temas.id = relacion_nodo_alumnos.id_tema where relacion_nodo_alumnos.id_alumno = ? and temas.nivel > 1 and relacion_nodo_alumnos.clasificacion != 4 order by nivel desc;', [auth.user.id]);

        return response.json(temas[0]);
    
  }
  
}

module.exports = SaludarController
