

/* art publisher MAP */

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ZMnBLl0f6Xi0lzD7c9fKEGYzPqMQZyNn8mUPCJrve04/pubhtml?gid=1370801409&single=true';
var elements, map;



window.onload = function() {
  var tabletop = new Tabletop( { key: public_spreadsheet_url, callback: init} );
};

function init(data, tabletop){

  elements = preProcessElements(data[tabletop.model_names[0]].elements)
  map = L.map('map').setView([51.505, -0.09], 13);

  // http://leaflet-extras.github.io/leaflet-providers/preview/
  var options = {
    attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tilePath : 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
  }

  L.tileLayer(options.tilePath, options).addTo(map);

  var icon = L.icon({
      iconUrl: 'assets/images/marker-icon.svg',
      shadowUrl: 'assets/images/marker-shadow.png',
      iconSize:     [29, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [4, 66], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  var markerOptions = {icon: icon};

  _(elements).forEach(function(d){
    d.marker = L.marker([d.lat, d.lng],markerOptions).addTo(map);
  }).value()


  initInterface(elements);
}

function initInterface(data){

  $('#filters').html(ArtPubApp.filters({'items':getFiltersList(elements)}));
  $('#places').html(ArtPubApp.selector({'options':getPlaces(elements)}));
  $( "input, select" ).change(onFilterUpdated);
  map.on('move', onMapMove);

  onFilterUpdated();
}

// update list on filter changes
function onFilterUpdated(e){

  var filtered = _.filter(elements, getFilters());
  $('#list').html(ArtPubApp.list({'items':filtered}));

  var bounds = _.map(filtered, function(d){
    return [d.marker._latlng.lat, d.marker._latlng.lng]
  });

  map.fitBounds(bounds, {padding: [50, 50]});
}

//
function onMapMove(){
  var bounds = map.getBounds();
  var filtered = _(elements).filter(function(d){
    return bounds.contains(d.marker.getLatLng())
  })
  .filter(getFilters())
  .value();

  $('#list').html(ArtPubApp.list({'items':filtered}));
}

// get filters states
function getFilters(){
  var place = $("#places .selector").val();
  var filters = {};

  if(place !== 'all') filters["cityId"] = place;
  $('#filters input:not(:checked)').each(function(f){ filters["@"+this.id] = "1";});

  return filters;
}

// get filter from rownames
function getFiltersList(elements){
 return _(elements[0])
    .keys()
    .filter(function(d){ return d.slice(0, 1) === "@"})
    .map(function(d){return {label:d.substring(1)}})
    .value()
}

function getPlaces(elements){
  return _(elements)
    .sortByAll(["country", "city"],["desc", "desc"])
    .uniq(function(d){ return d.country+d.city;})
    .forEach(function(d){
      d.count = _(elements).filter('city',d.city).keys().value().length;
    })
    .value()
}

function getCoutries(elements){
  return _(elements)
    .map(function(d){return _.trim(d.country)})
    .uniq().sort().compact()
    .map(function(d){return {id:d, label:isoCountries[d]}})
    .value()
}
function getCities(elements){
  return _(elements)
    .map(function(d){return _.trim(d.city)})
    .uniq().sort().compact()
    .map(function(d){return {id:slugify(d), label:d}})
    .value()
}

function preProcessElements(elements){

  return _(elements)
        .filter(function(d){return d.lat !== "" && d.lng !== ""} )
        .sortByAll(["country", "city", "name"])
        .forEach(function(d){
          d.lat = parseFloat(d.lat.replace(",","."));
          d.lng = parseFloat(d.lng.replace(",","."));

          d.cityId = slugify(d.city);
          d.countryName = isoCountries[d.country];

        })
        .value();
}

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
