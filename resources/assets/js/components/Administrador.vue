<template>
	<div class="">
	  	<div class="col-xl-12">
			<!-- Breadcrumb -->
			<div class="col-12 mt-4" >
				<div class="page-header">
					<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
						<h1 class="page-title">  Administradores </h1>
						<ul class="quick-links ml-auto">
						<li>
							 <span style="color: #bdb9bd">  <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> </span> <span style="color: #bdb9bd">  Usuarios <i class="fas fa-angle-right"></i> </span> <b>Administradores </b>
						</li> 
						</ul>
				  </div>
				</div>
			</div>
            <div class="card">
                <div class="card-body">
                  <div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
                    <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                      <h2 class="page-title"> Lista de administradores </h2>

                      <ul class="quick-links ml-auto">
                        <li>
                          <button  type="button" class="btn btn-primary float-right btn-lg" @click="btnGuardar">
                            <i class="fas fa-user-plus"></i> Registrar administrador
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>


                  <label> <b> Busqueda por nombre: </b> </label>
                  <input class="form-control mb-2" placeholder="Ej. Juan Pérez" v-model="filters.nombre.value"/>

                  <div class="table-responsive">

                    <v-table 
                       :data="admin" 
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
                    <v-th sortKey="matricula" defaultSort="desc">Correo</v-th>
                    <th>Opciones</th>
                  </thead>
                  <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="admin in displayData" :key="admin.id">
                      <td>{{ admin.nombre }}</td>
                      <td>{{ admin.apellido_paterno }}</td>
                      <td>{{ admin.apellido_materno }}</td>
                      <td> {{ admin.matricula }} </td>
                      <td>

                        <button class="btn btn-warning"  @click="btnEditar(admin.id,admin.nombre,admin.apellido_materno,admin.apellido_paterno,admin.matricula)"><i class="fas fa-pen"></i>Editar</button>
                        <button  class="btn btn-danger" @click="eliminar(admin.id)"><i class="fas fa-trash"></i>Eliminar</button>

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
			admin: [],
			id: '',
			nombre: '',
			apellido_paterno:'',
			apellido_materno:'',
			apellidos:'',
			matricula:'',
			password:'',
			id_rol: '',
			filters: {
			  nombre: { value: '', keys: ['nombre'] }
			},
			currentPage: 1,
			totalPages: 0
		}
	},
	mounted(){
		this.getAdmin()
	},
	methods: {
    
		getAdmin(){
			axios({method: 'GET', url: 'admin/show'}).then(
				result=> {
					//console.log(result.data)
					this.admin = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
    
    guardarAdmin(nombre,apellido_materno,apellido_paterno,matricula,password){///Funcion para guardar los usuarios
			axios.post('registrar',
			{nombre: nombre, nivel_academico:"",id_rol:1,apellido_materno:apellido_materno,apellido_paterno:apellido_paterno,password:password,matricula:matricula})
			.then((res)=>{
				this.nombre=''
				this.id_rol=''
				this.apellido_materno=''
				this.apellido_paterno=''
				this.matricula=''
				this.password=''
				this.getAdmin()
				//console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
		},
		btnGuardar: async function(){
      
				const valores = await this.$swal({
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
                <h3 class="text-left"> Registrar administrador </h3>
                <p class="text-left mt-0 mb-0"> Nombre<span style="color:red">*</span>: </p>
                <input id="nombre" type="text" class="swal2-input" placeholder="Juan">
                <p class="text-left mt-0 mb-0"> Apellido paterno<span style="color:red">*</span>: </p>
                <input id="apellido_paterno" type="text" class="swal2-input" placeholder="Martinez">
                <p class="text-left mt-0 mb-0"> Apellido materno: </p>
                <input id="apellido_materno" type="text" class="swal2-input" placeholder="Perez">
                <p class="text-left mt-0 mb-0"> Correo<span style="color:red">*</span>: </p>
                <input id="matricula" type="text" class="swal2-input" placeholder="ejemplo@ejemplo.com">
                <p class="text-left mt-0 mb-0"> Contraseña<span style="color:red">*</span>: </p>
                <input id="password" type="password" type="password" class="swal2-input" placeholder="contraseña"> 



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
              this.apellido_paterno=document.getElementById('apellido_paterno').value,
              this.apellido_materno=document.getElementById('apellido_materno').value,
              this.nombre=document.getElementById('nombre').value,
              this.matricula=document.getElementById('matricula').value,
              this.password=document.getElementById('password').value
              
              let mensajeError = document.getElementById('msjError');
              
              if(this.nombre== "" ||  this.apellido_paterno == "" ||  this.password == "" || this.matricula == ""){
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
                mensajeError.innerHTML = "El Correo ya esta siendo usado, por favor elija otro";
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
                  error
                ]
              }
              
            }})
            
            if( valores.hasOwnProperty('value') ){
              this.guardarAdmin(this.nombre,this.apellido_materno,this.apellido_paterno,this.matricula,this.password);//funcion guardarAdmin
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
            }
		},
    
    
    btnEditar:async function(id,nombre,apellido_paterno,apellido_materno,matricula){
          const valores = await this.$swal({
					
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
            <h3 class="text-left"> Actualizar administrador </h3>
			      <p class="text-left mt-0 mb-0"> Nombre<span style="color:red">*</span>: </p>
            <input id="nombre" type="text" class="swal2-input" placeholder="Nombre" value="`+nombre+`">
            <p class="text-left mt-0 mb-0"> Apellido paterno<span style="color:red">*</span>: </p>
            <input id="apellido_paterno" type="text" class="swal2-input" placeholder="Apellido Paterno" value="`+apellido_paterno+`">
            <p class="text-left mt-0 mb-0"> Apellido materno<span style="color:red">*</span>: </p>
            <input id="apellido_materno" type="text" class="swal2-input" placeholder="Apellido Materno" value="`+apellido_materno+`">
            <p class="text-left mt-0 mb-0"> Correo<span style="color:red">*</span>: </p>
            <input id="matricula" type="text" class="swal2-input" placeholder="ejemplo@ejemplo.com" value="`+matricula+`">
            <p class="text-left mt-0 mb-0"> Contraseña <span style="color:red">**</span> :</p> 
            <input id="password" type="password" class="swal2-input" placeholder="Contraseña" >  
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
					cancelButttonColor: '#3085d6',
					cancelButtonText: '<i class="fas fa-ban"></i> Cancelar',
					preConfirm: async () => {
						  
              let error = 0;
              this.apellido_paterno=document.getElementById('apellido_paterno').value;
              this.apellido_materno=document.getElementById('apellido_materno').value;
              this.nombre=document.getElementById('nombre').value;
              this.matricula=document.getElementById('matricula').value;
              this.password = "";
              let mensajeError = document.getElementById('msjError');
              
              if(this.nombre== "" ||  this.apellido_paterno == "" || this.matricula == ""){
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
                mensajeError.innerHTML = "El Correo ya esta siendo usado, por favor elija otro";
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
                  error
                ]
              }
            
					}})
          
          if( valores.hasOwnProperty('value') ){
            
              //this.editar(this.id,this.nombre,this.apellido_materno,this.apellido_paterno,this.matricula,this.password);
            
              axios.post('user/actualizar',
                {id:id,nombre: this.nombre, nivel_academico:"",id_rol:1,apellido_materno:this.apellido_materno,apellido_paterno:this.apellido_paterno,password:this.password,matricula:this.matricula})
                .then((res)=>{
                  this.nombre=''
                  this.id_rol=''
                  this.apellido_materno=''
                  this.apellido_paterno=''
                  this.matricula=''
                  this.password=''
                  this.id = ''
                  this.getAdmin()
                })
                  .catch((err)=>{
                    console.log(err)
                  })
      
              this.$swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Información actualizada',
                showConfirmButton: false,
                timer: 1500,
                toast: true
              })
            
              console.log(this.id,this.nombre,this.apellido_materno,this.apellido_paterno,this.matricula,this.password);
              this.apellido_paterno="";
              this.apellido_materno="";
              this.nombre="";
              this.matricula="";
              this.password="";
          }
      
    },
    
    
    
    editar(id,nombre,apellido_materno,apellido_paterno,matricula,password){
  	axios.post('user/actualizar',
			{id:id,nombre: nombre, nivel_academico:"",id_rol:1,apellido_materno:apellido_materno,apellido_paterno:apellido_paterno,password:password,matricula:matricula})
			.then((res)=>{
				this.nombre=''
				this.id_rol=''
        this.apellido_materno=''
        this.apellido_paterno=''
        this.matricula=''
        this.password=''
        this.id = ''
				this.getAdmin()
				//console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
    },
      
      
      
    eliminar(id){
      
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

        axios.post('user/delete',{id:id}).then((res)=>{
          this.nombre=''
          this.id_rol=''
          this.apellido_materno=''
          this.apellido_paterno=''
          this.matricula=''
          this.password=''
          this.id = ''
          this.getAdmin();
          
            this.$swal.fire({
							position: 'top-end',
              icon: 'warning',
              title: 'Datos eliminados con éxito',
              showConfirmButton: false,
              timer: 1500,
              toast: true
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

<style>
  
  .swal-footer { 
    text-align: right !important; 
  } 
  
  .swal-modal .swal-footer { 
    direction: rtl !important; 
  }
  
</style>

