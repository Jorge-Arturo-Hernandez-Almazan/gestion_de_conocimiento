<template>
    <div class="">
      <div class="col-lg-12 ">
            <div class="col-12 mt-4">
                <div class="page-header">
                    <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                        <h1 class="page-title"> Preguntas verdadero/falso </h1>
                        <ul class="quick-links ml-auto">
                            <li>
                                <span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i>
                                </span> <span style="color: #bdb9bd"> Preguntas <i class="fas fa-angle-right"></i> </span>
                                Preguntas verdadero/falso
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        
            <div class="card" style="border-radius: 15px;">
                <div class="card-body">
                    <div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
                        <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                            <h2 class="page-title"> Listado de preguntas verdadero/falso </h2>
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
                  

                      <Select2 v-model="form.tema" :options="temas" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
                  

                <h4>Value: {{ form.tema }}</h4>
                  
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
                            <v-table :data="pregunta" :filters="filters" :currentPage.sync="currentPage" :pageSize="5"
                                @totalPagesChanged="totalPages = $event" style="width:100%" class="table table-hover">
                                <thead slot="head" >
                                    <v-th sortKey="pregunta" defaultSort="desc">Pregunta</v-th>
                                    <v-th sortKey="tema" defaultSort="desc">Tema</v-th>
                                    <v-th sortKey="opcion" defaultSort="desc">Respuesta</v-th>
                                    <th> Imagenes </th>
                                    <th >Opciones</th>
                                </thead>
                                <tbody slot="body" slot-scope="{displayData}">
                                    <tr v-for="pregunta in displayData" :key="pregunta.id">
                                        <td v-html="espaciarTexto(pregunta.pregunta)"> </td>
                                        <td class="text-left">{{pregunta.tema}}</td>
                                        <td>
                                            <tr> 
                                                {{pregunta.opcion}} 
                                            </tr>
                                        </td>
                                        <td>
                                            <a  data-toggle="modal"
                                                data-target="#modalParaVerImagenes"
                                                @click="desplegarImagenesEnModal(pregunta.imagenes)">
                                                <i class="fas fa-eye" style="color: #2196f3"></i> 
                                            </a>
                                        </td>
                                        
                                        <td>
                                            <a @click="editarPregunta({id:pregunta.id_pregunta, pregunta: pregunta.pregunta, respuesta: pregunta.opcion, tipo: 3, tema:pregunta.id_tema}, pregunta.imagenes)">
                                                <i class="fas fa-pen" style="color: #ffae00;"></i>  
                                            </a>
                                            <a @click="eliminarPregunta(pregunta.id_pregunta)"> 
                                                <i class="fas fa-trash" style="color: #ff6258"></i> 
                                            </a>
                                        </td>
                                    </tr>
                                  
                                    <tr>
                                      <td> <b> <p> Mostrando {{displayData.length}} de {{ pregunta.length }} registros </p> </b> </td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                  
                                </tbody>
                            </v-table>
                        </div>
                        <smart-pagination :currentPage.sync="currentPage" :totalPages="totalPages"  />
                      
                      
                      
                        <div class="modal fade" id="registrarPregunta" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 v-if="modoEdicion" class="modal-title" id="exampleModalLabel"> Actualizar pregunta </h5>
                                        <h5 v-else class="modal-title" id="exampleModalLabel"> Registrar pregunta </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                      
                                        <p class="text-left mb-0"> <b> Pregunta: </b> </p>
                                        <textarea v-model="form.pregunta" id="inpPregunta" type="text" class="form-control mt-0 mb-0"
                                            placeholder="Pregunta" @focus="limpiarCampo('pregunta')"></textarea>
                                      
                                        <span id="msjInputPregunta" style="color: #ff6258;"> </span>
                                      
                                        <p class="text-left mt-2 mb-0"> <b> Respuesta: </b> </p>
                                        <select v-model="form.respuesta" id="selRespuesta" class="form-control mt-0 mb-0" @focus="limpiarCampo('respuesta')">
                                            <option value="">Respuesta</option>
                                          <option value="verdadero">Verdadero</option>
                                          <option value="falso">Falso</option>
                                        </select>
                                        <span id="msjInputRespuesta" style="color: #ff6258;"> </span>
                                        
                                        <p class="text-left mt-2 mb-0"> <b> Tema: </b> </p>
                                        <Select2 v-model="form.tema" :options="this.temas" />
                                        
                                        <span id="msjSelectTema" style="color: #ff6258;"> </span>
                                      
                                        <p class="text-left mt-2 mb-0"> <b> Imagenes: </b> </p>
                                        <div @dragover="dragover" @dragleave="dragleave" @drop="drop" style="border-style: dashed; width: 100%;">
                                            <input type="file" id="assetsFieldHandle"
                                                class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange"
                                                ref="file" accept=".pdf,.jpg,.jpeg,.png" hidden />
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label for="assetsFieldHandle" class="block cursor-pointer">
                                                        <div>
                                                            <p id="mensajito" class="text-center">
                                                                <i class="fas fa-cloud-download-alt"></i> 
                                                                Arrastra la imagen o da clic aquí para subir
                                                            </p>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <table style="list-style-type: none; width:100%" v-if="this.subidor.imagenesVistaPrevia.length" v-cloak>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Acción</th>
                                                </tr>
                                                <tr v-for="imagen in subidor.imagenesVistaPrevia">
                                                    <td class="d-flex justify-content-center"> <img :src="imagen.imagen" style=" width: 15em;"> </td>
                                                    <td>
                                                        <button class="btn btn-danger" type="button" @click="remove(imagen)" title="Remove file"> 
                                                            <i class="fas fa-trash-alt"></i> 
                                                        </button>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button v-if="modoEdicion" type="button" @click="actualizarPregunta" class="btn btn-primary">
                                            Editar 
                                        </button>
                                        <button v-else type="button" @click="registrarPregunta" class="btn btn-primary">
                                            Guardar
                                        </button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal"> 
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="modalParaVerImagenes" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel"> 
                                            Imagenes adjuntas en la pregunta
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
                                            <span v-if="imagenesParaDesplegarEnModal.length == 0" class="text-center">
                                                Esta pregunta no tiene imagenes adjuntas 
                                            </span>
                                          
                                          
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
    import axios from 'axios';
    import Cargador from '@/components/subirImagenes';
    import Select2 from 'v-select2-component';

    export default {
        components: {Select2},
        data() {
            return {
                modoEdicion: 0,
                todasLasImagenes: [],
                totalImagenesEnPregunta: 0,
                imagenesParaDesplegarEnModal: [],
                subidor: {},
                pregunta: [],
                currentPage: 1,
                totalPages: 0,
                temas: [],
                filters: {
                    pregunta: {
                        value: '',
                        keys: ['pregunta', 'tema']
                    }
                },
                form: new Form({
                  id: '',
                  tipo: 3,
                  pregunta: '',
                  respuesta: '',
                  tema: ''
                }),
                myValue: '',
                myOptions: ['opc1', 'opc2', 'opc3'] // or [{id: key, text: value}, {id: key, text: value}]
            }
        },
        created(){
            this.subidor = new Cargador();
          
        },
        mounted() {
            this.obtenerPreguntasVerdaderoFalso();
            this.obtenerTemas();
            let uri = window.location.href;
            if (uri.includes("?")) {
                uri = window.location.href.split('?');
                var fil = uri[1].split('=')[1];
                this.filters.pregunta.value = fil.replace(/%20/g, " ");

            }
        },
        methods: {
            myChangeEvent(val){
                console.log(val);
            },
            mySelectEvent({id, text}){
                console.log({id, text})
            },
          
            cambiarCampoDeBusqueda(){
              let x = document.getElementById("campoBusqueda").value;
              this.filters.pregunta.keys[0] = x;			
            },
            espaciarTexto(str) {
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
            drop(event) {
                this.subidor.drop(event);
            },
            async subirImagenes(id) {
                this.subidor.subirImagenes(id);
            },
            resetearDatos(){
                //this.limpiarMensajeYAlerta("selTema", "msjSelectTema");
                this.limpiarMensajeYAlerta("inpPregunta", "msjInputPregunta");
                this.limpiarMensajeYAlerta("selRespuesta", "msjInputRespuesta");
                this.form.reset();
                this.form.tema = "";
                this.subidor.imagenesVistaPrevia = [];
                this.subidor.imagenes = [];
                this.subidor.imagenesAEliminar = [];
            },
            cambiarModo() {
                this.resetearDatos();
                this.modoEdicion = 0;
            },
            async obtenerPreguntasVerdaderoFalso() {
                
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
                    url: "/pregunta/show"
                }).then(
                    result => {
                        this.pregunta = result.data[0];
                    },
                    error => {
                        console.error(error);
                    }
                );
                for (let i = 0; i < this.pregunta.length; i++) {
                    this.pregunta[i].imagenes = [];
                    for (let j = 0; j < this.todasLasImagenes.length; j++) {
                        if (this.pregunta[i].id_pregunta == this.todasLasImagenes[j].idpregunta) {
                            this.pregunta[i].imagenes.push(this.todasLasImagenes[j]);
                        }
                    }
                }
                
                
            },
            obtenerTemas() { ///Funcion para mostrar los temas
                axios({
                    method: 'GET',
                    url: '/tema/all'
                }).then(
                    result => {
                        let temasApi = result.data[0];
                  
                        for( let i = 0; i <  temasApi.length; i++ ){
                          this.temas.push({id: temasApi[i].id, text: temasApi[i].nombre_tema })
                        }
                    },
                    error => {
                        console.error(error)
                    }
                )
            },
            mostrarMensajeYAlerta(idInput,idMensaje,mensajeADesplegar){
                document.getElementById(idInput).style.border = "1px solid #ff6258";
                document.getElementById(idMensaje).innerHTML = mensajeADesplegar;
            },
            limpiarMensajeYAlerta(idInput, idMensaje){
                document.getElementById(idInput).style.border = "1px solid #dee2e6";
                document.getElementById(idMensaje).innerHTML = "";
            },
            limpiarCampo(id) {
                //if (id === "tema") this.limpiarMensajeYAlerta("selTema", "msjSelectTema");
                if (id === "pregunta") this.limpiarMensajeYAlerta("inpPregunta", "msjInputPregunta")
                if (id === "respuesta") this.limpiarMensajeYAlerta("selRespuesta", "msjInputRespuesta")
            },
            comprobarCampos(){
                let existeError = false;
                if (this.form.tema === ""){
                    //this.mostrarMensajeYAlerta("selTema", "msjSelectTema", "Este dato es obligatorio");
                    existeError = true;
                }
                if (this.form.pregunta === ""){
                    this.mostrarMensajeYAlerta("inpPregunta", "msjInputPregunta", "Este dato es obligatorio");
                    existeError = true;
                } 
                if (this.form.respuesta === ""){
                    this.mostrarMensajeYAlerta("selRespuesta", "msjInputRespuesta", "Este dato es obligatorio");
                    existeError = true;
                }
                return existeError;
            },
            async registrarPregunta() {
                let existeError = await this.comprobarCampos();           
                if(!existeError){
                    axios.post('/pregunta/add', {
                        pregunta:   this.form.pregunta,
                        respuesta:  this.form.respuesta,
                        tipo:       this.form.tipo,
                        id_tema:    this.form.tema
                    })
                    .then(async (res) => {
                        this.form.reset();
                        
                        $('#registrarPregunta').modal('hide');
                        await this.subidor.subirImagenes(res.data.ultimo_id);
                        this.$swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: 'Pregunta almacenada con éxito',
                              showConfirmButton: false,
                              timer: 1500,
                              toast: true
                          })
                      
                        this.obtenerPreguntasVerdaderoFalso();
                        
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            },
            editarPregunta (pregunta, imagenes) {
                this.resetearDatos();
                this.modoEdicion = 1;
                this.form.fill(pregunta);
                this.totalImagenesEnPregunta = (imagenes.length + 1);
                let numeroMayorDeImagen = 0;
                for (let i = 0; i < imagenes.length; i++) {
                    this.subidor.acomodarImagen("/imagenes/preguntas/" + imagenes[i].nombre, 1, imagenes[i].idImagen);
                    if (imagenes[i].alias.split("_")[3].split(".")[0] > numeroMayorDeImagen) {
                        numeroMayorDeImagen = imagenes[i].alias.split("_")[3].split(".")[0];
                    }
                }
                this.subidor.ultimaImagenEnPreguntaAEditar = numeroMayorDeImagen;
                $('#registrarPregunta').modal('show');
            },
            async actualizarPregunta() {
                let existeError = await this.comprobarCampos();
                if(!existeError){
                    axios.post('/pregunta/update', {
                        id:         this.form.id,
                        pregunta:   this.form.pregunta,
                        respuesta:  this.form.respuesta,
                        tipo:       this.form.tipo,
                        id_tema:    this.form.tema,
                        imagenesAEliminar: this.subidor.imagenesAEliminar,
                    })
                    .then(async (res) => {
                        await this.subidor.subirImagenes(this.form.id);
                      
                        this.resetearDatos();
                        this.form.reset();
                        $('#registrarPregunta').modal('hide');
                        this.$swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Pregunta actualizada con éxito',
                            showConfirmButton: false,
                            timer: 1500,
                            toast: true
                        })
                        this.obtenerPreguntasVerdaderoFalso();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            },
            eliminarPregunta(id) {
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
                        axios.post('pregunta/delete',{id}).then((res) => {
                            this.obtenerPreguntasVerdaderoFalso();
                            this.$swal.fire({
                                  position: 'top-end',
                                  icon: 'success',
                                  title: 'Pregunta eliminada con éxito',
                                  showConfirmButton: false,
                                  timer: 1500,
                                  toast: true
                            })

                        })
                        .catch((err) => {
                            this.$swal({
                                type: 'info',
                                title: 'Error al eliminar',
                            })
                        })
                    }
                })
            }
        }
    }
</script>