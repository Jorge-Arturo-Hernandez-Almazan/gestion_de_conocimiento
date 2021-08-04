<template>
	<div >
		 <div class="col-12 mt-2">  
			<div class="page-header">
				<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
					<h1 class="page-title"> Prueba imagenes  </h1>
					<ul class="quick-links ml-auto">
						<li>
							<span> <i class="fas fa-home"></i> </span>  
						</li>
					</ul>
				</div>
			</div>
		</div> 
        <div class="col-md-12 ">
			<div class="card">
				<div class="card-body">

					<div class="row">
						<div  @dragover="dragover" @dragleave="dragleave" @drop="drop" style="border-style: dashed; width: 100%;" >
							
							<input type="file" id="assetsFieldHandle" 
						  class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" hidden />
							<div class="row">
								<div class="col-md-12">
									<label for="assetsFieldHandle" class="block cursor-pointer">
										<div >
											<h4 id="mensajito" class="text-center">
												<i class="fas fa-cloud-download-alt fa-2x bounce"></i> <b> Arrastra la imagen aquí para subir </b>
											</h4>
										</div>
									</label>
								</div>
							</div>
							
							
							<table style="list-style-type: none; width:100%" v-if="this.imagenesVistaPrevia.length" v-cloak>
								<tr>
									<th>Imagen</th>
									<th>Acción</th>
								</tr>

								<tr v-for="imagen in imagenesVistaPrevia">
									<td class="d-flex justify-content-center"> <img :src="imagen.imagen" style=" width: 30em;"> </td>
									<td><button class="btn btn-danger" type="button" @click="remove(imagenesVistaPrevia.indexOf(imagen))" title="Remove file"> <i class="fas fa-trash-alt"></i> </button> </td>
								</tr>
							</table>
						  
						</div>
					</div>
					
					<p id="texto_prueba">
						Esto es un texto de prueba para los estilos personalizados
					</p>
					
					<img id="imgp" >
					<div class="row mt-3">
						<center> 
							<button class="ml-2" type="button" @click="subirImagenes" title="Remove file">Subir las imagenes</button>
						</center>
					</div>
					
				</div>
			</div>
        </div>
	</div>
</template>

<script>
	
	
	
import axios from 'axios'

export default{
	delimiters: ['${', '}'], // Avoid Twig conflicts
	data(){
		return {
			filelist: [],
			imagenes: [],
			form_data: {},
			imagenesVistaPrevia: [],
			contadorImagen: 0
		}
	},
	mounted(){

	},
	methods: {
		onChange(e) {			
			const file = e.target.files[0];
      		let url = URL.createObjectURL(file);
			let imgp = document.getElementById("imgp");
			//imgp.src = url;
			this.imagenes.push(file);
			this.acomodarImagen(url);
			
		},
		remove(i) {
			this.imagenesVistaPrevia.splice(i,1);
			this.imagenes.splice(i,1);
		},
		dragover(event) {
		  event.preventDefault();
			event.currentTarget.style.backgroundColor = 'green';
		},
		dragleave(event) {
		  event.currentTarget.style.backgroundColor = 'white';
		},
		async acomodarImagen(imagen){
			await this.imagenesVistaPrevia.push({imagen: imagen, id: this.contadorImagen});
			this.contadorImagen++;
		},
		drop(event) {
		  	event.preventDefault();
			let self = this
			for(let i=0; i < event.dataTransfer.files.length; i++){
				let reader = new FileReader();
				reader.readAsDataURL(event.dataTransfer.files[i]);
				this.imagenes.push(event.dataTransfer.files[i]);
			  	reader.onload = function(){
					self.acomodarImagen(reader.result);
			  	};
			}
			
			event.currentTarget.style.backgroundColor = 'white';
		},
		
		subirImagenes(){
			console.log("Dentro de metodo subir imagenes");
			for( let i = 0; i  < this.imagenes.length;i++){
				const type = this.imagenes[i].name.split('.')[1];
   				const name = new Date().getTime() + "" + i + "." + type;
				this.form_data = new FormData();
				this.form_data.append('imagen', this.imagenes[i] );
				this.form_data.append('csrf-token', "{{ csrfToken }}");
				this.form_data.append('nombre_imagen', name);	
				let url = "/subirr";
				let self = this
				axios.post(url, this.form_data).then((res) => {
					console.log("La subida se ha completado con exito");
				}).catch(function (error) {
					console.log(error);
				});
			}
		}
	}

}
</script>

<style>
	

	
</style>