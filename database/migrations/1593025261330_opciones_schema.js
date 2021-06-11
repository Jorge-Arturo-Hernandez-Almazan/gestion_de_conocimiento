'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OpcionesSchema extends Schema {
  up () {
    this.create('opciones', (table) => {
      	table.increments()
		table.string('opcion',300)
		table.integer('id_pregunta').unsigned().references('id').inTable('banco_preguntas').onDelete('CASCADE').onUpdate('CASCADE')
		table.integer('esrespuesta')
      table.timestamps()
    })
  }

  down () {
    this.drop('opciones')
  }
}

module.exports = OpcionesSchema
