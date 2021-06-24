// resources/assets/js/router/index.js

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Profesores from '@/components/Profesores'
import Halumno from '@/components/Halumno'
import Expertos from '@/components/Expertos'
import Alumnos from '@/components/Alumnos'
import Administrador from '@/components/Administrador'

//modulos extras que permiten resolver problemas
import Informacion from '@/components/informacionpersonal'
import resolvercuestionario from '@/components/resolvercuestionario'
import historialalumnosprofesor from '@/components/historialalumnosprofesor'
import arbolalumno from '@/components/arbolalumno'
//import historialalumnos from '@/components/historialalumnos'
import expertop from '@/components/expertop'
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

Vue.use(Router)

export default new Router({
    mode: 'history', // use HTML5 history instead of hashes
   // ... other settings
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
        path:'/resolverCuestionario',
        name:'resolvercuestionario',
        component:resolvercuestionario
    }, 
    {
        path: '/historial',
        name: 'Historial',
        component: Halumno
    }, 
    {
         path:'/temas',
         name:'temas',
         component:temas
    },
     //////////////////////////////////////////////////////////////////////////////
    
    {
        path: '/experto/historial',
        name: 'HistorialExperto',
        component: Halumno
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
        path:'/profesor/resolverCuestionario',
        name:'resolvercuestionarioProfesor',
        component:resolvercuestionario
    }, 
     
    
     
     
   {
        path:'/alumno/resolverCuestionario',
        name:'resolvercuestionarioAlumno',
        component:resolvercuestionario
    }, 
		 
     /*{
       path:'/profesor/app/historialalumnosprofesor',
       name:'historialalumnosprofesor',
       component:historialalumnosprofesor
     },*/
      {
       path:'/profesor/app/arbolalumno',
       name:'arbolalumno',
       component:arbolalumno
     },
      {
       path:'/profesor/app/informacionpersonal',
       name:'informacionProfesor',
       component:Informacion
     },
     {
       path:'/alumno/app/arbolalumno',
       name:'arbol_alumno',
       component:arbolalumno
     },
      {
       path:'/alumno/app/informacionpersonal',
       name:'informacionAlumno',
       component:Informacion
     },
      
      /*{
       path:'/alumno/app/historialalumnos',
       name:'historialalumnos',
       component:historialalumnos
     },*/
    
      {
       path:'/experto/app/informacionpersonal',
       name:'informacionExperto',
       component:Informacion
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
	   
]
})