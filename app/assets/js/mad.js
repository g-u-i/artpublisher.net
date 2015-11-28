window.onload = function() { init() };
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ZMnBLl0f6Xi0lzD7c9fKEGYzPqMQZyNn8mUPCJrve04/pubhtml?gid=1370801409&single=true';

function init() {
  var map = Mapsheet( { key: public_spreadsheet_url,
                element: 'map',
                popupTemplate: 'popup-template',
                provider: Mapsheet.Providers.Leaflet,
                markerOptions: {
                  iconSize:   [32, 37],
                  iconAnchor:   [16, 37]
                }
  });

  window.map = map;
}

function initList(elements){
  console.log(elements.length)
  var listSource   = document.getElementById('list-template').innerHTML;
  var listTemplate = Handlebars.compile(listSource);
  $('#list').html(listTemplate({'items':elements}));
}

function preProcessElements(elements){

  return _(elements)
        .filter(function(d){return d.lat !== "" && d.lng !== ""} )
        // .filter(function(d){return d.city === "Berlin"} )
        .sortByAll(["country", "city", "name"])
        .forEach(function(d){
          d.lat = d.lat.replace(",",".");
          d.lng = d.lng.replace(",",".");
        })
        .value();
}
