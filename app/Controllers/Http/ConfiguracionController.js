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
		
		const preguntasNumericas = await Database.raw('SELECT COUNT(*) as totalNumericas FROM banco_preguntas where tipo = 2;');
		
		const preguntasMultiples = await Database.raw('SELECT COUNT(*) as totalMultiples FROM banco_preguntas where tipo = 4;');
		
		const preguntasBooleanas = await Database.raw('SELECT COUNT(*) as totalBooleanas FROM banco_preguntas where tipo = 3;');
		
		const preguntasCalculadas = await Database.raw('SELECT COUNT(*) as totalCalculadas FROM banco_preguntas where tipo = 5;');
    
    const preguntasCalculadasMultiples = await Database.raw('SELECT COUNT(*) as totalCalculadasMultiples FROM banco_preguntas where tipo = 6;');
			
		const preguntasBreves = await Database.raw('SELECT COUNT(*) as totalBreves FROM banco_preguntas where tipo = 1;');
		
		var totalPreguntas = [preguntasNumericas[0][0].totalNumericas, preguntasMultiples[0][0].totalMultiples, preguntasBooleanas[0][0].totalBooleanas, preguntasBreves[0][0].totalBreves, preguntasCalculadas[0][0].totalCalculadas, preguntasCalculadasMultiples[0][0].totalCalculadasMultiples];
		
		return response.json(totalPreguntas);
			
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
