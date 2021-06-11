<template>

			<div class="row ">
				
				<div class="col-12 mt-2">
				<div class="page-header">
					<h3 class="page-title"> Control de acceso </h3>
					
					<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
						<ul class="quick-links ml-auto">
						<li>
							<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> </span>   Acceso
						</li>
						</ul>
				  </div>
				</div>
			</div>
				
				<div class="col-12">
					<div class="card">
						<div class="card-body">
							
							<div class="row">
								<div class="col-md-6">
									<h3> Configuración acceso a rutas </h3>
								</div>
								<div class="col-md-6">

									<button
									  type="button"
									  class="btn btn-success float-right"
									  @click="abrirModal"
											
											 data-toggle="modal" data-target="#exampleModal"
									> <i class="fas fa-plus-circle"></i> Registrar ruta 
									</button>

								</div>	
							</div>
							
							<!-- Modal para registrar ruta -->
							<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div class="modal-dialog" role="document">
									<div class="modal-content">
										
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Registrar ruta</h5>
											<button type="button" class="close"  data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										
										<div class="modal-body">
											
											<div class="form-group">
												<label for="exampleInputEmail1"> Nombre de la ruta </label>
												<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
												
											  </div>
											
											
										</div>
										
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
											<button type="button" class="btn btn-primary">Save changes</button>
										</div>
									</div>
								</div>
							</div>
							
							
							<label for="roles">Tipo de usuario: </label>
							<select v-model="rol_sel" @change="cambioRol" name="roles" id="roles">
							    <option value="2">Experto</option>
								<option value="3">Profesor</option>
							    <option value="4">Alumno</option>
							</select>  
							
							<label for="cars">Tabla de acciones: </label>
							<table style="width:100%">
								
								<tr>
									<th>Acción</th>
									<th>Descripción</th>
									<th>Estado</th>
									 
								</tr>

								
								<tr v-for="acceso in accesos" >
									
									<td v-if="acceso.descripcion != '' "> <span style="padding-left: 30px;"> {{ acceso.nombre }} </span>  </td>
									<td v-else > <b> {{ (acceso.nombre).toUpperCase() }} </b>  </td>
									
									<td> {{ acceso.descripcion }} </td>
									
									<td v-if="acceso.descripcion != '' ">  <toggle-button :name="acceso.id.toString()" :value="acceso.estado" color="#82C7EB" :labels="true" @change="cambiarEstado"/> </td>
									
									<td v-else></td>
									
								</tr>
								
							
							</table>
							
							
							
							
						</div>
					</div>
				</div>	
			</div>

</template>


<script>
import axios from 'axios'

export default{
	data(){
		return {
			rol_sel: 3,
			accesos : [],
			variable : false,
			gruposaccesos : []
		}
	},
	mounted(){
		this.cambioRol();
	},
	methods: {
		
		abrirModal(){
			console.log("Se ha abierto el modal");
		},
		
		cambiarEstado(e){
			
			
			
			//console.log(e.srcEvent.target.name);
			
			let id_nodo = e.srcEvent.target.name;
			let valor = e.value;
			let valor_entero = 0;
			if(valor){
			 	valor_entero = 1;  
			}
			
			axios.post('/guardarAccesoRutas',
						{idruta : id_nodo, 
						 valorruta : valor_entero,
						 idrol : this.rol_sel})
			.then((res)=>{
				
				Swal.fire({
				  toast: true,
				  title: 'Configuracion guardada',
				position: 'top-end',
  				showConfirmButton: false,
					icon: 'success',
					timer: 3000
				})
				//this.cambioRol();
			})
			.catch((err)=>{
				console.log(err)
			})
			
			
			
		},
		
		cambioRol(){
			
			this.accesos = [];
			
			axios({method: 'GET', url: '/accesos/' + this.rol_sel }).then(
				result=> {
					this.accesos = result.data;
					
					let grupo = "";
					for(var i=0; i < this.accesos.length; i++){
						
						
						if(this.accesos[i].grupo != grupo){
							grupo = this.accesos[i].grupo;
							
							this.accesos.splice(i, 0, {descripcion:'', estado:0, grupo:0, id: 'g'+this.accesos[i].id_grupo, id_grupo:this.accesos[i].id_grupo, nombre: ''+ grupo, rol: '' });
						}
						
						
					}
					
					
					for(var i=0; i < this.accesos.length; i++){
						
						if( this.accesos[i].estado == 1 ){
						   this.accesos[i].estado = true;
						}else{
						   this.accesos[i].estado = false;
						}
					}
					
					//console.log(result.data);
				},
				error=> {
					console.error(error)
				}
			)
			
		}
		
		
	}
}
</script>