'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagenesSchema extends Schema {
  up () {
    this.create('imagenes', (table) => {
      	table.increments()
      	table.timestamps()
		table.string('nombre',80)
     table.string('alias',100)
    })
  }

  down () {
    this.drop('imagenes')
  }
}

module.exports = ImagenesSchema
