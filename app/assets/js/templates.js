this["ArtPubApp"] = this["ArtPubApp"] || {};
this["ArtPubApp"]["filters"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "  <button id=\""
    + alias3(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"slug","hash":{},"data":data}) : helper)))
    + "\" type=\"button\" class=\"btn btn-default col-sm-2\" aria-label=\"Left Align\">\n    "
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "\n  </button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["ArtPubApp"]["infobox"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return " <li>publisher</li> ";
},"3":function(depth0,helpers,partials,data) {
    return " <li>distributor</li> ";
},"5":function(depth0,helpers,partials,data) {
    return " <li>bookShop </li> ";
},"7":function(depth0,helpers,partials,data) {
    return " <li>collection</li> ";
},"9":function(depth0,helpers,partials,data) {
    return " <li>artSpace</li> ";
},"11":function(depth0,helpers,partials,data) {
    return " <li>research</li> ";
},"13":function(depth0,helpers,partials,data) {
    return " <li>website </li> ";
},"15":function(depth0,helpers,partials,data) {
    return " <li>blogInfo </li> ";
},"17":function(depth0,helpers,partials,data) {
    return " <li>fair</li> ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<h3><a href='http://"
    + alias3(((helper = (helper = helpers.website || (depth0 != null ? depth0.website : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"website","hash":{},"data":data}) : helper)))
    + "' target='_blank'>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a> ("
    + alias3(((helper = (helper = helpers.country || (depth0 != null ? depth0.country : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"country","hash":{},"data":data}) : helper)))
    + ")</h3>\n<p>"
    + alias3(((helper = (helper = helpers.Location || (depth0 != null ? depth0.Location : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"Location","hash":{},"data":data}) : helper)))
    + "</p>\n<hr/>\n<ul>\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.publisher : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.distributor : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.bookShop : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.collection : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.artSpace : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.research : depth0),{"name":"if","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.website : depth0),{"name":"if","hash":{},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.blogInfo : depth0),{"name":"if","hash":{},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.fair : depth0),{"name":"if","hash":{},"fn":this.program(17, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n</ul>\n\n<hr/>\n\n<p><a href='"
    + alias3(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link","hash":{},"data":data}) : helper)))
    + "' target='_blank'>"
    + alias3(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link","hash":{},"data":data}) : helper)))
    + "</a></p>\n";
},"useData":true});
this["ArtPubApp"]["list"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "  <div class=\"row\">\n    <div class='col-sm-1'>"
    + alias3(((helper = (helper = helpers.country || (depth0 != null ? depth0.country : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"country","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class='col-sm-2'>"
    + alias3(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"city","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class='col-sm-5'><a href='http://"
    + alias3(((helper = (helper = helpers.website || (depth0 != null ? depth0.website : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"website","hash":{},"data":data}) : helper)))
    + "' target='_blank'>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a></div>\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "  <div class=\"row colHeader\">\n    <p class='col-sm-1'>country</p>\n    <p class='col-sm-2'>city</p>\n    <p class='col-sm-4'>www</p>\n  </div>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});