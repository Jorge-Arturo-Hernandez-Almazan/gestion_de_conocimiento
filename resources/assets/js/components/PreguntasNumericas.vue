<template>

        <div class="">
			
			<div class="col-12 mt-4">
					<div class="page-header">
						
						<div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
							<h1 class="page-title"> Preguntas numericas </h1>
							<ul class="quick-links ml-auto">
							<li>
								<span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i> 								</span>  <span style="color: #bdb9bd">  Preguntas  <i class="fas fa-angle-right"></i> </span> Preguntas numericas
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
							<h3> Lista de preguntas numericas </h3>
						</div>
						<div class="col-md-6">
							
							
							<button
							  type="button"
							  class="btn btn-success btn-fw float-right"
							  @click="btnGuardar"
							> <i class="fas fa-plus-circle"></i>  Registrar pregunta</button>
							
						</div>	
					</div>
				  
				  
				  <div class="table-responsive">
					
					<label>Busqueda por pregunta: </label>
      				<input class="form-control mb-2" v-model="filters.pregunta.value"/>
					  
					<div class="table-responsive">
						
				  	<v-table 
						   :data="preguntaNumerica" 
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
						<v-th sortKey="opcion" defaultSort="desc">Respuesta</v-th>
						
						<th>Margen</th>
                      	<th>Margen arriba</th>
                      	<th>Margen abajo</th>
						
						<th>Opciones</th>
					</thead>
					<tbody slot="body" slot-scope="{displayData}">
						<tr v-for="preguntaNumerica in displayData" :key="preguntaNumerica.id">
						 <!-- <td class="text-center">{{-- preguntaNumerica.tipo --}}</td>-->
                      <td class="text-center">{{preguntaNumerica.pregunta}}</td>
                      <td class="text-center">{{preguntaNumerica.tema}}</td>
                       <td class="text-center"><span class="badge badge-success"> {{preguntaNumerica.opcion}} </span></td>
                      <td class="text-center">{{preguntaNumerica.rango}}</td>
                      
                      <td v-if="preguntaNumerica.aplicableArriba == true" class="text-center">SI</td>
                       <td v-else class="text-center">No</td>
                        <td v-if="preguntaNumerica.aplicableAnbajo == true" class="text-center">SI</td>
                       <td v-else class="text-center">No</td>
						<td>
							  <button
                          class="btn btn-warning"
                          @click="btnEditar(preguntaNumerica.id_pregunta,preguntaNumerica.pregunta,preguntaNumerica.opcion,preguntaNumerica.tipo,preguntaNumerica.id_tema)"
                        ><i class="fas fa-pen"></i></button>
                        <button
                          class="btn btn-danger"
                          @click="eliminar(preguntaNumerica.id_pregunta)"
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
        </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pregunta: [],
      preguntaNumerica: [],
      id: "",
      id_tema: "",
      respuesta: "",
      pregunta: "",
      margen: "",
      margend:"",
      arriba:null,
      abajo:null,
      tipo: "",
      temasSeleccionado: {},
      temas: [],
      id: "",
      nombre_tema: "",
      nivel: "",
		filters: {
		  pregunta: { value: '', keys: ['pregunta', 'tema'] }
		},
		currentPage: 1,
		totalPages: 0
    };
  },
  mounted() {
     this.getPreguntaNumerica(), this.getTemas(),this.getMargen();
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
 
    getPreguntaNumerica() {
      axios({ method: "GET", url: "/pregunta/showPN" }).then(
        result => {
          //console.log(result.data);
          this.preguntaNumerica = result.data[0];
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
    
    getMargen() {
      ///Funcion para mostrar los temas
      axios({ method: "GET", url: "/configuracionCuestionario/margen" }).then(
        result => {
          //console.log(result.data);
          this.margend = result.data.rango_por_defecto;
          
        },
        error => {
          console.error(error);
        }
      );
    },
    guardarPregunta(pregunta, respuesta,margen,arriba,abajo, tipo, id_tema) {
      ///Funcion para guardar los temas
      axios
        .post("/pregunta/addNumerica", {
          pregunta: pregunta,
          respuesta: respuesta,
          margen:margen,
          arriba:arriba,
          abajo:abajo,
          tipo: tipo,
          id_tema: id_tema
        })
        .then(res => {
          this.tipo = "";
          this.respuesta = "";
          this.pregunta = "";
         this.margen = "";
          this.id_tema = "";
          this.getPreguntaNumerica();
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
					<input id="respuesta" class="swal2-input"  placeholder="respuesta">
         <input id="margen" class="swal2-input" value="${this.margend}"  placeholder="margen"> 
        <label>Aplicar el margen de error a la respuesta</label>
        <input type="checkbox" id="arriba" name="arriba" value="si" checked>
        <label for="male">Aplicar hacia arriba</label><br>
        <input type="checkbox" id="abajo" name="abajo" value="si" checked>
        <label for="male">Aplicar hacia abajp</label><br>
					<br>
					<label for="id_tema_2">Elije a que tema es correspondiente:</label>
					<select id="id_tema" value="${this.temas}" name="temas" class="swal2-input">
						<option value="">Tema</option>
						${this.temas[0].map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
					</select>
					<br>
					<!-- <label for="tipo">Elige un tipo de pregunta:</label>
					<select id="tipo">
						<option value="2">Numérica</option>
					</select> 

					<div class="flex w-full h-screen items-center justify-center text-center" id="app">
					  <div class="p-12 bg-gray-100 border border-gray-300" @dragover="dragover" @dragleave="dragleave" @drop="drop">
						<input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
						  class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" />

						<label for="assetsFieldHandle" class="block cursor-pointer">
						  <div>
							Explain to our users they can drop files in here 
							or <span class="underline">click here</span> to upload their files
						  </div>
						</label>
						<ul class="mt-4" v-if="this.filelist.length" v-cloak>
						  <li class="text-sm p-1" v-for="file in filelist">
							${ file.name }<button class="ml-2" type="button" @click="remove(filelist.indexOf(file))" title="Remove file">remove</button>
						  </li>
						</ul>
					  </div>
					</div>



					--> `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        confirmButtonColor: "#1cc88a",
        cancelButtonColor: "#3085d6",
		  cancelButtonText: 'Cancelar',
        preConfirm: () => {
          return [
            (this.pregunta = document.getElementById("pregunta").value),
            (this.respuesta = document.getElementById("respuesta").value),
             (this.margen = document.getElementById("margen").value),
             (this.arriba = document.getElementById("arriba").checked),
             (this.abajo = document.getElementById("abajo").checked),
            (this.tipo = 2),
            (this.id_tema = document.getElementById("id_tema").value)
          ];
        }
      });
      if (
        this.id_tema == "" ||
        this.pregunta == "" ||
        this.respuesta == "" ||
        this.margen == "" ||
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
          this.margen,
          this.arriba,
          this.abajo,
          this.tipo,
          this.id_tema
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
              cat => `<option value="${cat.id}" id="tema_${cat.id}>${cat.nombre_tema}</option>`
            )}
					</select>
					<br>
					<label for="tipo">Elige un tipo de pregunta:</label>
					<select id="tipo">
						<option value="2">Numérica</option>
					</select>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Editar",
        confirmButtonColor: "#1cc88a",
        cancelButtonColor: "#3085d6",
		  cancelButtonText: 'Cancelar',
        onOpen: () => {
          //document.getElementById("tema_"+id_tema).setAttribute("selected","");
          //console.log(this.temas)
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
          this.getPreguntaNumerica();
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
		  confirmButtonText: 'Aceptar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			
		  if (result.value) {
			  
			  
			  axios
				.post("pregunta/delete", { id: id })
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
				  
				  this.$swal.fire(
					  'Pregunta eliminada',
					  'La pregunta ha sido eliminada con exito.',
					  'success'
					)
				  

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
		
      /*axios
        .post("pregunta/delete", { id: id })
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