'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfiguracionCuestionarioSchema extends Schema {
  up () {
    this.create('configuracion_cuestionarios', (table) => {
      table.increments()
      table.timestamps()
      table.boolean('ponde_estricta')
      table.integer('num_preguntas').unsigned() //TOTAL
      table.integer('num_preguntas_abiertas').unsigned()
      table.integer('num_preguntas_boleanas').unsigned()
      table.integer('num_preguntas_multiples').unsigned()
      table.integer('num_preguntas_calculadas').unsigned()
      table.integer('num_preguntas_numericas').unsigned()
      table.integer('num_preguntas_calculadas_multiples').unsigned()
      table.float('rango_por_defecto',20,10)
    })
  }

  down () {
    this.drop('configuracion_cuestionarios')
  }
}

module.exports = ConfiguracionCuestionarioSchema
