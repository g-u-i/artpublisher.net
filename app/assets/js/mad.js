window.onload = function() { getData() };
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ZMnBLl0f6Xi0lzD7c9fKEGYzPqMQZyNn8mUPCJrve04/pubhtml?gid=1370801409&single=true';
var elements;

function getData() {
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

function initApp(data){
  elements = data;

  $('#list').html(ArtPubApp.list({'items':elements}));
  $('#filters').html(ArtPubApp.filters({'items':getFilters(elements)}));


  $('#filters button').click(onFilterClick);

}

function onFilterClick(e){
  console.log($(this).attr('id'))

  $(this).toggleClass('active')

  var activeFilters = $('#filters .active');

  var filtered = _(elements).filter(function(d){

    var test = true;

    activeFilters.each(function(f){
      test = test && d["@"+this.id] === "1"

      console.log(d["@"+this.id])
    });

    return test

  }).value()
  $('#list').html(ArtPubApp.list({'items':filtered}));
}

// get filter from rownames
function getFilters(elements){
  return _(elements[0])
    .keys()
    .filter(function(d){ return d.slice(0, 1) === "@"})
    .map(function(d){
      return {
        label:d.substring(1),
        slug:d.substring(1)
      }
    })
    .value()
}

function preProcessElements(elements){

  return _(elements)
        .filter(function(d){return d.lat !== "" && d.lng !== ""} )
        .sortByAll(["country", "city", "name"])
        .forEach(function(d){
          d.lat = d.lat.replace(",",".");
          d.lng = d.lng.replace(",",".");
        })
        .value();
}
