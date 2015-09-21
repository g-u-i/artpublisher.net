window.onload = function() { init() };
// var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0AtG9_k99Q_n6dFJsV3drNldsRnZxN1dLX1ljbDVDZHc&output=html';
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ZMnBLl0f6Xi0lzD7c9fKEGYzPqMQZyNn8mUPCJrve04/pubhtml?gid=1370801409&single=true';


function init() {
  Mapsheet( { key: public_spreadsheet_url,
                element: "map",
                popupTemplate: "popup-template",
                provider: Mapsheet.Providers.Leaflet,
                markerOptions: {
                  iconSize:   [32, 37],
                  iconAnchor:   [16, 37]
                }
  });
}
