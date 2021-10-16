'use strict'
const Database = use('Database')

class BayeController {
  //Este controlador se encargará de obtener el tema siguiente apartir de la calificacions del cuestionario 
  	
	
  	async NextTopic({params,response, auth}){
		
		    //	'SELECT r.ponderacion,t.id, t.nombre_tema, t.nivel, r.clasificacion FROM temas t '+
        //  'INNER JOIN relacion_nodo_alumnos r on t.id = r.id_tema WHERE t.nivel > 1 AND r.clasificacion != 1 '+
        //'ORDER BY RAND() LIMIT 1;') 
		
		    //  'SELECT r.ponderacion,t.id, t.nombre_tema, t.nivel, r.clasificacion FROM temas t '+
        // 'INNER JOIN relacion_nodo_alumnos r on t.id = r.id_tema WHERE t.id = 5;')
		
		

        /*const temas = await Database.raw(
          'SELECT DISTINCT r.ponderacion,  t.id, t.nombre_tema, t.nivel, r.clasificacion, r.id_alumno FROM temas t '+
          'INNER JOIN relacion_nodo_alumnos r on t.id = r.id_tema WHERE t.nivel > 1 AND r.clasificacion != 1 AND r.id_alumno = ? '+
          'ORDER BY RAND() LIMIT 5;', [auth.user.id]
        )*/
		    
      const temas = await Database.raw(
          'SELECT DISTINCT r.ponderacion,  t.id, t.nombre_tema, t.nivel, r.clasificacion, r.id_alumno ' +
          'FROM temas t ' +
          'INNER JOIN relacion_nodo_alumnos r on t.id = r.id_tema ' +
          'WHERE t.nivel > 1 AND r.id_alumno = ? AND t.id = 6', [auth.user.id]
        )
        
	  
        return response.json(temas)
			  //SELECT t.id, t.nombre_tema, t.nivel FROM temas t INNER JOIN relacion_nodo_alumnos r on t.id = r.id_tema WHERE t.nivel > 2 AND  r.clasificacion != 1 ORDER BY RAND() LIMIT 1;
	  }
  
	
}

module.exports = BayeController
