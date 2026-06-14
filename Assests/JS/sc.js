// Mobile navigation toggle logic is handled globally by auth.js.

function myFunction() {
    document.getElementById("s").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("input");
    filter = input.value.toUpperCase();
    div = document.getElementById("s");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

let slideposition = 0;
const slides = document.getElementsByClassName('carousle_item');
const totalslides = slides.length;

document.getElementById('btn_next').addEventListener("click", function () {
    moveToNextSlide();
});

document.getElementById('btn_prev').addEventListener("click", function () {
    moveToPrevSlide();
});


function updateslideposition() {
    for (let slide of slides) {
        slide.classList.remove('carousle_item--visible');
        slide.classList.add('carousle_item--hidden');
        let video = slide.querySelector('video');
        if (video) {
            video.pause();
        }
    }
    slides[slideposition].classList.add('carousle_item--visible');
    let activeVideo = slides[slideposition].querySelector('video');
    if (activeVideo) {
        activeVideo.play().catch(err => console.log("Video auto-play blocked or failed:", err));
    }
}

function moveToNextSlide() {

    if (slideposition == totalslides - 1) {
        slideposition = 0;
    }
    else {
        slideposition++;
    }
    updateslideposition();

}
function moveToPrevSlide() {

    if (slideposition == 0) {
        slideposition = totalslides - 1;
    } else {
        slideposition--;
    }
    updateslideposition();
}

MyBanners = new Array('Assests/Images/v1.png', 'Assests/Images/v2.png', 'Assests/Images/v3.png')
banner = 0
function ShowBanners() {
    if (document.images) {
        banner++
        if (banner == MyBanners.length) {
            banner = 0
        }
        document.ChangeBanner.src = MyBanners[banner]
        setTimeout(ShowBanners, 1000)
    }
}

window.onload = ShowBanners;

filterObjects("all");
function filterObjects(c) {
    var x, i;
    x = document.querySelectorAll(".card");
    if (c === "all") c = "";
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove("showw");
        if (x[i].className.indexOf(c) > -1) x[i].classList.add("showw")
    }
}

function scrollWin(x, y) {
    window.scrollBy(x, y);
}