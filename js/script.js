
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("sticky-header");
    } else {
        header.classList.remove("sticky-header");
    }
});

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");
    let started = false;

    function startCounting() {
        if (started) return;

        counters.forEach(counter => {
            let target = +counter.getAttribute("data-target");
            let count = 0;

            let speed = target / 50;

            let interval = setInterval(() => {
                count += speed;
                if (count >= target) {
                    count = target;
                    clearInterval(interval);
                }
                counter.textContent = Math.floor(count) + "%";
            }, 30);
        });

        started = true;
    }

    window.addEventListener("scroll", () => {
        const section = document.querySelector(".counter-section");
        const position = section.getBoundingClientRect().top;

        if (position < window.innerHeight - 100) {
            startCounting();
        }
    });
});


document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
        const item = header.parentElement;
        const isActive = item.classList.contains("active");

        document.querySelectorAll(".accordion-item").forEach(i => {
            i.classList.remove("active");
            i.querySelector(".icon").textContent = "+";
        });

        if (!isActive) {
            item.classList.add("active");
            header.querySelector(".icon").textContent = "−";
        }
    });
});

const mainSlide = document.getElementById("mainSlide");
const thumbs = document.querySelectorAll(".thumb");
const dotsContainer = document.querySelector(".slider-dots");

let images = [];

thumbs.forEach(t => images.push(t.src));
let index = 0;
images.forEach((img, i) => {
    let dot = document.createElement("span");
    dot.dataset.id = i;
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".slider-dots span");

function updateSlide(i) {
    index = i;
    mainSlide.src = images[index];
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
    thumbs.forEach(t => t.classList.remove("active"));
    thumbs[index].classList.add("active");
}
document.querySelector(".slide-btn.right").addEventListener("click", () => {
    index = (index + 1) % images.length;
    updateSlide(index);
});

document.querySelector(".slide-btn.left").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    updateSlide(index);
});
dots.forEach(dot => {
    dot.addEventListener("click", () => {
        updateSlide(parseInt(dot.dataset.id));
    });
});
thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
        updateSlide(i);
    });
});

