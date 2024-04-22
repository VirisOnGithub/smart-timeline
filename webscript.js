function addParallel(){
    let container = document.querySelector('.container');
    let pcolor = document.getElementById('pcolor').value;
    let pwidth = document.getElementById('pwidth').value;
    let content = document.getElementById('pcontent').value;

    if(pcolor == '' || pwidth == '' || content == ''){
        alert('Please fill in all the fields');
        return;
    }

    container.innerHTML += '<div class="parallel" pcolor="'+pcolor+'" pwidth="'+pwidth+'">'+content+'</div>';
    updateParallels();
}

function updateColor(){
    let color = document.getElementById('pcolor').value;
    let button = document.querySelector('.parall-create');
    button.style.backgroundColor = color;
}

let color = document.getElementById('pcolor');
color.addEventListener('input', updateColor);


function closeNew () {
    let newP = document.querySelector('.new');
    newP.style.visibility = 'hidden';
    let openBtn = document.querySelector('.open-new');
    openBtn.style.visibility = 'visible';
}

function openNew () {
    let newP = document.querySelector('.new');
    newP.style.visibility = 'visible';
    let openBtn = document.querySelector('.open-new');
    openBtn.style.visibility = 'hidden';
}