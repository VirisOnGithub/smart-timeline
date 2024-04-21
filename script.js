////////////////////////////////////////////
/*          */ /*OPTIONS*/ /*             */
////////////////////////////////////////////



let putTextOnTop = false; // Mettre le texte au dessus des parallélogrammes
let font = 'Merriweather'; // Police du texte, entrez une police de Google Fonts
let height = 150; // Hauteur des parallélogrammes
let fontSize = 0; // Augmenter ou réduire la taille du texte (0 pour la taille par défaut)



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
  	var pt = document.createElement('div');

  	pt.classList.add('parallel-left');
	pt.style.transform = 'skew(20deg)';
	addAttr(pt, color, width, height);
	e.appendChild(pt);

	// Parallèlogramme bas
	var pb = document.createElement('div');

	pb.classList.add('parallel-right');
	pb.style.transform = 'skew(-20deg)';
	addAttr(pb, color, width, height);
	e.appendChild(pb);

	// Barre verticale
	if(count != 0 || putTextOnTop) {
		var vb = document.createElement('div');
		vb.classList.add('vertical');
		vb.style.marginLeft = 'calc(-'+height/2+'px * tan(20deg) - 0.5px)';
		vb.style.width = '0.5px';
		vb.style.height = height/5 + 'px';
		vb.style.transform = 'translateY(-100%)';
		e.appendChild(vb);
	}

	// Texte
	var txt = document.createElement('div');
	txt.innerHTML = content.replace(';', '<br>');
	txt.style.marginLeft = 'calc(-'+height/2+'px * tan(20deg) - 0.5px)';
	txt.style.transform = putTextOnTop ? 'translate(-50%, -200%)' : 'translate(0,-100%)';
	txt.style.width = width + 'px';
	txt.classList.add('text');
	txt.style.fontFamily = font;
	txt.style.zIndex = toString(1000 - count);
	txt.style.fontSize = height/10 + fontSize + 'px';
	e.appendChild(txt);
	if (hasOverflowed(txt)) {
		console.log('L\'élément a débordé');
	} else {
		console.log('L\'élément n\'a pas débordé');
	}

	count++;
});