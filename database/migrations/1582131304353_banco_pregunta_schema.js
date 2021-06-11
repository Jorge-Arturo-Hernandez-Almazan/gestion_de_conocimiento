'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BancoPreguntaSchema extends Schema {
  up () {
    this.create('banco_preguntas', (table) => {
      	table.increments()
      	table.text('pregunta').notNullable()
      	table.string('tipo',200).notNullable()
      	table.integer('id_tema').unsigned().references('id').inTable('temas').onDelete('CASCADE').onUpdate('CASCADE')
		table.timestamps()
    })
  }

  down () {
    this.drop('banco_preguntas')
  }
}

module.exports = BancoPreguntaSchema
