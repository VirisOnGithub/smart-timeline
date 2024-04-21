////////////////////////////////////////////
/*          */ /*OPTIONS*/ /*             */
////////////////////////////////////////////



let putTextOnTop = false; // Mettre le texte au dessus des parallélogrammes
let font = 'Merriweather'; // Police du texte, entrez une police de Google Fonts
let height = 30; // Hauteur des parallélogrammes
let fontSize = 5; // Taille de la police



////////////////////////////////////////////
/*          */ /*SCRIPT*/ /*             */
////////////////////////////////////////////


// Intégration de la police
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family='+ font +':wght@300&display=swap';
document.head.appendChild(link);




var container = document.querySelector('.container');

function addAttr (div, color, width, height) {
    div.style.backgroundColor = color;
    div.style.width = width + 'px';
    div.style.height = height + 'px';
		div.style.margin = '0';
		div.style.padding = '0';
		div.style.lineHeight = '0';
		div.style.display = 'inline-block';
}

function hasOverflowed(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}


// Création des parallélogrammes
var parallel = container.querySelectorAll('.parallel');
var count = 0;
parallel.forEach(function (e) {
	//on récupère tous les attributs de l'élément
	let color = e.getAttribute('pcolor');
	let width = e.getAttribute('pwidth');
	let content = e.innerHTML;
	e.innerHTML = '';
  
	// Parallèlogramme haut
  var div = document.createElement('div');

  div.classList.add('parallel-left');
	div.style.transform = 'skew(20deg)';
	addAttr(div, color, width, height);
	e.appendChild(div);

	// Parallèlogramme bas
	div = document.createElement('div');

	div.classList.add('parallel-right');
	div.style.transform = 'skew(-20deg)';
	addAttr(div, color, width, height);
	e.appendChild(div);

	// Barre verticale
	if(count != 0 || putTextOnTop) {
		div = document.createElement('div');
		div.classList.add('vertical');
		div.style.marginLeft = 'calc(-'+height/2+'px * tan(20deg) - 0.5px)';
		div.style.width = '0.5px';
		div.style.height = height/5 + 'px';
		div.style.transform = 'translateY(-100%)';
		e.appendChild(div);
	}

	// Texte
	div = document.createElement('div');
	div.innerHTML = content.replace(';', '<br>');
	div.style.marginLeft = 'calc(-'+height/2+'px * tan(20deg) - 0.5px)';
	div.style.transform = putTextOnTop ? 'translate(-50%, -200%)' : 'translate(0,-100%)';
	div.style.width = width + 'px';
	div.classList.add('text');
	div.style.fontFamily = font;
	div.style.zIndex = toString(1000 - count);
	div.style.fontSize = fontSize +'px';
	e.appendChild(div);
	if (hasOverflowed(div)) {
		console.log('L\'élément a débordé');
	} else {
		console.log('L\'élément n\'a pas débordé');
	}

	count++;
});