
function updateBackground(tabId) {
	console.log("update updateBackground");
	chrome.tabs.sendRequest(tabId, {}, function(something){
		console.log('something', something);
	});
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
	if (change.status == "complete") {
		updateBackground(tabId);
	}
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	console.log(tabs);
	updateBackground(tabs[0].id);
})