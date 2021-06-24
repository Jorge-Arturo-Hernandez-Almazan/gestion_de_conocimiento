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
		
		// 1 - Bajo
		// 2 - Insuficiente
		// 3 - Regular
		// 4 - Bueno
		// 5 - Exclente
		table.integer('bajo')
		table.integer('insuficiente')
		table.integer('regular')
		table.integer('bueno')
		table.integer('excelente')
    })
  }

  down () {
    this.drop('evidencia_expertos')
  }
}

module.exports = EvidenciaExpertoSchema
