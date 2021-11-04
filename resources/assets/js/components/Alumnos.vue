<template>

            <div class="content-wrapper">
              <div class="col-lg-12">
				  
				  <!-- Breadcrumb -->
				<div class="col-12 mt-4">
					<div class="page-header">
						
						<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
							<h1 class="page-title">  Alumnos  </h1>
							<ul class="quick-links ml-auto">
							<li>
								<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> 								
								</span>  <span style="color: #bdb9bd"> Usuarios  
								<i class="fas fa-angle-right"></i> </span> Alumnos
							</li>
							</ul>
					  </div>
					</div>
				</div>
				  
				  
                <div class="card" style="border-radius: 15px;">
                  <div class="card-body">
					  
					  
					
					<div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
						<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
							<h2 class="page-title"> Lista de alumnos </h2>
							
							<ul class="quick-links ml-auto">
								<li>
									<button  type="button" class="btn btn-primary float-right btn-lg" @click="btnGuardar" style="border-radius: 25px;">
										<i class="fas fa-user-plus"></i> Nuevo
									</button>
								</li>
							</ul>
						</div>
					</div>
					  
					 <!-- <label>Busqueda por nombre: </label> -->
					
					<div class="page-header " style="border: 1px solid #dee2e6; margin: 0px; background: #f5f5f5;">
						<div class="col-6" style="padding: 5px;">
							<b> Termino de busqueda: </b>
							<input class="form-control" type="search" placeholder="Ej. Juan Antonio" v-model="filters.nombre.value" style="border-radius: 10px; height: 37px; margin: 0px;" />
						</div>
						<div class="col-6" style="padding: 5px;">
							<b>Campo de busqueda: </b>
							<select name="campoBusqueda" id="campoBusqueda" style="border-radius: 10px; margin: 0px;" @change="cambiarCampoDeBusqueda">
								<option value="nombre_alumno">Nombre</option>
								<option value="apellido_paterno">Apellido</option>
								<option value="matricula">Matricula</option>
								<option value="nivel_academico">Nivel academico</option>
								<option value="nombre_profesor">Profesor</option>
							</select>
						</div>
				  </div>
										
				  
					<div class="table-responsive">
						
				  	<v-table 
						   :data="alumnos" 
						   :filters="filters" 
						   :currentPage.sync="currentPage"
							:pageSize="5"
							@totalPagesChanged="totalPages = $event"
						   style="width:100%"
						   class="table table-hover">
					  
					<thead slot="head" >
						
						
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
							  
							 <a @click="btnEditar(alumnos.id_alumnos,alumnos.nombre_alumno,alumnos.apellido_paterno,alumnos.apellido_materno,alumnos.matricula,alumnos.nivel_academico,alumnos.id_profesor)"> <i class="fas fa-pen" style="color: #ffae00;"></i>  </a>
													
							  |
								
							  <a v-if="alumnos.eliminado=='0'"   @click="eliminar(alumnos.id_alumnos, alumnos.eliminado)"> 
								 <i class="fas fa-user-lock" style="color: #ff6258;"></i> 	
							  </a>
							  
							  <a v-else   @click="eliminar(alumnos.id_alumnos, alumnos.eliminado)"> 
								 <i class="fas fa-unlock" style="color: green;"></i> 
							  </a>
							  
							  
							  
											
	
						  </td>
							
							
						</tr>
						
						<tr>
							<td> <b> <p> Mostrando {{displayData.length}} de {{ alumnos.length }} registros </p> </b> </td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							
							
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
		cambiarCampoDeBusqueda(){
			let x = document.getElementById("campoBusqueda").value;
			this.filters.nombre.keys[0] = x;
			//console.log(this.filters.);
			
		},
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
			})
				.catch((err)=>{
					console.log(err)
				})
		},
		btnGuardar: async function(){
				const valores = await this.$swal({
					/*showClass: {
						backdrop: 'swal2-noanimation', // disable backdrop animation
						popup: '',                     // disable popup animation
						icon: ''                       // disable icon animation
					},
					hideClass: {
						popup: '',                     // disable popup fade-out animation
					},*/
					
					html:
					`
			    <h3 class="text-left"> Registrar alumno </h3>
			    <p class="text-left mt-0 mb-0"> Nombre<span style="color:red">*</span>:  </p>
			    <input id="nombre" type="text" class="swal2-input" placeholder="Juan">
			    <p class="text-left mt-0 mb-0"> Apellido paterno<span style="color:red">*</span>:  </p>
          <input id="apellido_paterno" type="text" class="swal2-input" placeholder="Martínez">
			    <p class="text-left mt-0 mb-0"> Apellido materno: </p>
          <input id="apellido_materno" type="text" class="swal2-input" placeholder="Peréz">
			    <p class="text-left mt-0 mb-0"> Matricula<span style="color:red">*</span>:  </p>
          <input id="matricula" type="text" class="swal2-input" placeholder="1234567">
			    <p class="text-left mt-0 mb-0"> Contrseña<span style="color:red">*</span>:  </p>
          <input id="password" type="password" class="swal2-input" placeholder="Contraseña">

			    <p class="text-left mt-0 mb-0"> Nivel academico<span style="color:red">*</span>:  </p>
          <input id="nivel_academico" type="text" class="swal2-input" placeholder="Nivel academico">
			
			    <p class="text-left mt-0 mb-0"> Profesor:</p>
          <select id="id_profesor" value="${
            this.profesor
          }" name="profesor" class="form-control">
            ${this.profesor.map(
              cat => `<option value="${cat.id}">${cat.nombre}</option>`
            )}
          </select>


            <div id="div_error_matricula" style="display: none;" class="alert alert-danger" role="alert">
               <span class="text-left" id="msjError">  </span>
             </div>
             <p class="text-left mt-0 mb-0" style="font-size: 12px;"> <span style="color:red">*</span> Datos obligatorios </p>

            `,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: '<i class="fas fa-save"></i> Guardar',
					confirmButtonColor: '#2196f3',
            cancelButtonColor: '#aaa',
					cancelButtonText: '<i class="fas fa-ban"></i> Cerrar',
            allowOutsideClick: false,
            allowEscapeKey: false,
					preConfirm: async () => {
              let error = 0;

            
              this.nombre=document.getElementById('nombre').value;
							this.apellido_paterno=document.getElementById('apellido_paterno').value;
							this.apellido_materno=document.getElementById('apellido_materno').value;
							this.matricula=document.getElementById('matricula').value;
							this.password=document.getElementById('password').value;
							this.nivel_academico = document.getElementById('nivel_academico').value;
							this.id_profesor = document.getElementById('id_profesor').value;
              
              let mensajeError = document.getElementById('msjError');
              
              if( this.nombre== "" ||  this.apellido_paterno == "" ||  this.password == "" || this.matricula == "" || this.nivel_academico == "" || this.id_profesor == "" ){
                error = 2;
              }else{
                  await axios.post('/verificarExistencia',
                  {correo:this.matricula})
                  .then((res)=>{
                      if(res.data[0].length !== 0){
                        error = 1;
                      }
                  })
                  .catch((err)=>{
                    console.log(err)
                  })
              }
              
              if(error === 1){
                mensajeError.innerHTML = "La matricula ya esta siendo usada, por favor elija otra";
                document.getElementById('msjError').innerHTML = "El correo está en uso";
                document.getElementById('div_error_matricula').style.display = "block";
                return false;
              }else if(error === 2) {
                mensajeError.innerHTML = "Por favor complete todos los campos requeridos";
                document.getElementById('div_error_matricula').style.display = "block";
                return false;
              }else{
                return [
                  this.nombre,
                  this.apellido_paterno,
                  this.apellido_materno,
                  this.matricula,
                  this.password,
                  this.nivel_academico,
                  this.id_profesor,
                  error
                ]
              }
            
            
					}})
        
            if( valores.hasOwnProperty('value') ){
              this.guardarAlumno(this.nombre,this.apellido_paterno,this.apellido_materno,this.matricula,this.password,this.nivel_academico,this.id_profesor,4);
              this.$swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Información almacenada con éxito',
                  showConfirmButton: false,
                  timer: 1500,
                  toast: true
              })
              this.apellido_paterno="";
              this.apellido_materno="";
              this.nombre="";
              this.matricula="";
              this.password="";
              this.id_profesor = "";
              this.nivel_academico = "";
            }
      		
		},
     btnEditar:async function(id,nombre_alumno,apellido_paterno,apellido_materno,matricula,nivel_academico,idProfesor){
         	const valores = await this.$swal({
					/*showClass: {
						backdrop: 'swal2-noanimation',
						popup: '',
						icon: ''
					},
					hideClass: {
						popup: '',
					},*/
            confirmButtonText: '<i class="fa fa-thumbs-o-up"></i> Text',
					html:
						`<h3 class="text-left"> Actualizar alumno </h3>
						<p class="text-left mt-0 mb-0"> Nombre<span style="color:red">*</span>: </p>
						<input id="nombre" type="text" class="swal2-input" placeholder="Nombre" value="`+nombre_alumno+`">
						<p class="text-left mt-0 mb-0"> Apellido paterno<span style="color:red">*</span>: </p>
						<input id="apellido_paterno" type="text" class="swal2-input" placeholder="Apellido Paterno" value="`+apellido_paterno+`">
						<p class="text-left mt-0 mb-0"> Apellido materno: </p>
						<input id="apellido_materno" type="text" class="swal2-input" placeholder="Apellido Materno" value="`+apellido_materno+`">
						<p class="text-left mt-0 mb-0"> Matricula<span style="color:red">*</span>: </p>
						<input id="matricula" type="text" class="swal2-input" placeholder="Matricula" value="`+matricula+`">
						<p class="text-left mt-0 mb-0"> Contrseña<span style="color:red">*</span>: </p>
						<input id="password" type="password" class="swal2-input" placeholder="Contraseña" value="secret">
						<p class="text-left mt-0 mb-0"> Nivel academico<span style="color:red">*</span>: </p>
						<input id="nivel_academico" type="text" class="swal2-input" placeholder="Nivel academico" value="`+nivel_academico+`" >
						<p class="text-left mt-0 mb-0"> Profesor<span style="color:red">*</span>: </p>
						<select id="id_profesor" value="${
							this.profesor
						}" name="profesor" class="form-control">
							${this.profesor.map(
							cat => `<option value="${cat.id}">${cat.nombre}</option>`
							)}
						</select>

            <div id="div_error_matricula" style="display: none;" class="alert alert-danger" role="alert">
              <span class="text-left" id="msjError">  </span>
            </div>
						<p class="text-left mt-0 mb-0" style="font-size: 12px;"> <span style="color:red">*</span> Datos obligatorios </p>
            <p class="text-left mt-0 mb-0" style="font-size: 12px;"> <span style="color:red">**</span> Deje en blanco si no desea actualizar </p>


							`,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: '<i class="fas fa-save"></i> Guardar',
					confirmButtonColor: '#2196f3',
            cancelButtonColor: '#aaa',
					cancelButtonText: '<i class="fas fa-ban"></i> Cerrar',
            allowOutsideClick: false,
            allowEscapeKey: false,
					preConfirm: async () => {
            
              let error = 0;
              
              this.apellido_paterno=document.getElementById('apellido_paterno').value,
							this.apellido_materno=document.getElementById('apellido_materno').value,
							this.nombre=document.getElementById('nombre').value,
							this.matricula=document.getElementById('matricula').value,
							this.password=document.getElementById('password').value,
							this.nivel_academico = document.getElementById('nivel_academico').value, 
							this.id_profesor = document.getElementById('id_profesor').value,
							this.id=id
            
              let mensajeError = document.getElementById('msjError');
              
              if(  this.nombre== "" ||  this.apellido_paterno == "" ||  this.password == "" || this.matricula == "" || this.nivel_academico == "" || this.id_profesor == ""  ){
                error = 2;
              }else{
                
                  if(matricula !== this.matricula ){
                      await axios.post('/verificarExistencia',
                      {correo:this.matricula})
                      .then((res)=>{
                          if(res.data[0].length !== 0){
                            error = 1;
                          }
                      })
                      .catch((err)=>{
                        console.log(err)
                      })
                    
                  }
                  
              }
              
              if(error === 1){
                mensajeError.innerHTML = "La matricula ya esta siendo usada, por favor elija otra";
                document.getElementById('msjError').innerHTML = "El correo está en uso";
                document.getElementById('div_error_matricula').style.display = "block";
                return false;
              }else if(error === 2) {
                mensajeError.innerHTML = "Por favor, complete todos los campos requeridos";
                document.getElementById('div_error_matricula').style.display = "block";
                return false;
              }else{
                return [
                  this.apellido_paterno=document.getElementById('apellido_paterno').value,
                  this.apellido_materno=document.getElementById('apellido_materno').value,
                  this.nombre=document.getElementById('nombre').value,
                  this.matricula=document.getElementById('matricula').value,
                  this.password=document.getElementById('password').value,
                  this.nivel_academico = document.getElementById('nivel_academico').value, 
                  this.id_profesor = document.getElementById('id_profesor').value,
                  this.id=id,
                  error

                ]
              }
            
            
            
					}})
          
          if( valores.hasOwnProperty('value') ){
              this.editar(this.id,this.nombre,this.apellido_paterno,this.apellido_materno,this.password,this.matricula,this.nivel_academico,this.id_profesor);
          }
       	
    },
    
    
    
    editar(id,nombre,apellido_paterno,apellido_materno,password,matricula,nivel_academico,id_profesor){
    axios.post('/alumno/actualizar',           
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
      
      
              this.$swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Información actualizada',
                showConfirmButton: false,
                timer: 1500,
                toast: true
              })
      
				this.getAlumnos()
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
		
    
    }
    
    
    
    
    
    
	}
}
</script>