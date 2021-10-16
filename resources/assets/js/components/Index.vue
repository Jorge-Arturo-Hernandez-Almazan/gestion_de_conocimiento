<template>
<div >
		 <div class="col-12 mt-4">  
			<div class="page-header">
				
				<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
					<h1 class="page-title"> Dashboard </h1>
					<ul class="quick-links ml-auto">
					<li>
						<span> <i class="fas fa-home"></i> </span>  
					</li>
					</ul>
			  </div>
			</div>
		 </div> 
         <div class="col-md-12 ">
                      <div class="card"  style="border-radius: 15px;">
                        <div class="card-body">
													

													
                          <div class="row">
                            <div class="col-md-6">
                              <div class="d-flex align-items-center pb-2">
                                <div class="dot-indicator bg-danger mr-2"></div>
                                <p class="mb-0">Alumnos</p>
                              </div>
                              <h4 class="font-weight-semibold">{{alumnos}}</h4>
                              <div class="progress progress-md">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 78%" aria-valuenow="78" aria-valuemin="0" aria-valuemax="78"></div>
                              </div>
                            </div>
                            <div class="col-md-6 mt-4 mt-md-0">
                              <div class="d-flex align-items-center pb-2">
                                <div class="dot-indicator bg-success mr-2"></div>
                                <p class="mb-0">Administradores</p>
                              </div>
                              <h4 class="font-weight-semibold">{{admins}}</h4>
                              <div class="progress progress-md">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="45"></div>
                              </div>
                               </div>
                            <div class="col-md-6 mt-4 mt-md-0">
                              <div class="d-flex align-items-center pb-2">
                                <div class="dot-indicator bg-success mr-2"></div>
                                <p class="mb-0">Docentes</p>
                              </div>
                              <h4 class="font-weight-semibold">{{profesor}}</h4>
                              <div class="progress progress-md">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="45"></div>
                              </div>
                            </div>
                            <div class="col-md-6 mt-4 mt-md-0">
                              <div class="d-flex align-items-center pb-2">
                                <div class="dot-indicator bg-success mr-2"></div>
                                <p class="mb-0">Expertos</p>
                              </div>
                              <h4 class="font-weight-semibold">{{experto}}</h4>
                              <div class="progress progress-md">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="45"></div>
                              </div>
                            </div>
                            <div class="col-md-6 mt-4 mt-md-0">
                              <div class="d-flex align-items-center pb-2">
                                <div class="dot-indicator bg-success mr-2"></div>
                                <p class="mb-0">Preguntas</p>
                              </div>
                              <h4 class="font-weight-semibold">{{pregunta}}</h4>
                              <div class="progress progress-md">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="45"></div>
                              </div>
                            </div>
                            <div class="col-md-6 mt-4 mt-md-0">
                              <div class="d-flex align-items-center pb-2">
                                <div class="dot-indicator bg-success mr-2"></div>
                                <p class="mb-0">Temas</p>
                              </div>
                              <h4 class="font-weight-semibold">{{temas}}</h4>
                              <div class="progress progress-md">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="45"></div>
                              </div>
                            </div>
                          </div>
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
			pregunta:'',
      experto:'',
      profesor:'',
      alumnos:'',
      temas:'',
      admins:''
		}
	},
	mounted(){
		this.getpregunta();
		this.getTemas();
		this.getadmins();
		this.getprofesor();
		this.getalumnos();
		this.getexperto();
	},
	methods: {
		getpregunta(){
			axios({method: 'GET', url: '/pregunta/count'}).then(
				result=> {
					//console.log(result.data)
					this.pregunta = result.data[0][0].totalPreguntas
				},
				error=> {
					console.error(error)
				}
			)
		}, 
    getTemas(){
			axios({method: 'GET', url: '/temas/count'}).then(
				result=> {
					//console.log("Los temas son "+ result.data)
					this.temas = result.data[0][0].totalTemas
				},
				error=> {
					console.error(error)
				}
			)
		}, 
    getadmins(){
			axios({method: 'GET', url: '/admin/count'}).then(
				result=> {
					//console.log("Admin",result.data)
					this.admins = result.data[0][0].totalAdministradores
				},
				error=> {
					console.error(error)
				}
			)
		}, 
    getalumnos(){
			axios({method: 'GET', url: '/alumno/count'}).then(
				result=> {
					//console.log("hola como estas ", result.data)
					this.alumnos = result.data[0][0].totalAlumnos
				},
				error=> {
					console.error(error)
				}
			)
		}, 
    getprofesor(){
			axios({method: 'GET', url: '/profesor/count'}).then(
				result=> {
					//console.log(result.data)
					this.profesor = result.data[0][0].totalDocentes
				},
				error=> {
					console.error(error)
				}
			)
		}, 
    getexperto(){
			axios({method: 'GET', url: '/experto/count'}).then(
				result=> {
					//console.log(result.data)
					this.experto = result.data[0][0].totalExpertos
				},
				error=> {
					console.error(error)
				}
			)
		}, 
	}
}
</script>