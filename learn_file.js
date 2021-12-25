function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function changeImg_input(newSource, labelText) {
    console.log(labelText);
//  document.getElementById('p_lable').innerHTML = labelText;
    document.getElementById('img_input').src = newSource;
    input_img_path = newSource;
    var a_link = document.getElementById('a_step2');
    convertText = labelText.replace(/\s+/g,"%20");
    console.log(convertText);
    a_link.href = '/second?input_img_path=' + input_img_path + '&contentInformation=' + convertText;
    console.log(window.innerWidth);
    if(window.innerWidth < 768){
        window.scrollTo(0, 0);
    }
}

var input_img_path = null;
var c = getQueryVariable('country');
if (c == false) {
    c = 'Algeria';
}
document.getElementById('chip_' + c.toString()).children[0].classList.add('is-info');
input_img_path = getQueryVariable('input_img_path');
if (input_img_path != false) {
    changeImg_input(input_img_path, 'contentImage');
}



document.getElementById('input_inputImg').onchange = function () {
    console.log('inputImg changed');
    var input_inputImg = document.getElementById('input_inputImg');
    var form = document.createElement('form');
    form.style.display = 'none';
    form.action = '/uploadImg';
    form.method = 'POST';
    form.enctype = 'multipart/form-data';
    form.appendChild(input_inputImg);
    document.body.append(form);
    console.log('beform submit');
    form.submit();
}

function F_openFile() {
    document.getElementById('input_inputImg').click();
}