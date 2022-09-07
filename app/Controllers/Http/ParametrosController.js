'use strict'

const Database = use('Database')
const execSync = require('child_process').execSync;
const fs = require('fs');

class ParametrosController {
  
    async obtenerConfiguracion({ response, auth }) {
        let configuracion = await Database.raw('select * from parametros_red_bayesiana;');
        return response.json(configuracion);
    }
    
    async guardarconfiguracion({request,response}){
		
      const errorEstandar = request.post().errorEstandar;
      const maxTemas = Number(request.post().numeroMaxTemas);
      const ponderacionDominio = Number(request.post().ponderacionDominio);
      const cantidadSaltos = Number(request.post().numeroSaltos);
      const versionRB = Number(request.post().versionRbm);

      await Database.raw('update parametros_red_bayesiana set error_estandar = ?, max_temas = ?, ponderacion_dominio = ?, cantidad_saltos = ?, version_red_bayesiana = ? ',
                         [errorEstandar, maxTemas, ponderacionDominio, cantidadSaltos, versionRB])


      return "success";
    }
  
  
    async actualizarConfiguracion({ response, request }) {
        const {
            id_nodo,
            id_padre,
            nombre_nodo,
            textPosition
        } = request.only(
            [
                'id_nodo',
                'nombre_nodo',
                'textPosition'
            ])

        const cambiaNombre = await Database
            .table('parametros_red_bayesiana')
            .where('id', id_nodo)
            .update({
                'nombre_tema': nombre_nodo,
                'textPosition': textPosition
            })


        return response.json({
            message: 'Actualizado'
        })
    }
  
}

module.exports = ParametrosController
