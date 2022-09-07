'use strict'

const Database = use('Database')
const execSync = require('child_process').execSync;
const fs = require('fs');

class PonderacionController {
    async pruebaDeFuncionamiento() {
        return "Prueba"
    }
  
    async obtenerPrimerTema({ response, params }) {
        let matricula = params.matricula;
        let rbm = params.rbm;
        let parametros = " " + matricula + " " + rbm;
      
        const output = execSync("python3 red_bayesiana/metodo_rutas_evaluacion/pruebas.py " + parametros, {encoding: 'utf-8'});
        
        return response.json(output);
    }
  
    
    async obtenerrbs({ response }){
        const rbs = await Database.raw('SELECT * FROM rbs');
        return response.json( rbs );
    }
}

module.exports = PonderacionController
