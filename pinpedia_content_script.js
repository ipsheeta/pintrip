var iframe;

if (window==top) {
	console.log(chrome.extension.onRequest);
	chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
		console.log('onRequest', req, sender, sendResponse);
		sendResponse(somethingDoIt());
	})
}

function createIframe() {
	iframe = document.createElement("iframe");
	iframe.style.position = "relative";
	iframe.style.zIndex = 1000;
	iframe.style.border = "1px";
	iframe.style.margin = "14px 7px 0 7px";
	iframe.hover_over = null;
	iframe.style.display = 'none';
	var myframe = chrome.extension.getURL("myframe.html");
	iframe.setAttribute("src", myframe);
	var pins_container = document.getElementsByClassName('variableHeightLayout')[0];
	pins_container.appendChild(iframe);
	console.log('iframe created');
}

function sendMessage(message) {
	iframe.contentWindow.postMessage(message, '*');
	// chrome.extension.sendMessage(message);
}

function somethingDoIt() {
	// var request = new XMLHttpRequest();
	// var response;
	// request.open('GET', 'http://api.ean.com/ean-services/rs/hotel/v3/geoSearch?destinationString=tokyo&apiKey=awvkfpca9wprk3c3gbwj596u&_type=json');
	// request.send()
	// request.onreadystatechange = function() {
	// 	if (this.readyState == 4) {
	// 		response = JSON.parse(this.response);
	// 		console.log('response', response);
	// 	}
	// };
	console.log('WE DID IT');
	createIframe();


	iframe.onmouseenter = function(e){};
	iframe.onmouseleave = function(e){};

	var items = document.getElementsByClassName('item');
	var description;
	for (var i=0; i<items.length; i++) {
		items[i].onmouseenter = function(e) {
			if (this !== iframe.hover_over) {
				description = this.getElementsByClassName('pinDescription')[0].innerHTML;
				console.log('enter', this, iframe.style);
				iframe.style.top = this.style.top;
				iframe.style.left = this.style.left;
				var height = this.offsetHeight;
				var width = this.offsetWidth;
				iframe.style.height = height + 'px';
				iframe.style.width = width + 'px';
				iframe.style.display = 'inline';
				iframe.hover_over = this;
				sendMessage({command:'render',
					data: description,
					height: height,
					width: width
			    });
			}
		};
		items[i].onmouseleave = function(e) {
			if (this !== iframe.hover_over) {
				console.log('exit', this, iframe.style);
				iframe.style.top = null;
				iframe.style.left = null;
				iframe.syle.display = 'none';
				iframe.hover_over = null;
			}
		};
	}
}
