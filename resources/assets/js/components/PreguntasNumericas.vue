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
            <div class="card">
                <div class="card-body">
                    <div class="page-header border-0" style="padding: 0 0 0; margin: 0 0 0;">
                        <div class="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                            <h2 class="page-title"> Listado de preguntas numericas </h2>
                            <ul class="quick-links ml-auto">
                                <li>
                                    <button type="button" class="btn btn-primary float-right btn-lg" data-toggle="modal"
                                        data-target="#registrarPregunta" @click="cambiarModo">
                                        <i class="fas fa-edit"></i> Registrar pregunta
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <label> <b> Busqueda por pregunta: </b> </label>
                        <input class="form-control mb-2" v-model="filters.pregunta.value"
                            placeholder="Ej. ¿Cuánto es 2+2?" />
                        <div class="table-responsive">
                            <v-table :data="preguntaNumerica" :filters="filters" :currentPage.sync="currentPage"
                                :pageSize="5" @totalPagesChanged="totalPages = $event" style="width:100%"
                                class="table mb-2">
                                <thead slot="head" class="thead-dark">
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
                                        <td class="text-center">{{preguntaNumerica.tema}}</td>
                                        <td class="text-center">{{preguntaNumerica.opcion}} </td>
                                        <td class="text-center">{{preguntaNumerica.rango}}</td>
                                        <td v-if="preguntaNumerica.aplicableArriba == true" class="text-center">SI</td>
                                        <td v-else class="text-center">No</td>
                                        <td v-if="preguntaNumerica.aplicableAnbajo == true" class="text-center">SI</td>
                                        <td v-else class="text-center">No</td>
                                        <td>
                                            <button type="button" class="btn btn-primary" data-toggle="modal"
                                                data-target="#modalParaVerImagenes"
                                                @click="desplegarImagenesEnModal(preguntaNumerica.imagenes)">
                                                <i class="fas fa-eye"></i> Ver
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn btn-warning"
                                                @click="btnEditar(preguntaNumerica.id_pregunta,preguntaNumerica.pregunta,preguntaNumerica.opcion,preguntaNumerica.tipo,preguntaNumerica.id_tema, preguntaNumerica.rango ,preguntaNumerica.imagenes)"
                                                data-toggle="modal" data-target="#registrarPregunta"><i
                                                    class="fas fa-pen"></i> Editar </button>
                                            <button class="btn btn-danger"
                                                @click="eliminar(preguntaNumerica.id_pregunta, preguntaNumerica.imagenes)"><i
                                                    class="fas fa-trash"></i> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </div>
                        <smart-pagination :currentPage.sync="currentPage" :totalPages="totalPages" />
                    </div>
                    <div class="modal fade" id="registrarPregunta" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 v-if="modoEdicion" class="modal-title" id="exampleModalLabel"> Actualizar
                                        pregunta </h5>
                                    <h5 v-else class="modal-title" id="exampleModalLabel"> Registrar pregunta </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p class="text-left mb-0"> <b> Pregunta: </b></p>
                                    <textarea id="pregunta" type="text" class="form-control mt-0 mb-0"
                                        placeholder="Pregunta" @focus="limpiarCampos('pregunta')"></textarea>
                                    <span id="msjInputPregunta"> </span>
                                    <p class="text-left mt-2 mb-0"> <b> Respuesta: </b> </p>
                                    <textarea id="respuesta" type="text" class="form-control mt-0 mb-0"
                                        placeholder="Respuesta" @focus="limpiarCampos('respuesta')"></textarea>
                                    <span id="msjInputRespuesta"> </span>
                                    <p class="text-left mt-2 mb-0"> <b> Margen: </b> </p>
                                    <input id="margen" class="swal2-input" placeholder="margen">
                                    <p class="text-left mt-2 mb-0"> <b> Aplicar el margen de error a la respuesta </b>
                                    </p>
                                    <input type="checkbox" id="arriba" name="arriba" value="si" checked>
                                    <label for="male">Aplicar hacia arriba</label><br>
                                    <input type="checkbox" id="abajo" name="abajo" value="si" checked>
                                    <label for="male">Aplicar hacia abajo</label><br>
                                    <p class="text-left mt-2 mb-0"> <b> Tema: </b> </p>
                                    <select id="id_tema" value="${this.temas}" name="temas"
                                        class="form-control mt-0 mb-0" @focus="limpiarCampos('tema')">
                                        <option value="">Tema</option>

                                        <option v-for="t in temas[0]" :value="t.id">
                                            {{ t.nombre_tema }}
                                        </option>
                                    </select>
                                    <span id="msjSelectTema"> </span>
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
                                    <button v-if="modoEdicion" type="button" @click="editar" class="btn btn-primary">
                                        Editar </button>
                                    <button v-else type="button" @click="btnGuardar" class="btn btn-primary"> Guardar
                                    </button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal"> Cancelar
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
                        this.temas = result.data;
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
                let selectTema = document.getElementById("id_tema");
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
                this.id_tema = selectTema.value;
                if (this.id_tema == "" || this.pregunta == "" || this.respuesta == "") {
                    if (this.id_tema == "") {
                        selectTema.style.border = "1px solid #ff6258";
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
                let selectTema = document.getElementById("id_tema");
                let msjSelectTema = document.getElementById("msjSelectTema");
                let msjInputRespuesta = document.getElementById("msjInputRespuesta");
                let msjInputPregunta = document.getElementById("msjInputPregunta");
                if (id == "tema") {
                    selectTema.style.border = "1px solid #dee2e6";
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
                let selectTema = document.getElementById("id_tema");
                let inputMargen = document.getElementById("margen");
                this.modoEdicion = 1;
                this.id = id;
                inputRespuesta.value = respuesta;
                inputPregunta.value = pregunta;
                selectTema.value = id_tema;
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
                let selectTema = document.getElementById("id_tema");
                let inputMargen = document.getElementById("margen");
                inputMargen.value = this.margend;
                inputRespuesta.value = "";
                inputPregunta.value = "";
                selectTema.value = "";
                this.subidor.imagenesVistaPrevia = [];
                this.subidor.imagenes = [];
                this.subidor.imagenesAEliminar = [];
                this.modoEdicion = 0;
            },
            editar() {
                let inputPregunta = document.getElementById("pregunta");
                let inputRespuesta = document.getElementById("respuesta");
                let selectTema = document.getElementById("id_tema");
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
                this.id_tema = selectTema.value;
                if (this.id_tema == "" || this.pregunta == "" || this.respuesta == "") {
                    if (this.id_tema == "") {
                        selectTema.style.border = "1px solid #ff6258";
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