'use strict'
const Database = use('Database')
const execSync = require('child_process').execSync;


class SaludarController {
  
  async metodoSaludar({view,params,response}){
		
    /*let nombre = params.nombre;
    let edad = params.edad;

		let persona = {nombre:nombre, edad:edad};
		
    return view.render('saludar', {nombre:nombre, edad:edad} )*/
    
        
    const salidaPython = execSync("python3 AlgoritmosMaestria/hola.py", {encoding: 'utf-8'} )
        
    return response.json(salidaPython);
    
    
    //return response.json("Hola mundo");

  }
  
  
  
}

module.exports = SaludarController
