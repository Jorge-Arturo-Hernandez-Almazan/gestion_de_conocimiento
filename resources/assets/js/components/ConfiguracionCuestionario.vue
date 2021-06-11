<template>
 <div class="row">
 	<div class="col-md-12">
		
		
		<!-- Breadcrumb -->
			<div class="col-12 mt-2">
				<div class="page-header">
					<h3 class="page-title"> Configuración de cuestionario </h3>
					<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
						<ul class="quick-links ml-auto">
						<li>
							<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> 								</span>  <span style="color: #bdb9bd"> Cuestionario  <i class="fas fa-angle-right"></i> </span> Configurar cuestionario
						</li>
						</ul>
				  </div>
				</div>
			</div>
		
		
 		<div class="card">
			
  	 	<div class="card-body">
			
			<div class="col-lg-12">
				 <h4>Configurar cuestionario</h4>
			</div>
			
    	 	<div class="row">
				<div class="col-md-12">
					
                 
			  		
						<b> Configuraciones de preguntas </b>
					
						<div class="form-group">
						  	<label class="mb-2">Numero de preguntas por cuestionario</label>
						  	<input id="numeroPreguntas" type="number" class="form-control form-control-lg" placeholder="# Preguntas" v-model="configuraciones.num_preguntas" disabled>
							
							
						</div>

						<div class="form-group">
						  <label class="mb-2" for="exampleFormControlSelect1">Numero de preguntas numericas</label>
							<select @change="totalPreg" v-model="configuraciones.num_preguntas_numericas" id="numeroPreguntasNumericas" class="form-control form-control-lg">
								<option v-for="(n, i) in this.numero_preguntas[0]" :value="i"> {{i}} </option>
							</select>
							
						</div>
					
						
					
						<div class="form-group">
						  <label class="mb-2" for="exampleFormControlSelect2">Numero de preguntas breves</label>
							
							<select @change="totalPreg" v-model="configuraciones.num_preguntas_abiertas" id="numeroPreguntasBreves" class="form-control form-control-lg">
								<option v-for="(n, i) in this.numero_preguntas[3]" :value="i"> {{i}} </option>
							</select>
							
						</div>
					
					
						<div class="form-group">
							
						  	<label class="mb-2" for="exampleFormControlSelect2">Numero de preguntas calculadas</label>
							
							
							<select @change="totalPreg" v-model="configuraciones.num_preguntas_calculadas" id="numeroPreguntasCalculadas" class="form-control form-control-lg">
								<option v-for="(n, i) in this.numero_preguntas[4]" :value="i"> {{i}} </option>
							</select>
							
						</div>
          
            <div class="form-group">
							
						  	<label class="mb-2" for="exampleFormControlSelect2">Numero de preguntas calculadas multiples</label>
							
							
							<select @change="totalPreg" v-model="configuraciones.num_preguntas_calculadas_multiples" id="numeroPreguntasCalculadasMultiples" class="form-control form-control-lg">
								<option v-for="(n, i) in this.numero_preguntas[5]" :value="i"> {{i}} </option>
							</select>
							
						</div>					
					
						<div class="form-group">
						  <label class="mb-2" for="exampleFormControlSelect3">Numero de peguntas booleanas</label>
							
							<select @change="totalPreg" v-model="configuraciones.num_preguntas_boleanas" id="numeroPreguntasBooleanas" class="form-control form-control-lg">
								<option v-for="(n, i) in this.numero_preguntas[2]" :value="i"> {{i}} </option>
							</select>
							
							
						</div>
					
						<div class="form-group">
						  <label class="mb-2" for="exampleFormControlSelect3">Numero de peguntas opcion multiple</label>
						 
							<select @change="totalPreg" v-model="configuraciones.num_preguntas_multiples" id="numeroPreguntasMultiples" class="form-control form-control-lg">
								<option v-for="(n, i) in this.numero_preguntas[1]" :value="i"> {{i}} </option>
							</select>
							
						</div>
					
						
						
						<b> Otras configuraciones </b>
					
						<div class="form-group">
						  <label class="mb-2" for="exampleFormControlSelect1">Rango por defecto</label>
						  <input min="0" max="1" step="0.001" id="rangoPorDefecto" type="number" class="form-control form-control-lg" placeholder="# Preguntas" :value="configuraciones.rango_por_defecto">
						</div>
					
						<div class="form-group">
						  <label class="mb-2">¿Ponderacion estricta en preguntas de opcion multiple?</label>
						  <label><input id="ponderacionEstricta" type="checkbox"  value="first_checkbox"> Sí </label>
						</div>
					
					

					</div>
  
					</div>
                  </div>
			
					<div class="card-footer">
					<button type="button" @click="guardarConfiguracion"  class="btn btn-primary">Guardar</button>
					</div>
			
                </div>
              </div>
        
  </div>

</template>

<script>
import axios from "axios";

export default {
	data() {
		return{
			id: "",
			numero_preguntas: [],
			configuraciones: [],
			totalPreguntas: 0,
		};
	},
	created(){
		
	},
	mounted() {
		this.obtenerConfiguraciones();
		this.obtenerTotales();
		
	},
	methods: {
		
		totalPreg() { 

			this.configuraciones.num_preguntas = this.configuraciones.num_preguntas_numericas + this.configuraciones.num_preguntas_multiples + this.configuraciones.num_preguntas_boleanas + this.configuraciones.num_preguntas_calculadas + this.configuraciones.num_preguntas_abiertas + this.configuraciones.num_preguntas_calculadas_multiples;
			
		},
		
		checkPonderacionEstricta(){
			
			var checkEstricta = document.getElementById("ponderacionEstricta");
			//console.log("Configuraciones ponde estricta " + this.configuraciones.ponde_estricta);
			
			if(this.configuraciones.ponde_estricta == 1){
			   checkEstricta.checked = true;
			}else{
				checkEstricta.checked = false;
			}
		},
		
		obtenerTotales(){
			//obtenerTotalPorPregunta
			axios({method: 'GET', url: '/obtenerTotalPorPregunta'}).then(
				result=> {
					this.numero_preguntas = result.data;
					this.numero_preguntas[0] = this.numero_preguntas[0] + 1;
					this.numero_preguntas[1] = this.numero_preguntas[1] + 1;
					this.numero_preguntas[2] = this.numero_preguntas[2] + 1;
					this.numero_preguntas[3] = this.numero_preguntas[3] + 1;
					this.numero_preguntas[4] = this.numero_preguntas[4] + 1;
          			this.numero_preguntas[5] = this.numero_preguntas[5] + 1;
					
					//console.log(result.data);
				},
				error=> {
					console.error(error)
				}
			)
		},
		
		obtenerConfiguraciones(){
			axios({method: 'GET', url: '/obtenerconfiguracion'}).then(
				result=> {
					this.configuraciones = result.data[0];
					//console.log(this.configuraciones);
					this.checkPonderacionEstricta();
				},
				error=> {
					console.error(error)
				}
			)
		},
		
		guardarConfiguracion: async function(){
			var totalPreguntas = document.getElementById("numeroPreguntas").value;
			var totalNumericas = document.getElementById("numeroPreguntasNumericas").value;
			var rangoDefecto = document.getElementById("rangoPorDefecto").value;
			var totalBreves = document.getElementById("numeroPreguntasBreves").value;
			var totalCalculadas = document.getElementById("numeroPreguntasCalculadas").value;
			var totalBooleanas = document.getElementById("numeroPreguntasBooleanas").value;
			var totalMultiples = document.getElementById("numeroPreguntasMultiples").value;
      var totalCalculadasMultiples = document.getElementById("numeroPreguntasCalculadasMultiples").value;
			//var ponderacionEstricta = document.getElementById("ponderacionEstricta").value;
			
			var checkEstricta = document.getElementById("ponderacionEstricta");
			
			if(checkEstricta.checked){
			   	var ponderacionEstricta = 1;
			}else{
				var ponderacionEstricta = 0;
			}
			
			axios.post('/guardarconfiguracion',
						{totalPreguntas : totalPreguntas, 
						 totalNumericas : totalNumericas, 
						 rangoDefecto : rangoDefecto,
						 totalBreves : totalBreves,
						 totalCalculadas : totalCalculadas,
						 totalBooleanas : totalBooleanas,
						 totalMultiples : totalMultiples,
             totalCalculadasMultiples : totalCalculadasMultiples,
						 ponderacionEstricta : ponderacionEstricta,})
			.then((res)=>{

				this.$swal.fire({
				  icon: 'success',
				  title: 'Configuracion guardada',
				  text: 'Configuracion guardada con exito',
				})
				
				this.obtenerConfiguraciones();
				this.obtenerTotales();
				this.checkPonderacionEstricta();

			})
			.catch((err)=>{
				console.log(err)
			})
			
			
		}
    
	},
	
}

</script>

<style>

	/* The container */
	.container {
		display: block;
		position: relative;
		padding-left: 35px;
		margin-bottom: 12px;
		cursor: pointer;
		font-size: 22px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
  
	/* Hide the browser's default checkbox */
	.container input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}
  
  	/* Create a custom checkbox */
  	.checkmark {
    	position: absolute;
    	top: 0;
    	left: 0;
    	height: 25px;
    	width: 25px;
    	background-color: #eee;
  		}
  
	  /* On mouse-over, add a grey background color */
	  .container:hover input ~ .checkmark {
		background-color: #ccc;
	  }

	  /* When the checkbox is checked, add a blue background */
	  .container  input:checked ~ .checkmark {
		background-color: #2196F3;
	  }

	  /* Create the checkmark/indicator (hidden when not checked) */
	  .checkmark:after {
		content: "";
		position: absolute;
		display: none;
	  }

	  /* Show the checkmark when checked */
	  .container input:checked ~ .checkmark:after {
		display: block;
	  }

	  /* Style the checkmark/indicator */
	  .container .checkmark:after {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	  }
	
</style>
