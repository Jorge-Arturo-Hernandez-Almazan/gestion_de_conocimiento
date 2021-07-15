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

						
					  <div @dragover="dragover" @dragleave="dragleave" @drop="drop" style="border: 5px dashed black; background-color: #faf5fa; height: 200px; width: 500px; text-align: center; padding: 70px 0;">
						  
						<input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
						  class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" hidden />

						<label for="assetsFieldHandle" class="block cursor-pointer">
						  	<div >
								<h4 id="mensajito">
								   
									<b> Arrastra la imagen aquí para subir </b>
								  	
									
								</h4>
						  	</div>
						</label>
						  
						<ul class="mt-4" style="list-style-type: none;" v-if="this.filelist.length" v-cloak>
						  <li class="text-sm p-1" v-for="file in filelist">
							  <b> {{ file.name }} </b> 
							  <button class="ml-2" type="button" @click="remove(filelist.indexOf(file))" title="Remove file">Quitar</button>
							  
						  </li>
						</ul>
					  </div>		
						<hr>
						<div id="preview"></div>
						<button class="ml-2" type="button" @click="subirImagenes" title="Remove file">Subir las imagenes</button>
						
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
			filelist: [], // Store our uploaded files
			imagenes: [],
		}
	},
	mounted(){

	},
	methods: {
		onChange() {
		  this.filelist = [...this.$refs.file.files];
		},
		remove(i) {
		  this.filelist.splice(i, 1);
		},
		dragover(event) {
		  event.preventDefault();
		  // Add some visual fluff to show the user can drop its files
		  if (!event.currentTarget.classList.contains('bg-green-300')) {
			event.currentTarget.classList.remove('bg-gray-100');
			event.currentTarget.classList.add('bg-green-300');
		  }
		},
		dragleave(event) {
		  // Clean up
		  event.currentTarget.classList.add('bg-gray-100');
		  event.currentTarget.classList.remove('bg-green-300');
		},
		drop(event) {
		  event.preventDefault();
		  this.$refs.file.files = event.dataTransfer.files;
			console.log(event.dataTransfer.files);
			
			// Creamos el objeto de la clase FileReader
			
			document.getElementById("mensajito").innerHTML = "";
			
			for(let i=0; i < event.dataTransfer.files.length; i++){
				
				let reader = new FileReader();
				reader.readAsDataURL(event.dataTransfer.files[i]);//Esta es la img 
				
			  	reader.onload = function(){
					let preview = document.getElementById('preview'),
					image = document.createElement('img');
          imagenes.push(reader.result);
					image.src = reader.result;

					//preview.innerHTML = '';
					preview.append(image);
			  	};
				
			}
		  	
		  this.onChange(); // Trigger the onChange event manually
		  
			// Clean up
		  //event.currentTarget.classList.add('bg-gray-100');
		  //event.currentTarget.classList.remove('bg-green-300');
		},
		
		subirImagenes(){
			console.log("IM HERE BITCH");
		}
	}

}
</script>

<style>



	
</style>