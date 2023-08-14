<template>
<!--head>
  <title>MathQuill Editor</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css">
</head-->   
  <div id="container">
    <div id="div1">
      <!-- menu desplegable para los botones  -->
      <div class="menu">
        <select id="menu-options" @change="toggleButtons" v-model="selectedOption">
          <option value="basic">Matemáticas Básicas</option>
          <option value="logic">Cálculo y Sumas</option>
          <option value="functions">Trigonometria</option>
          <option value="symbols">Símbolos</option>
        </select>
      </div>
          <div>
      <!--input
        v-model="inputValue"
        v-mathquill
        type="text"
        id="input2"
        class="mathquill-input"
      -->
    </div>
       <!--div id="input2"></div> <!-- entrada de la expresión -->
       <div id="mathquill-editor"></div>
      <div ref="mathField" id="input2"></div>

      <!--script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script-->

      
      
    
      
      <div v-for="buttonClass in buttonClasses" :key="buttonClass" :class="['menu-buttons', { active: buttonClass === activeButton }]">

        <!-- Los botones para Matemáticas Básicas -->
        <button v-if="buttonClass === 'basic-buttons'" id="left-p">(</button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-left-p" class="texto-emergente"></div>
        <button v-if="buttonClass === 'basic-buttons'" id="right-p">)</button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-right-p" class="texto-emergente"></div>
        <button v-if="buttonClass === 'basic-buttons'" id="xexp"><img src="/imagenes/toolbar-buttons/^.png" /></button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-exp" class="texto-emergente"></div>        
        <button v-if="buttonClass === 'basic-buttons'" id="xsub"><img src="/imagenes/toolbar-buttons/_.png" /></button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-xsub" class="texto-emergente"></div>        
        <button v-if="buttonClass === 'basic-buttons'" id="sqrt"><img src="/imagenes/toolbar-buttons/sqrt.png" /></button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-sqrt" class="texto-emergente"></div>
        <button v-if="buttonClass === 'basic-buttons'" id="sqrt3"><img src="/imagenes/toolbar-buttons/sqrt3.png" /></button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-sqrt3" class="texto-emergente"></div>
        <button v-if="buttonClass === 'basic-buttons'" id="frac"><img src="/imagenes/toolbar-buttons/frac.png" /></button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-frac" class="texto-emergente"></div>
        <button v-if="buttonClass === 'basic-buttons'" id="times">×</button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-times" class="texto-emergente"></div>
        <button v-if="buttonClass === 'basic-buttons'" id="div">÷</button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-div" class="texto-emergente"></div>
        <button v-if="buttonClass === 'basic-buttons'" id="ln"><img src="/imagenes/toolbar-buttons/log.png" /></button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-ln" class="texto-emergente"></div>  
        <button v-if="buttonClass === 'basic-buttons'" id="exp"><img src="/imagenes/toolbar-buttons/exp.png" /></button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-exp" class="texto-emergente"></div>
        <button v-if="buttonClass === 'basic-buttons'" id="leq">≤</button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-leq" class="texto-emergente"></div>
        <button v-if="buttonClass === 'basic-buttons'" id="geq">≥</button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-geq" class="texto-emergente"></div>
        <button v-if="buttonClass === 'basic-buttons'" id="equal">=</button>
        <div v-if="buttonClass === 'basic-buttons'" id="textoEmergente-equal" class="texto-emergente"></div> 
     
        <!-- Los botones para Cálculo y Sumas -->
        
        <button v-if="buttonClass === 'logic-buttons'" id="derivadasimple"><img src="/imagenes/toolbar-buttons/derivada.png" /></button>
        <div v-if="buttonClass === 'logic-buttons'" id="textoEmergente-derivadasimple" class="texto-emergente"></div>
        <button v-if="buttonClass === 'logic-buttons'" id="derivadasegundoorden"><img src="/imagenes/toolbar-buttons/derivada2orden.png" /></button>
        <div v-if="buttonClass === 'logic-buttons'" id="textoEmergente-derivadasegundoorden" class="texto-emergente"></div>
        <button v-if="buttonClass === 'logic-buttons'" id="derivadaparcialsimple"><img src="/imagenes/toolbar-buttons/parcial.png" /></button>
        <div v-if="buttonClass === 'logic-buttons'" id="textoEmergente-derivadaparcialsimple" class="texto-emergente"></div>
        <button v-if="buttonClass === 'logic-buttons'" id="derivadaparcialsegundoorden"><img src="/imagenes/toolbar-buttons/parcial2orden.png" /></button>
        <div v-if="buttonClass === 'logic-buttons'" id="textoEmergente-derivadaparcialsegundoorden" class="texto-emergente"></div> 
        
        <!-- Los botones para Trigonometría -->
        <button v-if="buttonClass === 'functions-buttons'" id="pi"><img src="/imagenes/toolbar-buttons/pi.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-pi" class="texto-emergente"></div>
        <button v-if="buttonClass === 'functions-buttons'" id="sin"><img src="/imagenes/toolbar-buttons/sin.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-sin" class="texto-emergente"></div>
        <button v-if="buttonClass === 'functions-buttons'" id="circ">°</button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-circ" class="texto-emergente"></div>        
        <button v-if="buttonClass === 'functions-buttons'" id="sin"><img src="/imagenes/toolbar-buttons/sin.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-sin" class="texto-emergente"></div> 
        <button v-if="buttonClass === 'functions-buttons'" id="cos"><img src="/imagenes/toolbar-buttons/cos.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-cos" class="texto-emergente"></div>
        <button v-if="buttonClass === 'functions-buttons'" id="tan"><img src="/imagenes/toolbar-buttons/tan.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-tan" class="texto-emergente"></div>   
        <button v-if="buttonClass === 'functions-buttons'" id="sec"><img src="/imagenes/toolbar-buttons/sec.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-sec" class="texto-emergente"></div> 
        <button v-if="buttonClass === 'functions-buttons'" id="csc"><img src="/imagenes/toolbar-buttons/csc.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-csc" class="texto-emergente"></div>
        <button v-if="buttonClass === 'functions-buttons'" id="cot"><img src="/imagenes/toolbar-buttons/cot.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-cot" class="texto-emergente"></div>  
        <button v-if="buttonClass === 'functions-buttons'" id="arcsin"><img src="/imagenes/toolbar-buttons/arcsin.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-arcsin" class="texto-emergente"></div>   
        <button v-if="buttonClass === 'functions-buttons'" id="arccos"><img src="/imagenes/toolbar-buttons/arccos.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-arccos" class="texto-emergente"></div>
        <button v-if="buttonClass === 'functions-buttons'" id="arctan"><img src="/imagenes/toolbar-buttons/arctan.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-arctan" class="texto-emergente"></div>
        <button v-if="buttonClass === 'functions-buttons'" id="sinh"><img src="/imagenes/toolbar-buttons/sinh.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-sinh" class="texto-emergente"></div>  
        <button v-if="buttonClass === 'functions-buttons'" id="cosh"><img src="/imagenes/toolbar-buttons/cosh.png" /></button>
        <div v-if="buttonClass === 'functions-buttons'" id="textoEmergente-cosh" class="texto-emergente"></div>    
   
         <!-- Los botones para Símbolos-->
       <button v-if="buttonClass === 'symbols-buttons'" id="theta">θ</button>
       <div v-if="buttonClass === 'symbols-buttons'" id="textoEmergente-theta" class="texto-emergente"></div>     
 
      
      
      </div>    
      </div>
    </div>
  </div>
</template>

<script>
//import MathQuill from 'mathquill';
//import MathQuillDirective from './directives/MathQuillDirective';
// import MathQuill from 'https://cdn.jsdelivr.net/npm/mathquill@0.10.1-a/build/mathquill.css';
// importa el archivo CSS de MathQuill desde la carpeta local
//import '@/components/mathquill/mathquill.css';
//importa el archivo JS de MathQuill desde la carpeta local
//import MathQuill from '@/components/mathquill/mathquill.js';
  

//import "https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css";

//import MathQuill from "https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js";

  
  export default {
  name: 'ToolBar',
  created() {
    
  },
  data() {
    return {

      selectedOption: 'basic', // opción inicial del menú desplegable
      activeButton: 'basic-buttons', // valor inicial para activeButton
      buttonClasses: ['basic-buttons', 'functions-buttons','logic-buttons','symbols-buttons'],// clases adicionales de los botones 
      inputValue: '', // nueva variable para manejar el valor del input
    };
  },
  mounted(){
//      this.initMathQuill();
      const MQ = MathQuill.getInterface(2); 
      const mathField = MQ.MathField(this.$refs.mathField); 
    
  },
  watch:{
   
     },
  methods: {
    toggleButtons() {
      this.activeButton = this.selectedOption + '-buttons';
      //this.MQ = MathQuill.getInterface(2);
      //this.answerSpan = document.getElementById('input2');
      //this.answerMathField = this.MQ.MathField(this.answerSpan);
      },
     /* initMathQuill() {
      // Obtiene el elemento div con id "input2"
     const input2 = document.getElementById('input2');
      // Inicializa MathQuill en el elemento div
      const mathField = MathQuill.getInterface(2).MathField(input2);
      
  
  },*/
  },
};
</script>


<style>
    body {
      font-family: Arial, sans-serif;
    }
    #container {
      width: 600px;
      height: 300px;
      overflow: hidden;

    }
    #input2 {
      width: 400px;
      height: 90px;
      margin: 20px;
      padding: 10px;
      font-size: 24px;
      border: 1px solid #000000da;
    }

    .menu {
      margin-bottom: 10px;
    }

    .menu select {
      font-size: 18px;
      padding: 5px;
    }

    .menu-buttons {
      display: none;
    }

    .menu-buttons.active {
      display: flex;
      flex-wrap: wrap;
    }

    menu-buttons .button-image {
      width: 50px;
      height: 50px;
      padding: 5px;
      background-color: #f1f1f1;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-buttons .button-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .menu-buttons button:hover {
      background-color: #e0e0e0;
    }

    .tooltip {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: #1485c9;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -60px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }

    #translate {
      margin-top: 10px;
      padding: 10px;
      font-size: 18px;
      background-color: #1485c9;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s;
    }

    #translate:hover {
      background-color: #1173a6;
    }

    .texto-emergente {
      display: none;
      position: absolute;
      background-color: rgba(71, 180, 215, 0.56);
      padding: 10px;
      border-radius: 5px;
      font-size: 12px;
    }

    .menu-buttons button img {
      max-width: 140%;
      max-height: 100%;
    }
  .menu-buttons.active {
  display: grid;
  grid-template-columns: repeat(8, 40px); 
  gap: 10px; 
  }

.menu-buttons button {
  width: 40px;
  height: 40px;
  font-size: 16px; 
}
</style>
