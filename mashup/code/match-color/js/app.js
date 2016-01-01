(function () {
  var sparkApiUrl = 'https://api.spark.io/v1/devices/';

  var addConfigBtn = document.getElementById('addConfig');
  var connectProximitySensorBtn = document.getElementById('connectProximity');

  var configDiv = document.getElementById('config');
  var cameraDiv = document.getElementById('camera');
  var saturatedDiv = document.getElementById('saturated');
  var proximityDiv = document.getElementById('proximity');
  var proximityEl = document.getElementById('proximityValue');
  var distanceEl = document.getElementById('distance');
  var deviceID;
  var accessToken;

  function setBgrColor(color) {
    document.body.style.backgroundColor = 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
  }

  function setSaturatedDivText(type, rgb) {
    var start = '<h3 class="text-muted text-center">';
    var end = '</h3>';
    if (type === 'success') {
      saturatedDiv.innerHTML = start + 'LED color is ' + rgb + end;
    } else if (type === 'error') {
      saturatedDiv.innerHTML = start + 'Oops timed out...' + end;
    } else if (type === 'sending') {
      saturatedDiv.innerHTML = start + 'sending...' + end;
    }
  }

  function sendColorToLED(color) {
    var rgb = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    var saturated = one.color(rgb).saturation(1).css();
    var saturatedRed = one.color(saturated).red()*255;
    var saturatedGreen = one.color(saturated).green()*255;
    var saturatedBlue = one.color(saturated).blue()*255;

    saturatedDiv.style.backgroundColor = saturated;

    httpPost('A7', saturatedRed, rgb); // red
    httpPost('A5', saturatedGreen, rgb); // green
    httpPost('A6', saturatedBlue, rgb); // blue
  }

  function httpPost(pin, value, rgb) {
    var http = new XMLHttpRequest();
    var url = sparkApiUrl + deviceID + '/analogwrite';
    var params = 'access_token='+ accessToken + '&params=' + pin + ',' + value;

    http.open('post', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        var response = JSON.parse(http.responseText)

        if (response.connected) {
          setSaturatedDivText('success', rgb)
        }

        if (response.error === 'Timed out') {
          setSaturatedDivText('error', rgb)
        }
      }
    }
    http.send(params);
  }

  connectProximitySensorBtn.addEventListener('click', function() {
    var eventSource = new EventSource(sparkApiUrl + deviceID + '/events/?access_token=' + accessToken);
    connectProximitySensorBtn.style.display = 'none';
    proximityDiv.style.display = 'block';

    eventSource.addEventListener('open', function(e) {
      console.log('Opened!'); }
    ,false);

    eventSource.addEventListener('error', function(e) {
      console.log('Errored!'); }
    ,false);

    eventSource.addEventListener('distance', function(e) {
      var proximity = parseFloat(JSON.parse(e.data).data).toFixed(1);

      if (proximity < 0) {
        proximity = 0;
      }
      proximityEl.style.width = proximity + '%';
      distanceEl.innerHTML = '<h2>Distance: ' + proximity + ' cm</h2>';
    }, false);
  })

  addConfigBtn.addEventListener('click', function() {
    deviceID = document.getElementById('deviceID').value;
    accessToken = document.getElementById('accessToken').value;

    configDiv.style.display = 'none';
    cameraDiv.style.display = 'block';
    saturatedDiv.style.display = 'block';
    connectProximitySensorBtn.style.display = 'block';
  })

  window.addEventListener('load', function() {
    var sourceImage = document.getElementById('photo');
    var colorThief = new ColorThief();
    cameraDiv.style.display = 'none';
    proximityDiv.style.display = 'none';
    connectProximitySensorBtn.style.display = 'none';

    function setBGRAndSendToLED() {
      var dominantColor = colorThief.getColor(sourceImage);
      setBgrColor(dominantColor);
      sendColorToLED(dominantColor);
    }

    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 32) { // press spacebar
        setSaturatedDivText('sending', null);
        setBGRAndSendToLED();
      }
    })
  }, false);

})();
