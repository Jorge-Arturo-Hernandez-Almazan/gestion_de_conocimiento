<template>
    <div>
        <div class="col-12 mt-4">
            <div class="page-header">
                <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                    <h1 class="page-title"> Preguntas opcion multiple </h1>
                    <ul class="quick-links ml-auto">
                        <li>
                            <span style="color: #bdb9bd"> <i class="fas fa-home"></i> <i class="fas fa-angle-right"></i>
                            </span> <span style="color: #bdb9bd"> Preguntas <i class="fas fa-angle-right"></i> </span>
                            Preguntas opcion multiple
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
                            <h2 class="page-title"> Listado de preguntas de opción multiple </h2>
                            <ul class="quick-links ml-auto">
                                <li>
                                    <button type="button" class="btn btn-primary float-right btn-lg" data-toggle="modal"
                                        data-target="#exampleModal" @click="abrirModal" style="border-radius: 25px;">
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
                        
                            <v-table :data="pregunta" :filters="filters" :currentPage.sync="currentPage" :pageSize="5"
                                @totalPagesChanged="totalPages = $event" style="width:100%" class="table table-hover">
                                <thead slot="head" >
                                    <v-th sortKey="pregunta" defaultSort="desc">Pregunta</v-th>
                                    <v-th sortKey="tema" defaultSort="desc">Tema</v-th>
                                    <th>Opciones</th>
                                    <v-th sortKey="opcion" defaultSort="desc">Respuestas</v-th>
                                    <th>Imagenes</th>
                                    <th>Gestión</th>
                                </thead>
                                <tbody slot="body" slot-scope="{displayData}">
                                    <tr v-for="(pregunta, preg) in displayData" :key="pregunta.id_pregunta">

                                        <td v-html="wrapText(pregunta.pregunta)"> </td>
                                        <td class="text-left">{{pregunta.tema}}</td>

                                        <td>
                                            <tr v-for="opc in pregunta.opciones" >
                                                {{opc}}
                                            </tr>
                                          
                                        </td>

                                        <td>
                                            {{pregunta.respuesta}}
                                        </td>
                                        
                                        <td>
                                            <a data-toggle="modal" data-target="#modalParaVerImagenes" @click="desplegarImagenesEnModal(pregunta.imagenes)">
                                                <i class="fas fa-eye" style="color: #2196f3"></i> 
                                            </a>
                                        </td>
                                        
                                        <td >
                                            <a  @click="editarPregunta(pregunta.id_pregunta, pregunta.imagenes)"
                                                data-toggle="modal" data-target="#exampleModal"> <i class="fas fa-pen" style="color: #ffae00;"></i>
                                                 </a>
                                          |
                                            <a  @click="eliminar(pregunta.id_pregunta)"> <i
                                                    class="fas fa-trash" style="color: #ff6258"></i>  </a>
                                        </td>

                                    </tr>
                                  
                                    <tr>
                                      <td> <b> <p> Mostrando {{displayData.length}} de {{ pregunta.length }} registros </p> </b> </td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                  
                                </tbody>
                            </v-table>

                        <smart-pagination :currentPage.sync="currentPage" :totalPages="totalPages" />
                      
                    </div>
                </div>

                <!-- Modal para registrar pregunta -->
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 v-if="editarPreguntaVar == false" class="modal-title" id="exampleModalLabel"> <b>
                                        Registrar pregunta </b> </h4>
                                <h4 v-if="editarPreguntaVar == true" class="modal-title" id="exampleModalLabel"> <b>
                                        Editar pregunta </b> </h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label class="text-left mb-2" for="pregunta"> Reactivo: </label>
                                    <textarea id="pregunta" class="form-control" rows="3"
                                        placeholder="Escribe el reactivo">  </textarea>
                                </div>
                                <div class="form-group">
                                    <label class="text-left mb-2">
                                        Tema:
                                    </label>
                                    <select id="id_tema" name="temas" class="form-control">
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="text-left mb-2" for="opciones"> Opciones: </label>
                                    <div class="row">
                                        <div class="col-md-8">
                                            <input id="inputOpcion" class="form-control" type="text">
                                        </div>
                                        <div class="col-md-4">
                                            <button id="btnAgregarOption" @click="btnAgregarOpcion" type="button"
                                                class="btn btn-success"> Agregar opción </button>
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
                                
                                <p class="text-left mt-2 mb-0"> <b> Imagenes: </b> </p>
                                <div @dragover="dragover" @dragleave="dragleave" @drop="drop"
                                    style="border-style: dashed; width: 100%;">
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
                                            <td><button class="btn btn-danger" type="button" @click="remove(imagen)"
                                                    title="Remove file"> <i class="fas fa-trash-alt"></i> </button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                              
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="button" @click="btnGuardarPregunta" class="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>

              
                <!-- Modal para visualizar imagenes -->
                <div class="modal fade" id="modalParaVerImagenes" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
</template>
<script>
    import axios from 'axios'
    import Cargador from '@/components/subirImagenes';
    export default {
        data() {
            return {
                subidor: {},
                editarPreguntaVar: false,
                pregunta: [],
                opciones: [],
                respuestas: [],
                id_editar: 0,
                id: '',
                id_tema: '',
                tipo: '',
                temasSeleccionado: {},
                temas: [],
                id: '',
                nombre_tema: '',
                nivel: '',
                filters: {
                    pregunta: {
                        value: '',
                        keys: ['pregunta', 'tema']
                    }
                },
                currentPage: 1,
                totalPages: 0,
                todasLasImagenes: [],
                totalImagenesEnPregunta: 0,
                ultimaImagenEnPreguntaAEditar: 0,
                imagenesParaDesplegarEnModal: [],
                todasLasImagenes: [],
                totalImagenesEnPregunta: 0,
                imagenesParaDesplegarEnModal: []
            }
        },
        props: {
            seccion: String
        },
        created() {
            this.subidor = new Cargador();
            this.getpreguntas();
            this.getTemas();
        },

        async mounted() {
            await this.getpreguntas().then(data => {}).catch(err => console.log(err))
            this.getTemas();
            let uri = window.location.href;
            if (uri.includes("?")) {
                uri = window.location.href.split('?');
                var fil = uri[1].split('=')[1];
                this.filters.pregunta.value = fil.replace(/%20/g, " ");
            }
        },
        methods: {
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
            abrirModalCuestionario() {
                this.getpreguntas();
                this.getTemas();
            },
            getpreguntas: async function () {
                
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
                    method: 'get',
                    url: 'pregunta/showMultiples'
                }).then(
                     result => {

                        this.pregunta = result.data.banco_preguntas[0];
                        this.opciones = result.data.opciones;
                        let preguntasConOpciones = [];
                        let ultimoId = 0;
                        let preguntaConOpcionesContador = 0;
                        for(let i = 0; i < this.pregunta.length; i++){
                          if( ultimoId === this.pregunta[i].id_pregunta ){
                            preguntasConOpciones[preguntaConOpcionesContador-1].opciones.push(this.pregunta[i].opcion);
                            preguntasConOpciones[preguntaConOpcionesContador-1].respuesta = (this.pregunta[i].esrespuesta) ? this.pregunta[i].opcion : preguntasConOpciones[preguntaConOpcionesContador-1].respuesta;
                          }else{
                            preguntasConOpciones.push({
                              id_pregunta: this.pregunta[i].id_pregunta,
                              id_tema: this.pregunta[i].id_tema,
                              pregunta: this.pregunta[i].pregunta,
                              tipo: this.pregunta[i].tipo,
                              tema: this.pregunta[i].tema,
                              opciones: [this.pregunta[i].opcion],
                              respuesta: (this.pregunta[i].esrespuesta) ? this.pregunta[i].opcion : ''
                            });
                            ultimoId = this.pregunta[i].id_pregunta;
                            preguntaConOpcionesContador++;
                          }
                        }
                        this.pregunta = preguntasConOpciones;    
                    },
                    error => {
                        console.error(error)
                    }
                )
                
                for (let i = 0; i < this.pregunta.length; i++) {
                    this.pregunta[i].imagenes = [];
                    for (let j = 0; j < this.todasLasImagenes.length; j++) {
                        if (this.pregunta[i].id_pregunta == this.todasLasImagenes[j].idpregunta) {
                            this.pregunta[i].imagenes.push(this.todasLasImagenes[j]);
                        }
                    }
                }
                
            },

            getTemas() {
                axios({
                    method: 'GET',
                    url: '/tema/all'
                }).then(
                    result => {
                        this.temas = result.data
                    },
                    error => {
                        console.error(error)
                    }
                )
            },

            editarPregunta(id, imagenes) {
                this.editarPreguntaVar = true;
                this.id_editar = id;
                var x = document.getElementById("id_tema");
                var length = x.options.length;
                for (i = length - 1; i >= 0; i--) {
                    x.options[i] = null;
                }
                for (var i = 0; i < this.temas[0].length; i++) {
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
                for (var x = rowCount - 1; x > 0; x--) {
                    elmtTable.removeChild(tableRows[x]);
                }
                //Obtener los datos de la prugunta con el id
                for (var i = 0; i < this.pregunta.length; i++) {
                    if (this.pregunta[i].id_pregunta == id) {
                        pregunta.value = this.pregunta[i].pregunta;
                        document.getElementById("id_tema").value = this.pregunta[i].id_tema
                        break;
                    }
                }

                //Obtener las opciones
                var numero = 0;

                for (var i = 0; i < this.opciones[0].length; i++) {
                    if (this.opciones[0][i].id_pregunta == id) {

                        var o = [];
                        o[0] = this.opciones[0][i].opcion;
                        o[1] = "opt_" + numero;

                        if (this.opciones[0][i].esrespuesta == 1) {
                            o[2] = 1;
                        } else {
                            o[2] = 0;
                        }

                        opciones.push(o);
                        numero++;
                    }
                }



                for (var i = 0; i < opciones.length; i++) {

                    var opcion = opciones[i][0];
                    var table = document.getElementById("opciones");
                    var row = table.insertRow(-1);
                    row.id = "fila_" + noOpcion;
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    cell1.innerHTML = "" + opcion;

                    // creating checkbox element 
                    let checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.id = "check_" + noOpcion;

                    if (opciones[i][2] == 1) {
                        checkbox.checked = true;
                    }

                    checkbox.addEventListener('click', function () {
                        checkRespuesta(this.id)
                    });
                    cell2.appendChild(checkbox);

                    let button = document.createElement('button');
                    button.id = "btn_" + noOpcion;
                    button.innerHTML = 'Quitar';
                    button.className = "btn btn-danger";
                    button.addEventListener('click', function () {
                        btnQuitarOpcion(this.id)
                    });
                    cell3.appendChild(button);

                    noOpcion = noOpcion + 1;

                }

                noOpcion = 0;
                
                this.subidor.imagenesVistaPrevia = [];
                this.subidor.imagenes = [];
                this.subidor.imagenesAEliminar = [];
                
                let numeroMayorDeImagen = 0;
                for (let i = 0; i < imagenes.length; i++) {
                    this.subidor.acomodarImagen("/imagenes/preguntas/" + imagenes[i].nombre, 1, imagenes[i].idImagen);
                    if (imagenes[i].alias.split("_")[3].split(".")[0] > numeroMayorDeImagen) {
                        numeroMayorDeImagen = imagenes[i].alias.split("_")[3].split(".")[0];
                    }
                }
                this.subidor.ultimaImagenEnPreguntaAEditar = numeroMayorDeImagen;
                
            },

            abrirModal: async function () {
                this.editarPreguntaVar = false;

                var x = document.getElementById("id_tema");

                var length = x.options.length;
                for (i = length - 1; i >= 0; i--) {
                    x.options[i] = null;
                }

                for (var i = 0; i < this.temas[0].length; i++) {
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
                for (var x = rowCount - 1; x > 0; x--) {
                    elmtTable.removeChild(tableRows[x]);
                }
                
                this.subidor.imagenesVistaPrevia = [];
                this.subidor.imagenes = [];
                this.subidor.imagenesAEliminar = [];
            },
            btnGuardarPregunta: async function () {
                var pregunta = document.getElementById("pregunta");
                var total_opciones = opciones.length;
                var tema = document.getElementById("id_tema").value;
                var total_chequeados = 0;
                var errores = 0;
                for (var i = 0; i < opciones.length; i++) {
                    if (opciones[i][2] == 1) {
                        total_chequeados++;
                    }
                }
                if (total_chequeados == 0) {
                    errores++;
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Debes seleccionar al menos una respuesta'
                    })
                }
                if (total_opciones < 2) {
                    errores++;
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Deben ser como minimo dos opciones'
                    })
                }
                if (pregunta.value == "" || pregunta.value == null) {
                    errores++;
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'El reactivo no debe estar vacio'
                    })
                }
                if (errores == 0) {

                    if (this.editarPreguntaVar) {

                        axios.post('preguntaOpcionMultiple/update', {
                                opciones: opciones,
                                rectivo: pregunta.value,
                                tema: tema,
                                id: this.id_editar
                            })
                            .then( async (res) => {
                                this.$swal.fire({
                                    icon: 'success',
                                    title: 'Pregunta actualizada',
                                    text: 'Pregunta actualizada con exito',
                                })
                                const modals = document.getElementsByClassName('modal');
                                for (let i = 0; i < modals.length; i++) {
                                    modals[i].classList.remove('show');
                                    modals[i].setAttribute('aria-hidden', 'true');
                                    modals[i].setAttribute('style', 'display: none');
                                }
                                const modalsBackdrops = document.getElementsByClassName('modal-backdrop');
                                for (let i = 0; i < modalsBackdrops.length; i++) {
                                    document.body.removeChild(modalsBackdrops[i]);
                                }
                            
                                await this.subidor.subirImagenes(this.id_editar);
                                
                                this.getpreguntas();

                            })
                            .catch((err) => {
                                console.log(err)
                            })

                    } else {

                        axios.post('preguntaOpcionMultiple/store', {
                                opciones: opciones,
                                rectivo: pregunta.value,
                                tema: tema
                            })
                            .then(async (res) => {
                                this.$swal.fire({
                                    icon: 'success',
                                    title: 'Pregunta guardada',
                                    text: 'Pregunta guardada con exito',
                                })
                                const modals = document.getElementsByClassName('modal');
                                for (let i = 0; i < modals.length; i++) {
                                    modals[i].classList.remove('show');
                                    modals[i].setAttribute('aria-hidden', 'true');
                                    modals[i].setAttribute('style', 'display: none');
                                }
                                const modalsBackdrops = document.getElementsByClassName('modal-backdrop');
                                for (let i = 0; i < modalsBackdrops.length; i++) {
                                    document.body.removeChild(modalsBackdrops[i]);
                                }
                            
                                await this.subidor.subirImagenes(res.data.ultimo_id);
                                
                                this.getpreguntas();
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                }
            },
            btnAgregarOpcion: async function () {
                var opcion = document.getElementById("inputOpcion");
                var table = document.getElementById("opciones");
                if (!(opcion.value == "" || opcion.value == null)) {
                    var row = table.insertRow(-1);
                    row.id = "fila_" + noOpcion;
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    cell1.innerHTML = "" + opcion.value;
                    let checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.id = "check_" + noOpcion;
                    checkbox.addEventListener('click', function () {
                        checkRespuesta(this.id)
                    });
                    cell2.appendChild(checkbox);

                    let button = document.createElement('button');
                    button.id = "btn_" + noOpcion;
                    button.innerHTML = 'Quitar';
                    button.className = "btn btn-danger";
                    button.addEventListener('click', function () {
                        btnQuitarOpcion(this.id)
                    });
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
                        axios.post('pregunta/eliminar', {
                                id: id
                            }).then((res) => {
                                this.$swal({
                                    type: 'success',
                                    title: '¡Pregunta Eliminada!'
                                })
                                this.getpreguntas();
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

    var opciones = [];
    var noOpcion = 0;
    var reactivo = "";

    function btnQuitarOpcion(opcion) {

        var id_fila = opcion.split('_')[1];
        var row = document.getElementById("fila_" + id_fila);
        row.parentNode.removeChild(row);

        var id_opc = "opt_" + id_fila;

        for (var i = 0; i < opciones.length; i++) {
            if (opciones[i][1] == id_opc) {
                opciones.splice(i, 1);
            }
        }
    }

    function checkRespuesta(opcion) {

        var id_check = opcion.split('_')[1];
        var id_opc = "opt_" + id_check;
        var total_opciones = opciones.length;
        var total_chequeados = 0;

        for (var i = 0; i < opciones.length; i++) {
            if (opciones[i][2] == 1) {
                total_chequeados++;
            }
        }

        if (total_chequeados + 1 == total_opciones) {


            if (document.getElementById(opcion).checked) {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'No puedes poner todas las opciones como respuesta'
                })
            }

            document.getElementById(opcion).checked = false;
        }

        if (document.getElementById(opcion).checked) {
            for (var i = 0; i < opciones.length; i++) {
                if (opciones[i][1] == id_opc) {
                    opciones[i][2] = 1;
                }
            }
        } else {
            for (var i = 0; i < opciones.length; i++) {
                if (opciones[i][1] == id_opc) {
                    opciones[i][2] = 0;
                }
            }
        }

    }
</script>