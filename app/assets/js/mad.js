$( document ).ready(function() {
    /* art publisher MAP */

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ZMnBLl0f6Xi0lzD7c9fKEGYzPqMQZyNn8mUPCJrve04/pubhtml?gid=1370801409&single=true';
  var elements, map, prevhash;

  window.onload = function() {
    var tabletop = new Tabletop( { key: public_spreadsheet_url, callback: init} );
  };

  $(window).on('hashchange', onHashChange);

  function onHashChange(){
    var hash = window.location.hash.substr(1).split(':')

    if(hash[0] === "place"){
      var element = _(elements).filter('slug',hash[1]).value()[0];
      $('#details').html(ArtPubApp.details(element)).addClass('active');
      window.location.hash = prevhash;
    }else{
      prevhash = window.location.hash;
    }

  }

  function init(data, tabletop){

    elements = preProcessElements(data[tabletop.model_names[0]].elements)

    var mapOptions = {};

    map = L.map('map', mapOptions).setView([51.505, -0.09], 0);

    map.zoomControl.setPosition('topright');

    var hash = new L.Hash(map);

    // http://leaflet-extras.github.io/leaflet-providers/preview/
    var layerOptions = {
      attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      tilePath : 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
      minZoom:3,
    }

    L.tileLayer(layerOptions.tilePath, layerOptions).addTo(map);

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
      d.marker.on('click', function(e) { window.location.hash= "#place:"+d.slug });
    }).value()

    $('#loading').empty();

    initInterface(elements);
  }

  function initInterface(data){

    $('#filters').html(ArtPubApp.filters({'items':getFiltersList(elements)}));
    $('#places').html(ArtPubApp.selector({'options':getPlaces(elements)}));

    $( "input" ).change(updateFromFilters);
    $("#places .selector").change(updateFromSelect);

    map.on('moveend', updateFromMap);

    console.log(map.getZoom() );

    // if(map.getZoom() < 2){
    //   updateFromFilters();
    //   updateFromSelect();
    // }
    setTimeout(function(){
      if(map.getZoom() < 2){
        updateFromFilters();
        updateFromSelect();
      }
    }, 500)
  }


  function updateFromSelect(){
    var cityId = $("#places .selector").val();

    var bounds = _(elements)
      .filter(function(d){
        if(cityId === "all") return true;
        return d.cityId === cityId
      })
      .map(function(d){
        return [d.marker._latlng.lat, d.marker._latlng.lng]
      })
      .value()

    map.fitBounds(bounds, {padding: [50, 50]});

    updateFromFilters()
    updateFromMap()
  }

  // update list on filter changes
  function updateFromFilters(){

    //$("input").prop('disabled', true);

    var newList = _(elements)
      .forEach(function(d){ map.removeLayer(d.marker) })
      .filter(computeFilter)
      .forEach(function(d){ d.marker.addTo(map) })
      .value();

    updateList(newList);
    updateFromMap();
  }

  function updateList(elements){
    $('#list').html(ArtPubApp.list({'items':elements}));
    //$("input").prop('disabled', false);
  }

  //
  function updateFromMap(){

    var newList = _(elements)
      .filter(filterFromView)
      .filter(computeFilter)
      .value();

    var cities = _(newList).indexBy("cityId").keys().value();

    $("#places .selector").val(cities.length === 1 ? cities[0] : "all")
    updateList(newList);
  }

  // clear details
  function clearDetails(){
    // window.location.hash = "";
    $('#details').empty().removeClass('active');
  }

  // filter from view
  function filterFromView(d){
    var bounds = map.getBounds();
    return bounds.contains(d.marker.getLatLng())
  }

  // filters states
  function getFilters(){
    var filters = {};
    $('#filters input:checked').each(function(f){ filters["@"+$(this).attr('filter')] = "1";});
    return filters;
  }

  // custom inclusive filter
  function computeFilter(d){
    var count = 0;
    _.forEach(getFilters(),function(f,fk){ if(d[fk] === "1") count++;})
    return (count > 0 ? true:false)
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
      .sortByAll(["country", "cityId"],["desc", "desc"])
      .uniq(function(d){ return d.country+d.cityId;})
      .forEach(function(d){
        d.count = _(elements).filter('city',d.city).keys().value().length;
      })
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
            d.city = _.trim(d.city);
            d.countryName = isoCountries[d.country];

            d.slug = slugify(d.name);

            d.website = _.trim(d.website, '/')

          })
          .reject('cityId',"")
          .reject('country',"")
          .value();
  }

  function slugify(text)
  {
    return (text).toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
});
