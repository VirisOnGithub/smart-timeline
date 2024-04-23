////////////////////////////////////////////
/*           */ /*OPTIONS*/ /*            */
////////////////////////////////////////////

let putTextOnTop = false; // Place the text above the parallelograms
let font = 'Merriweather'; // Text font, enter a Google Fonts font
let height = 100; // Height of the parallelograms
let fontSize = 10; // Increase or decrease the text size (0 for default size)
let barThickness = 1; // Thickness of the vertical bar, in pixels
let skew = 10; // Skew angle of the parallelograms

////////////////////////////////////////////
/*           */ /*SCRIPT*/ /*             */
////////////////////////////////////////////

// Font integration
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

// Creating the parallelograms
function updateParallels(){
	console.log('Updating parallels');
	var parallel = container.querySelectorAll('.parallel');
	var count = 0;
	parallel.forEach(function (e) {
		if(e.childElementCount == 0){
			// Get all the attributes of the element
			let color = e.getAttribute('pcolor');
			let width = e.getAttribute('pwidth');
			console.log('Color: ' + color + ' Width: ' + width);
			let content = e.innerHTML;
			e.innerHTML = '';
		
			// Top parallelogram
			var pt = document.createElement('div');
			pt.classList.add('parallel-left');
			pt.style.transform = 'skew('+skew+'deg)';
			addAttr(pt.style, color, width, height);
			console.log(pt.style.width + ' ' + pt.style.height + ' ' + pt.style.backgroundColor)
			e.appendChild(pt);
		
			// Bottom parallelogram
			var pb = document.createElement('div');
			pb.classList.add('parallel-right');
			pb.style.transform = 'skew(-'+skew+'deg)';
			addAttr(pb.style, color, width, height);
			e.appendChild(pb);
		
			// Vertical bar
			if(count != 0 || putTextOnTop) {
				var vb = document.createElement('div');
				vb.classList.add('vertical');
				vb.style.marginLeft = 'calc(-'+height/2+'px * tan('+ skew +'deg) - 0.5px)';
				vb.style.width = barThickness+'px';
				vb.style.height = height/5 + 'px';
				vb.style.transform = 'translateY(-100%)'
				e.appendChild(vb);
			}
		
			// Text
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
			adjustWidth(e,txt,vb,width, count);
		}
		
		count++;
	});
}

function adjustWidth(e,txt,vb,width, count){
	if (hasOverflowed(txt)) {
		// console.log('The element has overflowed');
		// Remove the text and place it at the bottom
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
		// console.log('The element has not overflowed');
	}
}