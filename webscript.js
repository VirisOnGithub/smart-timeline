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

var selectedIndex = 0;

function updateEventList(){
    let parallels = document.querySelectorAll('.parallel');
    parallels.forEach((parallel, index) => {
        parallel.addEventListener('click', function(){
            selectedIndex = index;
            markSelected();
            showEdit();
            let color = parallel.getAttribute('pcolor');
            let width = parallel.getAttribute('pwidth');
            let content = parallel.querySelector('.text').innerHTML.replace('<br>', ';');

            let colorInput = document.getElementById('mcolor');
            let widthInput = document.getElementById('mwidth');
            let contentInput = document.getElementById('mcontent');

            colorInput.value = color;
            widthInput.value = width;
            contentInput.value = content;
        });
    });
}

function markSelected(){
    let parallels = document.querySelectorAll('.parallel');
    parallels.forEach(parallel => {
        parallel.querySelector('.parallel-left').style.border = 'none';
        parallel.querySelector('.parallel-right').style.border = 'none';
    });

    if(selectedIndex != -1){
        parallels[selectedIndex].querySelector('.parallel-left').style.border = '1px solid black';
        parallels[selectedIndex].querySelector('.parallel-left').style.borderWidth = '2px 2px 0 2px';
        parallels[selectedIndex].querySelector('.parallel-right').style.border = '1px solid black';
        parallels[selectedIndex].querySelector('.parallel-right').style.borderWidth = '0 2px 2px 2px';
    }
}

function showEdit(){
    let edit = document.querySelector('.edit');
    edit.style.visibility = 'visible';
}

function hideEdit(){
    let edit = document.querySelector('.edit');
    edit.style.visibility = 'hidden';
}

function editParallel(){
    let color = document.getElementById('mcolor').value;
    let width = document.getElementById('mwidth').value;
    let content = document.getElementById('mcontent').value;

    let parallels = document.querySelectorAll('.parallel');
    let parallel = parallels[selectedIndex];
    parallel.querySelector('.text').innerHTML = content.replace(';', '<br>');
    parallel.querySelector('.text').style.width = width + 'px';
    parallel.querySelector('.parallel-left').style.backgroundColor = color;
    parallel.querySelector('.parallel-right').style.backgroundColor = color;
    parallel.setAttribute('pcolor', color);
    parallel.setAttribute('pwidth', width);
    parallel.querySelector('.parallel-left').style.width = width + 'px';
    parallel.querySelector('.parallel-right').style.width = width + 'px';

    adjustWidth(parallel, parallel.querySelector('.text'), parallel.querySelector('.vertical'), width, selectedIndex);

    selectedIndex = -1;
    markSelected();
    hideEdit();
}