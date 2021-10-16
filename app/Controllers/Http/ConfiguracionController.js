'use strict'

//const User = use('App/Models/User')
const {validate}= use('Validator')
const Hash = use('Hash')
const Database = use('Database')

class ConfiguracionController {
  
	async cargarMargen({response}){
		const margen = await Database.raw('SELECT rango_por_defecto	FROM configuracion_cuestionarios; ' );
		return response.json(margen[0][0])
	} 
 
	async obtenerConfiguracionCuestionario({response}){
		const configuraciones = await Database.raw('SELECT * FROM configuracion_cuestionarios; ');
		return response.json(configuraciones[0]);
	}
  
	async obtenerTotalPreguntas({response}){
    const totalPreguntasPorTipo = await Database.raw('select temas.nombre_tema, banco_preguntas.tipo, count(banco_preguntas.tipo) as totalPreguntas from temas inner join banco_preguntas on temas.id = banco_preguntas.id_tema group by banco_preguntas.tipo, temas.nombre_tema;');
    const temas = await Database.raw('select id, nombre_tema, nivel from temas where nivel > 1;');
		return response.json({totalPreguntasPorTipo, temas});
	}
	
	async guardarconfiguracion({request,response}){
		
		const totalPreguntas = Number(request.post().totalPreguntas);
		const totalNumericas = Number(request.post().totalNumericas);
		const rangoDefecto = Number(request.post().rangoDefecto);
		const totalBreves = Number(request.post().totalBreves);
		const totalCalculadas = Number(request.post().totalCalculadas);
		const totalBooleanas = Number(request.post().totalBooleanas);
		const totalMultiples = Number(request.post().totalMultiples);
    const totalCalculadasMultiples = Number(request.post().totalCalculadasMultiples);
		const ponderacionEstricta = Number(request.post().ponderacionEstricta);
		
		const banco_preguntas = await Database.raw('UPDATE configuracion_cuestionarios SET ponde_estricta = ?, num_preguntas = ?, num_preguntas_abiertas = ?, num_preguntas_boleanas = ?, num_preguntas_multiples = ?, num_preguntas_calculadas = ?, num_preguntas_numericas = ?, num_preguntas_calculadas_multiples = ?, rango_por_defecto = ? ',[ponderacionEstricta, totalPreguntas, totalBreves, totalBooleanas, totalMultiples, totalCalculadas, totalNumericas, totalCalculadasMultiples,  rangoDefecto ])
	
		
		return "success";
	}
	
}

module.exports = ConfiguracionController
