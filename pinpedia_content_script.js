

if (window==top) {
	console.log(chrome.extension.onRequest);
	chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
		console.log('onRequest', req, sender, sendResponse);
		sendResponse(somethingDoIt());
	})
}


function somethingDoIt() {
	console.log('WE DID IT');
}