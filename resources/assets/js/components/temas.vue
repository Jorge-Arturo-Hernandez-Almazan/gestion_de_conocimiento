<template>

            <div class="">
              <!-- <div class="col-lg-12 "> -->
				  
				  <!-- Breadcrumb -->
			<div class="col-12 mt-4">
				<div class="page-header">
					
					<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
						<h1 class="page-title"> Temas </h1>
						<ul class="quick-links ml-auto">
						<li>
							<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> </span>  <span style="color: #bdb9bd"> Temas </span> 
						</li>
						</ul>
				  </div>
				</div>
			</div>
				  
				  
                <div class="card">
                  <div class="card-body">
					  
                    
                    <div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
						<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
							<h2 class="page-title"> Lista de temas </h2>
							
							
						</div>
					</div>
                    
					  
					  
					  <div class="alert alert-primary" role="alert">
              
              <h2>
                Atención
              </h2>
              <i class="fas fa-info-circle"></i> Los temas aquí mostrados son los pertenecientes al grafo de conocimineto, esta página es unicamente para mostrar la información de los mismos
              <br>
              <b>Nota: </b> Si desea realizar una cambio en los temas, por favor diríjase a la interfaz del grafo de conocimineto. 
            </div>
                   
					  <p> <b> Busqueda por nombre:  </b> </p>
      				<input type="search" class="form-control mb-2" placeholder="Matemáticas" v-model="filters.nombre_tema.value"/>
					     <div v-if="verificarPreguntas!=false" class="alert alert-danger" role="alert">{{verificarPreguntas}}</div>
					  
                    
            
                    
					  
					  
						
					<div class="table-responsive">
         
				  	<v-table 
						   :data="temas" 
						   :filters="filters" 
						   :currentPage.sync="currentPage"
							:pageSize="5"
							@totalPagesChanged="totalPages = $event"
						   style="width:100%"
						   class="table mb-2"
							 >
					  
					<thead slot="head" class="thead-dark">
						<v-th sortKey="nombre_tema" defaultSort="desc">Tema</v-th>
						<v-th sortKey="padre" defaultSort="desc"> Depende de </v-th>
						<v-th sortKey="totalAbiertas" defaultSort="desc" > Total de preguntas </v-th>
						
						<!-- <th>Opciones</th> -->
					</thead>
					<tbody slot="body" slot-scope="{displayData}">
						<tr v-for="temas in displayData" :key="temas.id">
					 
							<td  calss="text-left">{{temas.nombre_tema}}</td>
							<td calss="text-left">{{temas.padre}}</td>
							
							<td calss="text-left">
                Breves: {{temas.totalAbiertas}} <br>
                Númericas: {{temas.totalNumericas}} <br>
                Verdadero/falso: {{temas.totalBooleanas}} <br>
                Multiples: {{temas.totalMultiple}} <br>
                Calculadas: {{temas.totalCalculadas}} <br>
                Calculadas multiples: {{temas.totalCMultiple}} <br>
              </td>
              

    			
							<!-- <td class="text-right">
								
								
								<button v-on:click="btnEditar(temas.id,temas.nombre_tema,temas.padre,temas.id_padre)" class="btn btn-warning"> <i class="fas fa-pen"></i> </button>

										
											
																	
							</td> -->
							
							
							
						</tr>
					</tbody>
				  </v-table>
						
					</div>
					
					  <smart-pagination
						:currentPage.sync="currentPage"
						:totalPages="totalPages"
					  />
					  
                    
					  <p> Total de registros: {{ this.temas.length }} </p>
                    
                  </div>
					
					
                </div>
              <!--</div>-->
              
              </div>
</template>

<script>
import axios from 'axios'


export default{	
	data(){
		return {
      verificarPreguntas:false,
      configuracion: [],
			temasSeleccionado: {},
			temas: [],
			temas_hijos: [],
			filters: {
			  nombre_tema: { value: '', keys: ['nombre_tema'] }
				//nombre_tema: { value: '', keys: ['padre'] }
			},
			currentPage: 1,
			totalPages: 0,
			
			temasOnlyNombreID: [],
				id: '',
				nombre_tema: '',
				padre: '',
				nivel: '',
				id_padre: '',
				  freey:'',
				  freex:''
			}
	},
	mounted(){
		this.getTemas(),this.getTemasOnlyNombreID()
      this.obtenerConfiguracion();
	},
	methods: {
		ordenar(){
			
		},
    	obtenerConfiguracion(){
			axios({method: 'get', url: 'cuestionario/obtenerconfiguracion'}).then(
			result=> {
				this.configuracion = result.data;
        
        for(var i =0;i<this.temas.length;i++)
        {
          if(this.temas[i].tipo>1)
            {
              //console.log(this.temas[i].totalAbiertas);    
          if(this.configuracion.num_preguntas_abiertas>this.temas[i].totalAbiertas||
             this.configuracion.num_preguntas_numericas>this.temas[i].totalNumericas||
            this.configuracion.num_preguntas_boleanas>this.temas[i].totalBooleanas||
            this.configuracion.num_preguntas_multiples>this.temas[i].totalCMultiple||
            this.configuracion.num_preguntas_calculadas>this.temas[i].totalCalculadas||
            this.configuracion.num_preguntas_calculadas_multiples>this.temas[i].totalCMultiple)
          {
              this.verificarPreguntas="El total de preguntas registradas por cada tema, no cumple los requerimientos para el inicio del cuestionario.";
              break;
          }
            }
        }
			},error=> {
				console.error(error)
			} )
		},
    
		hacerPadreAlAbuelo(oldParent, newChildParent){///Eliminar tema y Hacer padre al abuelo
			
			axios({method: 'POST', url: "/tema/deleteandcambiarPadre/"  + oldParent + "?id=" + oldParent + "&id2=" + newChildParent}).then(
				result=> {
					//console.log(result.data)
					this.getTemas()
					
				},
				error=> {
					console.error(error)
				}
			)			
		},
		deleteTemaAndHijos(id){///Funcion para eliminar tema y hijos
				axios.post('/tema/deleteTema',
			{id:id })
			.then((res)=>{
			 this.getTemas()
			})
				.catch((err)=>{
					console.log(err)
				})
		},	
		
		getTemas(){///Funcion para mostrar los temas
			axios({method: 'GET', url: '/tema/all'}).then(
				result=> {
					//console.log(result.data)
					this.temas = result.data[0];
				},
				error=> {
					console.error(error)
				}
			)
		},
    
    		getTemasOnlyNombreID(){///Funcion para mostrar los temas
			axios({method: 'GET', url: '/tema/showTemasOnlyNombreID'}).then(
				result=> {
					this.temasOnlyNombreID = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
 
		getTemasHijos(id){///Funcion para mostrar los temas
		  var i;
				for(var temas in this.temas){
					if(this.temas[temas].id_padre==id){
						this.temas_hijos.push(this.temas[temas]);
					}					
					//console.log(this.temas[0][temas].nombre_tema);
				}
				//console.log("Despues de obtener los padres");
				/*for(var temas in this.temas_hijos){
					console.log(this.temas_hijos[temas].nombre_tema);
				}*/
				
			
		},		
		guardarTema(nombre_tema,padre,textPosition){///Funcion para guardar los temas
			axios.post('/experto/tema/addTema',
			{nombre_tema: nombre_tema,id_padre:padre,textPosition:textPosition})
			.then((res)=>{
				this.padre=''
				this.getTemas()
		//		console.log(res)
          this.getTemasOnlyNombreID()
			})
				.catch((err)=>{
					console.log(err)
				})
		},
		
  
		
		editarTema(id_tema,id_padre,nombre_tema){///Funcion para editar los temas
			axios.post('/experto/tema/editarNodo',
			{id_nodo:id_tema, id_padre:id_padre,nombre_nodo:nombre_tema})
			.then((res)=>{
				this.padre=''
				this.nivel_tema=''
				this.getTemas()
				//console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
		},	
		btnEliminarTemaAndHijos: async function(id){
			this.deleteTemaAndHijos(id);
		},
		btnGuardar: async function(){
        this.getTemasOnlyNombreID()
				const { value: formValues } = await this.$swal({
					title: 'Registrar Tema',
					html:
						`<input id="nombre_tema" class="swal2-input" placeholder="Nombre">
						<br>
          <select id="padre" value="${
            this.temasOnlyNombreID
          }" name="temas" class="swal2-input">
           
            ${this.temasOnlyNombreID[0].map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
          </select>`,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
					cancelButtonText: 'Cancelar',
					preConfirm: () => {
						return [
							this.nombre_tema=document.getElementById('nombre_tema').value,
							this.padre=document.getElementById('padre').value
						]
					}})
					if(this.nombre_tema== "" ){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
								confirmButtonText: 'Acepter',
							})
					}
					else{
						this.guardarTema(this.nombre_tema,this.padre,0);//funcion guardarTema
          
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Tema Registrado!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
		btnEditar: async function(id,nombre,padre,id_padre){
        this.getTemasOnlyNombreID()
				const { value: formValues } = await this.$swal({
					title: 'Actualizar Tema',
					html:
						`<input id="nombre_tema" class="swal2-input" value="`+nombre+`">
						<br>
          <select id="padre" value="${
            this.temasOnlyNombreID
          }" name="temas" class="swal2-input">
          
            ${this.temasOnlyNombreID[0].map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
          </select>`,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
					preConfirm: () => {
						return [
							this.nombre_tema=document.getElementById('nombre_tema').value,
							this.padre=document.getElementById('padre').value
						]
					}})
					if(this.nombre_tema== ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
								confirmButtonText: 'Guardar',
							})
					}
					else{
						this.editarTema(id,this.padre,this.nombre_tema);//funcion guardarTema
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Tema Actualizado!'
						})
					}
				
				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
		btnAbueloAPadre: async function(id,id_padre){
					
					this.$swal.fire({
						title: '¿Esta Seguro que quiere eliminar este Tema?',
						text: "Se asignara el tema padre de este tema a padre de los hijos",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Aceptar',
						cancelButtonText: 'Cancelar'
					}).then((result) => {
						//console.log(result);
						if (result) {
							this.hacerPadreAlAbuelo(id,id_padre);
							this.$swal.fire(
								'Eliminado!',
								'El tema ha sido Eliminado.',
								'success'
							)
						}
					})					
		},
		btnVolverHijoPadre: async function(id,id_padre){
				this.getTemasHijos(id);
				const { value: formValues } = await this.$swal({
					title: 'Seleccione Nuevo Padre',
					html:
          `<select id="padre" value="${
            this.temas
          }" name="temas" class="swal2-input">
            ${this.temas.map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
          </select>`,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
					preConfirm: () => {
						return [
							this.padre=document.getElementById('padre').value
						]
					}})
					if(this.padre== ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
								confirmButtonText: 'Guardar',
							})
					}
					else{
						//this.HijoAPadre(id_padre,this.padre);//funcion cambiar hijo a padre
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Tema Actualizado!'
						})
					}
					var tam= this.temas_hijos.length;
					this.temas_hijos.splice(0,tam);
		}
		
		//Fin metodos
		}
}

</script>