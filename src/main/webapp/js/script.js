window.addEventListener("load", function(event) {

	var pseudo = prompt("Veuillez saisir votre pseudo :");
	let connection = new WebSocket("ws://localhost:8080/Pictionary/pictionnary/" + pseudo);

	connection.addEventListener("open", function(evt) {
		console.log("Connection established");
	});

	connection.addEventListener("message", function(evt) {
		var img = new Image;
		img.onload = function() {
			context.drawImage(img, 0, 0); // Or at whatever offset you like
		};
		img.src = evt.data;

	});

	connection.addEventListener("error", function(evt) {
		console.log(evt.data);
	});

	connection.addEventListener("close", function(evt) {
		console.log("Connection closed");
	});


	setInterval(function() {
		if (pseudo == "admin") {
			var canvasContents = canvas.toDataURL(); // a data URL of the current canvas image
			// Envoi de l'objet msg à travers une chaîne formatée en JSON
			connection.send(canvasContents);
		}

	}, 50);

	/*	let btnSend = document.getElementById("btnSend");
		btnSend.addEventListener("click", function(clickEvent) {
			var canvasContents = canvas.toDataURL(); // a data URL of the current canvas image
			// Envoi de l'objet msg à travers une chaîne formatée en JSON
			connection.send(canvasContents);
	
		});*/

});



/* FOR THE DRAWING APPLICATION */
/* =========================== */

var canvas, context;

var started = false;
var x, y;

function init() {

	// Récupérer la zone de dessin
	canvas = document.getElementById('drawing');
	context = canvas.getContext('2d');

	// Ajoutons des gestionnaires d'événements pour savoir ce qu'il se passe
	// et lançons quelques fonctions associées.
	canvas.addEventListener('mousemove', mousemovement, false);
	canvas.addEventListener('mousedown', mouseclick, false);
	canvas.addEventListener('mouseup', mouseunclick, false);

}

function mouseclick() {
	// Lorsque le clic est détecté, passe la variable started à true
	// et déplace la position initiale de la souris
	context.beginPath();
	context.moveTo(x, y);
	started = true;

}
// For getting the mouse position, basically. This gets the position
// of the canvas element, so we can use it to calculate the mouse
// position on the canvas
// Récupération de l'emplacement de la souris.
// On récupère la position de l'élément canvas pour pouvoir
// récupérer la position de la souris à l'intérieur du canvas.
function getOffset(e) {
	var cx = 0;
	var cy = 0;

	while (e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) {
		cx += e.offsetLeft - e.scrollLeft;
		cy += e.offsetTop - e.scrollTop;
		e = e.offsetParent;
	}
	return { top: cy, left: cx };
}

function mousemovement(e) {

	// Récupérer la position de la souris

	if (e.offsetX || e.offsetY) {
		x = e.pageX - getOffset(document.getElementById('drawing')).left - window.pageXOffset;
		y = e.pageY - getOffset(document.getElementById('drawing')).top - window.pageYOffset;
	}
	else if (e.layerX || e.layerY) {
		x = (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft)
			- getOffset(document.getElementById('drawing')).left - window.pageXOffset;
		y = (e.clientY + document.body.scrollTop + document.documentElement.scrollTop)
			- getOffset(document.getElementById('drawing')).top;
	}

	// Si la variable started vaut true, alors tracer une ligne
	if (started) {
		context.lineTo(x, y);
		context.stroke();

	}

}

function mouseunclick() {
	// Passer la variable started à false lorsque le bouton est relaché
	if (started) {
		started = false;
	}

}
//Changer la taille
function changeSize(s) {
	context.lineWidth = s;
}

// Changer la couleur
function changeColor(c) {
	context.strokeStyle = c;
}