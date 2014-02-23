

if (window==top) {
	console.log(chrome.extension.onRequest);
	chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
		console.log('onRequest', req, sender, sendResponse);
		sendResponse(somethingDoIt());
	})
}


function somethingDoIt() {
	var request = new XMLHttpRequest();
	var response;
	request.open('GET', 'http://api.ean.com/ean-services/rs/hotel/v3/geoSearch?destinationString=tokyo&apiKey=awvkfpca9wprk3c3gbwj596u&_type=json');
	request.send()
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			response = JSON.parse(this.response);
			console.log('response', response);
		}
	};
	console.log('WE DID IT');
	var iframe = document.createElement("iframe");
	iframe.style.position = "relative";
	iframe.style.zIndex = 1000;
	iframe.style.border = "1px";
	iframe.hover_over = null;
	iframe.style.display = 'none';
	var myframe = chrome.extension.getURL("myframe.html");
	iframe.setAttribute("src", myframe);
	var pins_container = document.getElementsByClassName('variableHeightLayout')[0];
	pins_container.appendChild(iframe);

	iframe.onmouseenter = function(e){};
	iframe.onmouseleave = function(e){};

	var items = document.getElementsByClassName('item');
	for (var i=0; i<items.length; i++) {
		items[i].onmouseenter = function(e) {
			if (this !== iframe.hover_over) {
				console.log('enter', this, iframe.style);
				iframe.style.top = this.style.top;
				iframe.style.display = 'inline';
				iframe.hover_over = this;
			}
		};
		items[i].onmouseleave = function(e) {
			if (this !== iframe.hover_over) {
				console.log('exit', this, iframe.style);
				iframe.style.top = null;
				iframe.syle.display = 'none';
				iframe.hover_over = null;
			}
		};
	}
}