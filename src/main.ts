//Fem els imports pertinents
import * as request from "request-promise-native";
import * as $ from "jquery";
// la connexion a la api de bitcoin
(async () => {
  //Declarem els path per l'url
  var url = 'https://api.coinbase.com';
  var path = '/v2/currencies';
  var path2 = '/v2/exchange-rates?currency=BTC';
  var primeraPart = {
    uri : url + path
  };
  var segonaPart = {
    uri : url+path2
  };
  //Guardarem la resquest i la parsejarem a json
  var res = await request.get(primeraPart);
  var res2 = await request.get(segonaPart);
  var bit1 = JSON.parse(res);
  var bit2 = JSON.parse(res2);
  //Recorrem tota l'array amb els resultats
  for (var i = 0; i < bit1.data.length; i++) {
    //Afegirem una id al value i un nom al option
    $('#tipusmoneda').append(`<option value="${bit1.data[i].id}">${bit1.data[i].name }</option>`);
    //Si el nom que detectem es Euro el posarem per defecte escullit
    if(bit1.data[i].id =="EUR" ){
      $('#1igual').text('1 bitcoin = ');
      $('#quantitat').text(bit2.data.rates[bit1.data[i].id]);
      $('#tipusmoneda option[value="EUR"]').attr('selected', 'selected');
      $('#nommon').text(bit1.data[i].name);
    }
    //Funció que canvia la moneda que es mostra
    var mostrar = document.getElementById('mostrar');
    mostrar.addEventListener('click', function () {
      //Borrarem perque sino ens mostrarie 2 numeros
      $('#quantitat').remove();
      $('#valor').text(bit2.data.rates[$('#tipusmoneda').find("option:selected").attr('value')]); //Afegim el text
      $('#nom').text($('#tipusmoneda').find("option:selected").text()); //Agafem el nom de la opcio seleccionada
      $('#nommon').text($('#tipusmoneda').find("option:selected").text()); //Igual
    });
    //Funció del input que transforma automaticament mentre s'entra el numero
    $("#num").on("input", function() {
      var num=$('#num').val();  //Agafem el valor
      var valor= bit2.data.rates[$('#tipusmoneda').find("option:selected").attr('value')]; //Busquem el valor per el que el tenim que dividir
      var res = <number>num/valor; //Fem la operació i mostrem el resultat
      $('#resultat').text(res);
    });
  }
})()