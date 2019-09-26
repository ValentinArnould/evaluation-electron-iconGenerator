
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

//<img onerror="this.src='avatarParDefaut'">
var imagePlace = document.getElementsByClassName('imgEdition')[0];
var imgInput = document.getElementsByClassName('file-input')[0];
var imgRange = document.getElementsByClassName('imgRange')[0];
var imgWinput = document.getElementsByClassName('imgWconfig')[0];
var imgHinput = document.getElementsByClassName('imgHconfig')[0];
var imgBackColor = document.getElementsByClassName('ImgBackgroundColor')[0];
var imgCurrentRange = 0;
var originalImg;


imgInput.addEventListener("change", function (e) {
    var file = imgInput.files[0];
    var reader = new FileReader();
    var fileData;
    imgRange.value = 50;
    imgCurrentRange = imgRange.value;

    reader.addEventListener("load", function () {
        //imagePlace.src = reader.result;
        loadImgCanvas(reader.result);
        originalImg = reader.result;
        imgBackColor.value = imagePlace.style.backgroundColor;
    }, false);

    if (file) {
        fileData = reader.readAsDataURL(file);
    }
});

imgRange.addEventListener("change", function (e) {
    if (imagePlace.src != "") {
        var Rval = imgRange.value - imgCurrentRange;
        //imagePlace.width += (Rval - imgCurrentRange) * 4;
        //imagePlace.height += (Rval - imgCurrentRange) * 4;
        resizeImg(Rval);
        imgCurrentRange = imgRange.value;
    }
});

imgWinput.addEventListener("change", function (e) {
    resizeImgD();
});

imgHinput.addEventListener("change", function (e) {
    resizeImgD();
});

imgBackColor.addEventListener("change", function (e) {
    debugger;
    imagePlace.style.backgroundColor = imgBackColor.value;
})

function loadImgCanvas(imgData) {
    var canvas = imagePlace;
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
        canvas.width = imageObj.width;
        canvas.height = imageObj.height;
        context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,
            0, 0, canvas.width, canvas.height);
        imgWinput.value = canvas.width;
        imgHinput.value = canvas.height;
    }
    imageObj.src = imgData;

}

function resizeImg(resize) {
    var canvas = imagePlace;
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
        canvas.width += (resize) * 4;
        canvas.height += (resize) * 4;
        context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,
            0, 0, canvas.width, canvas.height);
        imgWinput.value = canvas.width;
        imgHinput.value = canvas.height;
    }
    imageObj.src = originalImg;
}

function resizeImgD() {
    var canvas = imagePlace;
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
        canvas.width = parseInt(imgWinput.value, 10);
        canvas.height = parseInt(imgHinput.value, 10);
        context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,
            0, 0, canvas.width, canvas.height);
        imgWinput.value = canvas.width;
        imgHinput.value = canvas.height;
    }
    imageObj.src = originalImg;
}


function exportImg() {
    let url = imagePlace.toDataURL('image/jpg', 0.8);
    const base64Data = url.replace(/^data:image\/png;base64,/, "");
    window.ipcRenderer.send("export", base64Data);
}

function corners() {
    var canvas = imagePlace;
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
        ctx = roundCorners(canvas, 0, 0, imageObj.width, imageObj.height, 50);
        context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,
            0, 0, canvas.width, canvas.height);
        imgWinput.value = canvas.width;
        imgHinput.value = canvas.height;
    }
    imageObj.src = originalImg;
}

function roundCorners() {
    debugger;
    var canvas = imagePlace;
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
        canvas.width = parseInt(imgWinput.value, 10);
        canvas.height = parseInt(imgHinput.value, 10);
        context.save();
        context.beginPath();
        context.moveTo(0 + 20, 0);
        context.lineTo(0 + canvas.width - 20, 0);
        context.quadraticCurveTo(0 + canvas.width, 0, 0 + canvas.width, 0 + 20);
        context.lineTo(0 + canvas.width, 0 + canvas.height - 20);
        context.quadraticCurveTo(0 + canvas.width, 0 + canvas.height, 0 + canvas.width - 20, 0 + canvas.height);
        context.lineTo(0 + 20, 0 + canvas.height);
        context.quadraticCurveTo(0, 0 + canvas.height, 0, 0 + canvas.height - 20);
        context.lineTo(0, 0 + 20);
        context.quadraticCurveTo(0, 0, 0 + 20, 0);
        context.closePath();
        context.clip();
        context.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
        context.restore();
        imgWinput.value = canvas.width;
        imgHinput.value = canvas.height;
    }
    imageObj.src = originalImg;
}

function circleCorners() {
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    var cw=canvas.width;
    var ch=canvas.height;
    
    var img=new Image();
    img.onload=start;
    img.src="https://i.stack.imgur.com/oURrw.png";
    function start(){
      var cw,ch;
      cw=canvas.width=img.width;
      ch=canvas.height=img.height;
      ctx.drawImage(img,0,0);
      ctx.globalCompositeOperation='destination-in';
      ctx.beginPath();
      ctx.arc(cw/2,ch/2,ch/2,0,Math.PI*2);
      ctx.closePath();
      ctx.fill();
    }
}