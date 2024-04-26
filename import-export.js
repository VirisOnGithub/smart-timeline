function exportData() {
  let container = document.querySelector('.container');
  let parallels = container.querySelectorAll('.parallel');
  let message = ""; // message to be exported
	parallels.forEach((parallel) => {
		let title = parallel.querySelector('.text').innerHTML.replace(/<br>/g, ';');
		let color = parallel.getAttribute('pcolor');
		let width = parallel.getAttribute('pwidth');

		message += title + "," + color + "," + width + ":";

		// Copy message to clipboard
		navigator.clipboard.writeText(message).then(() => {
			let exportButton = document.querySelector('.export-data');
			exportButton.innerHTML = 'Copied!';
		}, (err) => {
			console.error('Error copying text to clipboard', err);
		});
	});
}

function importData() {
	let container = document.querySelector('.container');
	let data = prompt('Paste your data here:');
	if(data){
		container.innerHTML = '';
		let parallels = data.split(':');
		parallels.forEach((parallel, index) => {
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
}

// <div pcolor="#3694e2" pwidth="200" class="parallel">Brownstone High School ; 2019 - 2023</div>