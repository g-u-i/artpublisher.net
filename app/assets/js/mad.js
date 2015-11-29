

/* art publisher MAP */

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ZMnBLl0f6Xi0lzD7c9fKEGYzPqMQZyNn8mUPCJrve04/pubhtml?gid=1370801409&single=true';
var elements;



window.onload = function() {
  var tabletop = new Tabletop( { key: public_spreadsheet_url, callback: init} );
};

function init(data, tabletop){

  elements = preProcessElements(data[tabletop.model_names[0]].elements)
  var map = L.map('map').setView([51.505, -0.09], 13);

  // http://leaflet-extras.github.io/leaflet-providers/preview/
  var options = {
    attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tilePath : 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
  }

  L.tileLayer(options.tilePath, options).addTo(map);

  displayLists(elements);
}

function displayLists(data){

  $('#list').html(ArtPubApp.list({'items':elements}));

  $('#filters').html(ArtPubApp.filters({'items':getFilters(elements)}));
  $('#places').html(ArtPubApp.selector({'options':getPlaces(elements)}));

  $( "input, select" ).change(listUpdate);
}

function listUpdate(e){
  var place = $("#places .selector").val();
  var filters = {};

  if(place !== 'all') filters["cityId"] = place;
  $('#filters input:not(:checked)').each(function(f){ filters["@"+this.id] = "1";});

  var filtered = _.filter(elements, filters);
  $('#list').html(ArtPubApp.list({'items':filtered}));

  // var bounds = _.map(filtered, function(d){
  //   return [d.point.marker._latlng.lat, d.point.marker._latlng.lng]
  // });

}

// get filter from rownames
function getFilters(elements){
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
          d.lat = d.lat.replace(",",".");
          d.lng = d.lng.replace(",",".");

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
