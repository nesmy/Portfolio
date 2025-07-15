//const { V86Starter, V86 } = require("./v86/build/libv86.js");

// Script to open and close sidebar
function _open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function _close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

function onClick1(element) {
  _VM86();
  //document.getElementById("img01").src = element.src;
  document.getElementById("modal02").style.display = "block";
  //var captionText = document.getElementById("caption");
  //captionText.innerHTML = element.alt;
}

function _gotoPage(n){
  if (n == 1){
    window.location.href = "https://nesmy.itch.io/ping-pong";
  }

  if(n == 2){
    window.location.href = "https://github.com/Genesis-Grid-Lab/urban-engine";
  }
}

function _changeLang(){
  const langcheck = document.getElementById("language-toggle");

  if(langcheck.checked){
    document.getElementById("lang-fr").style.display = '';
    document.getElementById("lang-en").style.display = 'none';

    document.getElementById("lang-fr1").style.display = '';
    document.getElementById("lang-en1").style.display = 'none';

    document.getElementById("lang-fr2").style.display = '';
    document.getElementById("lang-en2").style.display = 'none';

    document.getElementById("lang-fr3").style.display = '';
    document.getElementById("lang-en3").style.display = 'none';

    document.getElementById("lang-fr4").style.display = '';
    document.getElementById("lang-en4").style.display = 'none';

    document.getElementById("lang-fr5").style.display = '';
    document.getElementById("lang-en5").style.display = 'none';

    document.getElementById("lang-fr6").style.display = '';
    document.getElementById("lang-en6").style.display = 'none';

    document.getElementById("lang-fr7").style.display = '';
    document.getElementById("lang-en7").style.display = 'none';
  }
  else{
    document.getElementById("lang-fr").style.display = 'none';
    document.getElementById("lang-en").style.display = '';

    document.getElementById("lang-fr1").style.display = 'none';
    document.getElementById("lang-en1").style.display = '';

    document.getElementById("lang-fr2").style.display = 'none';
    document.getElementById("lang-en2").style.display = '';

    document.getElementById("lang-fr3").style.display = 'none';
    document.getElementById("lang-en3").style.display = '';

    document.getElementById("lang-fr4").style.display = 'none';
    document.getElementById("lang-en4").style.display = '';

    document.getElementById("lang-fr5").style.display = 'none';
    document.getElementById("lang-en5").style.display = '';

    document.getElementById("lang-fr6").style.display = 'none';
    document.getElementById("lang-en6").style.display = '';

    document.getElementById("lang-fr7").style.display = 'none';
    document.getElementById("lang-en7").style.display = '';
  }

}

let slideIndex = 10;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n)
{
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dots");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

function _VM86()
{
  console.log("loading");
    var emulator = new V86({
        wasm_path: "lib/v86/build/v86.wasm",
        memory_size: 32 * 1024 * 1024,
        vga_memory_size: 2 * 1024 * 1024,
        screen_container: document.getElementById("screen_container1"),
        bios: {
            url: "lib/v86/bios/seabios.bin",
        },
        vga_bios: {
            url: "lib/v86/bios/vgabios.bin",
        },
        cdrom: {
            url: "lib/v86/bios/Gen.iso",
        },
        autostart: true,
    });

    console.log("loaded");
}


// window.onload = changeLang;
"use strict";

window.onload = function()
  {
  _changeLang();
  showSlides(slideIndex);
    //new V86
  }
