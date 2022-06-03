let pseudo = prompt("Veuillez saisir votre pseudo :");
var connection = new WebSocket("ws://localhost:8080/Pictionary/pictionnary/" + pseudo);

var canvas, context;
var started = false;
var x, y;

window.addEventListener("load", function(event) {
	
	/*CANVAS*/
	// Récupérer la zone de dessin
	canvas = document.getElementById('drawing');
	context = canvas.getContext('2d');
	
	/*WEBSOCKET*/
	
	connection.addEventListener("open", function(evt) {
		console.log("Connection established");
	});
	
	connection.addEventListener("close", function(evt) {
		console.log("Connection closed");
	});
	
	let btnSend = document.getElementById("btnSend");
	btnSend.addEventListener("click", function(clickEvent) {
		/*var canvasContents = canvas.toDataURL(); // a data URL of the current canvas image
		var data = { image: canvasContents };
		var string = JSON.stringify(data);*/
		// Envoi de l'objet msg à travers une chaîne formatée en JSON
		connection.send(canvas.toDataURL());
	});
	
	/*CANVAS*/
	
	// Ajoutons des gestionnaires d'événements pour savoir ce qu'il se passe
	// et lançons quelques fonctions associées.
	canvas.addEventListener('mousemove', mousemovement, false);
	canvas.addEventListener('mousedown', mouseclick, false);
	canvas.addEventListener('mouseup', mouseunclick, false);
});

function mouseclick() {
	// Lorsque le clic est détecté, passe la variable started à true
	// et déplace la position initiale de la souris
	context.beginPath();
	context.moveTo(x, y);
	started = true;

}

function mouseunclick() {
	// Passer la variable started à false lorsque le bouton est relaché
	if (started) {
		started = false;
	}
}

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

//Changer la taille
function changeSize(s) {
	context.lineWidth = s;
}

// Changer la couleur
function changeColor(c) {
	context.strokeStyle = c;
}