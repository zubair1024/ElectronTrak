const movement = require('geolocation-stream')()
const objectify = require('geoposition-to-object')
const $ = require('jquery')
const Config = require('electron-config')
const config = window.config = new Config()
const history = window.history = config.get('history') || []
const yo = window.yo = require('yo-yo')

document.addEventListener('DOMContentLoaded', init)

function init() {
  console.log('init');

  setInterval(function () {
    console.log('came here');
    // if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(data){
        console.log("getCurrentPosition");
      });
    // } else {
      // console.log("Geolocation is not supported by this browser.");
    // }
  }, 10000);

  

  movement.on('data', function (position) {
    console.log(position);
    // turn native geoposition object into a serializable object
    position = objectify(position)

    console.log(position);

    // avoid saving duplicates
    // if (history.length === 0 || position.timestamp !== history[history.length-1].timestamp) {
    //   history.push(position)
    // }

    // persist to disk
    // config.set('history', history)

    // render()

    showPosition(position);

  })

  movement.on('error', function (err) {
    console.error(err)
  })
  

}

function showPosition(position){
  console.log('showPosition');
  $.ajax({
    type: 'POST',
    url: 'http://razrgen.razrlab.com:8081/test/log',
    data: {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    },
    success: function (data) {
      // on success use return data here
      console.log(data);
    },
    error: function (xhr, type, exception) {
      // if ajax fails display error alert
      alert("ajax error response type " + type);
    }
  });
}


function render() {
  document.getElementById('positions').appendChild(el)

  var el = yo`<li>$foo</li>`

}
