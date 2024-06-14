 /*stack

un stack es una variable en donde guardamos más variables. pero un stack tiene
caracteristicas especificas: en general no lo usas para lograr una lista y tener
accesso a todos objetos/valores que obtiene, pero más para guardar un "orden" de
ciertos valores y/o objetos.

hay diferentes tipos de stack, en general tenemos dos: first-in-last-out
(primero-que-entra-sale-ultimo) first-in-first-out (primero-que-entra-sale-primero)

el primero es como un balde: lo rellenas con cosas, pero solo tienes accesso al
ultimo objeto que entraste al balde. para acceder al primero tienes que sacar
todos antes. el otro es una cola: solo puede pasar uno cada vez y entonces cada
nuevo que llega se va al fin de la cola y el primero sale de la cola.

en javascript lo usamos listas (arrays) para formar un stack y usamos cuatro
funciones que nos da:
push(elemento/valor) : pone elemento/valor al fin de la lista
pop() : vuelve el ultimo elemento de la lista sacandole de la lista
shift(): vuelve el primero elemento de la lista, sacandole de la lista
unshift(elemento/valor): entra elemento/valor al inicio de la lista
ejemplos en codigo:

var lista = [1,2,3,4]
lista.push(5) // lista: [1,2,3,4,5]
var ultimo = lista.pop() //ultimo: 5, lista: [1,2,3,4]
var primero = lista.shift() //primero: 1, lista:[2,3,4]
lista.unshift(6) //lista:[6,2,3,4]
splice(2,1)= saca el objeto del indice 2, y saca 1 objetos
splice(2,3)= saca 3 objetos desde el indice 2

ejercicio:

construye un simulador de una estacion de servicio. cada coche que llega a la
estacion necesita 1 segundo para cada litro que tiene que llenar. la estacion
debe ser simultable en donde puedes cambiar el numero de bombas - es decir
cuantos coches pueden llenarse al mismo momento. guarda el tiempo total para
cada coche (espera + llenar), haciendo una estatistica

coches de prueba pueden ser asi:
(tanque: estado actual de litros,
  capacidad: litros maximo del tanque,
  llegaAlServicioEnS: segundos desde el inicio de la simulacion
  -> cuando debe llegar el coche al servicio

Estacion de Servicio: area de entrada. area de Bombas. salida.
                    tiene un reloj. bombas que se van liberando
Coches: un tanque, gasolina, un tiempo, entran, esperan,
        ocupan bomba y cargan, salen

  */

let estacion={};

  estacion.cantidadDeBombas= function(){
    let cuantasBombasHay=prompt("Cuantas bombas hay en la gasolinera?")
    let numeroDeBombas=1;
    if (cuantasBombasHay >= 1 && cuantasBombasHay <= 20) {
      numeroDeBombas=cuantasBombasHay;
      this.bombasEnServicio=numeroDeBombas;
      estacion.filaEsperaParaCarga=[];
      estacion.coches= [
        {nombre: "coche1", estadoTanque:15, capacidad:60, llegaAlServicioEnS: 1, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
        {nombre: "coche2", estadoTanque:25, capacidad:70, llegaAlServicioEnS: 10, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
        {nombre: "coche3", estadoTanque:13, capacidad:60, llegaAlServicioEnS: 20, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
        {nombre: "coche4", estadoTanque:10, capacidad:50, llegaAlServicioEnS: 25, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
        {nombre: "coche5", estadoTanque:11, capacidad:60, llegaAlServicioEnS: 30, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
        {nombre: "coche6", estadoTanque:5, capacidad:50, llegaAlServicioEnS: 45, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
        {nombre: "coche7", estadoTanque:18, capacidad:70, llegaAlServicioEnS: 60, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
        {nombre: "coche8", estadoTanque:30, capacidad:70, llegaAlServicioEnS: 80, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
        {nombre: "coche9", estadoTanque:42, capacidad:80, llegaAlServicioEnS: 85, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
        {nombre: "coche10", estadoTanque:20, capacidad:60, llegaAlServicioEnS: 100, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
        {nombre: "coche11", estadoTanque:30, capacidad:60, llegaAlServicioEnS: 120, tiempoTotalEnEspera:0, tiempoTotalEnGasolinera:0},
      ];
      estacion.filaEmpiezaACargar=[];
      estacion.saleCocheACalle=[];
      estacion.htmlIniciandoBombas();
      estacion.htmlListaDeCoches();
    }else{
        alert("Ingresar solo números enteros entre 1 y 20")
        estacion.cantidadDeBombas();
      }
  };

  estacion.htmlIniciandoBombas= function(){
    let zonaDeBombas=[];
    let divBomba={};
    let htlmZonaDeBombas=[];
    //console.log(this.bombasEnServicio);
    for (var i = 0; i < this.bombasEnServicio; i++) {
      x=i+1;
      zonaDeBombas[i]={id:"bomba"+x, ocupada:null}; //agrego cada bomba al array zonaDeBombas
      //console.log("hay en zona de bombas "+ zonaDeBombas.length);
      //console.log(zonaDeBombas); //da array, funciona
      this.divBomba = document.createElement("div"); // Creamos un <div>
      this.divBomba.setAttribute('id', 'bomba' + x);
      this.divBomba.textContent= "Bomba "+x;
      this.divBomba.classList.add ("bomba");
      htlmZonaDeBombas=document.getElementById('divZonaDeBombas');
      htlmZonaDeBombas.appendChild(this.divBomba);
    }
    //console.log(htlmZonaDeBombas);
    this.zonaDeBombas=zonaDeBombas;
  };

  estacion.htmlListaDeCoches= function(){
    let divCochesEnCalle={};
    for (var i = 0; i < estacion.coches.length; i++) {
      //console.log(estacion.coches);
      divCochesEnCalle=document.createElement("div");
      h=i+1;
      divCochesEnCalle.setAttribute('id', 'coche' + h);
      divCochesEnCalle.textContent=estacion.coches[i].nombre;
      divCochesEnCalle.classList.add('coche');
      var calleEntrada=document.getElementById("calleEntrada");
      calleEntrada.appendChild(divCochesEnCalle);
      //console.log(calleEntrada);
    };
  };

  estacion.turno= function(){
    // let pasoAPaso= "paso";
    // console.log(pasoAPaso, simulador.tiempoActual);
    for (let i = 0; i < estacion.coches.length; i++) {
       if (estacion.coches[i].llegaAlServicioEnS === simulador.tiempoActual || estacion.coches[i].llegaAlServicioEnS < simulador.tiempoActual) {
         let entraCocheAEstacion=estacion.coches.shift();
         //console.log(entraCocheAEstacion);
         estacion.filaEsperaParaCarga.push(entraCocheAEstacion);
         //console.log(estacion.filaEsperaParaCarga);
         let zonaDeEspera=document.getElementById("zonaDeEspera");
         var calleEntrada=document.getElementById("calleEntrada");
         //console.log(calleEntrada);
         //console.log(calleEntrada.firstElementChild);
         let htmlEntraCoche=calleEntrada.firstElementChild;
         zonaDeEspera.appendChild(htmlEntraCoche);
       };
     };
     estacion.empiezaACargar();
   };

   estacion.empiezaACargar=function(){
       //console.log(estacion.filaEsperaParaCarga.length);
       // let pasoAPaso12= "paso1.5";
       // console.log(pasoAPaso12, simulador.tiempoActual);
       if (estacion.filaEsperaParaCarga.length>0) {
         for (var n = 0; n < this.zonaDeBombas.length; n++) {
             //console.log(this.zonaDeBombas[n].ocupada);
             //console.log(this.zonaDeBombas);
           if (this.zonaDeBombas[n].ocupada===null) {
             let bombaVacia=this.zonaDeBombas[n];
             // console.log(bombaVacia);
             // console.log(estacion.filaEsperaParaCarga);
             let cocheEmpiezaACargar=estacion.filaEsperaParaCarga.shift();
             //console.log(cocheEmpiezaACargar);
             cocheEmpiezaACargar.tiempoTotalEnEspera=simulador.tiempoActual-cocheEmpiezaACargar.llegaAlServicioEnS;
             estacion.filaEmpiezaACargar.push(cocheEmpiezaACargar);
             //console.log(estacion.filaEmpiezaACargar);
             this.zonaDeBombas[n].ocupada="full";
             //console.log(this.zonaDeBombas[n].ocupada);
             let htmlCocheEmpiezaACargar=zonaDeEspera.firstElementChild;
             g=n+1;
             let bombaDeCarga=document.getElementById("bomba"+g);
             //console.log(bombaDeCarga);
             //let tiempoDeCarga=cocheEmpiezaACargar.capacidad-cocheEmpiezaACargar.estadoTanque;
             //let limiteCarga=this.zonaDeBombas[n].tiempoInicioCarga+tiempoDeCarga;

             bombaDeCarga.textContent="Bomba "+g+" Cargando";
             bombaDeCarga.appendChild(htmlCocheEmpiezaACargar);
             //console.log(bombaDeCarga);
             this.cocheEnBomba=cocheEmpiezaACargar;
             this.bombaCargando=this.zonaDeBombas[n];
             this.htmlBombaCargando=bombaDeCarga;
             //estacion.cocheCargando(this.cocheEnBomba, this.bombaCargando, this.htmlBombaCargando);
             estacion.terminaCarga();
             return;
           };
         };
       }
          estacion.terminaCarga();
       //setTimeout('estacion.tiempoCarga()',500);
     };


  estacion.terminaCarga= function(){
   // let pasoAPaso2= "paso2";
   // console.log(pasoAPaso2, simulador.tiempoActual);
   for (let i = 0; i < estacion.filaEmpiezaACargar.length; i++) {
      if (estacion.filaEmpiezaACargar[i].llegaAlServicioEnS+estacion.filaEmpiezaACargar[i].tiempoTotalEnEspera+estacion.filaEmpiezaACargar[i].capacidad-estacion.filaEmpiezaACargar[i].estadoTanque === simulador.tiempoActual
        || estacion.filaEmpiezaACargar[i].llegaAlServicioEnS+estacion.filaEmpiezaACargar[i].tiempoTotalEnEspera+estacion.filaEmpiezaACargar[i].capacidad-estacion.filaEmpiezaACargar[i].estadoTanque < simulador.tiempoActual) {
        let cocheACalle = this.filaEmpiezaACargar.splice(i, 1);
        console.log(cocheACalle);
        let cocheSale=cocheACalle.shift();
        cocheSale.tiempoTotalEnGasolinera=simulador.tiempoActual-cocheSale.llegaAlServicioEnS;
        estacion.saleCocheACalle.push(cocheSale);
        //console.log(cocheSale.nombre);
      //  estacion.saleCocheACalle[-1].tiempoTotalEnGasolinera=simulador.tiempoActual-estacion.saleCocheACalle[-1].llegaAlServicioEnS;
        var divCalleSalida=document.getElementById("calleSalida");
        let idCocheSale=cocheSale.nombre;
        //console.log(idCocheSale);
        let htmlSaleCoche=document.getElementById(idCocheSale);
        divCalleSalida.appendChild(htmlSaleCoche);
        let bombaVacia=document.getElementsByClassName('bomba');
        //console.log(bombaVacia);
        for (var u = 0; u < bombaVacia.length; u++) {
          if (bombaVacia[u].children.length===0) {
            this.zonaDeBombas[u].ocupada=null;
            z=u+1;
            bombaVacia[u].textContent="Bomba "+z;
            //console.log(this.zonaDeBombas);
            //console.log(estacion.saleCocheACalle);
          }
        }
      };
    };
  };

  estacion.termina=function(){
    console.log(estacion.saleCocheACalle);

    var sumaTiemposDeEspera = estacion.saleCocheACalle.reduce(function(acumulador, siguienteValor){
          return {
            tiempoTotalEnEspera: acumulador.tiempoTotalEnEspera + siguienteValor.tiempoTotalEnEspera
              };
            }, {tiempoTotalEnEspera: 0}); //Si no hay nada, regresamos un objeto con espera = 0
    var promedioEspera = sumaTiemposDeEspera.tiempoTotalEnEspera / estacion.saleCocheACalle.length;

    var sumaTiemposEnGasolinera = estacion.saleCocheACalle.reduce(function(acumulador, siguienteValor){
          return {
            tiempoTotalEnGasolinera: acumulador.tiempoTotalEnGasolinera + siguienteValor.tiempoTotalEnGasolinera
              };
            }, {tiempoTotalEnGasolinera: 0});
    var promedioEnGasolinera = sumaTiemposEnGasolinera.tiempoTotalEnGasolinera / estacion.saleCocheACalle.length;

    let htmlEsperaConmutador=document.getElementById("conmutadorEspera");
    let htmlGasolineraConmutador=document.getElementById("conmutadorGasolinera");
    htmlEsperaConmutador.textContent="Promedio Tiempo de Espera: "+promedioEspera.toFixed(2);
    htmlGasolineraConmutador.textContent="Promedio Tiempo Total En Gasolinera: "+promedioEnGasolinera.toFixed(2);
  };

    // para ejecutar cada segundo lo puedes usar la proxima funcion:
    let simulador = {
      tiempoActual: 0,
      tiempoMax: 50,
      simular: function(){
          document.getElementById('iniciar').setAttribute("onclick", "");
          simulador.tiempoActual++
          let htmlReloj=document.getElementById("reloj");
          htmlReloj.textContent=simulador.tiempoActual+" segundos";
          if(this.tiempoMax<=simulador.tiempoActual && estacion.filaEmpiezaACargar.length===0){
              //termina la simulacion - si quieres puedes entrar codigo aqui
              //ejemplo: estacion.termina(tiempoActual)
              estacion.termina(simulador.tiempoActual)
              document.getElementById('iniciar').setAttribute("onclick", "simulador.simular();");
              simulador.tiempoActual=0;
              return //se termina la funcion aqui
          }
          //entra por aqui la llamada a tu funcion, por ejemplo
          estacion.turno(simulador.tiempoActual);

          //espera un segundo (1000 ms) y llamar otra vez al simulador
          setTimeout('simulador.simular()',1000)
        }
      };

    estacion.cantidadDeBombas();
