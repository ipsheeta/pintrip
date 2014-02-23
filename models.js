function requestExpedia(description) {
	var request = new XMLHttpRequest();
	var response;
	request.open('GET', 'http://api.ean.com/ean-services/rs/hotel/v3/geoSearch?destinationString=tokyo&apiKey=awvkfpca9wprk3c3gbwj596u&_type=json');
	request.send()
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			response = JSON.parse(this.response);
			console.log('response', response);
		}
	}

        var map, locator;

	var description = description || "this is an address for cerritos, ca";
        require([
        "esri/map", "esri/tasks/locator", "esri/graphic",
        "esri/InfoTemplate",
        "dojo/_base/array", "dojo/_base/Color",
        "dojo/number", "dojo/parser", "dojo/dom", "dijit/registry",
        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"
      ], function(
        Map, Locator, arrayUtils, number, parser, dom, registry
      ) {
        parser.parse();
        
        locator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
        locator.on("address-to-locations-complete", showResults);

        // listen for button click then geocode
        registry.byId("locate").on("click", locate);
        
        function locate() {
          var address = description.innerHTML;
          locator.outSpatialReference = map.spatialReference;
          var options = {
            address: address,
            outFields: ["Loc_name"]
          }
          locator.addressToLocations(options);
        }

        function showResults(evt) {
          var candidate;
          var locationIdentified = "${address}"

          var geom;
          arrayUtils.every(evt.addresses, function(candidate) {
            console.log(candidate.score);
            if (candidate.score > 80) {
              console.log(candidate.location);
              var attributes = { 
                address: candidate.address, 
                score: candidate.score, 
                locatorName: candidate.attributes.Loc_name 
              };   
              geom = candidate.location;
             
              return false; //break out of loop after one candidate with score greater than 80 is found.
            }
          });
          if ( geom !== undefined ) {
        //    alert.("Unable to geocode");
          }
        }
      });

	// STEP #4: send lat/long to expedia to return hotel



}
requestExpedia();
window.requestExpedia = requestExpedia;
