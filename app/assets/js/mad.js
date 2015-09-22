window.onload = function() { init() };
// var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0AtG9_k99Q_n6dFJsV3drNldsRnZxN1dLX1ljbDVDZHc&output=html';
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ZMnBLl0f6Xi0lzD7c9fKEGYzPqMQZyNn8mUPCJrve04/pubhtml?gid=1370801409&single=true';

function init() {
  Mapsheet( { key: public_spreadsheet_url,
                element: 'map',
                popupTemplate: 'popup-template',
                provider: Mapsheet.Providers.Leaflet,
                markerOptions: {
                  iconSize:   [32, 37],
                  iconAnchor:   [16, 37]
                }
  });
}

function punchcard(elements){

  var type = ['publisher','distributor','bookShop','collection','artSpace','research','blogInfo','fair'];
  var data = [];

  console.log(elements.length)

  _.forEach(type, function(c){

    var col = [];
      _.forEach(type, function(r){

        var nb = _.filter(elements, function(e){
          return parseInt(e[r]) === 1 && parseInt(e[c]) === 1;
        }).length;


        col.push(nb);
      })
    data.push(col);
  })

  var m = 80;
  var w = $('#viz').width() - m;
  var h = 600-m;

  var colW = (w/type.length-1);
  var colH = (h/type.length-1);

 // console.log(data);

  var svg =
    d3.select('#viz')
      .append('svg')
      .attr('width', w )
      .attr('height', h + m)
      ;

  var cell = svg.append('g')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g') //removing
      .selectAll('text') // these
      .data( function(d,i,j) { return d; } ) //lines
      .enter() //text displays normally
      .append('g')
      .attr('class', 'cell')
      .attr('transform',
        function(d,i,j) { return 'translate('+ ((i * colW) + m) + ',' +  ((j * colH) + m) + ')'})

      cell
      .append('circle')
      .attr('r', function(d,i,j) { return d; } )
      .attr('class','punch')

      cell
      .append('text')
      .text( function(d,i,j) { return d; } )
      .attr('text-anchor', 'middle')
      ;

  svg
    .selectAll('.axis')
    .data(type)
    .enter()
    .append('text')
    .attr('class', 'axis')
    .text( function(d) { return d; } )
    .attr('x', function(d,i) { return (i * colW) + m })
    .attr('y', 10 )

  svg
    .selectAll('.axisx')
    .data(type)
    .enter()
    .append('text')
    .attr('class', 'axis')
    .text( function(d) { return d; } )
    .attr('y', function(d,i) { return (i * colH) + m })
    .attr('x', 10 )
}

function createList(elements){
  var listSource   = document.getElementById('list-template').innerHTML;
  var listTemplate = Handlebars.compile(listSource);
  $('#list').html(listTemplate({'items':elements}));
}
