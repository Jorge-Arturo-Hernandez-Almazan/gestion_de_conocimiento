'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EvidenciaExpertoSchema extends Schema {
  up () {
    this.create('evidencia_expertos', (table) => {
      table.increments()
      table.timestamps()
	  table.integer('id_usuario').unsigned().references('id').inTable('users')
	  table.integer('id_tema').unsigned().references('id').inTable('temas')
		table.integer('bueno')
		table.integer('regular')
		table.integer('malo')
    })
  }

  down () {
    this.drop('evidencia_expertos')
  }
}

module.exports = EvidenciaExpertoSchema
