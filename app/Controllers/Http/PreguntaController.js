'use strict'

const Database = use('Database')
const fs = require('fs');
const execSync = require('child_process').execSync;
const Drive = use('Drive');

class PreguntaController {
	
	//Almacenar pregunta opcion multiple
	async storeMultiple({request,response}){
		
		const opciones = request.post().opciones;
		const reactivo = request.post().rectivo;
		const tema = request.post().tema;
		
		//GUARDAR UNA NUEVA PREGUNTA
		const preguntas = await Database.insert({pregunta:reactivo,tipo:'4',id_tema:tema}).into('banco_preguntas')
		
		//OBTIENE EL ULTIMO ID GENERADO EN LA TABLA POR LA ULTIMA PREGUNTA GUARDADA
		let ultimo_id = await Database.raw('SELECT MAX(id) as id FROM banco_preguntas')
		
		ultimo_id = ultimo_id[0][0].id;
		
		for(var i=0; i < opciones.length; i++)
		{
			var esrespuesta = 0;
			
			if(opciones[i][2] == '1')
			{
			   esrespuesta = 1;
			}
			
			const op = await Database.insert({opcion:opciones[i][0], id_pregunta: ultimo_id, esrespuesta: esrespuesta}).into('opciones');
			
		}
		
		return response.json({message:'Se ha registrado la pregunta', ultimo_id})
	}
  
  async checkQuestionnaireStart( {params,response})	
  {
    const temas = await Database.raw('SELECT id FROM temas where nivel > 1')
    const conf = await Database.raw('SELECT * FROM configuracion_cuestionarios;')
    var correcto=true;
    for (var i = 0; i < temas[0].length; i++) 
    {
        var preguntas = await Database.raw('SELECT (SELECT COUNT(*) FROM banco_preguntas where tipo = 1 and id_tema=? ) as abiertas, '+
                                           '(SELECT COUNT(*) FROM banco_preguntas where tipo = 2 and id_tema=? ) as numericas, '+
                                           '(SELECT COUNT(*) FROM banco_preguntas where tipo = 3 and id_tema=? ) as boleanas, '+
                                           '(SELECT COUNT(*) FROM banco_preguntas where tipo = 4 and id_tema=? ) as multiples, '+
                                           '(SELECT COUNT(*) FROM banco_preguntas where tipo = 5 and id_tema=? ) as calculadas, '+
                                           '(SELECT COUNT(*) FROM banco_preguntas where tipo = 6 and id_tema=? ) as cmultiples, '+
                                           '(SELECT COUNT(*) FROM banco_preguntas where tipo = 7 and id_tema=? ) as expresiones'
                                           ,[temas[0][i].id,temas[0][i].id,temas[0][i].id,temas[0][i].id,temas[0][i].id,temas[0][i].id]);
        if(preguntas[0][0].abiertas<conf[0][0].num_preguntas_abiertas)
             correcto=false;
        if(preguntas[0][0].numericas<conf[0][0].num_preguntas_numericas)
             correcto=false;
        if(preguntas[0][0].boleanas<conf[0][0].num_preguntas_boleanas)
             correcto=false;
        if(preguntas[0][0].multiples<conf[0][0].num_preguntas_multiples)
             correcto=false;
        if(preguntas[0][0].calculadas<conf[0][0].num_preguntas_calculadas)
             correcto=false;
        if(preguntas[0][0].cmultiples<conf[0][0].num_preguntas_calculadas_multiples)
             correcto=false;
        if(preguntas[0][0].expresiones<conf[0][0].num_expresiones)
             correcto=false;
     }
    if(conf[0][0].num_preguntas==0)
      correcto=false;
      return response.json(correcto);
           
  }
  
	async valorcomodin({params,response})
  {
      const vc = await Database.raw('SELECT valor_comodin,comodin,id,id_opcion FROM comodines'       )
      return response.json({vc:vc})
  }
	
  
  async storeNumerica({request,response})
  {
		
		const{pregunta,respuesta,margen,arriba,abajo,tipo,id_tema,id_imagen} = request.only(['pregunta','respuesta','margen','arriba','abajo','tipo','id_tema','id_imagen']) 
		 
		var preunta_guardada = await Database.insert({pregunta:pregunta,tipo:tipo,id_tema:id_tema,id_imagen:id_imagen}).into('banco_preguntas')
		//OBTIENE EL ULTIMO ID GENERADO EN LA TABLA POR LA ULTIMA PREGUNTA GUARDADA
		let ultimo_id = await Database.raw('SELECT MAX(id) as id FROM banco_preguntas')
		
		ultimo_id = ultimo_id[0][0].id;
		
		const op = await Database.insert({opcion:respuesta, id_pregunta: ultimo_id, esrespuesta: 1}).into('opciones');
		const mar = await Database.insert({id_pregunta:ultimo_id, aplicableArriba:arriba, aplicableAnbajo:abajo, rango:margen}).into('margen_errors');
		
		return response.json({message:'Se ha registrado la pregunta', ultimo_id})
	}
	
  //almacenar pregunta de tipo 7- expresiones
    async storeExpresiones({request,response})
  {
		
		const{pregunta,respuesta,margen,arriba,abajo,tipo,id_tema,id_imagen} = request.only(['pregunta','respuesta','margen','arriba','abajo','tipo','id_tema','id_imagen']) 
		 
		var preunta_guardada = await Database.insert({pregunta:pregunta,tipo:tipo,id_tema:id_tema,id_imagen:id_imagen}).into('banco_preguntas')
		//OBTIENE EL ULTIMO ID GENERADO EN LA TABLA POR LA ULTIMA PREGUNTA GUARDADA
		let ultimo_id = await Database.raw('SELECT MAX(id) as id FROM banco_preguntas')
		
		ultimo_id = ultimo_id[0][0].id;
		
		const op = await Database.insert({opcion:respuesta, id_pregunta: ultimo_id, esrespuesta: 1}).into('opciones');
		const mar = await Database.insert({id_pregunta:ultimo_id, aplicableArriba:arriba, aplicableAnbajo:abajo, rango:margen}).into('margen_errors');
		
		return response.json({message:'Se ha registrado la pregunta', ultimo_id})
	}
  
  
  
  
	//actualiza pregunta de opcion multiple
	async updateMultiple({request,response})
  {	
		const opciones = request.post().opciones;
		const reactivo = request.post().rectivo;
		const tema = request.post().tema;
		const id = request.post().id;
		
		const banco_preguntas = await Database.raw('UPDATE banco_preguntas SET pregunta = ?, id_tema = ? WHERE id = ?',[reactivo, tema, id])

		const banco_preguntas1 = await Database.raw('DELETE FROM opciones WHERE id_pregunta = ?',[id])
		
		for(var i=0; i < opciones.length; i++){
			var esrespuesta = 0;
			
			if(opciones[i][2] == '1')
			{
			   esrespuesta = 1;
			}
			
			const op = await Database.insert({opcion:opciones[i][0], id_pregunta: id, esrespuesta: esrespuesta}).into('opciones');
		}
		
		return "success";
		
		
	}
	
    //almacenar pregunta
	async store({request,response}){
		
		const{pregunta,respuesta,tipo,id_tema} = request.only(['pregunta','respuesta','tipo','id_tema']) 
		
		let preguntaAlmacenada = await Database.insert({pregunta:pregunta,tipo:tipo,id_tema:id_tema}).into('banco_preguntas')
		
		//Obtiene el último id generado en la tabla por la ultima pregunta guardada
		let ultimo_id = await Database.raw('SELECT MAX(id) as id FROM banco_preguntas')
		
		ultimo_id = ultimo_id[0][0].id;
		
		const op = await Database.insert({opcion:respuesta, id_pregunta: ultimo_id, esrespuesta: 1}).into('opciones');
		
		return response.json({mensaje:'Se ha registrado la pregunta', ultimo_id})
	}
	
	//Mostrar las preguntas de opcion multiple
	async mostrarPreguntasOpcionMultiple({response}){
		
    //SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema, o.opcion, o.esrespuesta 
    //FROM banco_preguntas b 
    //INNER JOIN temas t on t.id = b.id_tema 
    //INNER JOIN opciones o on o.id_pregunta = b.id 
    //WHERE tipo = 4;
    
		/*const banco_preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'WHERE tipo = 4')*/
    
    const banco_preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema, o.opcion, o.esrespuesta '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'INNER JOIN opciones o on o.id_pregunta = b.id '+
      'WHERE tipo = 4;')
		
		//const opciones = await Database.raw('SELECT * FROM opciones')
		
		
		return response.json({banco_preguntas:banco_preguntas})
    //return response.json({banco_preguntas:banco_preguntas})
	}
	
  async mostrarUnicaPregunta({request, response, params}){
    
    
    const datosPreguntas = request.only(['datosPregunta']);
                                        
    
    if( datosPreguntas.tipo === "1" ){
      
      const preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'WHERE b.tipo = 1 AND b.id = '+ datosPreguntas.id )
       
    }else if ( datosPreguntas.tipo === "2" ) {
      
      const preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, '+
			't.nombre_tema as tema, m.aplicableArriba, m.aplicableAnbajo, rango ' +
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'INNER JOIN margen_errors m on m.id_pregunta =  b.id ' +
			'WHERE b.tipo = 2 AND b.id = '+ datosPreguntas.id)
      
    }else if ( datosPreguntas.tipo === "3" ) {
      
      const preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'WHERE b.tipo = 3 AND b.id = '+ datosPreguntas.id)
      
    }else if ( datosPreguntas.tipo === "4" ) {
      
      const preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'WHERE b.tipo = 4 AND b.id = '+ datosPreguntas.id)
      
    }else if ( datosPreguntas.tipo === "5" ) {
      
      const preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta,'+
			' b.tipo as tipo, t.nombre_tema as tema ,c.decimales, m.aplicableArriba, m.aplicableAnbajo, rango '+
      'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
      'INNER JOIN configuracion_preguntas_calculadas c on c.id_pregunta = b.id ' +
      'INNER JOIN margen_errors m on m.id_pregunta =  b.id ' +
			'WHERE b.tipo = 5 AND b.id = '+ datosPreguntas.id)
      
      }else /*if ( datosPreguntas.tipo === "6" ) */ {
      
      const preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta,'+
			' b.tipo as tipo, t.nombre_tema as tema ,c.decimales '+
      'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
      'INNER JOIN configuracion_preguntas_calculadas c on c.id_pregunta = b.id ' +
 			'WHERE b.tipo = 6 AND b.id = '+ datosPreguntas.id)
      
    }/*else{
      
      const preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, '+
			't.nombre_tema as tema, m.aplicableArriba, m.aplicableAnbajo, rango ' +
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'INNER JOIN margen_errors m on m.id_pregunta =  b.id ' +
			'WHERE b.tipo = 7 AND b.id = '+ datosPreguntas.id)
      
    }*/
    
	
		return response.json({banco_preguntas:preguntas}) 
	}
  
  
  
	//Mostrar todas las preguntas
	async showPreguntas({response, params}){
		
		const configuraciones = await Database.raw('SELECT  * FROM configuracion_cuestionarios');
		
		const preguntasMultiples = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'WHERE b.tipo = 4 AND b.id_tema = '+ params.id + 
			' ORDER BY RAND() ' +
			'LIMIT ' + configuraciones[0][0].num_preguntas_multiples)
		
		const preguntasBoleanas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'WHERE b.tipo = 3 AND b.id_tema = '+ params.id + 
			' ORDER BY RAND() ' +
			'LIMIT ' + configuraciones[0][0].num_preguntas_boleanas)
		
		const preguntasNumericas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, '+
			't.nombre_tema as tema, m.aplicableArriba, m.aplicableAnbajo, rango ' +
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'INNER JOIN margen_errors m on m.id_pregunta =  b.id ' +
			'WHERE b.tipo = 2 AND b.id_tema = '+ params.id + 
			' ORDER BY RAND() ' +
			'LIMIT ' + configuraciones[0][0].num_preguntas_numericas)
		
		const preguntasAbiertas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'WHERE b.tipo = 1 AND b.id_tema = '+ params.id + 
			' ORDER BY RAND() ' +
			'LIMIT ' + configuraciones[0][0].num_preguntas_abiertas)
		
    const preguntaCalculadas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta,'+
			' b.tipo as tipo, t.nombre_tema as tema ,c.decimales, m.aplicableArriba, m.aplicableAnbajo, rango '+
      'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
      'INNER JOIN configuracion_preguntas_calculadas c on c.id_pregunta = b.id ' +
      'INNER JOIN margen_errors m on m.id_pregunta =  b.id ' +
			'WHERE b.tipo = 5 AND b.id_tema = '+ params.id + 
			' ORDER BY RAND() ' +
			'LIMIT ' + configuraciones[0][0].num_preguntas_calculadas)
    
    const preguntaCalculadasMultiples = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta,'+
			' b.tipo as tipo, t.nombre_tema as tema ,c.decimales '+
      'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
      'INNER JOIN configuracion_preguntas_calculadas c on c.id_pregunta = b.id ' +
 			'WHERE b.tipo = 6 AND b.id_tema = '+ params.id + 
			' ORDER BY RAND() ' +
			'LIMIT ' + configuraciones[0][0].num_preguntas_calculadas_multiples)
    
  /*  const preguntaExpresiones = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, '+
			't.nombre_tema as tema, m.aplicableArriba, m.aplicableAnbajo, rango ' +
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'INNER JOIN margen_errors m on m.id_pregunta =  b.id ' +
			'WHERE b.tipo = 7 AND b.id_tema = '+ params.id + 
			' ORDER BY RAND() ' +
			'LIMIT ' + configuraciones[0][0].num_expresiones)
		*/
		var banco_preguntas = [];
		banco_preguntas = banco_preguntas.concat(preguntasBoleanas[0]);
		banco_preguntas = banco_preguntas.concat(preguntasMultiples[0]);
		banco_preguntas = banco_preguntas.concat(preguntasNumericas[0]);
		banco_preguntas = banco_preguntas.concat(preguntasAbiertas[0]);
		banco_preguntas = banco_preguntas.concat(preguntaCalculadas[0]);
    banco_preguntas = banco_preguntas.concat(preguntaCalculadasMultiples[0]);
//    banco_preguntas = banco_preguntas.concat(preguntaExpresiones[0]);


		banco_preguntas.sort(() => Math.random() - 0.5);
		
	
		return response.json({banco_preguntas:banco_preguntas})
	}
	
	async showall({response}){
		
			const banco_preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema, o.id, o.opcion, o.esrespuesta '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema '+
			'INNER JOIN opciones o on b.id = o.id_pregunta '+
			'WHERE b.tipo = 3');
		

		return response.json(banco_preguntas)
		
		
	}
	
	async update({request,response}){
		const{id,pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema} = request.only(['id','pregunta','respuesta','tipo','opcion','opcion2','opcion3','opcion4','id_tema',])
		const banco_preguntas = await Database.raw('UPDATE banco_preguntas SET pregunta = ?,respuesta = ?,tipo = ?, opcion = ?, opcion2 = ?, opcion3 = ?,opcion4 = ?, id_tema = ? WHERE id = ?',[pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema,id])
		return response.json({message:'Se ha modificado la pregunta'})
   }
  async updateCalculadas({request,response}){
    const id = request.post().id;
    const id_tema = request.post().id_tema;
    //let ultimo_id = await Database.raw('SELECT id FROM opciones WHERE id_pregunta = '+request.post().id) 
    
    const opciones = request.post().opciones;
		const reactivo = request.post().rectivo;
    const respuesta = request.post().respuesta;
    const comodines = request.post().comodines;
    const valorComodines = request.post().valorComodines;
		const tema = request.post().tema;
    const margen = request.post().margen;
    const aplica_arriba = request.post().arriba;
    const aplica_abajo = request.post().abajo;
    const decimales = request.post().decimales;
    const imagenesAEliminar = request.post().imagenesAEliminar;
		
    const update1 = await Database.raw("UPDATE banco_preguntas SET pregunta = '" + reactivo + "', id_tema = '" + tema + "' WHERE id = '"+id+"'");
    const update2 = await Database.raw("UPDATE opciones SET opcion = '" + respuesta + "' WHERE id_pregunta = '"+id+"'");
    const update3 = await Database.raw("UPDATE margen_errors SET rango = '"+margen+"', aplicableArriba = '"+aplica_arriba+"', aplicableAnbajo = '"+aplica_abajo+"' WHERE id_pregunta = '"+id+"'");
    const update4 = await Database.raw("UPDATE configuracion_preguntas_calculadas SET decimales = '"+decimales+"' WHERE id_pregunta = '"+id+"'");
    
    var id_opcion = await Database.raw("SELECT id FROM opciones WHERE id_pregunta = '"+id+"'");
    id_opcion = id_opcion[0][0].id;
    const update5 = await Database.raw("DELETE FROM comodines WHERE id_opcion = '"+id_opcion+"' ");    
    
    for(var i=0; i < comodines.length; i++) 
    {
      const com = await Database.insert({comodin:comodines[i], valor_comodin:valorComodines[i], id_opcion:id_opcion}).into('comodines');
    }
		
    if(imagenesAEliminar){
      
       for(let i = 0; i < imagenesAEliminar.length; i++){
          await Database.raw('DELETE FROM imagenes WHERE id = ?', [imagenesAEliminar[i].idImagen]);
          const output = execSync('rm /root/SistemaKMS/public/' + imagenesAEliminar[i].imagen , { encoding: 'utf-8' });
        }
      
    }
    
		return response.json({message:'Se ha modificado la pregunta'})
    
    
		//return "success";
    
  }
	

  async updateAbierta({request,response}){
    
    const{id,pregunta,respuesta,tipo,margen,mArriba,mAbajo,id_tema,imagenesAEliminar} = request.only(
			['id','pregunta','respuesta','tipo','margen','mArriba','mAbajo','id_tema', 'imagenesAEliminar']) 
		const banco_preguntas = 
          await Database.raw('UPDATE banco_preguntas SET pregunta = ?,tipo = ?, id_tema = ? WHERE id = ?',[pregunta,tipo,id_tema,id])
		const opcion = await Database.raw('UPDATE opciones SET opcion = ? WHERE id_pregunta = ?',[respuesta,id])
		
    const mergenes = await Database.raw('UPDATE margen_errors SET aplicableArriba=?, aplicableAnbajo=?, rango=? WHERE id_pregunta = ?',[mArriba,mAbajo,margen,id])
    
    for(let i = 0; i < imagenesAEliminar.length; i++){
			await Database.raw('DELETE FROM imagenes WHERE id = ?', [imagenesAEliminar[i].idImagen]);
			const output = execSync('rm /root/SistemaKMS/public/' + imagenesAEliminar[i].imagen , { encoding: 'utf-8' });
		}
		return response.json({message:'Se ha modificado la pregunta'})
    
  }
	
  //Método para modificar las preguntas sin opciones múltiples
	async updateAN({request,response}){
    
		const{id,pregunta,respuesta,tipo,id_tema,imagenesAEliminar} = request.only(
			['id','pregunta','respuesta','tipo','id_tema', 'imagenesAEliminar']) 
		const banco_preguntas = await Database.raw('UPDATE banco_preguntas SET pregunta = ?,tipo = ?, id_tema = ? WHERE id = ?',[pregunta,tipo,id_tema,id])
		const opcion = await Database.raw('UPDATE opciones SET opcion = ? WHERE id_pregunta = ?',[respuesta,id])
		for(let i = 0; i < imagenesAEliminar.length; i++){
			await Database.raw('DELETE FROM imagenes WHERE id = ?', [imagenesAEliminar[i].idImagen]);
			const output = execSync('rm /root/SistemaKMS/public/' + imagenesAEliminar[i].imagen , { encoding: 'utf-8' });
		}
		return response.json({message:'Se ha modificado la pregunta'})
    
	}
  
	async delete({request,response}){
		
    let resultado = "";
		const{id} = request.only(['id']) 
    
    let imagenesAEliminar = request.post().imagenesAEliminar;
    
    for(let i = 0; i < imagenesAEliminar.length; i++){
			await Database.raw('DELETE FROM imagenes WHERE id = ?', [imagenesAEliminar[i].idImagen]);
			const output = await execSync('rm /root/SistemaKMS/public/imagenes/preguntas/' + imagenesAEliminar[i].nombre , { encoding: 'utf-8' });
		}
    
		const banco_preguntas1 = await Database.raw('DELETE FROM opciones WHERE id_pregunta = ?',[id])
		const banco_preguntas3 = await Database.raw('DELETE FROM banco_preguntas WHERE id = ?',[id])
		
		return response.json({mensaje: "La pregunta se ha eliminado correctamente", resultado})

	}
	
  	// Esta funcion se utliza para mostrar las preguntas por nodo (tema) en el arbol
	async preguntanodo({request,response,auth}){
		
		var id_usuario = auth.user.id;
		
		const{id} = request.only(['id'])
		const banco_preguntas = await Database.select('id','nombre_tema', 'nivel').from('temas').where('id',id)
		
		const porcentajes = await Database.select('id','id_usuario','id_tema', 'bajo','regular','bueno').from('evidencia_expertos').where('id_tema',id).where('id_usuario',id_usuario)
		
		return response.json({banco_preguntas:banco_preguntas, porcentajes:porcentajes})
		
	
	}
	
	async preguntacount({response}){
		const pregunta = await Database.raw('SELECT COUNT(id) as totalPreguntas FROM banco_preguntas')
		return response.json(pregunta)
	}

	
	//Método para filtrar las preguntas abiertas o breves mediante el uso de una cláusula 'WHERE'
	async showPreguntasAbiertas({response}){
		
		//const preguntas_abiertas = await Database.raw("SELECT b.id as id_pregunta,b.id_tema as id_tema,b.pregunta as pregunta, r.respuesta as respuesta,b.tipo as tipo,t.nombre_tema as tema FROM banco_preguntas b INNER JOIN temas t on b.id_tema=t.id  INNER JOIN respuestas as r on b.id = r.id_pregunta WHERE b.tipo='Abierta/Breve'")
		const preguntas_abiertas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema, '+
      'o.id, o.opcion, o.esrespuesta, b.id_imagen '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema '+
			'INNER JOIN opciones o on b.id = o.id_pregunta '+
			'WHERE b.tipo = 1');
		
		//const opciones = await Database.raw('SELECT * FROM opciones')
		
		
		//return response.json({banco_preguntas: preguntas_abiertas, opciones:opciones})
		
		
		return response.json(preguntas_abiertas)
	}
	
	//Método para filtrar las preguntas numéricas mediante el uso de una cláusula 'WHERE'
	async showPreguntasNumericas({response}){
		
		const preguntas_numericas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema, o.id, o.opcion, o.esrespuesta,m.rango,m.aplicableArriba,m.aplicableAnbajo '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema '+
			'INNER JOIN opciones o on b.id = o.id_pregunta '+
      'INNER JOIN margen_errors m on b.id = m.id_pregunta '+
			'WHERE b.tipo = 2');
		
		return response.json(preguntas_numericas)
		
	}
  
  	async showPreguntasExpresiones({response}){
		
		const preguntas_expresiones = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema, o.id, o.opcion, o.esrespuesta,m.rango,m.aplicableArriba,m.aplicableAnbajo '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema '+
			'INNER JOIN opciones o on b.id = o.id_pregunta '+
      'INNER JOIN margen_errors m on b.id = m.id_pregunta '+
			'WHERE b.tipo = 7');
		
		return response.json(preguntas_expresiones)
		
	}
	
	
	
	async obtenerconfiguracion({response}){
		
		const configuraciones = await Database.raw('SELECT  * FROM configuracion_cuestionarios');

		return response.json(configuraciones[0][0]);
		
	}
	
	async obtenerOpciones({response, params}){
		var id_pregunta = params.id;
		
		var opciones = await Database.raw('SELECT opcion FROM opciones INNER JOIN banco_preguntas ON banco_preguntas.id = opciones.id_pregunta WHERE banco_preguntas.id = ?',[id_pregunta]);
				
		
		return response.json(opciones[0].sort(() => Math.random() - 0.5));
	}
  
  async obtenerOpcionesCalculadaMultiple({response, params}){
		var id_pregunta = params.id;
		
		var opciones = await Database.raw('SELECT o.opcion, cpc.decimales, o.id as id_opcion FROM opciones o INNER JOIN configuracion_preguntas_calculadas cpc ON cpc.id_pregunta = o.id_pregunta WHERE o.id_pregunta = ?',[id_pregunta]);
				
		
		return response.json(opciones[0].sort(() => Math.random() - 0.5));
	}
	
	async obtenerRespuestas({response, params}){
		var id_pregunta = params.id;
		
		const opciones = await Database.raw('SELECT opcion, opciones.id as id_opcion FROM opciones INNER JOIN banco_preguntas ON banco_preguntas.id = opciones.id_pregunta WHERE banco_preguntas.id = ? AND esrespuesta = 1',[id_pregunta]);
		
		return response.json(opciones[0]);
		
	}
	
	
	async addScore({request,response, auth}){
		
		var id_alumno = auth.user.id;
		const{id_tema,ponderacion,clasificacion} = request.only(['id_tema','ponderacion','clasificacion']) 
		var historial = 0;
		//var puntuacion_guardada = await Database.insert({id_alumno:id_alumno, id_tema:id_tema,ponderacion:ponderacion,clasificacion:clasificacion, historial:historial}).into('relacion_nodo_alumnos')
		
		await Database.raw('update relacion_nodo_alumnos set ponderacion = ?, clasificacion = ?, historial = ? where id_tema = ? and id_alumno = ?;', [ ponderacion, clasificacion, historial, id_tema ,id_alumno ])
		
		return response.json({id_ponderado: id_tema})
	}
	
  
	async storeCalculada({request,response}){
		
		const opciones = request.post().opciones;
		const reactivo = request.post().rectivo;
    const respuesta = request.post().respuesta;
    const comodines = request.post().comodines;
    const valorComodines = request.post().valorComodines;
		const tema = request.post().tema;
    const decimales = request.post().decimales;
    const margen = request.post().margen;
    const aplica_arriba = request.post().arriba;
    const aplica_abajo = request.post().abajo;
    const fs = require('fs');
		//fs.writeFileSync('imagen.jpg',request.post().imagen, 'binary');
		//GUARDAR UNA NUEVA PREGUNTA
		const preguntas = await Database.insert({pregunta:reactivo,tipo:'5',id_tema:tema}).into('banco_preguntas')
		
		//OBTIENE EL ULTIMO ID GENERADO EN LA TABLA POR LA ULTIMA PREGUNTA GUARDADA
		let ultimo_id = await Database.raw('SELECT MAX(id) as id FROM banco_preguntas')
		
		ultimo_id = ultimo_id[0][0].id;
		const op = await Database.insert({opcion:respuesta, id_pregunta: ultimo_id, esrespuesta: 1}).into('opciones');
		 ultimo_id = await Database.raw('SELECT MAX(id) as id FROM opciones')
    		ultimo_id = ultimo_id[0][0].id;
    for(var i=0; i < comodines.length; i++) 
    {
      const com = await Database.insert({comodin:comodines[i], valor_comodin:valorComodines[i], id_opcion:ultimo_id}).into('comodines');
    }			
		
    ultimo_id = await Database.raw('SELECT MAX(id) as id FROM banco_preguntas');
		ultimo_id = ultimo_id[0][0].id;
    const configuracion_decimales = await Database.insert({id_pregunta: ultimo_id, decimales:decimales}).into('configuracion_preguntas_calculadas');
    
    const margen_error = await Database.insert({id_pregunta: ultimo_id, rango: margen, aplicableArriba: aplica_arriba, aplicableAnbajo: aplica_abajo}).into("margen_errors");
    
    
		return response.json({message:'Se ha registrado la pregunta', ultimo_id})
    
    
	}
	
	
	async deleteCalculadas({request,response}){
   const id = request.post().id;
    let ultimo_id = await Database.raw('SELECT id FROM opciones WHERE id_pregunta = '+request.post().id) 
    ultimo_id = ultimo_id[0][0].id;
    const delete_rango = await Database.raw("DELETE FROM margen_errors WHERE id_pregunta = "+id);
    const banco_preguntas2 = await Database.raw('DELETE FROM comodines WHERE id_opcion = '+ultimo_id)
		const banco_preguntas3 = await Database.raw('DELETE FROM opciones WHERE id_pregunta = '+request.post().id)
    const banco_preguntas4 = await Database.raw('delete from configuracion_preguntas_calculadas where id_pregunta= '+request.post().id)
		const banco_preguntas5 = await Database.raw('DELETE FROM banco_preguntas WHERE id = '+request.post().id)
    
    
    let imagenesAEliminar = request.post().imagenesAEliminar;
    
    for(let i = 0; i < imagenesAEliminar.length; i++){
			await Database.raw('DELETE FROM imagenes WHERE id = ?', [imagenesAEliminar[i].idImagen]);
			const output = await execSync('rm /root/SistemaKMS/public/imagenes/preguntas/' + imagenesAEliminar[i].nombre , { encoding: 'utf-8' });
		}
    
    
		return response.json({message:'Se ha eliminado la pregunta'})
  }
  
  async preguntasCalculadasDelete({request,response})
  {
	  const banco_preguntas5 = await Database.raw('DELETE FROM banco_preguntas WHERE id = '+request.post().id)
    
    //return response.json({a:request..id)
    //})
		return response.json({message:'Se ha eliminado la pregunta'})
  }
	
	async getComodines({request,response})
  {	 
	  var comodines = [];
    		const{id,pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema} = request.only(['pregunta'])

    for (var index = 0; index < pregunta.length; index++) 
    {
    const preguntasMultiples = await Database.raw(
		"select c.comodin,c.valor_comodin as valor,o.id_pregunta, o.esrespuesta, c.id_opcion from  comodines c"+
      " INNER JOIN opciones o on o.id = c.id_opcion where o.id_pregunta="+pregunta[index] )
      comodines = comodines.concat(preguntasMultiples[0]);
      
    }
		return response.json({comodines:comodines})
		
		
	}
	
	
 async mostrarPreguntasCalculadas({response}){
		
		const banco_preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema, b.pregunta, b.tipo, t.nombre_tema as tema, o.id as id_opcion, o.opcion as opcion, me.rango, me.aplicableArriba, me.aplicableAnbajo, cpc.decimales ' + 
      'FROM banco_preguntas b INNER JOIN temas t on t.id = b.id_tema INNER JOIN opciones o on o.id_pregunta = b.id ' +
      'INNER JOIN margen_errors me on me.id_pregunta = b.id INNER JOIN configuracion_preguntas_calculadas cpc on cpc.id_pregunta = b.id WHERE b.tipo = 5')
		
		const opciones = await Database.raw('SELECT * FROM opciones o JOIN banco_preguntas b ON o.id_pregunta = b.id WHERE b.tipo = 5')
		
		
		return response.json({banco_preguntas:banco_preguntas, opciones:opciones})
	}
  
  
  //Mostrar las preguntas de opcion multiple calculadas
	async mostrarPreguntasOpcionMultipleCalculadas({response}){
		
		const banco_preguntas = await Database.raw(
			'SELECT b.id as id_pregunta, b.id_tema as id_tema, b.pregunta as pregunta, b.tipo as tipo, t.nombre_tema as tema '+
			'FROM banco_preguntas b ' +
			'INNER JOIN temas t on t.id = b.id_tema ' +
			'WHERE tipo = 6')
    var opciones=[]
    
    for (var a of banco_preguntas[0]) 
    {
      const opcionesAct = await Database.raw('select * from opciones where id_pregunta ='+ a.id_pregunta);
      opciones.push( opcionesAct[0]  );
      
    }
		var comodines = []
	  for (var a of opciones) 
    {
        var comodinesA = []
        for (var b of a) 
        {
              const comodinesAct = await Database.raw('select comodin,valor_comodin from comodines where id_opcion ='+ b.id);
          comodinesAct.pop()
              comodinesA.push( comodinesAct);
        } 
           comodines.push( comodinesA);
    } 
		return response.json({banco_preguntas:banco_preguntas, opciones:opciones, comodines:comodines})
	}
  
  async storeMultipleCalculadas({request,response})
  {	
		const opciones = request.post().opciones;
		const reactivo = request.post().rectivo;
		const tema = request.post().tema;
    const comodines = request.post().comodines;
    const valorComodines = request.post().valorComodines;
    //const decimales = req
    const cifras = request.post().cifras;
		//GUARDAR UNA NUEVA PREGUNTA
		const preguntas = await Database.insert({pregunta:reactivo,tipo:'6',id_tema:tema}).into('banco_preguntas')
		//OBTIENE EL ULTIMO ID GENERADO EN LA TABLA POR LA ULTIMA PREGUNTA GUARDADA
		let ultimo_id = await Database.raw('SELECT MAX(id) as id FROM banco_preguntas')
		ultimo_id = ultimo_id[0][0].id;
    const numeroCifras = await Database.insert({id_pregunta:ultimo_id, decimales:cifras}).into('configuracion_preguntas_calculadas')
		for(var i=0; i < opciones.length; i++)
		{
		  var esrespuesta = 0;	
			if(opciones[i][2] == '1')
			   esrespuesta = 1;
			const op = await Database.insert({opcion:opciones[i][0], id_pregunta: ultimo_id, esrespuesta: esrespuesta}).into('opciones');
      var ultimo_id_opciones = await Database.raw('SELECT MAX(id) as id FROM opciones');
      for(var x=0; x<comodines[i].length; x++)
       {
        const com = await Database.insert({comodin:comodines[i][x], valor_comodin:valorComodines[i][x], id_opcion:ultimo_id_opciones[0][0].id}).into('comodines');   
       }
		}
		return "success";
	}
  
  //actualiza pregunta de opcion multiple
	async updateMultipleCalculadas({request,response}){
		
		const opciones = request.post().opciones;
		const reactivo = request.post().rectivo;
		const tema = request.post().tema;
		const id = request.post().id;
    var id_opcion_temp = '';
    var op = '';
		
		const banco_preguntas = await Database.raw('UPDATE banco_preguntas SET pregunta = ?, id_tema = ? WHERE id = ?',[reactivo, tema, id])
	  
		for(var i=0; i < opciones.length; i++){
			var esrespuesta = 0;
			
			if(opciones[i][2] == '1')
			{
        op = await Database.raw('UPDATE opciones SET esrespuesta = ? WHERE opcion = ?', [1, opciones[i][0]]);
			}else{
        op = await Database.raw('UPDATE opciones SET esrespuesta = ? WHERE opcion = ?', [0, opciones[i][0]]);
      }
			
		}
		
		return "success";
		
		
	}
  
  async deleteCalculadasMultiples({request,response}){
    const opciones = request.post().opciones;
    var comodin = '';
    var id_opcion = '';
		const{id} = request.only(['id'])
    
    id_opcion = await Database.raw('SELECT id FROM opciones WHERE id_pregunta = ?', [id])
    for(var i=0; i < id_opcion[0].length; i++){
      comodin = await Database.raw('DELETE FROM comodines WHERE id_opcion = ?', [id_opcion[0][i].id])
		}
		const banco_preguntas1 = await Database.raw('DELETE FROM opciones WHERE id_pregunta = ?',[id])
    const configuracion_preguntas = await Database.raw("DELETE FROM configuracion_preguntas_calculadas WHERE id_pregunta = ?",[id])
		const banco_preguntas3 = await Database.raw('DELETE FROM banco_preguntas WHERE id = ?',[id])
		return response.json({message:'Se ha eliminado la pregunta'})
	}
	
	async obtenerNumeroRespuestas({params,response}){
		
		var id = params.id;
		await Database.raw("select id from where o.id_pregunta = " + id )
		
	}
	
	async obtenerTodasImagenes({params, response}){
		const imagenesPreguntas = await Database.raw(
			'select banco_preguntas.id as idpregunta, imagenes.id as idImagen, imagenes.alias as alias, imagenes.nombre from banco_preguntas inner join pregunta_imagen on banco_preguntas.id = pregunta_imagen.id_pregunta inner join imagenes on pregunta_imagen.id_imagen = imagenes.id;')

		return response.json({todasImagenes: imagenesPreguntas})
		
	}
  
  
  async obtenerImagenesPregunta({params, response}){
		const imagenesPregunta = await Database.raw(
			'select banco_preguntas.id as idpregunta, imagenes.id as idImagen, imagenes.alias as alias, imagenes.nombre from banco_preguntas inner join pregunta_imagen on banco_preguntas.id = pregunta_imagen.id_pregunta inner join imagenes on pregunta_imagen.id_imagen = imagenes.id where banco_preguntas.id = ?', [ params.id ])

		return response.json({imagenes: imagenesPregunta})
		
	}
	
	
	
}
module.exports = PreguntaController

