////////////////////////////////////////////
/*          */ /*OPTIONS*/ /*             */
////////////////////////////////////////////



let putTextOnTop = false; // Mettre le texte au dessus des parallélogrammes
let font = 'Merriweather'; // Police du texte, entrez une police de Google Fonts
let height = 100; // Hauteur des parallélogrammes
let fontSize = 0; // Augmenter ou réduire la taille du texte (0 pour la taille par défaut)
let barThickness = 1; // Epaisseur de la barre verticale, en px
let skew = 20; // Angle de skew des parallélogrammes



////////////////////////////////////////////
/*           */ /*SCRIPT*/ /*             */
////////////////////////////////////////////


// Intégration de la police
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family='+ font +':wght@300&display=swap';
document.head.appendChild(link);




var container = document.querySelector('.container');

function addAttr (divstyle, color, width, height) {
    divstyle.backgroundColor = color;
    divstyle.width = width + 'px';
    divstyle.height = height + 'px';
	divstyle.margin = '0 '+barThickness+'px';
	divstyle.padding = '0';
	divstyle.lineHeight = '0';
	divstyle.display = 'inline-block';
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
	pt.style.transform = 'skew('+skew+'deg)';
	addAttr(pt.style, color, width, height);
	e.appendChild(pt);

	// Parallèlogramme bas
	var pb = document.createElement('div');

	pb.classList.add('parallel-right');
	pb.style.transform = 'skew(-'+skew+'deg)';
	addAttr(pb.style, color, width, height);
	e.appendChild(pb);

	// Barre verticale
	if(count != 0 || putTextOnTop) {
		var vb = document.createElement('div');
		vb.classList.add('vertical');
		vb.style.marginLeft = 'calc(-'+height/2+'px * tan('+ skew +'deg) - 0.5px)';
		vb.style.width = barThickness+'px';
		vb.style.height = height/5 + 'px';
		vb.style.transform = 'translateY(-100%)'
		e.appendChild(vb);
	}

	// Texte
	var txt = document.createElement('div');
	txt.innerHTML = content.replace(';', '<br>');
	txt.style.marginLeft = 'calc(-'+height/2+'px * tan('+skew+'deg) - 0.5px)';
	txt.style.transform = putTextOnTop ? 'translate(-50%, -200%)' : 'translate(0,-100%)';
	txt.style.width = width + 'px';
	txt.classList.add('text');
	txt.style.fontFamily = font;
	txt.style.zIndex = toString(1000 - count);
	txt.style.fontSize = height/10 + fontSize + 'px';
	e.appendChild(txt);
	if (hasOverflowed(txt)) {
		// console.log('L\'élément a débordé');
		// On supprime le texte pour le remettre en bas
		e.removeChild(txt);
		txt.style.transform = putTextOnTop ? 'translate(-50%, '+ (height*2+height/5) +'px)' : 'translate('+-width/2+'px,'+ height*2 +'px)';
		txt.style.width = width*2 + 'px';
		e.appendChild(txt);

		if(count != 0 || putTextOnTop) {
			e.removeChild(vb);
			vb.style.transform = 'translate(0,'+ height*2 +'px';
			e.appendChild(vb);
		}

	} else {
		// console.log('L\'élément n\'a pas débordé');
	}
	

	count++;
});