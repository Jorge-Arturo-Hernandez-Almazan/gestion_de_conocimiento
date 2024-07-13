'use strict'
const Temas = use('App/Models/Temas')
const Database = use('Database')
class controladorTema {

    async mostrarRecursos({response}){
		
		//const preguntas_abiertas = await Database.raw("SELECT b.id as id_pregunta,b.id_tema as id_tema,b.pregunta as pregunta, r.respuesta as respuesta,b.tipo as tipo,t.nombre_tema as tema FROM banco_preguntas b INNER JOIN temas t on b.id_tema=t.id  INNER JOIN respuestas as r on b.id = r.id_pregunta WHERE b.tipo='Abierta/Breve'")
		const recursos = await Database.
    raw('SELECT a.orden_ensenanza as orden_ensenanza, a.nombre_tema_ordenado as nombre_tema_ordenado, a.url as url FROM temas_orden_ensenanza a');

		return response.json(recursos)
  }
  //--------------------------------------------------------------------------------------------------------------------------
 async mostrarTemas({ response }) {
    const temas = await Database.raw('SELECT * FROM temas_orden_ensenanza');

    return response.json(temas);
}
  
   
  //------------------------------------------------------------------------------------------------------------
  
  async updateRecurso({request,response}){
    
		const{nombre_tema_ordenado,url} = request.only(
			['nombre_tema_ordenado','url']) 
		const temas_orden_ensenanza = await Database.raw('UPDATE temas_orden_ensenanza SET url = ? WHERE orden_ensenanza = ?',[url,nombre_tema_ordenado])
		
		return response.json({message:'Se ha modificado el recurso'})
    
	}
  //-----------------------------------------------------------------------------------------------------------------

    async agregarEjercicioUrl({response,request}){
      try {
        console.log('Solicitud recibida en agregarEjercicioUrl');
      //SE GENERAN 2 CONSTANTES QUE OBTIENEN EL VALOR DE LOS DATOS ENVIADOS POR POST
       // const {id_tema,enlace } = request.only(['id_Tema','enlaceEjercicio']);
        const { id_tema, enlace } = request.only(['id_tema', 'enlace']);
        
       // let ejercicioActualizado = await Database.update({id_tema:id_tema,enlace:enlace}.into('kms.temas_orden_ensenanza'))
          //let ejercicioActualizado = await Database
          //.table('kms.temas_orden_ensenanza') // No es necesario utilizar .table() si ya estás utilizando el modelo de Knex.js
          //.where('id_tema', id_tema)
          //.update({ enlace: enlace });
     // return response.json( id_tema);
     // try {
        // Se ejecuta el update en la tabla correspondiente
        
        console.log('Datos obtenidos de la solicitud:');
        console.log('id_tema:', id_tema);
        console.log('enlace:', enlace);
        
       // const ejercicioActualizado = await Database
           // .table('kms.temas_orden_ensenanza')
           // .where('id_tema', id_tema)
           // .update({ url: enlace });
        
        
        
        const ejercicioActualizado = await Database
    .table('kms.temas_orden_ensenanza')
    .insert({ url: enlace });
        
            // console.log(request.method);
       // console.log(request.url);
        // Se devuelve una respuesta JSON indicando que se realizó la actualización correctamente
        return response.json({ message: 'Actualizado correctamente', ejercicioActualizado });
    } //llave del try
      catch (error) {
        // Si ocurre un error, se devuelve una respuesta de error con el mensaje correspondiente
        return response.status(500).json({ message: 'Error al actualizar el ejercicio', error: error.message });
    }
      
      
      
        //const affectedRows = await Database
          //  .table('temas_orden_ensenanza')
            //.where('id_tema', id_tema)
            //.update('url', enlace)
              //.update({'id_Tema': id_tema, 'enlaceEjercicio': enlace})
        //console.log('Datos de actualización:');
        //console.log('ID del tema:', id_tema);
        //console.log('Enlace del ejercicio:', enlace);
        
        // const affectedRows = await Database
        // .table('temas_orden_ensenanza')
         // .where('id_tema', id_tema)
         //.update({'url': enlace });
      
               
    }

}

module.exports = controladorTema;