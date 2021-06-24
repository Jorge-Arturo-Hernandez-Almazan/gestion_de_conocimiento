'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComodinesSchema extends Schema {
  up () {
    this.create('comodines', (table) => {
     	table.increments()
		table.string('comodin', 20).notNullable()
      	table.string('valor_comodin', 254).notNullable()
     	table.integer('id_opcion').unsigned().references('id').inTable('opciones').onDelete('CASCADE').onUpdate('CASCADE')
      	table.timestamps()
    })
  }

  down () {
    this.drop('comodines')
  }
}

module.exports = ComodinesSchema
