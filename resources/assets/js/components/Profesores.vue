<template>

    <div class="">
				
    		<div class="col-lg-12">
			
				
				<!-- Breadcrumb -->
			<div class="col-12 mt-4">
				<div class="page-header">
					
					<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
						<h1 class="page-title"> Docentes </h1>
						<ul class="quick-links ml-auto">
						<li>
							<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> 								</span>  <span style="color: #bdb9bd"> Usuarios  <i class="fas fa-angle-right"></i> </span> Docentes
						</li>
						</ul>
				  </div>
				</div>
			</div>
				
				  
                <div class="card">
                  <div class="card-body">
                    
					  
					  
					<!--<div class="row" style="padding: 0 !important; margin: 0 !important; ">
						<div class="col-md-6" >
							<h3> Lista de docentes </h3>
						</div>
						<div class="col-md-6">	
							<button  type="button" class="btn btn-success float-right"  @click="btnGuardar">
								<i class="fas fa-user-plus"></i> Registrar docente
							</button>
						</div>	
					</div> -->
					
					 
					<div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
						<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
							<h2 class="page-title"> Lista de docentes </h2>
							
							<ul class="quick-links ml-auto">
								<li>
									<button  type="button" class="btn btn-primary float-right btn-lg" @click="btnGuardar">
										<i class="fas fa-user-plus"></i> Registrar docente
									</button>
								</li>
							</ul>
						</div>
					</div>
					  
                    
					  
					  
					  <label> <b> Busqueda por nombre:  </b> </label>
      				<input class="form-control mb-2" placeholder="Ej. Juan Pérez" v-model="filters.nombre.value"/>
					  
					<div class="table-responsive">
				  	<v-table 
						   :data="profesor" 
						   :filters="filters" 
						   :currentPage.sync="currentPage"
							:pageSize="5"
							@totalPagesChanged="totalPages = $event"
						   style="width:100%"
						   class="table mb-2">
					  
					<thead slot="head" class="thead-dark">
						<v-th sortKey="nombre" defaultSort="desc">Nombre</v-th>
						<v-th sortKey="apellido_paterno" defaultSort="desc">Apellido Paterno</v-th>
						<v-th sortKey="apellido_materno" defaultSort="desc">Apellido Materno</v-th>
						<v-th sortKey="matricula" defaultSort="desc">Matricula</v-th>
						<th>Opciones</th>
					</thead>
					<tbody slot="body" slot-scope="{displayData}">
						<tr v-for="profesor in displayData" :key="profesor.id">
						  <td>{{ profesor.nombre }}</td>
						  <td>{{ profesor.apellido_paterno }}</td>
						  <td>{{ profesor.apellido_materno }}</td>
						  <td> {{ profesor.matricula }} </td>
						  <td>
							  
							  <button  class="btn btn-warning" @click="btnEditar(profesor.id,profesor.nombre,profesor.apellido_paterno,profesor.apellido_materno,profesor.matricula)"> <i class="fas fa-pen"></i> </button>
													
							  
							  
							  
							 <button v-if="profesor.eliminado=='0'"  class="btn btn-danger" @click="eliminar(profesor.id, profesor.eliminado)"> 
								  Desactivar	
							  </button>
							  
							  <button v-else  class="btn btn-success" @click="eliminar(profesor.id, profesor.eliminado)"> 
								  Activar
							  </button>
							 
	
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
                </div>
              </div>
              
              </div>

</template>

<script>
import axios from 'axios'

export default{
	data(){
		return {
			profesor: [],
			id: '',
			nombre: '',
			  apellido_paterno:'',
			  apellido_materno:'',
			  apellidos:'',
			  matricula:'',
			  password:'',
			  id_rol: '',
			  variable: true,
			  filters: {
			    nombre: { value: '', keys: ['nombre'] }
			},
			currentPage: 1,
			totalPages: 0
		}
	},
	mounted(){
		this.getprofesor()
		
	},
	methods: {
		getprofesor(){
			axios({method: 'GET', url:'show/profesor'}).then(
				result=> {
					console.log(result.data)
					this.profesor = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
    
    	
    
    guardarProfesor(nombre,apellido_materno,apellido_paterno,matricula,password){///Funcion para guardar los usuarios
			axios.post('registrar',
			{nombre: nombre, nivel_academico:"",id_rol:3,apellido_materno:apellido_materno,apellido_paterno:apellido_paterno,password:password,matricula:matricula})
			.then((res)=>{
				this.nombre=''
				this.id_rol=''
        this.apellido_materno=''
        this.apellido_paterno=''
        this.matricula=''
        this.password=''
				this.getprofesor()
				//console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
		},
		btnGuardar: async function(){
				const { value: formValues } = await this.$swal({
					//title: 'Registrar Docente',
					showClass: {
						backdrop: 'swal2-noanimation', // disable backdrop animation
						popup: '',                     // disable popup animation
						icon: ''                       // disable icon animation
					},
					hideClass: {
						popup: '',                     // disable popup fade-out animation
					},
					
					html:
						`
			<h3 class="text-left"> Registrar docente </h3>
			<p class="text-left mt-0 mb-0"> Nombre: </p>
			<input id="nombre" type="text" class="swal2-input" placeholder="Juan">
			<p class="text-left mt-0 mb-0"> Apellido paterno: </p>
            <input id="apellido_paterno" type="text" class="swal2-input" placeholder="Martínez">
			<p class="text-left mt-0 mb-0"> Apellido materno: </p>
            <input id="apellido_materno" type="text" class="swal2-input" placeholder="Peréz">
			<p class="text-left mt-0 mb-0"> Matricula: </p>
            <input id="matricula" type="text" class="swal2-input" placeholder="1234567">
			<p class="text-left mt-0 mb-0"> Contraseña: </p>
            <input id="password" type="password" class="swal2-input" placeholder="Contraseña">
            `,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: '<i class="fas fa-save"></i> Guardar',
           confirmButtonColor: '#2196f3',
					cancelButtonColor: '#aaa',
					cancelButtonText: '<i class="fas fa-ban"></i> Cancelar',
					preConfirm: () => {
						return [
							this.apellido_paterno=document.getElementById('apellido_paterno').value,
							this.apellido_materno=document.getElementById('apellido_materno').value,
							this.nombre=document.getElementById('nombre').value,
              this.matricula=document.getElementById('matricula').value,
              this.password=document.getElementById('password').value
						]
					}})
					if(this.nombre== "" || this.apellido_materno == "" || this.apellido_paterno == "" || this.password == "" || this.matricula == ""){
							/*this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})*/
					}
					else{
						this.guardarProfesor(this.nombre,this.apellido_materno,this.apellido_paterno,this.matricula,this.password);//funcion guardarAdmin
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
            var matriculaRepetida = false;
            for(var i=0;i<this.profesor.length;i++){
              if(this.profesor[i].matricula === this.matricula){
                matriculaRepetida = true;
              }
            }
            if(matriculaRepetida==false){
              this.$swal.fire({
                type: 'success',
                title: '¡Profesor Registrado!'
              })
            }
            else{
              this.$swal.fire({
                type: 'success',
                title: 'Matricula repetida'
              })
            }
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
      
    btnEditar:async function(id,nombre,apellido_paterno,apellido_materno,matricula){
          const { value: formValues } = await this.$swal({
					showClass: {
						backdrop: 'swal2-noanimation',
						popup: '',
						icon: ''
					},
					hideClass: {
						popup: ''
					},
					html:
						`
            <h3 class="text-left"> Actualizar docente </h3>
			      <p class="text-left mt-0 mb-0"> Nombre: </p>
            <input id="nombre" type="text" class="swal2-input" placeholder="Nombre" value="`+nombre+`">
            <p class="text-left mt-0 mb-0"> Apellido paterno: </p>
            <input id="apellido_paterno" type="text" class="swal2-input" placeholder="Apellido Paterno" value="`+apellido_paterno+`">
             <p class="text-left mt-0 mb-0"> Apellido materno: </p>
            <input id="apellido_materno" type="text" class="swal2-input" placeholder="Apellido Materno" value="`+apellido_materno+`">
            <p class="text-left mt-0 mb-0"> Correo: </p>  
            <input id="matricula" type="text" class="swal2-input" placeholder="Matricula" value="`+matricula+`">
            <p class="text-left mt-0 mb-0"> Contraseña <span style="color:red">*</span> : </p>
            <input id="password" type="text" class="swal2-input" placeholder="Contraseña" value="secret">
						
            <p class="text-left mt-0 mb-0" style="font-size: 12px;"> <span style="color:red">*</span> Deje en blanco si no desea actualizar </p>

            `,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: '<i class="fas fa-save"></i> Guardar',
           confirmButtonColor: '#2196f3',
					cancelButtonColor: '#aaa',
					cancelButtonText: '<i class="fas fa-ban"></i> Cancelar',
					preConfirm: () => {
						return [
							this.apellido_paterno=document.getElementById('apellido_paterno').value,
							this.apellido_materno=document.getElementById('apellido_materno').value,
							this.nombre=document.getElementById('nombre').value,
              this.matricula=document.getElementById('matricula').value,
              this.password=document.getElementById('password').value,
              this.id = id
						]
					}})
					if(this.nombre== "" || this.apellido_materno == "" || this.apellido_paterno == "" || this.matricula == ""){
							/*this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})*/
					}
					else{
						this.editar(this.id,this.nombre,this.apellido_materno,this.apellido_paterno,this.matricula,this.password);//funcion guardarAdmin
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Profesor Editado!'
						})
    }
    },
    
    
    
    editar(id,nombre,apellido_materno,apellido_paterno,matricula,password){
  	axios.post('user/actualizar',
			{id:id,nombre: nombre, nivel_academico:"",id_rol:3,apellido_materno:apellido_materno,apellido_paterno:apellido_paterno,password:password,matricula:matricula})
			.then((res)=>{
				this.nombre=''
				this.id_rol=''
        this.apellido_materno=''
        this.apellido_paterno=''
        this.matricula=''
        this.password=''
        this.id = ''
				this.getprofesor()
				//console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
    },
      
      
      
    /*eliminar(id){  
      	axios.post('user/delete3',{id:id}).then((res)=>{
				
        this.id = ''
				this.getprofesor()
				//console.log(res)
        const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Profesor Eliminado!'
						})
			})
				.catch((err)=>{
					console.log(err)
				})
    
    }*/
		
	
	eliminar(id, estado){ 
		
		if(estado == null){
		   estado = 0;
		}
		
		console.log("Id " + id + " Estado " + estado);
		this.$swal.fire({
		  title: '¿Estas seguro de realizar esta acción?',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Aceptar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			
		  if (result.value) {
			  
			axios.post('user/delete3',{id:id, estado:estado}).then((res)=>{
				
				this.id = ''
				this.getprofesor()
				const Toast = this.$swal.mixin({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 3000
				});
				this.$swal.fire({
					type: 'success',
					title: '¡Tarea realizada con exito!'
				})
			})
			.catch((err)=>{
				console.log(err)

			})
			
			  
		  }
		})
    
    }
    
    
    
    
    
	}
}
</script>