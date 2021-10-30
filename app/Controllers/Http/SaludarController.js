'use strict'

class SaludarController {
  
  async metodoSaludar({view,params,response}){
		
    let nombre = params.nombre;
    let edad = params.edad;

		let persona = {nombre:nombre, edad:edad};
		
    return view.render('saludar', {nombre:nombre, edad:edad} )

  }
  
}

module.exports = SaludarController
