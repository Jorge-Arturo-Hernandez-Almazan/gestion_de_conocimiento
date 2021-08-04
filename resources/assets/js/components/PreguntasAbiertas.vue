<template>
    <div class="">
        <!-- Breadcrum -->
        <div class="col-12 mt-4">
            <div class="page-header">
                <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                    <h1 class="page-title"> Preguntas abiertas </h1>
                    <ul class="quick-links ml-auto">
                        <li>
                            <span style="color: #bdb9bd"> 
								                <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i>
                            </span> 
                            <span style="color: #bdb9bd"> 
                              Preguntas <i class="fas fa-angle-right"></i> 
                            </span>
                            Preguntas abiertas
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--Cuerpo de la página -->
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
                        <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                            <h2 class="page-title"> Listado de preguntas abiertas</h2>
                            <ul class="quick-links ml-auto">
                                <li>
                                    <button type="button" class="btn btn-primary float-right btn-lg"
                                         data-toggle="modal" data-target="#registrarPregunta" @click="cambiarModo">
                                        <i class="fas fa-edit"></i> Registrar pregunta
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <!-- Busqueda -->
                        <label> <b> Busqueda por pregunta: </b> </label>
                        <input class="form-control mb-2" v-model="filters.pregunta.value" placeholder="Ej. ¿Cuánto es 2+2?" />

                        <!-- Tabla -->
                        <v-table :data="preguntaAbierta" :filters="filters" :currentPage.sync="currentPage"
                            :pageSize="5" @totalPagesChanged="totalPages = $event" style="width:100%"
                            class="table mb-2">
                            <thead slot="head" class="thead-dark">
                                <v-th sortKey="pregunta" defaultSort="desc" style="width:10%">Pregunta</v-th>
                                <v-th sortKey="tema" defaultSort="desc">Tema</v-th>
                                <v-th sortKey="opcion" defaultSort="desc">Respuesta</v-th>
								<th> Imagenes </th>
                                <th>Opciones</th>
                            </thead>
                            <tbody slot="body" slot-scope="{displayData}">
                                <tr v-for="preguntaAbierta in displayData" :key="preguntaAbierta.id">
                                    <td v-html="wrapText(preguntaAbierta.pregunta)">
 
                                      
                                      

                                    </td>
                                    <td >
                                        {{preguntaAbierta.tema}}
                                    </td>
                                    <td >
                                        {{preguntaAbierta.opcion}} 
                                    </td>
									
                                    <td>
                                      
                                      <button type="button" class="btn btn-primary"
                                           data-toggle="modal" data-target="#modalParaVerImagenes" @click="desplegarImagenesEnModal(preguntaAbierta.imagenes)">
                                          <i class="fas fa-eye"></i>  Ver
                                      </button>
                                      
                                      
                                    </td>
                                  
                                    <td>
                                        <button class="btn btn-warning" 
                                            @click="btnEditar(preguntaAbierta.id_pregunta,preguntaAbierta.pregunta,preguntaAbierta.opcion,preguntaAbierta.tipo,preguntaAbierta.id_tema, preguntaAbierta.imagenes)" data-toggle="modal" data-target="#registrarPregunta">
                                            <i class="fas fa-pen"></i> Editar
                                        </button>
                                        <button class="btn btn-danger" @click="eliminar(preguntaAbierta.id_pregunta, preguntaAbierta.imagenes)">
                                            <i class="fas fa-trash"></i> Eliminar
                                        </button>
                                    </td>
                                  
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                    <smart-pagination :currentPage.sync="currentPage" :totalPages="totalPages" />
					
					
					<div class="modal fade" id="registrarPregunta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									
									<h5 v-if="modoEdicion" class="modal-title" id="exampleModalLabel"> Actualizar pregunta  </h5>
									<h5 v-else class="modal-title" id="exampleModalLabel"> Registrar pregunta  </h5>
									
									
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
									<div class="modal-body">
										
										<p class="text-left mb-0"> <b> Pregunta: </b></p>
										<textarea id="pregunta" type="text" class="form-control mt-0 mb-0" placeholder="Pregunta" @focus="limpiarCampos('pregunta')"></textarea>
										<span id="msjInputPregunta"> </span>
										
										<p class="text-left mt-2 mb-0"> <b> Respuesta: </b> </p>
										<textarea id="respuesta" type="text" class="form-control mt-0 mb-0" placeholder="Respuesta" @focus="limpiarCampos('respuesta')"></textarea>
										<span id="msjInputRespuesta"> </span>
										
										<p class="text-left mt-2 mb-0"> <b>  Tema: </b> </p>
										<select id="id_tema" value="${this.temas}" name="temas" class="form-control mt-0 mb-0" @focus="limpiarCampos('tema')">
											<option value="">Tema</option>
											
											<option v-for="t in temas[0]" :value="t.id">
												{{ t.nombre_tema }}
											</option>
										</select>
										<span id="msjSelectTema"> </span>
										
										<p class="text-left mt-2 mb-0"> <b> Imagenes: </b> </p>
										<div  @dragover="dragover" @dragleave="dragleave" @drop="drop" style="border-style: dashed; width: 100%;" >
											<input type="file" id="assetsFieldHandle"  class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" hidden />
											<div class="row">
												<div class="col-md-12">
													<label for="assetsFieldHandle" class="block cursor-pointer">
														<div >
															<p id="mensajito" class="text-center">
																<i class="fas fa-cloud-download-alt"></i> Arrastra la imagen o da clic aquí para subir 
															</p>
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
													<td class="d-flex justify-content-center"> <img :src="imagen.imagen" style=" width: 15em;"> </td>
													<td><button class="btn btn-danger" type="button" @click="remove(imagen)" title="Remove file"> <i class="fas fa-trash-alt"></i> </button> </td>
												</tr>
											</table>
										</div>
										
									</div>
								
									<div class="modal-footer">
										
										<button v-if="modoEdicion" type="button" @click="editar"  class="btn btn-primary"> Editar </button>
										<button v-else type="button" @click="btnGuardar"  class="btn btn-primary"> Guardar </button>
										<button type="button" class="btn btn-secondary" data-dismiss="modal"> Cancelar </button>
									</div>
							</div>
						</div>
					</div>
                  
                  
                  
                  <div class="modal fade" id="modalParaVerImagenes" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel"> Imagenes adjuntas en la pregunta</h5>


                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                          <div class="modal-body">

                            <div  style="width: 100%;" >
                              
                              <table style="list-style-type: none; width:100%">
                                <tr>
                                  <th>
                                    Imagen
                                  </th>
                                  <th>
                                    Nombre
                                  </th>
                                </tr>
                                <tr v-for="imagen in imagenesParaDesplegarEnModal">
                                  <td class="d-flex justify-content-center"> 
                                    <img :src="'/imagenes/preguntas/'+imagen.nombre" style=" width: 15em;"> 
                                  </td>
                                  <td>
                                    {{ imagen.alias }}
                                  </td>
                                </tr>
                                
                                
                                
                              </table>
                              
                              <span v-if="imagenesParaDesplegarEnModal.length == 0" class="text-center"> Está pregunta no tiene imagenes adjuntas </span>
                              
                              
                            </div>

                          </div>

                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"> Cerrar </button>
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
    import axios from "axios";

    export default {
        data() {
            return {
                pregunta: [],
                preguntaAbierta: [],
                id: "",
                id_tema: "",
                id_imagen: "",
                idUsuario: " ",
                respuesta: "",
                pregunta: "",
                tipo: "",
                temasSeleccionado: {},
                temas: [],
                id: "",
                nombre_tema: "",
                imagenes: [],
                nivel: "",
                filters: {
                    pregunta: {
                        value: '',
                        keys: ['pregunta', 'tema']
                    }
                },
                currentPage: 1,
                totalPages: 0,
				filelist: [],
				form_data: {},
				imagenesVistaPrevia: [],
				contadorImagen: 0,
				modoEdicion: 0,
				todasLasImagenes: [],
				imagenesAEliminar: [],
				totalImagenesEnPregunta: 0,
				numeroDePreguntaAEditar: 0,
				ultimaImagenEnPreguntaAEditar: 0,
              imagenesParaDesplegarEnModal: []
            };
        },
        async mounted() {
            await this.getPreguntaAbierta();
            this.getTemas();
            let uri = window.location.href;
            if (uri.includes("?")) {
                uri = window.location.href.split('?');
                var fil = uri[1].split('=')[1];
                this.filters.pregunta.value = fil.replace(/%20/g, " ");
            }
        },
        methods: {
          
          
          wrapText(str) {
              const palabrasSinEspacios = str.split(" ");
              let textoDePregunta = "";
              for(let i=0; i < palabrasSinEspacios.length; i++){
                textoDePregunta = textoDePregunta + " " + palabrasSinEspacios[i];
                if( (i % 7) == 0 && i != 0){
                   textoDePregunta = textoDePregunta + "<br>"
                }
              }
              return textoDePregunta;
          },
          
          async desplegarImagenesEnModal(imagenes){
            this.imagenesParaDesplegarEnModal = imagenes;
            await console.log(imagenes);
          },
          
          
			onChange(e){			
				const file = e.target.files[0];
				let url = URL.createObjectURL(file);
				let imgp = document.getElementById("imgp");
				this.imagenes.push(file);
				this.acomodarImagen(url, 0, null);
				
				
				console.log(this.imagenesAEliminar);
				console.log(this.imagenesVistaPrevia);
				
			},
			remove(imagen) {
				let i = this.imagenesVistaPrevia.indexOf(imagen);
				
				
				if( imagen.hasOwnProperty('eliminar') ){
					this.imagenesAEliminar.push(imagen);
				}else{
					this.imagenes.splice(i,1);
				}
				
				this.imagenesVistaPrevia.splice(i,1);
				//this.imagenes.splice(i,1);
				
				console.log(this.imagenesAEliminar);
				console.log(this.imagenesVistaPrevia);
				
				
			},
			dragover(event) {
			  event.preventDefault();
				event.currentTarget.style.backgroundColor = 'green';
			},
			dragleave(event) {
			  event.currentTarget.style.backgroundColor = 'white';
			},
			async acomodarImagen(imagen, vaAEliminarse, idImagen){
				
				if( vaAEliminarse === 1){
					await this.imagenesVistaPrevia.push({imagen: imagen, id: this.contadorImagen, eliminar:true, idImagen: idImagen});
					this.contadorImagen++;
				}else{
					await this.imagenesVistaPrevia.push({imagen: imagen, id: this.contadorImagen});
					this.contadorImagen++;
				}
				
			},
			drop(event) {
				event.preventDefault();
				let self = this
				for(let i=0; i < event.dataTransfer.files.length; i++){
					let reader = new FileReader();
					reader.readAsDataURL(event.dataTransfer.files[i]);
					this.imagenes.push(event.dataTransfer.files[i]);
					reader.onload = function(){
						self.acomodarImagen(reader.result, 0, null);
					};
				}
				event.currentTarget.style.backgroundColor = 'white';
				
				console.log(this.imagenesAEliminar);
				console.log(this.imagenesVistaPrevia);
			},
          
          
			async subirImagenes(id){
				let extension = "";
				let ruta = "/subirr";
				let numeroPregunta = id;
				let nombreImagen = "";
				let alias = "";
				
				//this.numeroDePreguntaAEditar, 
				//this.ultimaImagenEnPreguntaAEditar 
				
				if( this.modoEdicion === 1){
				   
					let conteoActualImagenes =  parseInt(this.ultimaImagenEnPreguntaAEditar) + 1;
					
					if( this.imagenes.length > 0 ){
						for( let i = 0; i  < this.imagenes.length;i++){
							
							extension = this.imagenes[i].name.split('.')[1];
							nombreImagen = new Date().getTime() + "_" + i + "." + extension;
							alias = "imagen_pregunta_" + numeroPregunta + "_" + ( conteoActualImagenes ) + "." + extension;
							this.form_data = new FormData();
							this.form_data.append('imagen', this.imagenes[i] );
							this.form_data.append('csrf-token', "{{ csrfToken }}");
							this.form_data.append('alias', alias);
							this.form_data.append('nombreImagen', nombreImagen);
							this.form_data.append('idPregunta', id);
							await axios.post(ruta, this.form_data).then((res) => {
								console.log("La subida se ha completado con exito");
							}).catch(function (error) {
								console.log(error);
							});
							
							conteoActualImagenes ++;
						}  
					}
					
					
					
					
				}else{
					
					if( this.imagenes.length > 0 ){
						for( let i = 0; i  < this.imagenes.length;i++){
							extension = this.imagenes[i].name.split('.')[1];
							nombreImagen = new Date().getTime() + "_" + i + "." + extension;
							alias = "imagen_pregunta_" + numeroPregunta + "_" + (i+1) + "." + extension;
							this.form_data = new FormData();
							this.form_data.append('imagen', this.imagenes[i] );
							this.form_data.append('csrf-token', "{{ csrfToken }}");
							this.form_data.append('alias', alias);
							this.form_data.append('nombreImagen', nombreImagen);
							this.form_data.append('idPregunta', id);
							await axios.post(ruta, this.form_data).then((res) => {
								console.log("La subida se ha completado con exito");
							}).catch(function (error) {
								console.log(error);
							});
						}  
					}
				
				}
				
        return true
				
			},
			
            
            async getPreguntaAbierta() {
                await axios({
                  method: "GET",
                  url: "/obtenerTodasLasImagenes"
                }).then(
                  result => {
                    this.todasLasImagenes = result.data.todasImagenes[0];
                  },
                  error => {
                    console.error(error);
                  }
                );
              
                await axios({
                  method: "GET",
                  url: "/pregunta/showPAB"
                }).then(
                  result => {
                    this.preguntaAbierta = result.data[0];
                  },
                  error => {
                    console.error(error);
                  }
                );

              
                for(let i=0; i < this.preguntaAbierta.length; i++){

                  this.preguntaAbierta[i].imagenes = [];
                  for(let j=0; j < this.todasLasImagenes.length; j++){
                    if( this.preguntaAbierta[i].id_pregunta == this.todasLasImagenes[j].idpregunta ){
                      this.preguntaAbierta[i].imagenes.push( this.todasLasImagenes[j] );
                    }
                  }

                }
				
            },

            // Funcion para mostrar los temas
            getTemas() {
                axios({
                    method: "GET",
                    url: "/tema/all"
                }).then(
                    result => {
                        this.temas = result.data;
                    },
                    error => {
                        console.error(error);
                    }
                );
            },

            // Funcion para guardar los temas
            async guardarPregunta(pregunta, respuesta, tipo, id_tema) {
				
                    await axios
                        .post("/pregunta/add", {
                            pregunta: pregunta,
                            respuesta: respuesta,
                            tipo: tipo,
                            id_tema: id_tema
                        })
                            .then( async res => {
                                this.tipo = "";
                                this.respuesta = "";
                                this.pregunta = "";
                                this.id_tema = "";

                      
                                await this.subirImagenes(res.data.ultimo_id);

                                await this.getPreguntaAbierta();
                      
                                $('#registrarPregunta').modal('toggle');

                                this.$swal.fire({
                                  type: "success",
                                  title: res.data.mensaje
                                });

                                


                        })
                        .catch(err => {
                            console.log(err);
                        });

            },

            btnGuardar() {
				
                // Referencia de los elementos del formulario.
                let inputPregunta = document.getElementById("pregunta");
                let inputRespuesta = document.getElementById("respuesta");
                let selectTema = document.getElementById("id_tema");
                let msjSelectTema = document.getElementById("msjSelectTema");
                let msjInputRespuesta = document.getElementById("msjInputRespuesta");
                let msjInputPregunta = document.getElementById("msjInputPregunta");

                // Pasar los valores del formuario a las propiedades del objeto de vue.
                this.pregunta = inputPregunta.value;
                this.respuesta = inputRespuesta.value.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "")
                this.tipo = 1
                this.id_tema = selectTema.value;

                 if ( this.id_tema == "" || this.pregunta == "" || this.respuesta == "" ) {
                            // Alertar al usuario sobre campos vacios

                    if( this.id_tema == ""){
                      selectTema.style.border = "1px solid #ff6258";
                      msjSelectTema.innerHTML = "Este dato es obligatorio";
                      msjSelectTema.style.color = "#ff6258";
                    }

                    if( this.pregunta == "" ){
                      inputPregunta.style.border = "1px solid #ff6258";
                      msjInputPregunta.innerHTML = "Este dato es obligatorio";
                      msjInputPregunta.style.color = "#ff6258";
                    }

                    if( this.respuesta == "" ){
                      inputRespuesta.style.border = "1px solid #ff6258";
                      msjInputRespuesta.innerHTML = "Este dato es obligatorio";
                      msjInputRespuesta.style.color = "#ff6258";
                    }
					   
					
					
					
                }else {
					
                    this.guardarPregunta(
                        this.pregunta,
                        this.respuesta,
                        this.tipo,
                        this.id_tema
                    );
                
				}
				
				//console.log("Im in the function btnGuardar");
            },
			
			limpiarCampos(id){
				
              let inputPregunta = document.getElementById("pregunta");
              let inputRespuesta = document.getElementById("respuesta");
              let selectTema = document.getElementById("id_tema");
              let msjSelectTema = document.getElementById("msjSelectTema");
              let msjInputRespuesta = document.getElementById("msjInputRespuesta");
              let msjInputPregunta = document.getElementById("msjInputPregunta");

              if( id == "tema"){
                selectTema.style.border = "1px solid #dee2e6";
                msjSelectTema.innerHTML = "";
              }

              if( id == "pregunta" ){
                inputPregunta.style.border = "1px solid #dee2e6";
                msjInputPregunta.innerHTML = "";
              }

              if( id == "respuesta" ){
                inputRespuesta.style.border = "1px solid #dee2e6";
                msjInputRespuesta.innerHTML = "";
              }
				
				
			},

      btnEditar(id, pregunta, respuesta, tipo, id_tema, imagenes) {
				
              this.totalImagenesEnPregunta = (imagenes.length+1);
              this.imagenesVistaPrevia = [];
              this.imagenes = [];
              let inputPregunta = document.getElementById("pregunta");
              let inputRespuesta = document.getElementById("respuesta");
              let selectTema = document.getElementById("id_tema");
              this.modoEdicion = 1;
              this.id = id;
              inputRespuesta.value = respuesta;
              inputPregunta.value = pregunta;
              selectTema.value = id_tema;

              let numeroMayorDeImagen = 0;
              for(let i=0; i < imagenes.length; i++){
                this.acomodarImagen("/imagenes/preguntas/"+imagenes[i].nombre, 1, imagenes[i].idImagen);	
                if(imagenes[i].alias.split("_")[3].split(".")[0] > numeroMayorDeImagen){
                   numeroMayorDeImagen = imagenes[i].alias.split("_")[3].split(".")[0];
                }

              }
              this.ultimaImagenEnPreguntaAEditar = numeroMayorDeImagen;
				
      },

            
			
			cambiarModo(){
				let inputPregunta = document.getElementById("pregunta");
				let inputRespuesta = document.getElementById("respuesta");
				let selectTema = document.getElementById("id_tema");
				
				inputRespuesta.value = "";
				inputPregunta.value = "";
				selectTema.value = "";
				
				this.imagenesVistaPrevia = [];
				this.imagenes = [];
				
				this.modoEdicion = 0;
        
			},
          
          editar() {
              // Referencia de los elementos del formulario.
              let inputPregunta = document.getElementById("pregunta");
              let inputRespuesta = document.getElementById("respuesta");
              let selectTema = document.getElementById("id_tema");
              let msjSelectTema = document.getElementById("msjSelectTema");
              let msjInputRespuesta = document.getElementById("msjInputRespuesta");
              let msjInputPregunta = document.getElementById("msjInputPregunta");

              // Pasar los valores del formuario a las propiedades del objeto de vue.
              this.pregunta = inputPregunta.value;
                      this.respuesta = inputRespuesta.value.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "")
                      this.tipo = 1
                      this.id_tema = selectTema.value;

                      
                if ( this.id_tema == "" || this.pregunta == "" || this.respuesta == "" ) {
                          // Alertar al usuario sobre campos vacios

                          if( this.id_tema == ""){
                            selectTema.style.border = "1px solid #ff6258";
                            msjSelectTema.innerHTML = "Este dato es obligatorio";
                            msjSelectTema.style.color = "#ff6258";
                          }

                          if( this.pregunta == "" ){
                            inputPregunta.style.border = "1px solid #ff6258";
                            msjInputPregunta.innerHTML = "Este dato es obligatorio";
                            msjInputPregunta.style.color = "#ff6258";
                          }

                          if( this.respuesta == "" ){
                            inputRespuesta.style.border = "1px solid #ff6258";
                            msjInputRespuesta.innerHTML = "Este dato es obligatorio";
                            msjInputRespuesta.style.color = "#ff6258";
                          }


                }else {
                      //console.log(this.id, this.pregunta, this.respuesta, this.tipo, this.id_tema);
                      axios.post("/pregunta/update", {
                        id: this.id,
                        pregunta: this.pregunta,
                        respuesta: this.respuesta,
                        tipo: this.tipo,
                        id_tema: this.id_tema,
                        imagenesAEliminar: this.imagenesAEliminar

                      }) .then(async res => {

                        await this.subirImagenes(this.id);
                        
                        await this.getPreguntaAbierta();

                        this.id = "";
                        this.tipo = "";
                        this.respuesta = "";
                        this.pregunta = "";
                        this.id_tema = "";

                        this.$swal.fire({
                          type: "success",
                          title: "¡Pregunta actualizada con éxito!"
                        });

                        $('#registrarPregunta').modal('toggle'); 

                        
                        
                      })
                      .catch(err => {
                        console.error(err);
                      });
                }
            },
          eliminar(id, imagenes) { 
            
               this.$swal.fire({
                    title: '¿Está seguro de eliminar el registro?',
                    text: "Esto no podrá revertirse",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.value) {
                            axios.post("/pregunta/delete", {
                                id: id,
								                imagenesAEliminar: imagenes
                            })
                            .then(res => {
								                
                                console.log(res);
                              
                                this.id = "";
                                this.getPreguntaAbierta();
                                const Toast = this.$swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timer: 3000
                                });
                                this.$swal.fire({
                                    type: "success",
                                    title: "¡Pregunta Eliminada!"
                                });
                            
							              })
                            .catch(err => {
                                console.log(err);
                                this.$swal({
                                    type: "info",
                                    title: "Error al eliminar"
                                });
                            });
                    }
                })
            }
        }
    };
</script>



