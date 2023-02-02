//Initialize function
var init = function() {
	// TODO:: Do your initialization job
	console.log('init() called');

	document.addEventListener('visibilitychange', function() {
		if (document.hidden) {
			// Something you want to do when hide or exit.
		} else {
			// Something you want to do when resume.
		}
	});

	// add eventListener for keydown
	document.addEventListener('keydown', function(e) {
		switch (e.keyCode) {
		case 37: //LEFT arrow
			break;
		case 38: //UP arrow
			break;
		case 39: //RIGHT arrow
			break;
		case 40: //DOWN arrow
			break;
		case 13: //OK button
			break;
		case 10009: //RETURN button
			tizen.application.getCurrentApplication().exit();
			break;
		default:
			console.log('Key code : ' + e.keyCode);
			break;
		}
	});
};
// window.onload can work without <body onload="">
window.onload = init;

function setContent(dom) {
	document.getElementById("content").innerHTML = dom;
}

function showError(error) {
	const
	message = "name: " + error.name + " code: " + error.code + " message: "
			+ error.message;
	document.getElementById("error").innerHTML = message;

}
