
<template>

            <div class="">
				<div class="col-12 mt-4">
					<div class="page-header">
						
						<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
							<h1 class="page-title"> Preguntas verdadero/falso </h1>
							<ul class="quick-links ml-auto">
							<li>
								<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> 								</span>  <span style="color: #bdb9bd">  Preguntas  <i class="fas fa-angle-right"></i> </span> Preguntas verdadero/falso
							</li>
							</ul>
					  </div>
					</div>
				</div>
				
				
              <div class="col-lg-12 ">
                <div class="card">
                  <div class="card-body">
					  
					  <div class="row" style="padding: 0 !important; margin: 0 !important; ">
						<div class="col-md-6">
							<h3> Lista de preguntas verdadero/falso </h3>
						</div>
						<div class="col-md-6">
							
							
							<button
                 			 type="button"
                			  class="btn btn-success btn-fw float-right"
                			  @click="btnGuardar"> 
								<i class="fas fa-plus-circle"></i> Registrar pregunta 									</button>
							
						</div>	
					</div>
					  
					  
                    <div class="table-responsive">
					
					<label>Busqueda por pregunta: </label>
      				<input type="search" class="form-control mb-2" v-model="filters.pregunta.value"/>
					  
					<div class="table-responsive">
						
				  	<v-table 
						   :data="pregunta" 
						   :filters="filters" 
						   :currentPage.sync="currentPage"
							:pageSize="5"
							@totalPagesChanged="totalPages = $event"
						   style="width:100%"
						   class="table mb-2">
					  
					<thead slot="head" class="thead-dark">
						
						<!--<v-th sortKey="tipo" defaultSort="desc">Tipo</v-th>-->
						<v-th sortKey="pregunta" defaultSort="desc">Pregunta</v-th>
						<v-th sortKey="tema" defaultSort="desc">Tema</v-th>
						<v-th sortKey="opcion" defaultSort="desc">Respuesta</v-th>
						<th>Opciones(respuestas)</th>
						<th>Opciones</th>
					</thead>
					<tbody slot="body" slot-scope="{displayData}">
						<tr v-for="pregunta in displayData" :key="pregunta.id">
							
						  <!--<td class="text-left">{{-- pregunta.tipo --}}</td>-->
							  <td class="text-left">{{pregunta.pregunta}}</td>
							  <td class="text-left">{{pregunta.tema}}</td>
							  <td class="text-left">{{pregunta.respuesta}}</td>
							  <td>
							<tr> <span class="badge badge-success"> {{pregunta.opcion}} </span></tr></td>
							<td class="text-right">
								<button class="btn btn-warning" @click="btnEditar(pregunta.id_pregunta,pregunta.pregunta,pregunta.respuesta,pregunta.tipo,pregunta.opcion,pregunta.opcion2,pregunta.opcion3,pregunta.opcion4,pregunta.id_tema)"> <i class="fas fa-pen"></i> </button>
								<button  class="btn btn-danger" @click="eliminar(pregunta.id_pregunta)"> <i class="fas fa-trash"></i> </button>
							</td>
							
							
						</tr>
					</tbody>
				  </v-table>
						
					</div>
					
					  <smart-pagination
						:currentPage.sync="currentPage"
						:totalPages="totalPages"
					  />
					
					
                
								</div>
					  
					  
					  
					  
                     <!--<form class="ml-auto search-form d-none d-md-block" action="#">
                      <div class="form-group">
                        <input type="search" class="form-control" placeholder="Buscar">
                      </div>
                    </form>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                        <th>Tipo de pregunta</th>
                          <th>Pregunta</th>
                          <th>Tema</th>
                          <th>Respuesta</th>
                          <th>Opciones(respuestas)</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>
                      <tbody>
						<tr v-for="(pregunta, preg) in pregunta" v-bind:key="pregunta.id">
							  <td class="text-left">{{-- pregunta.tipo --}}</td>
							  <td class="text-left">{{-- pregunta.pregunta --}}</td>
							  <td class="text-left">{{-- pregunta.tema --}}</td>
							  <td class="text-left">{{-- pregunta.respuesta --}}</td>
							  <td>
							<tr>A) {{-- pregunta.opcion --}}</tr></td>
							<td class="text-right">
								<button class="btn btn-info" @click="btnEditar(pregunta.id_pregunta,pregunta.pregunta,pregunta.respuesta,pregunta.tipo,pregunta.opcion,pregunta.opcion2,pregunta.opcion3,pregunta.opcion4,pregunta.id_tema)">Editar</button>
								<button  class="btn btn-danger" @click="eliminar(pregunta.id_pregunta)">Eliminar</button>
							</td>
						</tr>
                      </tbody>
                    </table>-->
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
			pregunta: [],
			id: '',
			id_tema:'',
      opcion:'',
      opcion2:'',
      opcion3:'',
      opcion4:'',
      respuesta:'',
      tipo:'',
		filters: {
		  pregunta: { value: '', keys: ['pregunta', 'tema'] }
		},
		currentPage: 1,
		totalPages: 0,
      temasSeleccionado: {},
			temas: [],
			id: '',
			nombre_tema: '',
			nivel: '',
		}
	},
	mounted(){
		this.getpregunta(),
		this.getTemas()
		/*let uri = window.location.href.split('?');
	  var fil = uri[1].split('=')[1];
	  this.filters.pregunta.value = fil.replace(/%20/g, " ");*/
		
		let uri = window.location.href;
	  
	  if( uri.includes("?") ){
		  uri = window.location.href.split('?');
		var fil = uri[1].split('=')[1];
		this.filters.pregunta.value = fil.replace(/%20/g, " ");
	  
	  }
		
	},
	methods: {
		getpregunta(){
			axios({method: 'GET', url: '/pregunta/show'}).then(
				result=> {
					//console.log(result.data)
					this.pregunta = result.data[0];
				},
				error=> {
					console.error(error)
				}
			)
		},
    
    	getTemas(){///Funcion para mostrar los temas
			axios({method: 'GET', url: '/tema/all'}).then(
				result=> {
					//console.log(result.data)
					this.temas = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
		
		guardarPregunta(pregunta,respuesta,tipo,id_tema){///Funcion para guardar los temas
			axios.post('/pregunta/add',
			{pregunta:pregunta,respuesta:respuesta,tipo:tipo,id_tema:id_tema})
			.then((res)=>{
					
				this.tipo=''
        this.respuesta=''
        this.pregunta=''
        this.id_tema=''
				this.getpregunta()
        
				//console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
		},
		
		
		btnGuardar: async function(){
				const { value: formValues } = await this.$swal({
					title: 'Registrar Pregunta',
					html:
					`
					<br>
          <!-- <label for="tipo">Elije un tipo de pregunta:</label>

          <select id="tipo">
            <option value="3">True o false</option>
          </select> -->
					
					<input id="pregunta" class="swal2-input" placeholder="Ingresa la pregunta">
    			<select id="respuesta">
            <option value="verdadero">Verdadero</option>
						<option value="falso">Falso</option>
          </select>
						<br>
          <label for="id_tema_2">Elije a que tema es correspondiente:</label>
          <select id="id_tema" value="${
            this.temas
          }" name="temas" class="swal2-input">
            <option value="">Tema</option>
            ${this.temas[0].map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
          </select>

         `,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButtonColor: '#3085d6',
					cancelButtonText: 'Cancelar',
					preConfirm: () => {
						return [
							this.pregunta=document.getElementById('pregunta').value,
							this.respuesta=document.getElementById('respuesta').value,
							this.tipo=3,
							this.id_tema=document.getElementById('id_tema').value,
						];
					}
				});
					if(
						this.id_tema == "" ||
						this.pregunta == "" ||
						this.respuesta == "" ||
					  this.tipo== ""	
					) {
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.guardarPregunta(
							this.pregunta,
							this.respuesta,
							this.tipo,
							this.id_tema);//funcion guardarTema
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Pregunta Registrada!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
    
    
    btnEditar:async function(id,pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema){
        var esVerdadero ="", esFalso="";
        //console.log(respuesta+"=====");
        if(respuesta==true)
          esVerdadero = "selected";
        else
          esFalso = "selected";
      
        const { value: formValues } = await this.$swal({
					title: 'Editar Pregunta',
					html:
						`<input id="pregunta" class="swal2-input" value="`+pregunta+`">
						<!--input type= radio id="respuesta" class="swal2-input" value="`+respuesta+`"-->
            <select>
              <option value="true" `+esVerdadero+` >Verdadero</option>
              <option value="false" `+esFalso+` >Falso</option>
            </select>
						<br>
          <label for="id_tema5">Elije a que tema es correspondiente:</label>
          <select id="id_tema" value="${
            this.temas
          }" name="temas" class="swal2-input">
            <option value="`+id_tema+`">Tema</option>
            ${this.temas[0].map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
          </select>
          	<br>
          <label for="tipo">Elije un tipo de pregunta:</label>
          <select id="tipo">       
            <option value="true o false">True o false</option>
          </select>
          
          


         `,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
			cancelButtonText: 'Cancelar',
					preConfirm: () => {
						return [
							this.pregunta=document.getElementById('pregunta').value,
							this.respuesta=document.getElementById('respuesta').value,
							this.tipo=document.getElementById('tipo').value,
							this.id_tema=document.getElementById('id_tema').value
						]
					}})
					if(
						this.id_tema == "" ||
						this.pregunta == "" || 
						this.respuesta == "" ||
						this.tipo== ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.editar(
							id,
							this.pregunta,
							this.respuesta,
							this.tipo,
							this.id_tema);//funcion guardarTema
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Pregunta Editada!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
    },
    
    
    
    editar(id,pregunta,respuesta,tipo,id_tema){
  	axios.post('/pregunta/update',
			{id:id,pregunta:pregunta,respuesta:respuesta,tipo:tipo,id_tema:id_tema})
			.then((res)=>{
			
        this.id = ''
				this.tipo=''
        this.respuesta=''
        this.pregunta=''
        this.id_tema=''
			
				this.getpregunta()
				//console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
    },
      
      
      
    eliminar(id){  
      
		  
		  this.$swal.fire({
			  title: '¿Estas seguro de eliminar el registro?',
			  text: "Esto no podrá revertirse",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Aceptar',
			  cancelButtonText: 'Cancelar',
			}).then((result) => {
				
			  if (result.value) {
				
				////
				
				axios.post('pregunta/delete',{id:id}).then((res)=>{
		
					this.id = ''
					this.getpregunta()
					//console.log(res)
		  
					  
					const Toast = this.$swal.mixin({
						toast: true,
						position: 'top-end',
						showConfirmButton: false,
						timer: 3000
					});
					this.$swal.fire({
						type: 'success',
						title: '¡Pregunta Eliminada!'
					})
				})
				.catch((err)=>{
					this.$swal({
						type: 'info',
						title: 'Error al eliminar',
					})
				})



				////
			  }
			})
		  
		  
		  
			/*const Toast = this.$swal.mixin({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 3000
			});
				this.$swal.fire({
					type: 'success',
					title: '¡Pregunta Eliminada!'
				})
			})
			.catch((err)=>{
				this.$swal({
					type: 'info',
					title: 'Error al eliminar',
				})
			})*/
    
    }    
	}
}
</script>