//Mensajes de los resultados de las jugadas
var mensajes = {
    tipa: "Tijeras cortan papel",
    papi: "Papel tapa piedra",
    pila:"Piedra aplasta lagarto",
    lasp: "Lagarto envenena a Spock",
    spti: "Spock rompe tijeras",
    tila: "Tijeras decapitan lagarto",
    lapa: "Lagarto devora papel",
    pasp: "Papel desautoriza a Spock",
    sppi: "Spock vaporiza piedra",
    piti: "Piedra aplasta tijeras",
    empt: "Has empatado",
    perd: "Has perdido la partida",
    vict: "Has ganado la partida"
}

let posibilidades = ["piedra", "papel", "tijera", "lagarto", "spock"];
//Las imagenes
let items;
//Donde dejamos las imagenes
let tablero;
//La imagen seleccionada
let idelemento;
//La eleccion de la maquina
let idelementomaquina

let victoria=false;

let empate= false;

//puntos por partida actual
let puntos;

//puntos totales
let puntosTotales=0;

let puntosTotalesMaquina=0;

//elementos del mensaje
let mensaje;
let cajamensaje;

let cajaItems;

//Variables que contendrán los elementos HTML que vayamos a necesitar

window.onload = function(){
    cargarTablero();
    asignarElementosHTML();
    cargarEventos();
}

function asignarElementosHTML() {
    //Función que utilizaremos para asignar los elementos HTML que vayamos a utilizar, a las varibales que hemos creado.
    //Selecciono las imagenes
    items = document.getElementById("selector").getElementsByTagName("img");
    //Selecciono donde vamos a dejar el elemento
    tablero=document.getElementById("seleccionado");
    //selecciono el mensaje
    mensaje = document.getElementById("mensaje").getElementsByTagName("p");
    mensaje= mensaje[0];
    cajamensaje=document.getElementById("mensaje");
    
    
}

function cargarEventos() {
    //Función donde cargaremos los eventos que necesite cada elemento de la partida

    //Recorro los items (las imagenes) y les añado los listeners hasta -1 porque el ultimo es la maquina
    for (let i = 0; i < items.length; i++){
        
        items[i].addEventListener("dragstart",drag);
        items[i].addEventListener("dragover",allowDrop);
        items[i].addEventListener("drop",drop)
    }
    tablero.addEventListener("dragover",allowDrop);
    tablero.addEventListener("drop",drop)
    
}

function continuar() {
    //Función que lanzamos cuando pulsamos al botón continuar
    //Volvemos a ocultar el mensaje;
    document.getElementById("mensaje").className = "invisible";
    document.getElementById("proteccion").className = "invisible";
    document.getElementById("deliveracion").className = "invisible";

    //Si es una jugada reiniciamos todo menos los contadores de puntos.
    //Si es el final de la partida, también incluimos los contadores de puntos.
    cargarTablero();
}

function deliverar() {
    document.getElementById("proteccion").className="visible";
    document.getElementById("deliveracion").className="visible";
    
    setTimeout(mostrarMensaje,2000);
}

function mostrarMensaje() {
    //Mostramos el mensaje en función del resultado de la jugada o de la partida
    cajamensaje.className="visible";

    switch (idelemento){

        case "piedra":

            switch (idelementomaquina){
                case "piedra":
                    empate=true; 
                    mensaje.innerHTML=mensajes.empt;
                    break;
                case "papel":
                    mensaje.innerHTML=mensajes.papi;
                    break;
                case "tijera":
                    mensaje.innerHTML=mensajes.piti;
                    victoria=true;
                    break;
                case "lagarto":
                    mensaje.innerHTML=mensajes.pila;
                    victoria=true;
                    break;
                case "spock":
                    mensaje.innerHTML=mensajes.sppi;
                    break;
                default:
                    break;
                
            }

        break;

        case "papel":
            switch (idelementomaquina){
                case "piedra":
                    victoria=true; 
                    mensaje.innerHTML=mensajes.papi;
                    break;
                case "papel":
                    empate=true;
                    mensaje.innerHTML=mensajes.empt;

                    break;
                case "tijera":
                    mensaje.innerHTML=mensajes.tipa;
                
                    break;
                case "lagarto":
                    mensaje.innerHTML=mensajes.lapa;
                    break;
                case "spock":
                    mensaje.innerHTML=mensajes.pasp;
                    victoria=true
                    break;
                default:
                    break;
                
            }
            break;
        case "tijera":

            switch (idelementomaquina){
                case "piedra":
                    mensaje.innerHTML=mensajes.piti;
                    break;
                case "papel":
                    mensaje.innerHTML=mensajes.tipa;
                    victoria=true;
                    break;
                case "tijera":
                    mensaje.innerHTML=mensajes.empt;
                    empate=true;

                    break;
                case "lagarto":
                    mensaje.innerHTML=mensajes.tila;
                    victoria=true;
                    break;
                case "spock":
                    mensaje.innerHTML=mensajes.spti;
                    break;
                default:
                    break;
                
            }
            break;
        case "lagarto":
            switch (idelementomaquina){
                case "piedra":
                    
                    mensaje.innerHTML=mensajes.pila;
                    break;
                case "papel":
                    mensaje.innerHTML=mensajes.lapa;
                    victoria=true; 
                    break;
                case "tijera":
                    mensaje.innerHTML=mensajes.tila;
                   
                    break;
                case "lagarto":
                    mensaje.innerHTML=mensajes.empt;
                    empate=true;

                    break;
                case "spock":
                    mensaje.innerHTML=mensajes.lasp;
                    victoria=true;
                    break;
                default:
                    break;                
            }
            break;

        case "spock":
            switch (idelementomaquina){
                case "piedra":
                    victoria=true
                    mensaje.innerHTML=mensajes.sppi;
                    break;
                case "papel":
                    mensaje.innerHTML=mensajes.pasp;
                    break;
                case "tijera":
                    mensaje.innerHTML=mensajes.spti;
                    victoria=true;
                   
                    break;
                case "lagarto":
                    mensaje.innerHTML=mensajes.lasp;
                    break;
                case "spock":
                    mensaje.innerHTML=mensajes.empt;
                    empate=true;

                    break;
                default:
                    break;                
            }
        break;
    }
    calcularResultado();
}

function cargarTablero() {
    //Función donde crearemos los elementos que vayamos a necesitar, junto a sus atributos y eventos
    //La utilizaremos para reiniciar cada jugada

    document.getElementById("mensaje").className = "invisible";
    document.getElementById("proteccion").className = "invisible";
    document.getElementById("deliveracion").className = "invisible";

    //Crea tantos divs comos puntos obtenidos en esa ronda;
    for (let i = 0; i<puntos; i++){

        if (victoria){
            let div = document.createElement("div");
            div.style.height="65px"
            div.className="mio";
            document.getElementById("jugador").appendChild(div);
        }else if (empate){

        }else{
            let div = document.createElement("div");
            div.style.height="65px"

            
            div.className="suyo";
            document.getElementById("maquina").appendChild(div);
        }
    }
    puntos=0;
    empate=victoria=false;
    //Selecciono las cajas de las imagenes para añadir la que falte
    cajaItems= document.getElementsByClassName("item");
    let imagenAnterior=document.getElementById("seleccionado").getElementsByTagName("img");
    imagenAnterior=imagenAnterior[0];

    for (let i = 0; i< cajaItems.length-1; i++){

        if (!cajaItems[i].children.length>0){
            cajaItems[i].appendChild(imagenAnterior);
        }
    }
    //Restablezco la imagen del enemigo
    let imagenemigo = document.getElementById("enemigo").getElementsByTagName("img");
    imagenemigo[0].src ="img/interrogante.png";
}


function calcularResultado(){
    //En este momento puntos era una String
    puntos= parseInt(puntos);


    if (victoria){
        puntosTotales+=puntos;
    }else if (empate){
        
    }else{
        puntosTotalesMaquina+=puntos;
    }

    //Si el jugador o la maquina llega a 11 puntos o mas se acaba la partida
    if(puntosTotales>=11||puntosTotalesMaquina>=11){
        finJuego();
        console.log("fin del juego")
        console.log(puntosTotales)
        console.log(puntosTotalesMaquina +" maquina")
    }
    
    //Cuando le des al boton de continuar recarga la pagina con la informacion de los puntos en la cabecera:
    document.getElementById("continuar").addEventListener("click",cargarTablero);
}




/***************************DRAG AND DROP ****************************/

//Le añado el identificador
function drag(evento){

    evento.dataTransfer.setData("identificador",this.id);
}

//Le digo que no se comporte como lo haria normalmente
function allowDrop(ev){
    ev.preventDefault()
}
//Lo mismo que el anterior pero muevo la imagen
function drop(ev){
    ev.preventDefault();
    elemento = document.getElementById(ev.dataTransfer.getData("identificador"));
    idelemento= elemento.id;
    puntos= elemento.dataset.puntos;
    tablero.appendChild(elemento);
    setTimeout(turnoMaquina, 500);
}

//Funciones para el drag&drop
 
 /***************************FIN DRAG AND DROP **************************/



 function turnoMaquina(){

    //genera un numero entre 0 y 4
    let eleccion = Math.floor(Math.random() * (4 + 1));
    //selecciono el cuadro donde va la decision enemiga
    //selecciono la imagen del enemigo
    let imagenemigo = document.getElementById("enemigo").getElementsByTagName("img");

    //el id de la maquina
    idelementomaquina = posibilidades[eleccion];
    
    //Le pongo el mismo src a el hueco donde va el enemigo y a la imagen elegida
    imagenemigo[0].src=document.getElementById(idelementomaquina).src;

    deliverar();    
}


function finJuego(){
    //Cambios en el boton de continuar al acabar la partida
    document.getElementById("continuar").removeEventListener("click",cargarTablero);
    document.getElementById("continuar").innerText="Volver a Jugar";
    document.getElementById("continuar").addEventListener("click", function(){location.reload()});

    //Muestro el mensaje
    document.getElementById("proteccion").className="visible";
    document.getElementById("deliveracion").className="visible";
//borrar
    mensaje.innerHTML=mensajes.spti;

    if (puntosTotales>puntosTotalesMaquina){
        mensaje.innerHTML=mensajes.vict;
    }else{
        mensaje.innerHTML=mensajes.perd;
    }
}
