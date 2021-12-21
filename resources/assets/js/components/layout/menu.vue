<template>
<!-- Main Sidebar Container -->
	<aside class="main-sidebar sidebar-dark-primary elevation-4" style="overflow-x: scroll;">
	
		<!-- Brand Logo -->
		<router-link to="tablero"  class="brand-link">
			<img src="/imagenes/fondo/logo.png" alt="logo" salt="AdminLTE Logo" class="brand-image elevation-3" style="opacity: .8" />
			<span class="brand-text font-weight-light">KMS</span>
		</router-link>
		<!-- Sidebar -->
		<div class="sidebar ">
			<!-- Sidebar user panel (optional) -->
			<div class="user-panel mt-3 pb-3 mb-3 d-flex">
				<div class="image">
					<img :src="'/imagenes/fotosperfil/'+foto" class="img-circle elevation-2 mt-2" alt="User Image">
					
				</div>
				<div class="info">
					<router-link to="/perfil" class="d-block"> {{ nombre }} {{apellidoPaterno}} </router-link>

					<span class="d-block text-white"> {{ rol }} </span>
					
				</div>
			</div>

			<!-- Sidebar Menu -->
			<nav class="mt-2" id="menuPrincipal">
				<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
					<!-- Add icons to the links using the .nav-icon class
							 with font-awesome or any other icon font library -->
					<li class="nav-item">
						<router-link id="navTablero" to="/tablero" class="nav-link" role="tab">
							<i class="nav-icon fas fa-home"></i>
							<p>
								Inicio
                
							</p>
						</router-link>
					</li>
					
					<li v-if="this.id_rol==1" class="nav-header"> <b> ACCESO </b> </li>

					<li v-if="this.id_rol==1" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/configurarAccesos">
							<i class="nav-icon fas fa-lock-open"></i>  
							<p>
								Accesos
							</p>
						</router-link>
					</li>
					
					<li v-if="this.id_rol==1" class="nav-header"> <b> USUARIOS </b> </li>

					<li v-if="this.id_rol==1" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/usuariosAdministrador">
							<i class="fas fa-users-cog nav-icon"></i> 
							<p>
								Administradores
							</p>
						</router-link>
					</li>

					<li v-if="this.id_rol==1" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/usuariosProfesor">
							<i class="fas fa-chalkboard-teacher nav-icon"></i> 
							<p>
								Docentes
							</p>
						</router-link>
					</li>

					<li v-if="this.id_rol==1" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/usuariosAlumno">
							<i class="fas fa-graduation-cap nav-icon"></i>  
							<p>
								Alumnos
							</p>
						</router-link>
					</li>

					<li v-if="this.id_rol==1" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/usuariosExperto">
							<i class="fas fa-user-tie nav-icon"></i>  
							<p>
								Expertos
							</p>
						</router-link>
					</li>
					
					<!-- <li v-if="this.id_rol==1" class="nav-item" id="liUsuarios">
							<a class="nav-link" id="navUsuarios" href="#" >
								<i class="nav-icon fas fa-users"></i>
								<p>
									Usuarios
									<i class="right fas fa-angle-left"></i>
								</p>
							</a>
							<ul class="nav nav-treeview">
								<li class="nav-item">
									<router-link class="nav-link" to="/usuariosAdministrador" id="aAdmin"> 
										<i class="fas fa-users-cog nav-icon"></i> 
										Administradores
									</router-link>
								</li>
								
								<li class="nav-item">
									<router-link class="nav-link" to="/usuariosProfesor" id="aDocentes"> 
										<i class="fas fa-chalkboard-teacher nav-icon"></i> 
										Docentes
									</router-link>
								</li>
								
								<li class="nav-item">
									<router-link class="nav-link" to="/usuariosAlumno" id="aAlumnos"> 
										<i class="fas fa-graduation-cap nav-icon"></i> 
										Alumnos
									</router-link>
								</li>
								
								<li class="nav-item">
									<router-link class="nav-link" to="/usuariosExperto" id="aExpertos"> 
										<i class="fas fa-user-tie nav-icon"></i> 
										Expertos
									</router-link>
								</li>
								
							</ul>
					</li> -->
					
					<li v-if="this.id_rol==1 || this.id_rol==3 || this.id_rol==4" class="nav-header"> <b>CUESTIONARIO </b> </li>

					<li v-if="this.id_rol==1 || this.id_rol==3" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/configurarCuestionario">
							<i class="fas fa-cogs nav-icon"></i> 
							<p>
								Configuración
							</p>
						</router-link>
					</li>

					<li v-if="this.id_rol==1 || this.id_rol==3 || this.id_rol==4" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/cuestionario">
							<i class="fas fa-clipboard-check nav-icon"></i>
							<p>
								Contestar
							</p>
						</router-link>
					</li>

					<!-- <li class="nav-item" id="liCuestionario">
							<a class="nav-link" id="navCuestionario" href="#" >
								<i class="nav-icon far fa-file-alt"></i>
								<p>
									Cuestionario
									<i class="right fas fa-angle-left"></i>
								</p>
							</a>
							<ul class="nav nav-treeview">
								
								<li v-if="this.id_rol==1 || this.id_rol==3" class="nav-item">
									<router-link class="nav-link" to="/configurarCuestionario" id="aConfigurar"> 
										<i class="fas fa-cogs nav-icon"></i> 
										Configurar
									</router-link>
								</li>
								
								<li class="nav-item">
									<router-link class="nav-link" to="/cuestionario" id="aVer"> 
										<i class="fas fa-eye nav-icon"></i> 
										Ver
									</router-link>
								</li>
								
							</ul>
					</li> -->

					

					<li v-if="this.id_rol==1 || this.id_rol==3 || this.id_rol==2" class="nav-header"> <b> PREGUNTAS </b> </li>

					<li v-if="this.id_rol==1 || this.id_rol==3 || this.id_rol==2" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/preguntasAbiertas">
							<i class="fas fa-keyboard nav-icon"></i>
							<p>
								Abiertas
							</p>
						</router-link>
					</li>

					<li v-if="this.id_rol==1 || this.id_rol==3 || this.id_rol==2" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/preguntasNumericas">
							<i class="fas fa-sort-numeric-down nav-icon"></i>
							<p>
								Númericas
							</p>
						</router-link>
					</li>

					<li v-if="this.id_rol==1 || this.id_rol==3 || this.id_rol==2" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/preguntasVerdaderoFalso">
							<i class="fas fa-toggle-on nav-icon"></i>
							<p>
								Verdadero / Falso
							</p>
						</router-link>
					</li>

					<li v-if="this.id_rol==1 || this.id_rol==3 || this.id_rol==2" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/preguntasOpcionMultiple">
							<i class="fas fa-stream nav-icon"></i>
							<p>
								Opción Múltiple
							</p>
						</router-link>
					</li>

					<li v-if="this.id_rol==1 || this.id_rol==3 || this.id_rol==2" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/preguntasCalculadas">
							<i class="fas fa-keyboard nav-icon"></i>
							<p>
								Calculadas
							</p>
						</router-link>
					</li>

					<li v-if="this.id_rol==1 || this.id_rol==3 || this.id_rol==2" class="nav-item">							
						<router-link class="nav-link" id="navAccesos" to="/PreguntasOpcionMultipleCalculadas">
							<i class="fas fa-stream nav-icon"></i>
							<p>
								Calculadas múltiples
							</p>
						</router-link>
					</li>


					
					<!-- <li v-if="this.id_rol==1 || this.id_rol==3 || this.id_rol==2" class="nav-item" id="liPreguntas">
							<a class="nav-link" id="navPreguntas" href="#" >
								<i class="nav-icon fas fa-question"></i>
								<p>
									Preguntas
									<i class="right fas fa-angle-left"></i>
								</p>
							</a>
							<ul class="nav nav-treeview">
								
								<li class="nav-item">
									<router-link class="nav-link" to="/preguntasAbiertas" id="aAbiertas"> 
										<i class="fas fa-keyboard nav-icon"></i> 
										Abiertas
									</router-link>
								</li>
								
								<li class="nav-item">
									<router-link class="nav-link" to="/preguntasNumericas" id="aNumericas"> 
										<i class="fas fa-sort-numeric-down nav-icon"></i> 
										Númericas
									</router-link>
								</li>
								
								<li class="nav-item">
									<router-link class="nav-link" to="/preguntasVerdaderoFalso" id="aVerdaderoFalso"> 
										<i class="fas fa-toggle-on nav-icon"></i> 
										Verdadero / Falso
									</router-link>
								</li>
								
								<li class="nav-item">
									<router-link class="nav-link" to="/preguntasOpcionMultiple" id="aMultiple"> 
										<i class="fas fa-stream nav-icon"></i> 
										Opción Múltiple
									</router-link>
								</li>
								
								<li class="nav-item">
									<router-link class="nav-link" to="/preguntasCalculadas" id="aCalculadas"> 
										<i class="fas fa-keyboard nav-icon"></i> 
										Calculadas
									</router-link>
								</li>
								
								<li class="nav-item">
									<router-link class="nav-link" to="/PreguntasOpcionMultipleCalculadas" id="aMCalculadas"> 
										<i class="fas fa-stream nav-icon"></i> 
										Calculadas múltiples
									</router-link>
								</li>
								
							</ul>
					</li> -->
					
					
					<li v-if="this.id_rol==1 || this.id_rol==2" class="nav-header"> <b> AREA DISCIPLINAR </b> </li>
					
					<li v-if="this.id_rol==1 || this.id_rol==2"  class="nav-item">							
						<router-link class="nav-link" id="navTemas" to="/temas">
							<i class="nav-icon fas fa-chalkboard-teacher"></i>  
							<p>
								Temas
							</p>
						</router-link>
					</li>

					<li v-if="this.id_rol==1 || this.id_rol==2"  class="nav-item">							
						<router-link class="nav-link" id="navTemas" to="/grafo">
							<i class="fas fa-user-tie nav-icon"></i> 
							<p>
								Grafo de conocimiento
							</p>
						</router-link>
					</li>

					<!-- <li v-if="this.id_rol==1 || this.id_rol==2" class="nav-item" id="liGrafo">
							<a class="nav-link" id="navGrafo" href="#" >
								<i class="nav-icon fas fa-project-diagram"></i>
								<p>
									GC
									<i class="right fas fa-angle-left"></i>
								</p>
							</a>
							<ul class="nav nav-treeview">
								
								<li class="nav-item">
									<router-link class="nav-link" to="/grafo" id="aExperto"> 
										<i class="fas fa-user-tie nav-icon"></i> 
										Experto
									</router-link>
								</li>
								
								<li class="nav-item">
									<router-link class="nav-link" to="/historialprofesor" id="aDocentes"> 
										<i class="fas fa-chalkboard-teacher nav-icon"></i> 
										Docente
									</router-link>
								</li>
								
							</ul>
					</li> -->
					<li v-if="this.id_rol==1 || this.id_rol==2" class="nav-header"> <b> RECURSOS </b> </li>

					<li v-if="this.id_rol==1 || this.id_rol==2" class="nav-item">							
						<router-link class="nav-link" id="navRecursos" to="/subirImagenes">
							<i class="nav-icon fas fa-file-upload"></i>  
							<p>
								imagenes
							</p>
						</router-link>
					</li>
					
					
				</ul>
			</nav>
			<!-- /.sidebar-menu -->
		</div>
		<!-- /.sidebar -->
	</aside>
</template>
<script>
export default {
	data(){
		return {
			id: '',
			nombre: '',
			apellidoPaterno: '',
			apellidoMaterno: '',
			matricula: '',
			foto: '',
			id_rol: '',
			rol: '',
		}
	},
	mounted() {
		this.id = window.idUsuario;
		this.nombre = window.nombre;
		this.apellidoPaterno = window.apellido_paterno;
		this.apellidoMaterno = window.apellido_materno;
		this.matricula = window.matricula;
		this.foto = window.foto;
		this.id_rol = window.rol;

		if(this.id_rol === '1'){
			this.rol = "Administrador"
		}

		if(this.id_rol === '2'){
			this.rol = "Experto"
		}

		if(this.id_rol === '3'){
			this.rol = "Profesor"
		}

		if(this.id_rol === '4'){
			this.rol = "Alumno"
		}

	}
};
</script>