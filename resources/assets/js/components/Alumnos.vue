<template>

            <div class="">
              <div class="col-lg-12">
				  
				  <!-- Breadcrumb -->
				<div class="col-12 mt-4">
					<div class="page-header">
						
						<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
							<h1 class="page-title">  Alumnos  </h1>
							<ul class="quick-links ml-auto">
							<li>
								<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> 								</span>  <span style="color: #bdb9bd"> Usuarios  <i class="fas fa-angle-right"></i> </span> Alumnos
							</li>
							</ul>
					  </div>
					</div>
				</div>
				  
				  
                <div class="card">
                  <div class="card-body">
                    <!--<h1>
                 		Alumnos Registrados
                    </h1> 
					<button  type="button" class="btn btn-success btn-fw" @click="btnGuardar">
						<i class="fas fa-user-plus"></i> Registrar Alumno
					</button>-->
                    
					  
					<!-- <div class="row" style="padding: 0 !important; margin: 0 !important; ">
						<div class="col-md-6">
							<h3> Lista de Alumnos </h3>
						</div>
						<div class="col-md-6">
							<button  type="button" class="btn btn-primary float-right btn-lg" @click="btnGuardar">
								<i class="fas fa-user-plus"></i> Registrar Alumno
							</button>
						</div>	
					</div> -->
					  
					  
					
					<div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
						<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
							<h2 class="page-title"> Lista de alumnos </h2>
							
							<ul class="quick-links ml-auto">
								<li>
									<button  type="button" class="btn btn-primary float-right btn-lg" @click="btnGuardar">
										<i class="fas fa-user-plus"></i> Registrar alumno
									</button>
								</li>
							</ul>
						</div>
					</div>
					  
					 <!-- <label>Busqueda por nombre: </label> -->

					<label> <b> Busqueda por nombre: </b> </label>
					<input class="form-control mb-2" placeholder="Ej. Juan Pérez" v-model="filters.nombre.value"/>
					  
					<div class="table-responsive">
						
				  	<v-table 
						   :data="alumnos" 
						   :filters="filters" 
						   :currentPage.sync="currentPage"
							:pageSize="5"
							@totalPagesChanged="totalPages = $event"
						   style="width:100%"
						   class="table mb-2">
					  
					<thead slot="head" class="thead-dark">
						<v-th sortKey="nombre_alumno" defaultSort="desc">Nombre</v-th>
						<v-th sortKey="apellido_paterno" defaultSort="desc">Apellido</v-th>
						<v-th sortKey="matricula" defaultSort="desc">Matricula</v-th>
						<v-th sortKey="nivel_academico" defaultSort="desc">Nivel academico</v-th>
						<th>Profesor</th>
						<th>Opciones</th>
					</thead>
					<tbody slot="body" slot-scope="{displayData}">
						<tr v-for="alumnos in displayData" :key="alumnos.id">
							
						 <td class="text-left">{{alumnos.nombre_alumno}}</td>
                        <td class="text-left">{{alumnos.apellido_paterno}}<tr>{{alumnos.apellido_materno}}</tr></td>
                    
                        <td class="text-left">{{alumnos.matricula}}</td>
                        <td class="text-left">{{alumnos.nivel_academico}}</td>  
                        <td class="text-left">{{alumnos.nombre_profesor + ' ' + alumnos.apellido_profesor }}</td>
							
							
						  <td>
							  
							 <button  class="btn btn-warning" @click="btnEditar(alumnos.id_alumnos,alumnos.nombre_alumno,alumnos.apellido_paterno,alumnos.apellido_materno,alumnos.matricula,alumnos.nivel_academico,alumnos.id_profesor)"> <i class="fas fa-pen"></i> </button>
													
							  
							  <button v-if="alumnos.eliminado=='0'"  class="btn btn-danger" @click="eliminar(alumnos.id_alumnos, alumnos.eliminado)"> 
								  Desactivar	
							  </button>
							  
							  <button v-else  class="btn btn-success" @click="eliminar(alumnos.id_alumnos, alumnos.eliminado)"> 
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
			alumnos: [],
			id: '',
			nombre_alumno: '',
			apellido_paterno:'',
			apellido_materno:'',
			apellidos:'',
			nivel_academico:'',
			id_profesor:'',
			matricula:'',
			password:'',
			id_rol: '',
			filters: {
			  nombre: { value: '', keys: ['nombre_alumno'] }
			},
			currentPage: 1,
			totalPages: 0
		}
		
	},
	
	mounted(){
		this.getAlumnos()
		this.getprofesor()
	},
	methods: {
		getAlumnos(){
			axios({method: 'GET', url: '/alumno/show'}).then(
				result=> {
					console.log(result.data)
					this.alumnos = result.data[0]
				},
				error=> {
					console.error(error)
				}
			)
		},
    
    	getprofesor(){
			axios({method: 'GET', url: '/show/profesor'}).then(
				result=> {
					//console.log(result.data)
					this.profesor = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
    



    
    guardarAlumno(nombre,apellido_paterno,apellido_materno,matricula,password,nivel_academico,id_profesor,id_rol){///Funcion para guardar los usuarios
			axios.post('/alumno/add',
			{nombre: nombre,
			apellido_paterno:apellido_paterno, 
			apellido_materno:apellido_materno,
			matricula:matricula,
			password:password,
			nivel_academico:nivel_academico,
			id_profesor:id_profesor,
			id_rol:id_rol})
			.then((res)=>{
				this.nombre=''
        this.apellido_materno=''
        this.apellido_paterno=''
        this.matricula=''
        this.password=''
        this.id_profesor=''
        this.id_rol = ''
        this.nivel_academico=''
				this.getAlumnos()
				//console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
		},
		btnGuardar: async function(){
				const { value: formValues } = await this.$swal({
					//title: 'Registrar Alumno',
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
			<h3 class="text-left"> Registrar alumno </h3>
			<p class="text-left mt-0 mb-0"> Nombre: </p>
			<input id="nombre" type="text" class="swal2-input" placeholder="Juan">
			<p class="text-left mt-0 mb-0"> Apellido paterno: </p>
            <input id="apellido_paterno" type="text" class="swal2-input" placeholder="Martínez">
			<p class="text-left mt-0 mb-0"> Apellido materno: </p>
            <input id="apellido_materno" type="text" class="swal2-input" placeholder="Peréz">
			<p class="text-left mt-0 mb-0"> Matricula: </p>
            <input id="matricula" type="text" class="swal2-input" placeholder="1234567">
			<p class="text-left mt-0 mb-0"> Contrseña: </p>
            <input id="password" type="password" class="swal2-input" placeholder="Contraseña">
			<p class="text-left mt-0 mb-0"> Nivel academico: </p>
            <input id="nivel_academico" type="text" class="swal2-input" placeholder="Nivel academico">
			
			<p class="text-left mt-0 mb-0"> Profesor:</p>
          <select id="id_profesor" value="${
            this.profesor
          }" name="profesor" class="form-control">
            ${this.profesor.map(
              cat => `<option value="${cat.id}">${cat.nombre}</option>`
            )}
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
							this.nombre=document.getElementById('nombre').value,
							this.apellido_paterno=document.getElementById('apellido_paterno').value,
							this.apellido_materno=document.getElementById('apellido_materno').value,
							this.matricula=document.getElementById('matricula').value,
							this.password=document.getElementById('password').value,
							this.nivel_academico = document.getElementById('nivel_academico').value, 
							this.id_profesor = document.getElementById('id_profesor').value
						]
					}})
					if(this.nombre== "" || this.apellido_materno == "" || this.apellido_paterno == "" || this.password == "" || this.matricula == "" || this.id_profesor == "" || this.nivel_academico == ""){
							/*this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})*/
					}
					else{
						this.guardarAlumno(this.nombre,this.apellido_paterno,this.apellido_materno,this.matricula,this.password,this.nivel_academico,this.id_profesor,4);//funcion guardarAdmin
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Alumno Registrado!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
     btnEditar:async function(id,nombre_alumno,apellido_paterno,apellido_materno,matricula,nivel_academico,idProfesor){
         	const { value: formValues } = await this.$swal({
					//title: 'Editar Alumno',
					showClass: {
						backdrop: 'swal2-noanimation', // disable backdrop animation
						popup: '',                     // disable popup animation
						icon: ''                       // disable icon animation
					},
					hideClass: {
						popup: '',                     // disable popup fade-out animation
					},
					html:
						`<h3 class="text-left"> Editar alumno </h3>
						<p class="text-left mt-0 mb-0"> Nombre: </p>
						<input id="nombre" type="text" class="swal2-input" placeholder="Nombre" value="`+nombre_alumno+`">
						<p class="text-left mt-0 mb-0"> Apellido paterno: </p>
						<input id="apellido_paterno" type="text" class="swal2-input" placeholder="Apellido Paterno" value="`+apellido_paterno+`">
						<p class="text-left mt-0 mb-0"> Apellido materno: </p>
						<input id="apellido_materno" type="text" class="swal2-input" placeholder="Apellido Materno" value="`+apellido_materno+`">
						<p class="text-left mt-0 mb-0"> Matricula: </p>
						<input id="matricula" type="text" class="swal2-input" placeholder="Matricula" value="`+matricula+`">
						<p class="text-left mt-0 mb-0"> Contrseña: </p>
						<input id="password" type="password" class="swal2-input" placeholder="Contraseña" value="secret">
						<p class="text-left mt-0 mb-0"> Nivel academico: </p>
						<input id="nivel_academico" type="text" class="swal2-input" placeholder="Nivel academico" value="`+nivel_academico+`" >
						<p class="text-left mt-0 mb-0"> Profesor: </p>
						<select id="id_profesor" value="${
							this.profesor
						}" name="profesor" class="form-control">
							${this.profesor.map(
							cat => `<option value="${cat.id}">${cat.nombre}</option>`
							)}
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
							this.apellido_paterno=document.getElementById('apellido_paterno').value,
							this.apellido_materno=document.getElementById('apellido_materno').value,
							this.nombre=document.getElementById('nombre').value,
							this.matricula=document.getElementById('matricula').value,
							this.password=document.getElementById('password').value,
							this.nivel_academico = document.getElementById('nivel_academico').value, 
							this.id_profesor = document.getElementById('id_profesor').value,
							this.id=id
             
						]
					}})
					if(this.nombre== "" || this.apellido_materno == "" || this.apellido_paterno == "" || this.password == "" || this.matricula == "" || this.id_profesor == "" || this.nivel_academico == ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.editar(this.id,this.nombre,this.apellido_paterno,this.apellido_materno,this.password,this.matricula,this.nivel_academico,this.id_profesor);//funcion guardarAdmin
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Alumno editado!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}		
    },
    
    
    
    editar(id,nombre,apellido_paterno,apellido_materno,password,matricula,nivel_academico,id_profesor){
  	axios.post('/administrador/alumno/actualizar',
			{id:id,nombre:nombre,apellido_paterno:apellido_paterno,apellido_materno:apellido_materno,password:password,matricula:matricula,nivel_academico:nivel_academico,id_profesor:id_profesor})
			.then((res)=>{
				this.nombre=''
		    this.nivel_academico = ''
        this.apellido_materno=''
        this.apellido_paterno=''
        this.matricula=''
        this.password=''
        this.id = ''
        this.id_profesor = ''
      
				this.getAlumnos()
				//console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
    },
      
      
      
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
			  
			axios.post('user/delete2',{id:id, estado:estado}).then((res)=>{
				
				this.id = ''
				this.getAlumnos()
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
		
		
      		/*axios.post('user/delete2',{id:id}).then((res)=>{
				this.id = ''
				this.getAlumnos()
				const Toast = this.$swal.mixin({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 3000
				});
				this.$swal.fire({
					type: 'success',
					title: '¡Alumno Eliminado!'
				})
			})
			.catch((err)=>{
				console.log(err)

			})*/
    
    }
    
    
    
    
    
    
	}
}
</script>