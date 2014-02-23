chrome.extension.onMessage.addListener(function(e) {
	var command = e.data.command;
	console.log('command', command);
});
window.addEventListener("message", function(e) {
	console.log('event', e);
})
console.log('command');