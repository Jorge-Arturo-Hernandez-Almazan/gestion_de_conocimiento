<template>

        <div class="content-wrapper">
          <!-- <div class="col-lg-12 "> -->

      <!-- Breadcrumb -->
			<div class="col-12 mt-4">
				<div class="page-header">
					
					<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
						<h1 class="page-title"> Repositorio de imagenes </h1>
						<ul class="quick-links ml-auto">
						<li>
							<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> </span>  <span style="color: #bdb9bd"> Recursos </span> 
						</li>
						</ul>
				  </div>
				</div>
			</div>
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">Recursos</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right" style="background: white">
                        <button type="button" class="btn btn-primary btn-lg float-right" style="border-radius: 25px" data-toggle="modal"
                        data-target="#registrarImagen" @click="cambiarModo">
                            <i class="fas fa-cloud-upload-alt"></i> Cargar Imagen
                        </button>
                    </ol>
                </div><!-- /.col -->
            </div>
           
					<div class="table-responsive">
         
				  	<v-table 
						   :data="imagenes" 
						   :filters="filters" 
						   :currentPage.sync="currentPage"
							:pageSize="5"
							@totalPagesChanged="totalPages = $event"
						   style="width:100%"
						   class="table mb-2"
							 >
					  
					<thead slot="head" class="thead-dark">
						<v-th sortKey="nombre" defaultSort="desc">Nombre</v-th>
						<v-th sortKey="padre" defaultSort="desc"> Imagen </v-th>
						
						<!-- <th>Opciones</th> -->
					</thead>
					<tbody slot="body" slot-scope="{displayData}">
						<tr v-for="imagenes in displayData" :key="imagenes.id">
					 
							<td  calss="text-left">{{imagenes.alias}}</td>
							<td calss="text-left"><img :src="'/imagenes/preguntas/'+imagenes.nombre"
                                                    style=" width: 15em;"></td>
							
							
						</tr>
					</tbody>
				  </v-table>
						
					</div>
					
					  <smart-pagination
						:currentPage.sync="currentPage"
						:totalPages="totalPages"
					  />
					  
                    
					  <p> Total de registros: {{ this.imagenes.length }} </p>
                    
                  </div>
					
					<div class="modal animated animate__bounceIn" id="registrarImagen" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true" data-focus="false">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" >
                    <div class="modal-body">

                        <h3 class="modal-title" id="exampleModalLabel"> Registrar imagen </h3>

                        <p class="text-left mb-0"> <b> Nombre de la imagen: </b> </p>
                        <input rows="1" id="alias" name="alias" type="text" class="form-control"
                            placeholder="Nombre" @focus="limpiarCampos('alias')"  >
                        <span id="msjInputNombre"> </span>

                        <p class="text-left mb-0"> <b> Imagenes: </b> </p>
                        <div @dragover="dragover" @dragleave="dragleave" @drop="drop"
                            style="border: 0.5px dashed black; width: 100%;">
                            <input type="file" id="assetsFieldHandle" name="profile_pic"
                                class="w-px h-px opacity-0 overflow-hidden absolute"
                                @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png"
                                hidden />
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="assetsFieldHandle" class="block cursor-pointer">
                                        <div>
                                            <center>
                                            <p id="mensajito" class="text-center">
                                                <i class="fas fa-cloud-download-alt"></i> Arrastra la imagen
                                                o da clic aquí para subir
                                            </p>
                                            </center>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <table style="list-style-type: none; width:100%"
                                v-if="this.subidor.imagenesVistaPrevia.length" v-cloak>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Acción</th>
                                </tr>
                                <tr v-for="imagen in subidor.imagenesVistaPrevia">
                                    <td class="d-flex justify-content-center"> <img :src="imagen.imagen"
                                            style=" width: 15em;"> </td>
                                    <td>
                                    <a  @click="remove(imagen)" title="Eliminar la imagen"> <i class="fas fa-trash-alt" style="color: #ff6258"></i> </a>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <button type="button" class="btn btn-secondary float-right btn-lg mt-4" data-dismiss="modal" style="border-radius: 25px">  <i class="fas fa-ban"></i> Cancelar
                        </button>
                        <button type="button" @click="btnGuardar" class="btn btn-primary float-right btn-lg mt-4 mr-2" style="border-radius: 25px"> <i class="fas fa-save"></i> Guardar
                        </button>

                    </div>
                </div>
            </div>
          </div>
          
        </div>
              <!--</div>-->
              
      </div>
</template>

<script>
import axios from 'axios'
import Cargador from '@/components/subirImagenes';


export default{	
	data(){
		return {
			filters: {
			  nombre: { value: '', keys: ['nombre'] }
				//nombre: { value: '', keys: ['padre'] }
			},
      nombre2: "",
			currentPage: 1,
			totalPages: 0,
      
      form_data: {},
      
      imagenes: [],
      subidor: {},
      todasLasImagenes: [],
      totalImagenesEnPregunta: 0,
      ultimaImagenEnPreguntaAEditar: 0,
      imagenesParaDesplegarEnModal: []
      }
	},
	created(){
    this.subidor = new Cargador();
  },
  
  mounted(){
		this.getImagenes();
	},
  
	methods: {
		ordenar(){
			
		},
    
    onChange(e) {
        this.subidor.onChange(e);
    },
    remove(imagen) {
        this.subidor.remove(imagen); 
    },
    dragover(event) {
        this.subidor.dragover(event);
    },
    dragleave(event) {
      this.subidor.dragleave(event);
    },
    drop(event) {
        this.subidor.drop(event);
    },
    
    cambiarModo() {
        let inputnombreImg = document.getElementById("alias");
        inputnombreImg.value = "";
        this.subidor.imagenesVistaPrevia = [];
        this.subidor.imagenes = [];
        this.subidor.form_data = {};

        this.limpiarCampos("alias");
    },
    
    async btnGuardar() {
        let inputnombreImg = document.getElementById("alias");
        let msjInputNombre = document.getElementById("msjInputNombre");
        // Pasar los valores del formuario a las propiedades del objeto de vue.
        this.nombre2 = inputnombreImg.value.toString();
        console.log(this.nombre2);
        //this.id_tema = selectTema.value;
        if (this.nombre2 == "") {
            // Alertar al usuario sobre campos vacios
            if (this.nombre2 == "") {
                selectTema.style.border = "1px solid #ff6258";
                msjSelectTema.innerHTML = "Este dato es obligatorio";
                msjSelectTema.style.color = "#ff6258";
            }
        } else {
            await this.subidor.subirImagen(this.nombre2);
            $('#registrarImagen').modal('hide');
            this.getImagenes();
        }
    },
    
    limpiarCampos(id) {
        let inputnombreImg = document.getElementById("alias");
        let msjInputNombre = document.getElementById("msjInputNombre");
        if (id == "alias") {
            inputnombreImg.style.border = "1px solid #dee2e6";
            msjInputNombre.innerHTML = "";
        }
    },
    
    async getImagenes(){
      var i;
      axios({method: 'GET', url: 'images/all'}).then(
				result=>{
          this.imagenes = result.data;
          console.log(result);
        })
		//Fin metodos
		}
  }
}

</script>