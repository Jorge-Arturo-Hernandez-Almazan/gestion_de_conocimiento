<template>
<!-- <div class="row"> -->
    <div class="col-xl-12">
		<div class="col-12 mt-2">
				<div class="page-header">
					<h3 class="page-title"> Perfil de usuario </h3>

					
					<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
						<ul class="quick-links ml-auto">
						<li>
							<span> <i class="fas fa-home"></i> </span>  
						</li>
						</ul>
				  </div>
				</div>
			</div>
		
        <div class="card-body">
          <div class="row ">
            <div class="col-md-12 ">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
							  
                            <div class="col-md-12">
								
                             	 <h5>
								DATOS DEL PERFIL   
								</h5>
								
								<div class="form-group">
									<h5>Foto de perfil</h5>
									
									<img class="rounded-circle" :src="'/images/fotosperfil/'+datos.foto" alt="Profile image" style="width: 150px; ">
									
									
									
								</div>
								
								 
								
								
								<form method="POST" action="/subirfotoperfil" enctype="multipart/form-data">
									<h5>Cambiar foto de perfil</h5>
									
									<div class="form-group">
									
									
								  <input type="file" name="profile_pic" required />
									
								  <button type="submit" class="btn btn-primary"> Subir imagen </button>					
									</div>
								</form>
								
								
								
								<form method="POST" action="/editardatos" enctype="multipart/form-data">
									
									<h5>Otros datos personales</h5>
									
							      <div class="form-group">
									<label for="exampleInputEmail1">Nombre:</label>
									<input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" :value="datos.nombre">
								  </div>
									
								  <div class="form-group">
									<label for="exampleInputEmail1">Apellido Paterno:</label>
									<input type="text" class="form-control" id="apellidopaterno" name="apellidopaterno"  placeholder="Apellido Paterno"  :value="datos.apellido_paterno">
								  </div>
									
									
								  <div class="form-group">
									<label for="exampleInputEmail1">Apellido Materno:</label>
									<input type="text" class="form-control" id="apellidomaterno" name="apellidomaterno" placeholder="Apellido materno" :value="datos.apellido_materno">
								  </div>
									
									
								  <div class="form-group">
									<label for="exampleInputEmail1">Correo:</label>
									<input type="email" class="form-control" id="coreo" name="correo" placeholder="Correo" :value="datos.matricula+'@upv.edu.com'" disabled>
								  </div>
									
								  <div class="form-group">
									<label for="exampleInputPassword1">Contraseña:</label>
									<input type="password" class="form-control" id="contrasena" name="contrasena">
								  </div>
									
									
									<div class="form-group">
									<label for="exampleInputPassword1">Repetir contraseña:</label>
									<input type="password" class="form-control" id="contrasena2" name="contrasena2">
								  </div>
									
									

								  <button type="submit" class="btn btn-primary">Guardar</button>
								
								</form>
								
								
								
                            </div>
							  
                          </div>
                        </div>
                      </div>
            </div>	
          </div>
        </div>
  </div>
<!-- </div> -->
</template>


<script>
	
	
	
import axios from 'axios'

export default{
	data(){
		return {
			datos:{}
		}
	},
	mounted(){
		this.obtenerdatos();
		
		var uri = window.location.href.split('?');
	    var fil = uri[1].split('=')[1];
		console.log(fil);
		
		if(fil == 1){
			this.$swal({
				type: 'success',
				title: 'Datos guardados correctamente'
			})
		}else if(fil == 2){
			this.$swal({
				type: 'error',
				title: 'Error al guardar los datos'
			})
		}
		
		

	},
	methods: {
		obtenerdatos(){
			axios({method: 'GET', url: '/obtenerDatos'}).then(
				result=> {
					this.datos = result.data[0][0]
				},
				error=> {
					console.error(error)
				}
			)
		}
    
    
	}
}
</script>