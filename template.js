chrome.extension.onMessage.addListener(function(e) {
	var command = e.data.command;
	console.log('command', command);
});
var card = document.getElementById('card');
var clicker = document.getElementById('clicker');
var container = document.getElementById('container');
window.addEventListener("message", function(e) {
	console.log('event', e);
	var data = e.data;
	if (data.command === 'render') {
		container.style.height = data.height + 'px';
		container.style.width = data.width + 'px';

		// render correct card
	} else {
		// show card
	}
})
console.log('command');