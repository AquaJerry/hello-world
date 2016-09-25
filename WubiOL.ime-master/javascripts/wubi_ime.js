/**
	load
	********************************
*/
var letters = undefined;
var itemBox = undefined;

if (init()) {
}

/**
	initialization	
	********************************
*/
function init() {
	/** get typing area */
	letters = document.getElementsByClassName("letter-with-wubi-ime");

	// has such a draft area in the page ?
	if (!letters.length) {
		return false;
	}
	for (var i = 0; i < letters.length; ++i) {
		letters[i].onkeyup = sendKey;
	}
	
	/** init item box */
	var styleUrl = "stylesheets/wubi_ime.css";
	importLink("wubi-ime-style", "stylesheet", "text/css", styleUrl);
	console.log(document.styleSheets);

	itemBox = document.createElement("aside");
	itemBox.setAttribute("id", "itembox");
	document.body.appendChild(itemBox);

	return true;
}

/**
	lib-io
	********************************
*/
function sendKey(event) {
	searchToken(event.keyCode);
}

function importLink(urlId, urlRelation, urlType, url) {
	var link = document.createElement("link");
	link.setAttribute("id", urlId);
	link.setAttribute("rel", urlRelation);
	link.setAttribute("type", urlType);
	link.setAttribute("href", url);

	var links = document.head.getElementsByTagName("link");
	document.head.insertBefore(link, links[links.length-1].nextElementSibling);
}

/**
	core
	********************************
*/
function searchToken(key) {
	console.log(key); // debug
	var strToken = String.fromCharCode(key);
	itemBox.innerHTML = strToken + "(" + key + ")"; // debug
}