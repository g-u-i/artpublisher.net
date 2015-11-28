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

function createList(elements){
  var listSource   = document.getElementById('list-template').innerHTML;
  var listTemplate = Handlebars.compile(listSource);
  $('#list').html(listTemplate({'items':elements}));
}
