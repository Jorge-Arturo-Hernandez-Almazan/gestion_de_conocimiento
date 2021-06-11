<template>
        <div class="row">
			
			<div class="col-12 mt-2">
					<div class="page-header">
						<h3 class="page-title"> Preguntas abiertas </h3>
						<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
							<ul class="quick-links ml-auto">
							<li>
								<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> 								</span>  <span style="color: #bdb9bd">  Preguntas  <i class="fas fa-angle-right"></i> </span> Preguntas abiertas
							</li>
							</ul>
					  </div>
					</div>
				</div>
			
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
				  
				  	<div class="row">
						<div class="col-md-6">
							<h3> Lista de preguntas abiertas </h3>
						</div>
						<div class="col-md-6">
							
							<button
							  type="button"
							  class="btn btn-success float-right"
							 	@click="btnGuardar"
								data-toggle="modal" data-target="#exampleModal"
									
							> <i class="fas fa-plus-circle"></i> Registrar pregunta 
							</button>
							
						</div>	
					</div>
				  
      				
				  	
						
					<div class="table-responsive">
						
						<label>Busqueda por pregunta: </label>
      				<input class="form-control mb-2" v-model="filters.pregunta.value"/>
						
				  	<v-table 
						   :data="preguntaAbierta" 
						   :filters="filters" 
						   :currentPage.sync="currentPage"
							:pageSize="5"
							@totalPagesChanged="totalPages = $event"
						   style="width:100%"
						   class="table mb-2" >
					  
					<thead slot="head" class="thead-dark">
						<!--<v-th sortKey="tipo" defaultSort="desc">Tipo</v-th>-->
						<v-th sortKey="pregunta" defaultSort="desc" style="width:10%">Pregunta</v-th>
						<v-th sortKey="tema" defaultSort="desc">Tema</v-th>
						<v-th sortKey="opcion" defaultSort="desc">Respuesta</v-th>
						<th style="width:10%"> Imagen </th>
						<th>admin</th>
					</thead>
					<tbody slot="body" slot-scope="{displayData}">
						<tr v-for="preguntaAbierta in displayData" :key="preguntaAbierta.id" >
						  <!--<td class="text-center">{{--preguntaAbierta.tipo--}}</td>-->
						  <td class="text-center" >{{preguntaAbierta.pregunta}}</td>
						  <td class="text-center">{{preguntaAbierta.tema}}</td>
						  <td class="text-center">
							  <span class="badge badge-success"> {{preguntaAbierta.opcion}} </span>
						  </td>
							
 		          <td > <img :src="preguntaAbierta.nombreImagen" > </td><td>
						
							  <button
                          class="btn btn-warning"
                          @click="btnEditar(preguntaAbierta.id_pregunta,preguntaAbierta.pregunta,preguntaAbierta.opcion,preguntaAbierta.tipo,preguntaAbierta.id_tema)"
                        ><i class="fas fa-pen"></i></button>
                        <button
                          class="btn btn-danger"
                          @click="eliminar(preguntaAbierta.id_pregunta)"
                        ><i class="fas fa-trash"></i></button>
	
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
import axios from "axios";

export default {
  data() {
    return {
		temaBuscado: '',
      pregunta: [],
      preguntaAbierta: [],
      id: "",
      id_tema: "",
		id_imagen: "",
      idUsuario:" ",
      respuesta: "",
      pregunta: "",
      tipo: "",
      temasSeleccionado: {},
      temas: [],
      id: "",
      nombre_tema: "",
		imagenes : [],
	  
      nivel: "",
		filters: {
		  pregunta: { value: '', keys: ['pregunta','tema'] }
		},
		currentPage: 1,
		totalPages: 0
    };
  },
  mounted() {
	  this.getPreguntaAbierta();
	  this.getTemas();
      this.getUsuario();
	  this.getImages();
	  
	  
	  
	  
	  //let uri = window.location.href.split('?');
	  let uri = window.location.href;
	  
	  if( uri.includes("?") ){
		  uri = window.location.href.split('?');
		var fil = uri[1].split('=')[1];
		this.filters.pregunta.value = fil.replace(/%20/g, " ");
	  
	  }
	  
	  
	  
  },
  methods: {
	  
	  	getImages(){
			axios({ method: "GET", url: "/images/all" }).then(
				result => {
				  //console.log(result.data);
				  this.imagenes = result.data;
				},
				error => {
				  console.error(error);
				}
		  	);
	  	},
	  	GetWrapedText(text, maxlength) {    
			var resultText = [""];
			var len = text.length;    
			if (maxlength >= len) {
				return text;
			}
			else {
				var totalStrCount = parseInt(len / maxlength);
				if (len % maxlength != 0) {
					totalStrCount++
				}

				for (var i = 0; i < totalStrCount; i++) {
					if (i == totalStrCount - 1) {
						resultText.push(text);
					}
					else {
						var strPiece = text.substring(0, maxlength - 1);
						resultText.push(strPiece);
						resultText.push("<br>");
						text = text.substring(maxlength - 1, text.length);
					}
				}
			}
			//return resultText.join("");
		},
	  
	  getUsuario() {
      ///Funcion para mostrar los temas
      
    },
    
    getPreguntaAbierta() {
      axios({ method: "GET", url: "/usuario/geter" }).then(
        result => {
          //console.log("id del usuario "+result.data);
          this.idUsuario = result.data;
          //console.log(this.idUsuario);
          if (this.idUsuario == "1") {
          //console.log("adm");
      }
      axios({ method: "GET", url: "/pregunta/showPAB" }).then(
        result => {
          //console.log(result.data);
          this.preguntaAbierta = result.data[0];
      for(var i=0;i<this.preguntaAbierta.length;i++)
      {
        this.preguntaAbierta[i].nombreImagen="preguntas/"+this.preguntaAbierta[i].nombreImagen;
        //console.log(this.preguntaAbierta[i].nombreImagen);
      }
        },
        error => {
          console.error(error);
        }
      );
        },
        error => {
          console.error(error);
        }
      );
      
    },
	  
    getTemas() {
      ///Funcion para mostrar los temas
      axios({ method: "GET", url: "/tema/all" }).then(
        result => {
          //console.log(result.data);
          this.temas = result.data;
        },
        error => {
          console.error(error);
        }
      );
    },
	   
	  
    guardarPregunta(pregunta, respuesta, tipo, id_tema, id_imagen) {
      ///Funcion para guardar los temas
      axios
        .post("/pregunta/add", {
          pregunta: pregunta,
          respuesta: respuesta,
          tipo: tipo,
          id_tema: id_tema,
		  id_imagen: id_imagen
        })
        .then(res => {
          this.tipo = "";
          this.respuesta = "";
          this.pregunta = "";
          this.id_tema = "";
		  this.id_imagen = "";
          this.getPreguntaAbierta();
          //console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
	  
    btnGuardar: async function() {
      const { value: formValues } = await this.$swal({
        title: "Registrar Pregunta",
        html: `<input id="pregunta" class="swal2-input" placeholder="pregunta">
					<textarea id="respuesta" class="swal2-input"  placeholder="respuesta"></textarea>
					<br>
					<label for="id_tema_2">Elije a que tema es correspondiente:</label>

					<select id="id_tema" value="${this.temas}" name="temas" class="swal2-input">
						<option value="">Tema</option>
						${this.temas[0].map(
              				cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
						)}
					</select>

					<select id="id_imagen" value="${this.imagenes}" name="imagenes" class="swal2-input">
						<option value="">Imagen</option>
						${this.imagenes.map(
              				cat => `<option value="${cat.id}">${cat.alias}</option>`
            			)}
					</select>

					<br>
					<!-- <label for="tipo">Elige un tipo de pregunta:</label>
					<select id="tipo">
						<option value="1">Abierta</option>
					</select> --> `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        confirmButtonColor: "#1cc88a",
        cancelButttonColor: "#3085d6",
        preConfirm: () => {
					
					
					
					
          return [
            (this.pregunta = document.getElementById("pregunta").value),
            (this.respuesta = document.getElementById("respuesta").value.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "")),
            (this.tipo = 1),																 
            (this.id_tema = document.getElementById("id_tema").value),
			  
			  (this.id_imagen = document.getElementById("id_imagen").value)
          ];
        }
      });
      if (
          this.id_tema == "" ||
		  this.id_imagen == "" ||
          this.pregunta == "" ||
          this.respuesta == "" ||
          this.tipo == ""
      ) {
        this.$swal({
          type: "info",
          title: "Datos incompletos"
        });
      } else {
        this.guardarPregunta(
          this.pregunta,
          this.respuesta,
          this.tipo,
          this.id_tema,
			this.id_imagen
        ); //funcion guardarTema
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });
        this.$swal.fire({
          type: "success",
          title: "¡Pregunta Registrada!"
        });
      }
      //if (formValues) {
      //this.$swal(JSON.stringify(formValues))
      //}
    },
	  
	  btnEditar: async function(id, pregunta, respuesta, tipo, id_tema) {
      const { value: formValues } = await this.$swal({
        title: "Editar Pregunta",
        html:
          `<input id="pregunta" class="swal2-input" value="` +
          pregunta +
          `">
					<input id="respuesta" class="swal2-input" value="` +
          respuesta +
          `">
					<br>
        <label for="id_tema5">Elije a que tema es correspondiente:</label>
					<select id="id_tema" value="${this.temas}" name="temas" class="swal2-input">
						<option value="` +
          id_tema +
          `">Tema</option>
						${this.temas[0].map(
              cat => `<option value="${cat.id}" id="tema_${cat.id}">${cat.nombre_tema}</option>`
            )}
					</select>
					<br>
					<label for="tipo">Elige un tipo de pregunta:</label>
					<select id="tipo">
						<option value="1">Abierta/Breve</option>
					</select>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Editar",
        confirmButtonColor: "#1cc88a",
        cancelButttonColor: "#3085d6",
        onOpen: () => {
          document.getElementById("tema_"+id_tema).setAttribute("selected","");
        },
        preConfirm: () => {
          return [
            (this.pregunta = document.getElementById("pregunta").value),
            (this.respuesta = document.getElementById("respuesta").value),
            (this.tipo = document.getElementById("tipo").value),
            (this.id_tema = document.getElementById("id_tema").value)
          ];
        }
      });
      if (
        this.id_tema == "" ||
        this.pregunta == "" ||
        this.respuesta == "" ||
        this.tipo == ""
      ) {
        this.$swal({
          type: "info",
          title: "Datos incompletos"
        });
      } else {
        this.editar(id, this.pregunta, this.respuesta, this.tipo, this.id_tema); //funcion guardarTema
        const Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });
        this.$swal.fire({
          type: "success",
          title: "¡Pregunta Editada!"
        });
      }
      //if (formValues) {
      //this.$swal(JSON.stringify(formValues))
      //}
    },
	  
    editar(id, pregunta, respuesta, tipo, id_tema) {
      axios
        .post("/pregunta/update", {
          id: id,
          pregunta: pregunta,
          respuesta: respuesta,
          tipo: tipo,
          id_tema: id_tema
        })
        .then(res => {
          this.id = "";
          this.tipo = "";
          this.respuesta = "";
          this.pregunta = "";
          this.id_tema = "";
          this.getPreguntaAbierta();
          //console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    eliminar(id) {
      
		this.$swal.fire({
			  title: '¿Estas seguro de eliminar el registro?',
			  text: "Esto no podrá revertirse",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Aceptar'
			}).then((result) => {
				
			  if (result.value) {
				
				////
				
				axios
				.post("/pregunta/delete", { id: id })
				.then(res => {
				  this.id = "";
				  this.getPreguntaAbierta();
				  //console.log(res);
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



				////
			  }
			})
		
		
	/*axios
        .post("/pregunta/delete", { id: id })
        .then(res => {
          this.id = "";
          this.getPreguntaAbierta();
          console.log(res);
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
        });*/
    }
  }
};
</script>