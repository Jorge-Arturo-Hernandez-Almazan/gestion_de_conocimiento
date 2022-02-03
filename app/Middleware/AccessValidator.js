'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AccessValidator {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({
        response,
        auth,
        session
    }, next, props) {

        // 8, 2, 9, 1

        if (auth.user.id_rol != '1') {
            let accesos = session.get('prueba');
            //Props[0] -> 1
            let verificado = false;
            for (var i = 0; i < accesos.length; i++) {
                if (props[0] == accesos[i].id_funcionalidad) {
                    verificado = true;
                }
            }

            if (!verificado) {
                return response.route('/')
            }
        }

        await next()

    }
}

module.exports = AccessValidator
