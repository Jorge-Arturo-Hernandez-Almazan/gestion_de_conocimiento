<template>
    <div class="content-wrapper">
				<div class="col-lg-12">
						<!-- Breadcrumb -->
						<div class="col-12 mt-4">
								<div class="page-header">
										<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
												<h1 class="page-title"> Configuración de cuestionario </h1>
												<ul class="quick-links ml-auto">
														<li>
																<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i>
																</span> <span style="color: #bdb9bd"> Cuestionario <i class="fas fa-angle-right"></i>
																</span> Configurar cuestionario
														</li>
												</ul>
										</div>
								</div>
						</div>

						<!-- Cuerpo de la pagina -->
					
        
            <div class="card" style="border-radius: 15px;">
                <div class="card-body">
                    
                    <div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
                        <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                            
                            <ul class="quick-links ml-auto">
                                <li>
                                    <button type="button" class="btn btn-primary float-right btn-lg"
                                        data-toggle="modal" data-target="#modalDeInformacion" style="border-radius: 25px;">
                                        <i class="fas fa-info-circle"></i> Información
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                  
                    <div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
                      
                        <div class="col-4" style="border: 0.5px solid black; border-radius: 15px;">
                          

													
														<h5 class="page-title"> Configuración de parametros del cuestionario</h5>
                            
														<div class="form-group">
                                <label class="mb-2">Numero de preguntas por tema</label>
                                <input id="numeroPreguntas" type="number" class="form-control form-control-lg"
                                    placeholder="# Preguntas" v-model="configuraciones.num_preguntas" disabled>
                            </div>

                            <div class="form-group">
                                <label class="mb-2" for="exampleFormControlSelect1">Total de preguntas
                                    numericas</label>
                                <input @keyup="totalPreg" v-model="configuraciones.num_preguntas_numericas"
                                    id="numeroPreguntasNumericas" class="form-control form-control-lg">
                            </div>

                            <div class="form-group">
                                <label class="mb-2" for="exampleFormControlSelect2">Numero de preguntas abiertas</label>
                                <input @keyup="totalPreg" v-model="configuraciones.num_preguntas_abiertas"
                                    id="numeroPreguntasBreves" class="form-control form-control-lg">
                            </div>

                            <div class="form-group">
                                <label class="mb-2" for="exampleFormControlSelect2">Numero de preguntas
                                    calculadas</label>
                                <input @keyup="totalPreg" v-model="configuraciones.num_preguntas_calculadas"
                                    id="numeroPreguntasCalculadas" class="form-control form-control-lg">
                            </div>

                            <div class="form-group">
                                <label class="mb-2" for="exampleFormControlSelect2">Numero de preguntas calculadas
                                    multiples</label>
                                <input @keyup="totalPreg" v-model="configuraciones.num_preguntas_calculadas_multiples"
                                    id="numeroPreguntasCalculadasMultiples" class="form-control form-control-lg">
                            </div>

                            <div class="form-group">
                                <label class="mb-2" for="exampleFormControlSelect3">Numero de peguntas booleanas</label>
                                <input @keyup="totalPreg" v-model="configuraciones.num_preguntas_boleanas"
                                    id="numeroPreguntasBooleanas" class="form-control form-control-lg">
                            </div>

                            <div class="form-group">
                                <label class="mb-2" for="exampleFormControlSelect3">Numero de peguntas opcion
                                    multiple</label>
                                <input @keyup="totalPreg" v-model="configuraciones.num_preguntas_multiples"
                                    id="numeroPreguntasMultiples" class="form-control form-control-lg">
                            </div>

                            <b> Otras configuraciones </b>

                            <div class="form-group">
                                <label class="mb-2" for="exampleFormControlSelect1">Rango por defecto</label>
                                <input min="0" max="1" step="0.001" id="rangoPorDefecto" type="number"
                                    class="form-control form-control-lg" placeholder="# Preguntas"
                                    :value="configuraciones.rango_por_defecto">
                            </div>

                            <div class="form-group">
                                <label class="mb-2">¿Ponderacion estricta en preguntas de opcion multiple?</label>
                                <label><input id="ponderacionEstricta" type="checkbox" value="first_checkbox"> Sí
                                </label>
                            </div>

                            <button type="button" @click="guardarConfiguracion" class="btn btn-primary float-right btn-lg"> <i
                                    class="fas fa-save" style="border-radius: 25px;"></i> Guardar</button>
                               

                        </div>
												
												
                        	<div class="col-8">
														<p>
															Establecer configuración
														</p>
														
														<div class="page-header " style="border: 1px solid #dee2e6; margin: 0px; background: #f5f5f5;">
															<div class="col-6" style="padding: 5px;">
																<b> Termino de busqueda: </b>
																<input class="form-control" type="search" placeholder="Ej. tablas de multiplicar" v-model="filters.nombre.value" style="border-radius: 10px; height: 37px; margin: 0px;" />
															</div>
														</div>
														
														<div class="table-responsive">
															
															<v-table 
																			 :data="preguntasPorTema" 
																			 :filters="filters" 
																			 :currentPage.sync="currentPage" 
																			 :pageSize="15" 
																			 @totalPagesChanged="totalPages = $event" 
																			 style="width:100%" 
																			 class="table table-hover">
																	<thead slot="head">
																			<th>Tema: </th>
																			<th>Abiertas </th>
																			<th>Numerica </th>
																			<th>Booleana</th>
																			<th>Multiple</th>
																			<th>Calculada</th>
																			<th>Calculada Multiple</th>
																	</thead>
																	<tbody slot="body" slot-scope="{displayData}">
																			<tr v-for="tema in displayData" 
																					v-if="(tema.totalPreguntasAbiertas < configuraciones.num_preguntas_abiertas ) ||
                                          (tema.totalPreguntasNumericas < configuraciones.num_preguntas_numericas) ||
                                          (tema.totalPreguntasBooleanas < configuraciones.num_preguntas_boleanas) ||
                                          (tema.totalPreguntasMultiples < configuraciones.num_preguntas_multiples ) ||
                                          (tema.totalPreguntasCalculadas < configuraciones.num_preguntas_calculadas ) || 
                                          (tema.totalPreguntasCalculadasMultiples < configuraciones.num_preguntas_calculadas_multiples ) " >
																					
																					<td>{{ tema.nombre_tema }}</td>
																					<td>
																							{{ tema.totalPreguntasAbiertas }}

																							<i v-if="tema.totalPreguntasAbiertas >= configuraciones.num_preguntas_abiertas"
																									class="fas fa-check-circle" style="color:green"></i>
																							<i v-else class="fas fa-times-circle" style="color:red"></i>
																					</td>
																					<td>
																							{{ tema.totalPreguntasNumericas }}

																							<i v-if="tema.totalPreguntasNumericas >= configuraciones.num_preguntas_numericas"
																									class="fas fa-check-circle" style="color:green"></i>
																							<i v-else class="fas fa-times-circle" style="color:red"></i>
																					</td>
																					<td>
																							{{ tema.totalPreguntasBooleanas }}

																							<i v-if="tema.totalPreguntasBooleanas >= configuraciones.num_preguntas_boleanas"
																									class="fas fa-check-circle" style="color:green"></i>
																							<i v-else class="fas fa-times-circle" style="color:red"></i>
																					</td>
																					<td>
																							{{ tema.totalPreguntasMultiples }}

																							<i v-if="tema.totalPreguntasMultiples >= configuraciones.num_preguntas_multiples"
																									class="fas fa-check-circle" style="color:green"></i>
																							<i v-else class="fas fa-times-circle" style="color:red"></i>
																					</td>
																					<td>
																							{{ tema.totalPreguntasCalculadas }}

																							<i v-if="tema.totalPreguntasCalculadas >= configuraciones.num_preguntas_calculadas"
																									class="fas fa-check-circle" style="color:green"></i>
																							<i v-else class="fas fa-times-circle" style="color:red"></i>
																					</td>
																					<td>
																							{{ tema.totalPreguntasCalculadasMultiples }}

																							<i v-if="tema.totalPreguntasCalculadasMultiples >= configuraciones.num_preguntas_calculadas_multiples"
																									class="fas fa-check-circle" style="color:green"></i>
																							<i v-else class="fas fa-times-circle" style="color:red"></i>
																					</td>
																			</tr>
																	</tbody>
															</v-table>
															<smart-pagination :currentPage.sync="currentPage" :totalPages="totalPages" />
                        		</div>
												</div>
                    </div> 
                          
                  
                  
                  <div class="modal fade" id="modalDeInformacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
										<div class="modal-dialog" role="document">
											<div class="modal-content">
												<div class="modal-header">

													<h5 class="modal-title" id="exampleModalLabel"> Información  </h5>


													<button type="button" class="close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
													<div class="modal-body">

														Algo de información para el usuario 
													</div>


											</div>
										</div>
									</div>
                  
                  
                         
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
      preguntasPorTema: [],
			filters: {
			  nombre: { value: '', keys: ['nombre_tema'] }
			},
			currentPage: 1,
			totalPages: 0
		};
	},
	created(){
		
	},
	mounted() {
		
		document.getElementById("navUsuarios").classList.remove('active');
		document.getElementById("liUsuarios").classList.remove('menu-open');
		document.getElementById("navCuestionario").classList.add('active');
		document.getElementById("liCuestionario").classList.add('menu-open');
		document.getElementById("navGrafo").classList.remove('active');
		document.getElementById("liGrafo").classList.remove('menu-open');
		document.getElementById("navPreguntas").classList.remove('active');
		document.getElementById("liPreguntas").classList.remove('menu-open');
		
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
                if( temas[i].nombre_tema === preguntas[j].nombre_tema ){
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
  div.gfg {
        width: 100%;
        height: 800px;
        overflow: auto;
        text-align:justify;
    }
  

  
	
</style>