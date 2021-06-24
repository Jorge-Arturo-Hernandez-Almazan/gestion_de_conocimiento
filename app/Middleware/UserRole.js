'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class UserRole {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
    
    async handle({ response, auth }, next, props) {
    // call next to advance the request
    try {
      await auth.check()
    } catch (error) {
      return response.route('/')
    }
      
    var verificado = false;
    for (var i = 0; i < props.length; i++) {
      if(auth.user.id_rol == props[i]){
        verificado = true;
      }
    }
    if(!verificado ){
      return response.route('/')
    }
    
    await next()
      
      
  }
  
   
  
  
  
  
  
  
  
  
    // call next to advance the request
    //await next()
 // }
}

module.exports = UserRole
