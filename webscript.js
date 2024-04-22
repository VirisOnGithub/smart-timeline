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