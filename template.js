chrome.extension.onMessage.addListener(function(e) {
	var command = e.data.command;
	console.log('command', command);
});
var card = document.getElementById('card');
var clicker = document.getElementById('clicker');
var container = document.getElementById('container');
var source = document.body.getElementsByClassName('template')[0].innerHTML;
var card_template = Handlebars.compile(source);

clicker.onclick = function() {
	clicker.style.display = 'none';
	card.style.display = 'block';
	container.style.backgroundColor = '#25b0a1';
};

card.onclick =function() {
	card.style.display = 'none';
	clicker.style.display = 'block';
	container.style.backgroundColor = 'transparent';
}

window.addEventListener("message", function(e) {
	console.log('event', e);
	var data = e.data;
	if (data.command === 'render') {
		container.style.height = data.height + 'px';
//		container.style.width = data.width + 'px';
		container.style.width = '216px'; // for pinterest only
		requestExpedia(data.data, function(response) {
			card.innerHTML = card_template(response);
		});
	} else {
		// show card
	}
})
console.log('command');