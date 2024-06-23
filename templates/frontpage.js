const template = function(dataFrontpage){
  let raw =
  `
  <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Gasolinera</title>
      <link rel="stylesheet" href="/public/gasolinera.css">
    </head>
    <body>
      <div id="calleEntrada" class="cartel">Entrada</div>
      <div id="gasolinera">
        <div id="zonaDeEspera" class="cartel">Zona de Espera</div>
        <div id="divZonaDeBombas" class="zonaDeBombas cartel">Zona de Bombas</div>
        <div id="zonaConmutador" class="zonaConmutador cartel">Conmutador
          <div id="reloj" class="conmutador cartel">00:00</div>
          <input type="button" id="iniciar" name="" value="INICIAR TURNO" onclick="simulador.simular()">
          <div id="conmutadorEspera" class="conmutador cartel"></div>
          <div id="conmutadorGasolinera" class="conmutador cartel"></div>
        </div>
      </div>
      <div id="calleSalida" class="cartel">Salida</div>
    </body>
    <script src='/public/gasolinera.js'></script>
  </html>
  `;
    return raw;
}

module.exports = template;
