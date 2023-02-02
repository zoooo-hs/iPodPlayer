function logAllMusic(contents) {
	for (var i = 0; i < contents.length; i++) {
		console.log(contents[i].title);
	}
}

function printAllMusic() {
	getAlliPodMusic(logAllMusic);
}

var musicList = [];
var currentTrackNumber = -1;

function showMusicList(contents) {

	musicList = musicList.concat(contents);

	function musicDom(i) {
		if (i >= musicList.length)
			return "";
		var m = musicList[i];
		var title = m.title;
		var playNow = i == currentTrackNumber ? " playNow" : "";
		return "<span class=\"music" + playNow + "\" onclick=\"play(" + i
				+ ")\">" + title + "</span>"
	}

	var musicDomList = [];
	for (var i = 0; i < musicList.length; i++) {
		musicDomList.push(musicDom(i));
	}

	var dom = musicDomList.join("");
	setContent(dom);
}

function showMusic() {
	getAlliPodMusic(showMusicList);
}

function getAlliPodMusic(handler) {
	var ipodMusicFilter = new tizen.AttributeFilter("contentURI", "CONTAINS",
			"iPod_Control/Music/");
	var filter = new tizen.CompositeFilter("INTERSECTION", [ ipodMusicFilter ]);

	tizen.content.find(handler, null, null, filter);
}

function onReadSuccess(tag) {

	var tags = tag.tags;
	var base64String = "";

	for (var i = 0; i < tags.picture.data.length; i++) {
		base64String += String.fromCharCode(tags.picture.data[i]);
	}
	var dataUrl = "data:" + tags.picture.format + ";base64,"
			+ window.btoa(base64String);

	const
	thumbnail = document.getElementById("thumbnail");

	thumbnail.src = dataUrl;

	document.getElementById("bg-image").style.backgroundImage = "url('"
			+ dataUrl + "')";
}

function readBlobCB(blob) {

	var jsmediatags = window.jsmediatags;

	jsmediatags.read(blob, {
		onSuccess : onReadSuccess,
		onError : showError
	});

}

function createThumbnail(music) {

	const
	uri = music.contentURI;
	var fileHandler = tizen.filesystem.openFile(uri, "r");
	fileHandler.readBlobNonBlocking(readBlobCB, showError);
	fileHandler.closeNonBlocking(function() {
		console.log("File handle closed");
	}, showError);
}

function thumbnailCB(path) {
	const
	thumbnailDOM = document.getElementById("thumbnail");
	const
	thumbnailSrcDOM = document.getElementById("thumbnail-src");

	thumbnailDOM.src = path;
	thumbnailSrcDOM.innerHTML = path;
}

function play(index) {

	musicList = musicList.slice(index).concat(musicList.slice(0, index));
	index = 0;
	currentTrackNumber = index;

	const
	music = musicList[index];
	const
	audioDOM = document.getElementById("audio");
	const
	audioSourceDOM = document.getElementById('audioSource');
	const
	titleDOM = document.getElementById("title");
	const
	artistDOM = document.getElementById("artist");

	const
	title = music.title;
	const
	artist = music.artists.join(",");
	const
	contentURI = music.contentURI;

	createThumbnail(music);

	titleDOM.innerHTML = title;
	artistDOM.innerHTML = artist;
	audioSourceDOM.src = contentURI;

	audioDOM.onended = function() {
		play((index + 1) % musicList.length);
	}

	audioDOM.load();
	audioDOM.play();
	showMusic();
}

document.addEventListener("DOMContentLoaded", run);

function run() {
	printAllMusic();
	showMusic();
}