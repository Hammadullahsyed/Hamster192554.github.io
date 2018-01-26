var num = 1;
var canvas = document.getElementById('spec');
var ctx = canvas.getContext('2d');
ctx.canvas.width = document.documentElement.clientWidth;
ctx.canvas.height = "50";


// create an image object and get it’s source
var imgg = new Image();

// copy the image to the canvas
$(imgg).load(function () {
    ctx.drawImage(imgg, 0, 0);
    $('.go').hide();
});

imgg.src = 'Spectrum.jpg';

function pick(event) {
    // getting user coordinates
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var R = data[0];
    var G = data[1];
    var B = data[2];
    var rgb = w3color("rgb(" + R + ',' + G + ',' + B + ")");
    console.log('RGB: ' + R + "," + G + "," + B);
    if (rgb.valid) {
        var hsl = rgb.toHsl();
        console.log(hsl.h);
        console.log(hsl.s * 100 + "%");
        console.log(hsl.l * 100 + "%");
        setMod1(hsl.h);
        setMod2(hsl.h);
    }
}

// To Set Mod1
function setMod1(h) {
    //Removing previous ones
    var myNode = document.getElementById("mod1");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    //adding new ones
    var s = 100;
    for (var i = 0; i < 21; i++) {
        var mod1 = document.getElementById("mod1");
        var modDiv = document.createElement('div');
        modDiv.className = "modDiv" + i;
        modDiv.id = "hsl(" + h + "," + s + "%," + "50%" + ")";
        modDiv.style.backgroundColor = "hsl(" + h + "," + s + "%," + "50%" + ")";
        modDiv.onmousemove = function() { getVal(this); }
        modDiv.onclick = function() { setVal(this); }
        mod1.appendChild(modDiv);
        s = s - 5;
    }
}


function setMod2(h) {
    //Removing previous ones
    var myNode = document.getElementById("mod2");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    //adding new ones
    var l = 100;
    for (var i = 0; i < 21; i++) {
        var mod2 = document.getElementById("mod2");
        var modDiv = document.createElement('div');
        modDiv.className = "modDiv" + i;
        modDiv.id = "hsl(" + h + "," + "100%," + l + "%)";
        modDiv.style.backgroundColor = "hsl(" + h + "," + "100%," + l + "%)";
        modDiv.onmousemove = function() { getVal(this); }
        modDiv.onclick = function() { setVal(this); }
        mod2.appendChild(modDiv);
        l = l - 5;
    }
}

function getVal(mod) {
    console.log(mod.id);
    if(num != 0) {
        $(".box"+num).css({
            "background-color" : mod.id  
        });
    }
}

function setVal(mod) {
    console.log(mod.id);
    if(num != 0) {
        $(".box"+num).css({
            "background-color" : mod.id  
        });
        $(".box"+num).toggleClass('clicked');
    }
    num++;
    $(".box"+num).toggleClass('clicked');
}

$(document).ready(function() {
    $(".box"+num).toggleClass('clicked');
});

$(".box").click(function () {
    var boxNo = $(this).attr('class');
    console.log(boxNo);
    String(boxNo);
    num = boxNo.charAt(boxNo.length - 1);
    $(this).toggleClass('clicked');
});

$('#btn1').click(function() {
    $(".box"+num).css({
        "background-color" : ""
    });
    $(".box"+num).removeClass("clicked");
    num--;
});

$('#btn3').click(function() {
    $(".box").css({
        "background-color" : ""
    });
    $('.box').removeClass("clicked");
    num = 0;
});

canvas.addEventListener('click', pick);