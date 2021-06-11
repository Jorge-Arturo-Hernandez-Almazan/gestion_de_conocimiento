'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GrupoFuncionalidadSchema extends Schema {
  up () {
    this.create('grupo_funcionalidad', (table) => {
      table.increments()
      table.string('nombre',80)
    })
  }

  down () {
    this.drop('grupo_funcionalidad')
  }
}

module.exports = GrupoFuncionalidadSchema
