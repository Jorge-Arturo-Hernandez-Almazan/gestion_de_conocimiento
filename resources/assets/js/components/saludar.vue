<template>
<div>

  <h1>
    HOLAA ESTA ES EL COMPONENTE DE VUE
  </h1>
  
  <button @click="metodoSaludame">
    saludo cuando me das click
  </button>
  
</div>
</template>

<script>
import axios from 'axios'

export default{
	data(){
		return {
			
		}
	},
  created(){
    this.metodoSaludame()
  },
	mounted(){
		//this.metodoSaludame();
    console.log("ya se terminó de cargar");
	},
	methods: {
    
    metodoSaludame(){
      console.log("Hola!");
    }
		
	}
}
</script>