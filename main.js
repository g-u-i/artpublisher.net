/** @jsx element */

var Tabletop = require('tabletop');


import {element,render,tree} from 'deku'

// Create a component
var MadMap = {

  render(component) {
    let {props,state} = component;

  console.log("ok");

Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1ZMnBLl0f6Xi0lzD7c9fKEGYzPqMQZyNn8mUPCJrve04/pubhtml?gid=1370801409&single=true',
                   callback: function(data, tabletop) { console.log(data) },
                   simpleSheet: true } )

    return (
      <div>
        {props.text}
      </div>
    )
  }
}

// Create a tree
var app = tree(<MadMap text="Hello Worlds !" />)

// Render the tree to the DOM
render(app, document.body)
