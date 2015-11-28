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
  $('#places').html(ArtPubApp.selector({'options':getPlaces(elements)}));

  $( "input, select" ).change(listUpdate);
}

function listUpdate(e){

  var filtered = elements;
  var place = $("#places .selector").val();

  if(place !== 'all') filtered = _.select(filtered, "cityId", $(this).val());

  $('#filters input:not(:checked)').each(function(f){
    filtered = _.reject(filtered, "@"+this.id ,"1");
  });

  $('#list').html(ArtPubApp.list({'items':filtered}));
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
    .uniq()
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
