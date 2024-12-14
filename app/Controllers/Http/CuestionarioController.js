
'use strict'

const Database = use('Database');
const execSync = require('child_process').execSync;
const fs = require('fs');

class PonderacionController {

    // Método de prueba para verificar el funcionamiento
    async pruebaDeFuncionamiento() {
        return "Prueba";
    }

    // Método para obtener el primer tema usando parámetros matricula y rbm
    async obtenerPrimerTema({ response, params }) {
        let matricula = params.matricula;
        let rbm = params.rbm;
        let parametros = " " + matricula + " " + rbm;

        // Ejecuta el script Python con los parámetros
        const output = execSync("python3 red_bayesiana/metodo_rutas_evaluacion/main.py " + parametros, { encoding: 'utf-8' });

        // Retorna la salida del script como respuesta JSON
        return response.json(output);
    }

    // Método para obtener los registros de la tabla 'rbs' de la base de datos
    async obtenerrbs({ response }) {
        const rbs = await Database.raw('SELECT * FROM rbs');
        return response.json(rbs);
    }

   
}

module.exports = PonderacionController
