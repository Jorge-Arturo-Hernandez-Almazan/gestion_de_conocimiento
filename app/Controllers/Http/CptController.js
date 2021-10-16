'use strict'

const Database = use('Database')
const execSync = require('child_process').execSync;
const fs = require('fs');

class CptController {
  
  async obtenerCpts({params, response, auth}){
    
    
    let padresNodo = ""
    if(params.idpadres != "_"){
         padresNodo = params.idpadres;
    }
    
    
       
		let cpts = await Database.raw('select * from cpts where id_hijo = ? and id_padres = ? ;', [params.idhijo, padresNodo] );
		return response.json(cpts);
	}
  
  
}

module.exports = CptController
