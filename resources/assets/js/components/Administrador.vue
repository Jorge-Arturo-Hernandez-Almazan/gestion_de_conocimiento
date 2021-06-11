<template>
	<div class="row">
	  	<div class="col-xl-12">
			
			<!-- Breadcrumb -->
			<div class="col-12 mt-2">
				<div class="page-header">
					<h3 class="page-title"> Administradores </h3>
					<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
						<ul class="quick-links ml-auto">
						<li>
							<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> 								</span>  <span style="color: #bdb9bd"> Usuarios <i class="fas fa-angle-right"></i> </span> Administradores
						</li>
						</ul>
				  </div>
				</div>
			</div>
				  
				   
            <div class="card">
                <div class="card-body">
					<!--<div class="col-lg-12">
						 <h4>Lista de administradores</h4>
						<button  type="button" class="btn btn-success btn-fw"  @click="btnGuardar">
							<i class="fas fa-user-plus"></i> Registrar Administrador
						</button>
					</div>-->
					
					
					<div class="row">
						<div class="col-md-6">
							<h3> Lista de administradores </h3>
						</div>

						<div class="col-md-6">
							
							<button  type="button" class="btn btn-success float-right"  @click="btnGuardar">
							<i class="fas fa-user-plus"></i> Registrar Administrador
						</button>
							


						</div>	
					</div>
					
					  
					<label>Busqueda por nombre: </label>
      				<input class="form-control mb-2" v-model="filters.nombre.value"/>
					  
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
						<v-th sortKey="matricula" defaultSort="desc">Matricula</v-th>
						<th>Opciones</th>
					</thead>
					<tbody slot="body" slot-scope="{displayData}">
						<tr v-for="admin in displayData" :key="admin.id">
						  <td>{{ admin.nombre }}</td>
						  <td>{{ admin.apellido_paterno }}</td>
						  <td>{{ admin.apellido_materno }}</td>
						  <td> {{ admin.matricula }} </td>
						  <td>
							  
							  <button class="btn btn-warning"  @click="btnEditar(admin.id,admin.nombre,admin.apellido_materno,admin.apellido_paterno,admin.matricula)"><i class="fas fa-pen"></i></button>
													<button  class="btn btn-danger" @click="eliminar(admin.id)"><i class="fas fa-trash"></i></button>
	
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
				const { value: formValues } = await this.$swal({
					title: 'Registrar administrador',
					html:
						`<label class="text-left"> Nombre: </label> <input id="nombre" class="form-control" placeholder="Juan">
            <label class="text-left mt-1"> Apellido paterno: </label> <input id="apellido_paterno" class="form-control" placeholder="Martinez">
            <label class="text-left mt-1"> Apellido materno: </label> <input id="apellido_materno" class="form-control" placeholder="Perez">
            <label class="text-left mt-1"> Matricula: </label> <input id="matricula" class="form-control" placeholder="1530001">
            <label class="text-left mt-1"> Contraseña: </label> <input id="password" type="password" class="form-control" >
						<br> 
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
              this.password=document.getElementById('password').value
						]
					}})
					if(this.nombre== "" || this.apellido_materno == "" || this.apellido_paterno == "" || this.password == "" || this.matricula == ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.guardarAdmin(this.nombre,this.apellido_materno,this.apellido_paterno,this.matricula,this.password);//funcion guardarAdmin
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Administrador Registrado!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
    
    
    btnEditar:async function(id,nombre,apellido_paterno,apellido_materno,matricula){
          const { value: formValues } = await this.$swal({
					title: 'Registrar Admin',
					html:
						`<input id="nombre" class="swal2-input" placeholder="Nombre" value="`+nombre+`">
            <input id="apellido_paterno" class="swal2-input" placeholder="Apellido Paterno" value="`+apellido_paterno+`">
            <input id="apellido_materno" class="swal2-input" placeholder="Apellido Materno" value="`+apellido_materno+`">
            <input id="matricula" class="swal2-input" placeholder="Matricula" value="`+matricula+`">
            <input id="password" class="swal2-input" placeholder="Contraseña" value="secret">
						<br> 
            `,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
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
					if(this.nombre== "" || this.apellido_materno == "" || this.apellido_paterno == "" || this.password == "" || this.matricula == ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
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
							title: '¡Administrador Editado!'
						})
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
      axios.post('user/delete',{id:id}).then((res)=>{
				this.nombre=''
				this.id_rol=''
        this.apellido_materno=''
        this.apellido_paterno=''
        this.matricula=''
        this.password=''
        this.id = ''
				this.getAdmin()
				//console.log(res)
        const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Administrador Eliminado!'
						})
			})
				.catch((err)=>{
					console.log(err)
			    
				})
    
    }
    
    
    
    
    
	}
}
</script>


