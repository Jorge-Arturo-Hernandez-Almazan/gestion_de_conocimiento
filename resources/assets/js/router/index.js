// resources/assets/js/router/index.js

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Profesores from '@/components/Profesores'

import Expertos from '@/components/Expertos'
import Alumnos from '@/components/Alumnos'
import Administrador from '@/components/Administrador'

//modulos extras que permiten resolver problemas
//import historialalumnos from '@/components/historialalumnos'
import temas from '@/components/temas'
import PreguntasAbiertas from '@/components/PreguntasAbiertas'
import PreguntasNumericas from '@/components/PreguntasNumericas'
import PreguntasVerdaderoFalso from '@/components/PreguntasVerdaderoFalso'
import PreguntasOpcionMultiple from '@/components/PreguntasOpcionMultiple'
import Cuestionario from '@/components/Cuestionario'
import ConfiguracionCuestionario from '@/components/ConfiguracionCuestionario'
import AccesoRutas from '@/components/AccesoRutas'
import PreguntasCalculadas from '@/components/PreguntasCalculadas'
import PreguntasOpcionMultipleCalculadas from '@/components/PreguntasOpcionMultipleCalculadas'
import Perfil from '@/components/Perfil'
import indexAlumnos from '@/components/IndexAlumnos'
import indexExpertos from '@/components/IndexExpertos'
import indexProfesores from '@/components/IndexProfesores'
import saludar from '@/components/saludar'
import NotFound from '@/components/NotFound.vue'
import Grafo from '@/components/grafo'
import Contacto from '@/components/Contacto'
import subirImagenes from '@/components/subir_Imagenes'

Vue.use(Router)

export default new Router({
    mode: 'history',
   routes: [
	   
    {
        path:'/tablero',
        name:'Index',
        component:Index
    },
	{
        path:'/configurarAccesos',
        name:'AccesoRutas',
        component: AccesoRutas
    },
    {
        path: '/usuariosAdministrador',
        name: 'Administrador',
        component: Administrador
    },
    {
        path: '/usuariosAlumno',
        name: 'Alumno',
        component: Alumnos
    },
    {
        path: '/usuariosExperto',
        name: 'Expertos',
        component: Expertos
    },
     {
        path: '/usuariosProfesor',
        name: 'Profesores',
        component: Profesores
    },
    {
	      path:'/configurarCuestionario',
	      name: 'ConfiguracionCuestionario',
	      component: ConfiguracionCuestionario
    },
    {
       path:'/cuestionario',
       name: 'cuestionario',
       component: Cuestionario
    },
    {
        path: '/preguntasAbiertas',
        name: 'PreguntasAbiertas',
        component: PreguntasAbiertas
    },
    {
        path: '/preguntasNumericas',
        name: 'PreguntasNumericas',
        component: PreguntasNumericas
    },
	  {
        path: '/preguntasVerdaderoFalso',
        name: 'PregunasVerdaderoFalso',
        component: PreguntasVerdaderoFalso
    },
    {
        path: '/preguntasOpcionMultiple',
        name: 'PreguntasOpcionMultiple',
        component: PreguntasOpcionMultiple
    }, 
	{
		path: '/preguntasCalculadas',
        name: 'PreguntasCalculadas',
        component: PreguntasCalculadas
	},
    {
		path: '/PreguntasOpcionMultipleCalculadas',
        name: 'PreguntasOpcionMultipleCalculadas',
        component: PreguntasOpcionMultipleCalculadas
	},
    {
         path:'/temas',
         name:'temas',
         component:temas
    },
    {
         path:'/experto/temas',
         name:'temasExperto',
         component:temas
    },
  
    {
        path: '/experto/preguntasAbiertas',
        name: 'PreguntasAbiertasExperto',
        component: PreguntasAbiertas
    },
    {
        path: '/experto/preguntasNumericas',
        name: 'PreguntasNumericasExperto',
        component: PreguntasNumericas
    },
	  {
        path: '/experto/preguntasVerdaderoFalso',
        name: 'PregunasVerdaderoFalsoExperto',
        component: PreguntasVerdaderoFalso
    },
    {
        path: '/experto/preguntasOpcionMultiple',
        name: 'PreguntasOpcionMultipleExperto',
        component: PreguntasOpcionMultiple
    }, 
          
	 {
       path:'/admins/app/Preguntanodo',
       name:'Preguntanodo',
       component:temas
    },
	   {
       path:'/perfil',
       name:'Perfil',
       component:Perfil
    },
	{
       path:'/alumno/app',
       name:'Perfilalumno',
       component:indexAlumnos
    },
	{
       path:'/experto/app',
       name:'Dashboardexperto',
       component:indexExpertos
    },
		{
       path:'/profesor/app',
       name:'Dashboardprofesor',
       component:indexProfesores
    },
    {
        path: '/saludarvue',
        name: 'saludar',
        component: saludar
    },
    {
        path: '/grafo',
        name: 'grafo',
        component: Grafo
    },
    {
        path: '/contacto',
        name: 'contacto',
        component: Contacto
    },
    {
        path: '/subirImagenes',
        name: 'subirImagenes',
        component: subirImagenes
    },
	{
        path: '*',
        name: 'NotFound',
        component: NotFound,
    },
],linkActiveClass:"active", linkExactActiveClass: "active",
})