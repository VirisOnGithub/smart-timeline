function makeData(){
	let container = document.querySelector('.container');
  let parallels = container.querySelectorAll('.parallel');
  let message = ""; // message to be exported
	parallels.forEach((parallel) => {
		let title = parallel.querySelector('.text').innerHTML.replace(/<br>/g, ';');
		let color = parallel.getAttribute('pcolor');
		let width = parallel.getAttribute('pwidth');

		message += title + "," + color + "," + width + ":";
	});
	return message;
}

function exportData() {
	// Copy message to clipboard
	navigator.clipboard.writeText(makeData()).then(() => {
		let exportButton = document.querySelector('.export-data');
		exportButton.innerHTML = 'Copied!';
	}, (err) => {
		console.error('Error copying text to clipboard', err);
	});
}

function importData() {
	let data = prompt('Paste your data here:');
	if(data){
		loadData(data);
	}
}

function exportDataInFile() {
	let data = makeData();
	let date = new Date();
	let filename = 'parallels-' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + date.getMinutes()+ date.getSeconds() + '.smtl';
	let file = new Blob([data], {type: 'text/plain'});
	let a = document.createElement('a');
	let url = URL.createObjectURL(file);
	a.href = url
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 0);
}

function importDataFromFile() {
	let input = document.createElement('input');
	input.type = 'file';
	input.accept = '.smtl';
	input.onchange = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onload = (e) => {
			if(confirm('This will replace the current data. Are you sure?')){
				loadData(e.target.result);
			}
		};
		reader.readAsText(file);
	};
	input.click();
}

function loadData(data){
	let container = document.querySelector('.container');
	container.innerHTML = '';
	let parallels = data.split(':');
	parallels.forEach((parallel) => {
		let [title, color, width] = parallel.split(',');
		let parallelElement = document.createElement('div');
		parallelElement.classList.add('parallel');
		parallelElement.setAttribute('pcolor', color);
		parallelElement.setAttribute('pwidth', width);
		parallelElement.innerHTML = title;

		container.appendChild(parallelElement);
	});
	updateParallels();
	updateEventList();
}

const capture = async () => {
    const video = document.createElement("video");

    try {
        const captureStream = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = captureStream;

        // Attendre que la vidéo soit prête à être jouée
        await new Promise((resolve) => video.onloadedmetadata = resolve);

        // Créer un canvas de la taille de la vidéo
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");

        // Dessiner sur le canvas
        context.drawImage(video, 0, 120, video.videoWidth, video.videoHeight);
        const frame = canvas.toDataURL("image/png");
        captureStream.getTracks().forEach(track => track.stop());
        window.location.href = frame;
    } catch (err) {
        console.error("Error: " + err);
    }
};