<template>
 <div class="">
 	<div class="col-md-12">
		
		
		<!-- Breadcrumb -->
			<div class="col-12 mt-4">
				<div class="page-header">
					
					<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
						<h1 class="page-title"> Configuración de cuestionario </h1>
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
							<input @keyup="totalPreg" v-model="configuraciones.num_preguntas_numericas" 
                      id="numeroPreguntasNumericas" class="form-control form-control-lg">
							
						</div>
					
						
					
						<div class="form-group">
						  <label class="mb-2" for="exampleFormControlSelect2">Numero de preguntas breves</label>
							<input @keyup="totalPreg" v-model="configuraciones.num_preguntas_abiertas" 
                      id="numeroPreguntasBreves" class="form-control form-control-lg">
								
							
						</div>
					
					
						<div class="form-group">
							
						  	<label class="mb-2" for="exampleFormControlSelect2">Numero de preguntas calculadas</label>
							
							
							<input @keyup="totalPreg" v-model="configuraciones.num_preguntas_calculadas" 
                      id="numeroPreguntasCalculadas" class="form-control form-control-lg">
							
						</div>
          
            <div class="form-group">
							
						  	<label class="mb-2" for="exampleFormControlSelect2">Numero de preguntas calculadas multiples</label>
							
							
							<input @keyup="totalPreg" v-model="configuraciones.num_preguntas_calculadas_multiples" 
                      id="numeroPreguntasCalculadasMultiples" class="form-control form-control-lg">
							
						</div>					
					
						<div class="form-group">
						  <label class="mb-2" for="exampleFormControlSelect3">Numero de peguntas booleanas</label>
							
							<input @keyup="totalPreg" v-model="configuraciones.num_preguntas_boleanas" 
                      id="numeroPreguntasBooleanas" class="form-control form-control-lg">
								
							
							
						</div>
					
						<div class="form-group">
						  <label class="mb-2" for="exampleFormControlSelect3">Numero de peguntas opcion multiple</label>
						 
							<input @keyup="totalPreg" v-model="configuraciones.num_preguntas_multiples" 
                      id="numeroPreguntasMultiples" class="form-control form-control-lg">
								
							
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
					
					
            <table style="list-style-type: none; width:100%">
                  <tr>
                    
                    <th>
                      Tema:
                    </th>
                    <th>
                      Abiertas
                    </th>
                    <th>
                      Numerica
                    </th>
                    <th>
                      Booleana
                    </th>
                    <th>
                      Multiple
                    </th>
                    <th>
                      Calculada
                    </th>
                    <th>
                      Calculada Multiple
                    </th>
                    
                  </tr>
                  <tr v-for="tema in preguntasPorTema" v-if="
                                                             
                    (tema.totalPreguntasAbiertas < configuraciones.num_preguntas_abiertas ) ||
                    (tema.totalPreguntasNumericas < configuraciones.num_preguntas_numericas) ||
                    (tema.totalPreguntasBooleanas < configuraciones.num_preguntas_boleanas) ||
                    (tema.totalPreguntasMultiples < configuraciones.num_preguntas_multiples ) ||
                    (tema.totalPreguntasCalculadas < configuraciones.num_preguntas_calculadas ) || 
                    (tema.totalPreguntasCalculadasMultiples < configuraciones.num_preguntas_calculadas_multiples ) ">
                    
                    <td class="d-flex justify-content-center"> 
                      {{ tema.nombre_tema }} 
                      
                      
                    </td>
                    
                    <td>
                      {{ tema.totalPreguntasAbiertas }}
                      
                      <i v-if="tema.totalPreguntasAbiertas >= configuraciones.num_preguntas_abiertas" class="fas fa-check-circle" style="color:green"></i>
                      <i v-else class="fas fa-times-circle" style="color:red"></i>
                      
                    </td>
                    
                    <td>
                      {{ tema.totalPreguntasNumericas }}
                      
                      <i v-if="tema.totalPreguntasNumericas >= configuraciones.num_preguntas_numericas" class="fas fa-check-circle" style="color:green"></i>
                      <i v-else class="fas fa-times-circle" style="color:red"></i>
                      
                    </td>
                    
                    <td>
                      {{ tema.totalPreguntasBooleanas }}
                      
                      <i v-if="tema.totalPreguntasBooleanas >= configuraciones.num_preguntas_boleanas" class="fas fa-check-circle" style="color:green"></i>
                      <i v-else class="fas fa-times-circle" style="color:red"></i>
                      
                      
                    </td>
                    
                    <td>
                      {{ tema.totalPreguntasMultiples }}
                      
                      <i v-if="tema.totalPreguntasMultiples >= configuraciones.num_preguntas_multiples" class="fas fa-check-circle" style="color:green"></i>
                      <i v-else class="fas fa-times-circle" style="color:red"></i>
                      
                      
                    </td>
                    
                    <td>
                      {{ tema.totalPreguntasCalculadas }}
                      
                      <i v-if="tema.totalPreguntasCalculadas >= configuraciones.num_preguntas_calculadas" class="fas fa-check-circle" style="color:green"></i>
                      <i v-else class="fas fa-times-circle" style="color:red"></i>
                      
                      
                    </td>
                    
                    <td>
                      {{ tema.totalPreguntasCalculadasMultiples }}
                      
                      <i v-if="tema.totalPreguntasCalculadasMultiples >= configuraciones.num_preguntas_calculadas_multiples" class="fas fa-check-circle" style="color:green"></i>
                      <i v-else class="fas fa-times-circle" style="color:red"></i>
                      
                      
                    </td>
                    
                  </tr>



                </table>
          
          

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
			configuraciones:{
        num_preguntas_numericas: 0,
        num_preguntas_multiples: 0,
        num_preguntas_boleanas: 0,
        num_preguntas_calculadas: 0,
        num_preguntas_abiertas: 0,
        num_preguntas_calculadas_multiples: 0,
        num_preguntas_multiples: 0
      },
			totalPreguntas: 0,
      preguntasPorTema: []
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
      
      
      this.configuraciones.num_preguntas_numericas = (this.configuraciones.num_preguntas_numericas === "") ? 0 : parseInt(this.configuraciones.num_preguntas_numericas);
      this.configuraciones.num_preguntas_multiples = (this.configuraciones.num_preguntas_multiples === "") ? 0 : parseInt(this.configuraciones.num_preguntas_multiples);
      this.configuraciones.num_preguntas_boleanas = (this.configuraciones.num_preguntas_boleanas === "") ? 0 : parseInt(this.configuraciones.num_preguntas_boleanas);
			this.configuraciones.num_preguntas_calculadas = (this.configuraciones.num_preguntas_calculadas === "") ? 0 : parseInt(this.configuraciones.num_preguntas_calculadas);
      this.configuraciones.num_preguntas_abiertas = (this.configuraciones.num_preguntas_abiertas === "") ? 0 : parseInt(this.configuraciones.num_preguntas_abiertas);
      this.configuraciones.num_preguntas_calculadas_multiples = (this.configuraciones.num_preguntas_calculadas_multiples === "") ? 0 : parseInt(this.configuraciones.num_preguntas_calculadas_multiples);
      
      
      this.configuraciones.num_preguntas = parseInt( this.configuraciones.num_preguntas_numericas ) + 
        parseInt(this.configuraciones.num_preguntas_multiples) + 
        parseInt(this.configuraciones.num_preguntas_boleanas ) +
        parseInt(this.configuraciones.num_preguntas_calculadas ) +
        parseInt(this.configuraciones.num_preguntas_abiertas ) +
        parseInt(this.configuraciones.num_preguntas_calculadas_multiples)
			
		},
		
		checkPonderacionEstricta(){
			
			var checkEstricta = document.getElementById("ponderacionEstricta");
			
			
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
          
          let temas = result.data.temas[0];
          let preguntas = result.data.totalPreguntasPorTipo[0];
          
          for(let i=0; i < temas.length; i++){
            temas[i].totalPreguntasMultiples = 0;
            temas[i].totalPreguntasCalculadas = 0;
            temas[i].totalPreguntasAbiertas = 0;
            temas[i].totalPreguntasNumericas = 0;
            temas[i].totalPreguntasBooleanas = 0;
            temas[i].totalPreguntasCalculadasMultiples = 0;
          }
          
          console.log( preguntas); 
          
          for(let i=0; i < temas.length; i++){
            for(let j=0; j < preguntas.length;j++){
                if( temas[i].id === preguntas[j].id ){
                  switch( parseInt(preguntas[j].tipo) ){
                    case 1:
                      temas[i].totalPreguntasAbiertas = preguntas[j].totalPreguntas;
                      break;
                    case 2:
                      temas[i].totalPreguntasNumericas = preguntas[j].totalPreguntas;
                      break;
                    case 3:
                      temas[i].totalPreguntasBooleanas = preguntas[j].totalPreguntas;
                      break;
                    case 4:
                      temas[i].totalPreguntasMultiples = preguntas[j].totalPreguntas;
                      break;
                    case 5:
                      temas[i].totalPreguntasCalculadas = preguntas[j].totalPreguntas; 
                      break;
                    case 6:
                      temas[i].totalPreguntasCalculadasMultiples = preguntas[j].totalPreguntas;
                      break;
                  }
              }
            }
          }
              
          
          //console.log(temas);
          this.preguntasPorTema = temas;
              
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