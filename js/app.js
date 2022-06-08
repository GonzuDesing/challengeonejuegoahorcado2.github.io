var startButton = document.getElementById('startBtn');
var wordButton = document.getElementById('newWordBtn');
var wordInput = document.getElementById('inputWord');
var inputBotton = document.getElementById('inputBtn'); 
var form = document.getElementById('form-Words');
var messageWin = document.getElementById('mWin');
var messageLose = document.getElementById('mLose');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//seleccionar los elementos html a utilizar y limpiar el canvas
ctx.canvas.width  = 0;
ctx.canvas.height = 0;
//definir elementos  logicos del juego variables utilizados para cada funcion del juego
let palabraSeleccionada;
let letrasUsadas;
let errores;
let aciertos;
let guiones = [];
let erroresAImprimir = [];
let posicion;
//dibuja las letras erroneas en la base de la horca
const agregarLetrasIncorrectas = letra => {
    ctx.font = " bold 20px Lucida Console"; 
    ctx.textBaseline="bottom";
    ctx.fillText(letra,posicion,220);   
    posicion=posicion+20;
};
//dibuja las partes del cuerpo del ahorcado conforme los errores que se cometen
const dibujarAhordado = (op) => {
    ctx.fillStyle = '#EDF2F4';
    switch(op) {
        case 1:
            ctx.fillRect(220, 40, 50, 50);//cabeza
            break;
        case 2:
            ctx.fillRect(240, 90, 10, 60);//TORZO
            break;
        case 3:
            ctx.fillRect(230, 100, 10, 10);//M_izq
            ctx.fillRect(220, 110, 10, 20);//M_izq
            break;
        case 4:
            ctx.fillRect(250, 100, 10, 10);//M_der
            ctx.fillRect(260, 110, 10, 20);//M_der
            break;       
        case 5:
            ctx.fillRect(230, 150, 10, 10);//P_izq
            ctx.fillRect(220, 160, 10, 20);//P_izq
            break;
        case 6:
            ctx.fillRect(250, 150, 10, 10);//P_der
            ctx.fillRect(260, 160, 10, 20);//P_der
            break;
        default:
            break;                
    }
};
//llama a la funcion que dibuja al ahorcado, muestra mensaje perdiste si llega a 6 intentos
const letraIncorrecta = ()=>{
    errores++;
    dibujarAhordado(errores);
    if(errores == 6){
        messageLose.hidden = false;
        endGame();
        //alert("PERDISTE")
    }
        
};
//saca el evento keydown evitando capturar mas letras
const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
    wordButton.style.display = 'block';
}
//si la letra ingresada esta en la palabra oculta la dibuja en la posicion correspondiente, muestra mensaje ganaste al completar la palabra
const letraCorrecta = letra => {
    for(let i=0; i<guiones.length; i++){
        if(letra===palabraSeleccionada[i]){
          guiones[i] = palabraSeleccionada[i];
          aciertos ++;
        }else{
          guiones[i] = " "
        }
      }
      ctx.font = " bold 30px Lucida Console"; 
      ctx.textBaseline="bottom";
      ctx.fillText(guiones.join(" "),240,300);   
      if(aciertos === guiones.length){
          messageWin.hidden = false;
          endGame();
          //alert("GANASTE")
        }
};
//procesa la letra si es que no se ha presionado su tecla correspondiente
const ingresarLetra = letra => {
    if(letrasUsadas.includes(letra) == false){
        if(palabraSeleccionada.includes(letra)){
            letraCorrecta(letra);
        }else{
            letraIncorrecta();
            agregarLetrasIncorrectas(letra);
        }
        letrasUsadas.push(letra);
    }else{
        alert("YA USASTE ESTA LETRA");
    }
};
//captura las teclas presiondas y valida que esten entre A - Z
const letterEvent = event => {
    let letraTecleada = event.key;
    //console.log(letraTecleada);
    var validado = /^[A-Z]+$/.test(letraTecleada);
    if(validado == true){
        ingresarLetra(letraTecleada);
    }else{
        alert("SOLO MAYUSCULAS ENTRE A-Z")
    }

};
//CODIGO DEL TABLERO INICIO DEL JUEGO
//dibuja las lineas del tablero correspondientes al tamaño de la palabra oculta
const dibujarTablero = (arr) => {
    for(let i=0; i<arr.length; i++){
        guiones.push("_");
    }
    //console.log(guiones)
    ctx.font = " bold 30px Lucida Console";
    ctx.fillStyle = "white"
    ctx.textAlign="center";
    ctx.fillText(guiones.join(" "),240,300);
    //console.log(guiones.length)
};
//selecciona una plabra aleatoriamente del arreglo de palabrasjs
const palabraAleatoria = () => {
    let ultimoIndice = arrPalabras.length - 1;
    let palabra = arrPalabras[Math.round(Math.random() * ultimoIndice)];
    palabraSeleccionada = palabra.split('');
    //console.log(palabraSeleccionada)
};
//dibuja la horca en el canvas
const dibujarHorca = () =>{
    ctx.canvas.width  = 480;
    ctx.canvas.height = 360;
    ctx.canvas.style.background = "#2B2D42";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = '#d90429';
    ctx.fillRect(80, 200, 140, 20);//base
    ctx.fillRect(140, 0, 20, 200);//poste
    ctx.fillRect(140, 0, 140, 20);//gancho
    ctx.fillRect(240, 20, 10, 20);//soga
};
//funcion que vacia todas las variables que se usan y prepara el tablero
const startGame = () => {
    canvas.style.display = 'block';
    posicion = 100;
    letrasUsadas = [];
    guiones = []
    errores = 0;
    aciertos = 0;
    messageWin.hidden = true;
    messageLose.hidden = true;
    startButton.style.display = 'none';
    wordButton.style.display = 'none';
    dibujarHorca();
    palabraAleatoria();
    dibujarTablero(palabraSeleccionada);
    document.addEventListener('keydown', letterEvent);
};
//determinar si la nueva palabra ya se encuentra en el arreglo palabras si no es el caso se agrega al arreglo
const insertarPalabra = (elemnt) => {
    if(!arrPalabras.includes(elemnt)){
        arrPalabras.push(elemnt);
        alert("¡AGREGADA EXITOSAMENTE!");
        //console.log(arrPalabras);
        form.style.display = 'none';
        startButton.style.display = 'block';
        wordButton.style.display = 'block';    
        wordInput.style.borderColor = 'palegreen';

    }else{
        alert("YA SE HA INGRESADO: "+elemnt+"\nPOR FAVOR INGRESE OTRA PALABRA");
        wordInput.style.borderColor = 'salmon';
    }
};
//validar lo que se ingreso en el form
const validarNuevaPalabra = (event) => {
    event.preventDefault();
    if(wordInput.checkValidity() == true){
        let cadenaIn = wordInput.value;
        //console.log(cadenaIn);
        insertarPalabra(cadenaIn);
        form.reset();
    }else{
        alert("NO VALIDO :( \nINGRESA DE 3 A 12 CARACTERES\n¡SOLO LETRAS MAYUSCULAS!");
        wordInput.style.borderColor = 'salmon';
    }
};
//mostrar formulario para capturar nueva palabra
const inputWord = () => {
    canvas.style.display = 'none';
    startButton.style.display = 'none';
    wordButton.style.display = 'none';
    messageWin.hidden = true;
    messageLose.hidden = true;
    form.style.display = 'block';
    inputBotton.addEventListener('click', validarNuevaPalabra)
};
//llamar a las funciones cuando se oprime iniciar o agregar palabra
wordButton.addEventListener('click', inputWord);
startButton.addEventListener('click', startGame);