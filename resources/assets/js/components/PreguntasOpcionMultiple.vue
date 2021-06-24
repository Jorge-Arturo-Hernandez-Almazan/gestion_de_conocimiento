
<template>
            <div class="">
				
				<div class="col-12 mt-2">
					<div class="page-header">
						<h3 class="page-title"> Preguntas opcion multiple </h3>
						<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
							<ul class="quick-links ml-auto">
							<li>
								<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> 								</span>  <span style="color: #bdb9bd">  Preguntas  <i class="fas fa-angle-right"></i> </span> Preguntas opcion multiple
							</li>
							</ul>
					  </div>
					</div>
				</div>
				
              	<div class="col-lg-12">
					<div class="card">
                  	<div class="card-body">
						
						<div class="row" style="padding: 0 !important; margin: 0 !important; ">
						<div class="col-md-6">
							<h3> Lista de preguntas opcion multiple </h3>
						</div>
						<div class="col-md-6">
							
							<button type="button" @click="abrirModal" class="btn btn-success float-right" data-toggle="modal" data-target="#exampleModal">
								<i class="fas fa-plus-circle"></i> Registrar pregunta
							</button>
							
						</div>	
					</div>
						
					 
					
					<div class="table-responsive">
					
					<label>Busqueda por pregunta: </label>
      				<input class="form-control mb-2" v-model="filters.pregunta.value"/>
					  
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
						<th>Opciones</th>
						<v-th sortKey="opcion" defaultSort="desc">Respuestas</v-th>
						<th>Opciones</th>
					</thead>
					<tbody slot="body" slot-scope="{displayData}">
						<tr v-for="(pregunta, preg) in displayData" :key="pregunta.id_pregunta">
						  <td class="text-left">{{pregunta.pregunta}} </td>
								  <td class="text-left">{{pregunta.tema}}</td>

								<td>
									<tr v-for="(opcion, preg) in opciones[0]" v-bind:key="opcion.id">
										<span v-if="pregunta.id_pregunta == opcion.id_pregunta"> {{opcion.opcion}} </span>
									</tr>
								</td>

								<td>
									<tr v-for="(opcion, preg) in opciones[0]" v-bind:key="opcion.id">
										<span v-if="pregunta.id_pregunta == opcion.id_pregunta && opcion.esrespuesta == 1"> {{opcion.opcion}} </span>
									</tr>
								</td>

								<td class="text-right">
									<button class="btn btn-warning" @click="editarPregunta(pregunta.id_pregunta)" data-toggle="modal" data-target="#exampleModal"> <i class="fas fa-pen"></i> </button> 
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
						
						
						
					
             	</div>

		  	<!-- Modal -->
				<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						  
						  
						  <h4 v-if="editarPreguntaVar == false" class="modal-title" id="exampleModalLabel"> <b> Registrar pregunta </b> </h4>
						  <h4 v-if="editarPreguntaVar == true" class="modal-title" id="exampleModalLabel"> <b> Editar pregunta </b> </h4>
							
						  
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						  <span aria-hidden="true">&times;</span>
						</button>
					  </div>
					  	<div class="modal-body">
							
							<div class="form-group">
								<label class="text-left mb-2" for="pregunta">  Reactivo:  </label>
								<textarea id="pregunta" class="form-control" rows="3" placeholder="Escribe el reactivo">  </textarea>
							</div>
							
							<div class="form-group">
								<label class="text-left mb-2">
									Tema:
								</label>
								<select id="id_tema"  name="temas" class="form-control">

								</select>
							</div>
                
							<div class="form-group">
								<label class="text-left mb-2" for="opciones">  Opciones:  </label>
								<div class="row">
									<div class="col-md-8">
										<input id="inputOpcion" class="form-control" type="text">
									</div>
									<div class="col-md-4"> 
										<button id="btnAgregarOption" @click="btnAgregarOpcion" type="button" class="btn btn-success"> Agregar opción </button>
									</div>
								</div>

								<div class="table-responsive">
								<table class="table" id="opciones" style="text-align: center;">
									<tr>
										<th>Opcion</th>
										<th>¿Respuesta?</th>
										<th>Quitar</th>
									</tr>
								</table>
								</div>

							</div>
							  

					 	</div>
					  	<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
							<button type="button" @click="btnGuardarPregunta" class="btn btn-primary">Guardar</button>
					 	</div>
						
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

var opciones = [];
var noOpcion = 0;
var reactivo = "";
	
function btnQuitarOpcion(opcion){
	
	var id_fila = opcion.split('_')[1];
	var row = document.getElementById("fila_" + id_fila);
    row.parentNode.removeChild(row);
	
	var id_opc = "opt_"+id_fila;
	
	for(var i = 0; i < opciones.length; i++){
		if( opciones[i][1] == id_opc ){
			opciones.splice(i,1);
		}
	}
}
	
function checkRespuesta(opcion){
	
	var id_check = opcion.split('_')[1];
	var id_opc = "opt_"+id_check;
	var total_opciones = opciones.length;
	var total_chequeados = 0;
	
	for(var i = 0; i < opciones.length; i++)
	{
		if( opciones[i][2] == 1 )
		{
			total_chequeados++;
		}
	}
	
	if( total_chequeados+1 == total_opciones )
	{
		
		
		if(document.getElementById(opcion).checked){
		   this.$swal.fire({
			icon: 'error',
			title: 'Error...',
			text: 'No puedes poner todas las opciones como respuesta'
			})
		 }
		
		document.getElementById(opcion).checked = false;
	}
	
	if( document.getElementById(opcion).checked ){
		for(var i = 0; i < opciones.length; i++){
			if( opciones[i][1] == id_opc ){
				opciones[i][2] = 1;
			}
		}
	}else{
		for(var i = 0; i < opciones.length; i++){
			if( opciones[i][1] == id_opc ){
				opciones[i][2] = 0;
			}
		}
	}
	
}
	
export default{
	data(){
		return {
			editarPreguntaVar: false,
			pregunta: [],
			opciones: [],
			respuestas: [],
			id_editar: 0,
			id: '',
			id_tema:'',
			tipo:'',
      		temasSeleccionado: {},
			temas: [],
			id: '',
			nombre_tema: '',
			nivel: '',
			filters: {
			  pregunta: { value: '', keys: ['pregunta', 'tema'] }
			},
			currentPage: 1,
			totalPages: 0
		}
	},
	
	props: {seccion:String},
	
	created(){
		this.getpreguntas();
		this.getTemas();
	},
	
	async mounted(){
		
		await this.getpreguntas().then(data => {
		}).catch(err => console.log(err))
		
		this.getTemas();
		
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
		abrirModalCuestionario(){
			this.getpreguntas();
			this.getTemas();
		},
		getpreguntas: async function(){
			return axios({method: 'get', url: 'pregunta/showMultiples'}).then(
				result=> {
					this.pregunta = result.data.banco_preguntas[0];
					this.opciones = result.data.opciones;
					this.respuestas = result.data.respuestas;
					
					return result.data;
				},
				error=> {
					console.error(error)
				}
			)
		},
    
    	getTemas(){
			axios({method: 'GET', url: '/tema/all'}).then(
				result=> {
					this.temas = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
		
		editarPregunta(id){
			this.editarPreguntaVar = true;
			this.id_editar = id;
			var x = document.getElementById("id_tema");
			var length = x.options.length;
			for (i = length-1; i >= 0; i--) {
			  x.options[i] = null;
			}
			for(var i = 0; i < this.temas[0].length; i++){
				var option = document.createElement("option");
				option.text = this.temas[0][i].nombre_tema;
				option.value = this.temas[0][i].id;
				x.add(option);
			}
			//Limpiar opciones
			opciones = [];
			
			//Limpiar el reactivo
			var pregunta = document.getElementById("pregunta");
			pregunta.value = "";
			
			
			//Limpiar la tabla de opciones 
			var elmtTable = document.getElementById('opciones');
			var tableRows = elmtTable.getElementsByTagName('tr');
			var rowCount = tableRows.length;
			for (var x=rowCount-1; x>0; x--) {
			   elmtTable.removeChild(tableRows[x]);
			}
			
			//Obtener los datos de la prugunta con el id
			for(var i=0; i < this.pregunta.length; i++)
			{
				if(this.pregunta[i].id_pregunta == id)
				{
					pregunta.value = this.pregunta[i].pregunta;
					//x.selectedIndex = this.pregunta[i].id_tema + "";
					document.getElementById("id_tema").value = this.pregunta[i].id_tema
					//console.log(this.pregunta[i]);
					//console.log(this.pregunta[i].id_tema);
					break;
				}
			}
			
			//Obtener las opciones
			var numero = 0;
			
			for(var i=0; i < this.opciones[0].length; i++){
				if(this.opciones[0][i].id_pregunta == id){
					
					var o = [];
					o[0] = this.opciones[0][i].opcion;
					o[1] = "opt_"+numero;
					
					
					
					if( this.opciones[0][i].esrespuesta == 1 ){
					   o[2] = 1;
					}else{
						o[2] = 0;
					}
					
					opciones.push( o );
					numero++;
				}
			}
			

			
			for(var i=0; i < opciones.length; i++){
				
				var opcion = opciones[i][0];
				var table = document.getElementById("opciones");
				var row = table.insertRow(-1);
				row.id= "fila_"+noOpcion;
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				cell1.innerHTML = "" + opcion;

				// creating checkbox element 
				let checkbox = document.createElement('input');
				checkbox.type = "checkbox"; 
				checkbox.id = "check_"+noOpcion;
				
				if(opciones[i][2] == 1 ){
				   checkbox.checked = true;
				}
				
				checkbox.addEventListener('click', function(){checkRespuesta(this.id)}); 
				cell2.appendChild(checkbox);

				let button = document.createElement('button');
				button.id = "btn_"+noOpcion;
				button.innerHTML = 'Quitar';
				button.className = "btn btn-danger";
				button.addEventListener('click', function(){btnQuitarOpcion(this.id)});
				cell3.appendChild(button);

				noOpcion = noOpcion + 1;
				
			}
			
			noOpcion = 0;
			
		},
		
		abrirModal: async function(){
			this.editarPreguntaVar = false;
			
			var x = document.getElementById("id_tema");
			
			var length = x.options.length;
			for (i = length-1; i >= 0; i--) {
			  x.options[i] = null;
			}
			
			for(var i = 0; i < this.temas[0].length; i++)
			{
				var option = document.createElement("option");
				option.text = this.temas[0][i].nombre_tema;
				option.value = this.temas[0][i].id;
				x.add(option);
			}
			
			//Limpiar opciones
			opciones = [];
			
			//Limpiar el reactivo
			var pregunta = document.getElementById("pregunta");
			pregunta.value = "";
			
			
			//Limpiar la tabla de opciones 
			var elmtTable = document.getElementById('opciones');
			var tableRows = elmtTable.getElementsByTagName('tr');
			var rowCount = tableRows.length;
			for (var x=rowCount-1; x>0; x--) {
			   elmtTable.removeChild(tableRows[x]);
			}
			
		},
		
		btnGuardarPregunta: async function(){
			
			var pregunta = document.getElementById("pregunta");
			var total_opciones = opciones.length;
			var tema = document.getElementById("id_tema").value;
			var total_chequeados = 0;
			var errores = 0;
	
			for(var i = 0; i < opciones.length; i++){
				if( opciones[i][2] == 1 ){
					total_chequeados++;
				}
			}

			if(total_chequeados == 0){
				errores++;
				this.$swal.fire({
				  icon: 'error',
				  title: 'Error...',
				  text: 'Debes seleccionar al menos una respuesta'
				})
			}
			
			if(total_opciones < 2){
				errores++;
			   this.$swal.fire({
				  icon: 'error',
				  title: 'Error...',
				  text: 'Deben ser como minimo dos opciones'
				})
			}
			
			if( pregunta.value == ""  || pregunta.value == null){
				errores++;
			   this.$swal.fire({
				  icon: 'error',
				  title: 'Error...',
				  text: 'El reactivo no debe estar vacio'
				})
				
			}
			
			if(errores == 0){
				
				if(this.editarPreguntaVar){
					
				   	axios.post('preguntaOpcionMultiple/update',
								{opciones:opciones, rectivo:pregunta.value, tema:tema, id:this.id_editar})
					.then((res)=>{
						this.$swal.fire({
						  icon: 'success',
						  title: 'Pregunta actualizada',
						  text: 'Pregunta actualizada con exito',
						})

						// Para cerrar el modal con el formulario
						const modals = document.getElementsByClassName('modal');
						for(let i=0; i<modals.length; i++) {
						  modals[i].classList.remove('show');
						  modals[i].setAttribute('aria-hidden', 'true');
						  modals[i].setAttribute('style', 'display: none');
						}
						 const modalsBackdrops = document.getElementsByClassName('modal-backdrop');
						 for(let i=0; i<modalsBackdrops.length; i++) {
						   document.body.removeChild(modalsBackdrops[i]);
						 }
						this.getpreguntas();

					})
					.catch((err)=>{
						console.log(err)
					})
					
				}else{
					
					axios.post('preguntaOpcionMultiple/store',
								{opciones:opciones, rectivo:pregunta.value, tema:tema})
					.then((res)=>{


						this.$swal.fire({
						  icon: 'success',
						  title: 'Pregunta guardada',
						  text: 'Pregunta guardada con exito',
						})

						// get modals
						const modals = document.getElementsByClassName('modal');

						// on every modal change state like in hidden modal
						for(let i=0; i<modals.length; i++) {
						  modals[i].classList.remove('show');
						  modals[i].setAttribute('aria-hidden', 'true');
						  modals[i].setAttribute('style', 'display: none');
						}

						 // get modal backdrops
						 const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

						 // remove every modal backdrop
						 for(let i=0; i<modalsBackdrops.length; i++) {
						   document.body.removeChild(modalsBackdrops[i]);
						 }


						this.getpreguntas();

					})
					.catch((err)=>{
						console.log(err)
					})
					
					
				}
				
				
			}
			
			
			
		},
		btnAgregarOpcion: async function(){
			
			var opcion = document.getElementById("inputOpcion");
			var table = document.getElementById("opciones");

			if( !(opcion.value == "" || opcion.value == null) ) 
			{
				var row = table.insertRow(-1);
				row.id= "fila_"+noOpcion;
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				cell1.innerHTML = "" + opcion.value;
				
				// creating checkbox element 
				let checkbox = document.createElement('input');
				checkbox.type = "checkbox"; 
				checkbox.id = "check_"+noOpcion;
				checkbox.addEventListener('click', function(){checkRespuesta(this.id)}); 
				cell2.appendChild(checkbox);

				let button = document.createElement('button');
				button.id = "btn_"+noOpcion;
				button.innerHTML = 'Quitar';
				button.className = "btn btn-danger";
				button.addEventListener('click', function(){btnQuitarOpcion(this.id)});
				cell3.appendChild(button);
				
				var opc = [];
				opc[0] = "" + opcion.value;
				opc[1] = "opt_" + noOpcion;
				opc[2] = 0;
				opciones.push(opc);

				opcion.value = "";
				noOpcion = noOpcion + 1;
				
			}
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
				
				axios.post('pregunta/eliminar',{id:id}).then((res)=>{
					this.$swal({
						type: 'success',
						title: '¡Pregunta Eliminada!'
					})
					this.getpreguntas();
				})
				.catch((err)=>{
					//console.log(err)
					this.$swal({
						type: 'info',
						title: 'Error al eliminar',
					})
				})



				////
			  }
			})
			
			
			/*axios.post('pregunta/eliminar',{id:id}).then((res)=>{
				this.$swal({
					type: 'success',
					title: '¡Pregunta Eliminada!'
				})
				this.getpreguntas();
			})
			.catch((err)=>{
				console.log(err)
				this.$swal({
					type: 'info',
					title: 'Error al eliminar',
				})
			})*/
    
    	}
	}
}
</script>