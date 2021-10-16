<template>
    <div class="">
        <div class="col-12 mt-4">
            <div class="page-header">
                <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                    <h1 class="page-title"> Preguntas numericas </h1>
                    <ul class="quick-links ml-auto">
                        <li>
                            <span style="color: #bdb9bd">
                                <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i>
                            </span>
                            <span style="color: #bdb9bd">
                                Preguntas
                                <i class="fas fa-angle-right"></i>
                            </span> Preguntas numericas
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="card" style="border-radius: 15px;">
                <div class="card-body">
                    <div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
                        <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                            <h2 class="page-title"> Listado de preguntas numericas </h2>
                            <ul class="quick-links ml-auto">
                                <li>
                                    <button type="button" class="btn btn-primary float-right btn-lg" data-toggle="modal"
                                        data-target="#registrarPregunta" @click="cambiarModo" style="border-radius: 25px;">
                                        <i class="fas fa-edit"></i> Registrar pregunta
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                  
                    <div class="page-header " style="border: 1px solid #dee2e6; margin: 0px; background: #f5f5f5;">
                      <div class="col-6" style="padding: 5px;">
                        <b> Termino de busqueda: </b>
                        <input class="form-control" type="search" placeholder="Ej. ¿Cuánto es 2+2?" v-model="filters.pregunta.value" style="border-radius: 10px; height: 37px; margin: 0px;" />
                      </div>
                      <div class="col-6" style="padding: 5px;">
                        <b>Campo de busqueda: </b>
                        <select name="campoBusqueda" id="campoBusqueda" style="border-radius: 10px; margin: 0px;" @change="cambiarCampoDeBusqueda">
                          <option value="pregunta">Pregunta</option>
                          <option value="tema">Tema</option>
                          <option value="opcion">Respuesta</option>
                        </select>
                      </div>
                    </div>
                  
                    <div class="table-responsive">
                        <div class="table-responsive">
                            <v-table :data="preguntaNumerica" :filters="filters" :currentPage.sync="currentPage"
                                :pageSize="5" @totalPagesChanged="totalPages = $event" style="width:100%"
                                class="table table-hover">
                                <thead slot="head">
                                    <v-th sortKey="pregunta" defaultSort="desc">Pregunta</v-th>
                                    <v-th sortKey="tema" defaultSort="desc">Tema</v-th>
                                    <v-th sortKey="opcion" defaultSort="desc">Respuesta</v-th>
                                    <th>Margen</th>
                                    <th>Margen arriba</th>
                                    <th>Margen abajo</th>
                                    <th>Imagenes</th>
                                    <th>Opciones</th>
                                </thead>
                                <tbody slot="body" slot-scope="{displayData}">
                                    <tr v-for="preguntaNumerica in displayData" :key="preguntaNumerica.id">
                                        <td v-html="wrapText(preguntaNumerica.pregunta)"> </td>
                                        <td>{{preguntaNumerica.tema}}</td>
                                        <td>{{preguntaNumerica.opcion}} </td>
                                        <td>{{preguntaNumerica.rango}}</td>
                                        <td v-if="preguntaNumerica.aplicableArriba == true" > <i class="far fa-check-circle" style="color: #3bd949;">Si</i></td>
                                        <td v-else> <i class="fas fa-ban" style="color: #ff6258">No</i> </td>
                                        <td v-if="preguntaNumerica.aplicableAnbajo == true" > <i class="far fa-check-circle" style="color: #3bd949;">Si</i></td>
                                        <td v-else> <i class="fas fa-ban" style="color: #ff6258">No</i> </td>
                                        <td>
                                            <a data-toggle="modal"
                                                data-target="#modalParaVerImagenes"
                                                @click="desplegarImagenesEnModal(preguntaNumerica.imagenes)">
                                                <i class="fas fa-eye" style="color: #2196f3"></i> 
                                            </a>
                                        </td>
                                        <td>
                                            <a @click="btnEditar(preguntaNumerica.id_pregunta,preguntaNumerica.pregunta,preguntaNumerica.opcion,preguntaNumerica.tipo,preguntaNumerica.id_tema, preguntaNumerica.rango ,preguntaNumerica.imagenes)"
                                                data-toggle="modal" data-target="#registrarPregunta"><i
                                                    class="fas fa-pen" style="color: #ffae00;"></i>  </a>
                                            |
                                            <a @click="eliminar(preguntaNumerica.id_pregunta, preguntaNumerica.imagenes)"><i
                                                    class="fas fa-trash" style="color: #ff6258"></i> 
                                            </a>
                                        </td>
                                    </tr>
                                  
                                    <tr>
                                      <td> <b> <p> Mostrando {{displayData.length}} de {{ preguntaNumerica.length }} registros </p> </b> </td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                  
                                </tbody>
                            </v-table>
                        </div>
                        <smart-pagination :currentPage.sync="currentPage" :totalPages="totalPages" />
                      
                      
                    </div>
                    <div class="modal fade" id="registrarPregunta"  role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true" data-focus="false" >
                        <div class="modal-dialog" role="document" >
                            <div class="modal-content" style="border-radius: 15px;">
                                <!--<div class="modal-header">
                                    
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div> -->
                                <div class="modal-body">
                                    
                                    <h3 v-if="modoEdicion" class="modal-title" id="exampleModalLabel"> Actualizar
                                        pregunta </h3>
                                    <h3 v-else class="modal-title" id="exampleModalLabel"> Registrar pregunta </h3>
                                  
                                    <p class="text-left">  Pregunta: </p>
                                    <textarea id="pregunta" type="text" class="form-control "
                                        placeholder="Pregunta" @focus="limpiarCampos('pregunta')" style="margin:0px;"></textarea>
                                  
                                    <span id="msjInputPregunta"> </span>
                                    <p class="text-left ">  Respuesta:  </p>
                                    <textarea id="respuesta" type="text" class="form-control"
                                        placeholder="Respuesta" @focus="limpiarCampos('respuesta')" style="margin:0px;"></textarea>
                                    
                                    
                                  
                                    <span id="msjInputRespuesta"> </span>
                                    <p class="text-left ">  Margen de error: </p>
                                    <input id="margen" class="form-control" placeholder="margen" type="number">
                                    <p class="text-left ">  Aplicar el margen: </p>
                                    
                                   
                                    <table style="width: 100%; border-radius: 15px;">
                                      <tr>
                                        <th> <input type="checkbox" id="arriba" name="arriba" value="si" style="width:20px; height:20px; border-radius:5px; border:2px solid #555;" checked> </th>
                                        <th> <label for="male">Aplicar hacia arriba</label> </th>
                                      </tr>
                                      
                                      <tr>
                                        <th>  <input type="checkbox" id="abajo" name="abajo" value="si" style="width:20px; height:20px; border-radius:5px; border:2px solid #555;" checked> </th>
                                        <th> <label for="male">Aplicar hacia abajo</label> </th>
                                      </tr>
                                    </table>
                                  
                                    <p class="text-left">  Tema:  </p>
                                    <Select2  :options="temas" v-model="id_tema" @select="cambioSelect($event)" />
                                    
                                    <span id="msjSelectTema"> </span>
                                    <p class="text-left"> Imagenes:  </p>
                                    <div @dragover="dragover" @dragleave="dragleave" @drop="drop"
                                        style="border: 0.5px dashed black; width: 100%; border-radius: 25px;">
                                        <input type="file" id="assetsFieldHandle"
                                            class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange"
                                            ref="file" accept=".pdf,.jpg,.jpeg,.png" hidden />
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label for="assetsFieldHandle" class="block cursor-pointer">
                                                    <div>
                                                        <p id="mensajito" class="text-center">
                                                            <i class="fas fa-cloud-download-alt"></i> Arrastra la imagen
                                                            o da clic aquí para subir
                                                        </p>
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
                                                <td><a  @click="remove(imagen)"
                                                        title="Remove file"> <i class="fas fa-trash-alt" style="color: #ff6258"></i> </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    
                                  
                                </div>
                                <div class="modal-footer">
                                    <button v-if="modoEdicion" type="button" @click="editar" class="btn btn-primary btn-lg" style="border-radius: 25px;">
                                        Guardar </button>
                                    <button v-else type="button" @click="btnGuardar" class="btn btn-primary btn-lg" style="border-radius: 25px;"> <i class="fas fa-save"></i> Guardar
                                    </button>
                                    <button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal" style="border-radius: 25px;">  <i class="fas fa-ban"></i> Cancelar
                                    </button>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="modalParaVerImagenes" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel"> Imagenes adjuntas en la pregunta
                                    </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div style="width: 100%;">
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
                                                    <img :src="'/imagenes/preguntas/'+imagen.nombre"
                                                        style=" width: 15em;">
                                                </td>
                                                <td>
                                                    {{ imagen.alias }}
                                                </td>
                                            </tr>
                                        </table>
                                        <span v-if="imagenesParaDesplegarEnModal.length == 0" class="text-center"> Está
                                            pregunta no tiene imagenes adjuntas </span>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal"> Cerrar
                                    </button>
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
    import Cargador from '@/components/subirImagenes';
    export default {
        data() {
            return {
                subidor: {},
                pregunta: [],
                preguntaNumerica: [],
                id: "",
                id_tema: "",
                respuesta: "",
                pregunta: "",
                margen: "",
                margend: "",
                arriba: null,
                abajo: null,
                tipo: "",
                temas: [],
                id: "",
                nombre_tema: "",
                nivel: "",
                filters: {
                    pregunta: {
                        value: '',
                        keys: ['pregunta', 'tema']
                    }
                },
                currentPage: 1,
                totalPages: 0,
                modoEdicion: 0,
                todasLasImagenes: [],
                totalImagenesEnPregunta: 0,
                imagenesParaDesplegarEnModal: []
            };
        },
        created() {
            this.subidor = new Cargador();
        },
        mounted() {
            this.getPreguntaNumerica();
            this.getTemas();
            this.getMargen();
            let uri = window.location.href;
            if (uri.includes("?")) {
                uri = window.location.href.split('?');
                var fil = uri[1].split('=')[1];
                this.filters.pregunta.value = fil.replace(/%20/g, " ");
            }
        },
        methods: {
            cambioSelect(val){
              this.limpiarCampos("tema");
            },
            cambiarCampoDeBusqueda(){
              let x = document.getElementById("campoBusqueda").value;
              this.filters.pregunta.keys[0] = x;			
            },
            wrapText(str) {
                const palabrasSinEspacios = str.split(" ");
                let textoDePregunta = "";
                for (let i = 0; i < palabrasSinEspacios.length; i++) {
                    textoDePregunta = textoDePregunta + " " + palabrasSinEspacios[i];
                    if ((i % 7) == 0 && i != 0) {
                        textoDePregunta = textoDePregunta + "<br>"
                    }
                }
                return textoDePregunta;
            },
            async desplegarImagenesEnModal(imagenes) {
                this.imagenesParaDesplegarEnModal = imagenes;
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
            async acomodarImagen(imagen, vaAEliminarse, idImagen) {
                this.subidor.acomodarImagen(imagen, vaAEliminarse, idImagen);
            },
            drop(event) {
                this.subidor.drop(event);
            },
            async subirImagenes(id) {
                this.subidor.subirImagenes(id);
            },
            async getPreguntaNumerica() {
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
                    url: "/pregunta/showPN"
                }).then(
                    result => {
                        this.preguntaNumerica = result.data[0];
                    },
                    error => {
                        console.error(error);
                    }
                );
                for (let i = 0; i < this.preguntaNumerica.length; i++) {
                    this.preguntaNumerica[i].imagenes = [];
                    for (let j = 0; j < this.todasLasImagenes.length; j++) {
                        if (this.preguntaNumerica[i].id_pregunta == this.todasLasImagenes[j].idpregunta) {
                            this.preguntaNumerica[i].imagenes.push(this.todasLasImagenes[j]);
                        }
                    }
                }
            },
            getTemas() {
                axios({
                    method: "GET",
                    url: "/tema/all"
                }).then(
                    result => {
                        //this.temas = result.data;
                      
                        let temasApi = result.data[0];
                  
                        for( let i = 0; i <  temasApi.length; i++ ){
                          this.temas.push({id: temasApi[i].id, text: temasApi[i].nombre_tema })
                        }
                      
                    },
                    error => {
                        console.error(error);
                    }
                );
            },
            getMargen() {
                axios({
                    method: "GET",
                    url: "/configuracionCuestionario/margen"
                }).then(
                    result => {
                        this.margend = result.data.rango_por_defecto;
                    },
                    error => {
                        console.error(error);
                    }
                );
            },
            async guardarPregunta(pregunta, respuesta, margen, arriba, abajo, tipo, id_tema) {
                await axios
                    .post("/pregunta/addNumerica", {
                        pregunta: pregunta,
                        respuesta: respuesta,
                        margen: margen,
                        arriba: arriba,
                        abajo: abajo,
                        tipo: tipo,
                        id_tema: id_tema
                    })
                    .then(async res => {
                        this.tipo = "";
                        this.respuesta = "";
                        this.pregunta = "";
                        this.margen = "";
                        this.id_tema = "";
                        await this.subidor.subirImagenes(res.data.ultimo_id);
                        $('#registrarPregunta').modal('toggle');
                        this.getPreguntaNumerica();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            btnGuardar() {
                let inputPregunta = document.getElementById("pregunta");
                let inputRespuesta = document.getElementById("respuesta");
                //let selectTema = document.getElementById("id_tema");
                let msjSelectTema = document.getElementById("msjSelectTema");
                let msjInputRespuesta = document.getElementById("msjInputRespuesta");
                let msjInputPregunta = document.getElementById("msjInputPregunta");
                this.margen = document.getElementById("margen").value;
                this.arriba = document.getElementById("arriba").checked;
                this.abajo = document.getElementById("abajo").checked;
                this.pregunta = inputPregunta.value;
                this.respuesta = inputRespuesta.value.toString().toLowerCase().normalize("NFD").replace(
                    /[\u0300-\u036f]/g, "").replace(/ /g, "")
                this.tipo = 2
                //this.id_tema = selectTema.value;
                if (this.id_tema == "" || this.pregunta == "" || this.respuesta == "") {
                    if (this.id_tema == "") {
                        //selectTema.style.border = "1px solid #ff6258";
                        msjSelectTema.innerHTML = "Este dato es obligatorio";
                        msjSelectTema.style.color = "#ff6258";
                    }
                    if (this.pregunta == "") {
                        inputPregunta.style.border = "1px solid #ff6258";
                        msjInputPregunta.innerHTML = "Este dato es obligatorio";
                        msjInputPregunta.style.color = "#ff6258";
                    }
                    if (this.respuesta == "") {
                        inputRespuesta.style.border = "1px solid #ff6258";
                        msjInputRespuesta.innerHTML = "Este dato es obligatorio";
                        msjInputRespuesta.style.color = "#ff6258";
                    }
                } else {
                    this.guardarPregunta(
                        this.pregunta,
                        this.respuesta,
                        this.margen,
                        this.arriba,
                        this.abajo,
                        this.tipo,
                        this.id_tema
                    );
                }
            },
            limpiarCampos(id) {
                let inputPregunta = document.getElementById("pregunta");
                let inputRespuesta = document.getElementById("respuesta");
                //let selectTema = document.getElementById("id_tema");
                let msjSelectTema = document.getElementById("msjSelectTema");
                let msjInputRespuesta = document.getElementById("msjInputRespuesta");
                let msjInputPregunta = document.getElementById("msjInputPregunta");
                if (id == "tema") {
                    //selectTema.style.border = "1px solid #dee2e6";
                    msjSelectTema.innerHTML = "";
                }
                if (id == "pregunta") {
                    inputPregunta.style.border = "1px solid #dee2e6";
                    msjInputPregunta.innerHTML = "";
                }
                if (id == "respuesta") {
                    inputRespuesta.style.border = "1px solid #dee2e6";
                    msjInputRespuesta.innerHTML = "";
                }
            },
            btnEditar(id, pregunta, respuesta, tipo, id_tema, margen ,imagenes) {
                this.totalImagenesEnPregunta = (imagenes.length + 1);
                this.subidor.imagenesVistaPrevia = [];
                //this.subidor.imagenes = [];
                let inputPregunta = document.getElementById("pregunta");
                let inputRespuesta = document.getElementById("respuesta");
                //let selectTema = document.getElementById("id_tema");
                let inputMargen = document.getElementById("margen");
                this.modoEdicion = 1;
                this.id = id;
                inputRespuesta.value = respuesta;
                inputPregunta.value = pregunta;
                //selectTema.value = id_tema;
                this.id_tema = id_tema;
                inputMargen.value = margen;
              
                let numeroMayorDeImagen = 0;
                for (let i = 0; i < imagenes.length; i++) {
                    this.subidor.acomodarImagen("/imagenes/preguntas/" + imagenes[i].nombre, 1, imagenes[i].idImagen);
                    if (imagenes[i].alias.split("_")[3].split(".")[0] > numeroMayorDeImagen) {
                        numeroMayorDeImagen = imagenes[i].alias.split("_")[3].split(".")[0];
                    }
                }
                this.subidor.ultimaImagenEnPreguntaAEditar = numeroMayorDeImagen;
            },
            cambiarModo() {
                let inputPregunta = document.getElementById("pregunta");
                let inputRespuesta = document.getElementById("respuesta");
                //let selectTema = document.getElementById("id_tema");
                let inputMargen = document.getElementById("margen");
                inputMargen.value = this.margend;
                inputRespuesta.value = "";
                inputPregunta.value = "";
                //selectTema.value = "";
                this.id_tema = "";
                this.subidor.imagenesVistaPrevia = [];
                this.subidor.imagenes = [];
                this.subidor.imagenesAEliminar = [];
                this.modoEdicion = 0;
            },
            editar() {
                let inputPregunta = document.getElementById("pregunta");
                let inputRespuesta = document.getElementById("respuesta");
                //let selectTema = document.getElementById("id_tema");
                let msjSelectTema = document.getElementById("msjSelectTema");
                let msjInputRespuesta = document.getElementById("msjInputRespuesta");
                let msjInputPregunta = document.getElementById("msjInputPregunta");
                this.margen = document.getElementById("margen").value;
                this.arriba = document.getElementById("arriba").checked;
                this.abajo = document.getElementById("abajo").checked;
                this.pregunta = inputPregunta.value;
                this.respuesta = inputRespuesta.value.toString().toLowerCase().normalize("NFD").replace(
                    /[\u0300-\u036f]/g, "").replace(/ /g, "")
                this.tipo = 2
                //this.id_tema = selectTema.value;
                if (this.id_tema == "" || this.pregunta == "" || this.respuesta == "") {
                    if (this.id_tema == "") {
                        //selectTema.style.border = "1px solid #ff6258";
                        msjSelectTema.innerHTML = "Este dato es obligatorio";
                        msjSelectTema.style.color = "#ff6258";
                    }
                    if (this.pregunta == "") {
                        inputPregunta.style.border = "1px solid #ff6258";
                        msjInputPregunta.innerHTML = "Este dato es obligatorio";
                        msjInputPregunta.style.color = "#ff6258";
                    }
                    if (this.respuesta == "") {
                        inputRespuesta.style.border = "1px solid #ff6258";
                        msjInputRespuesta.innerHTML = "Este dato es obligatorio";
                        msjInputRespuesta.style.color = "#ff6258";
                    }
                } else {
                    axios.post("/pregunta/updateAbierta", {
                        id: this.id,
                        pregunta: this.pregunta,
                        respuesta: this.respuesta,
                        tipo: this.tipo,
                        id_tema: this.id_tema,
                        imagenesAEliminar: this.subidor.imagenesAEliminar,
                        mArriba: this.arriba,
                        mAbajo: this.abajo,
                        margen: this.margen
                    }).then(async res => {
                        await this.subidor.subirImagenes(this.id);
                        await this.getPreguntaNumerica();
                        this.id = "";
                        this.tipo = "";
                        this.respuesta = "";
                        this.pregunta = "";
                        this.id_tema = "";
                        this.arriba = "";
                        this.abajo = "";
                        
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Pregunta actualizada con éxito',
                            showConfirmButton: false,
                            timer: 1500,
                            toast: true
                        })

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
                            this.id = "";
                            this.getPreguntaNumerica();
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