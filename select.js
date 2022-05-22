const welcomePanel = document.querySelector("section.features .welcome");
const form = document.querySelector("section.features form");
const featuresContainer = document.querySelector(
    "section.features form .features-container"
);
const pages = document.querySelectorAll(
    "section.features form .features-container .page"
);
const pagesDots = document.querySelectorAll(
    "section.features form .switch-buttons .numbering .pages-dots .dot"
);

const startTestBtn = document.querySelector("section.features .welcome button");
startTestBtn.addEventListener("click", ()=>{
    welcomePanel.classList.add("hide")
    form.classList.add("active")
})

//------------------------ open form --------------------------------//



//------------------------ switch buttons --------------------------------//
const nextBtn = document.querySelector(
    "section.features form .switch-buttons .next"
);
const prevBtn = document.querySelector(
    "section.features form .switch-buttons .prev"
);
const pageNumber = document.querySelector(
    "section.features form .switch-buttons .page-number"
);
pageNumber.innerHTML = `${1} /  ${pages.length}`;

//  //

function hide_page(index, duration) {
    // hide the page
    pages[index].classList.add("fade-out");
    pages[index].classList.remove("active");
    setTimeout(() => {
        pages[index].classList.remove("fade-out");
    }, duration);

    // disable the page dot
    pagesDots[index].classList.remove("active");
}

function show_page(index, duration) {
    const fadeClass = index >= pageIndex ? "fade-left" : "fade-right";

    pages[index].classList.add(fadeClass);
    pages[index].classList.remove("active");
    setTimeout(() => {
        pages[index].classList.remove(fadeClass);
        pages[index].classList.add("active");

        // update the index
        pageIndex = index;
        if (pageIndex >= pages.length - 1) nextBtn.setAttribute("type", "submit")
        // nextBtn.classList.add("disable");
        else if (pageIndex <= 0) prevBtn.classList.add("disable");

        // update thr page numbering
        pageNumber.innerHTML = `${index + 1} /  ${pages.length}`;
    }, duration);

    // active the page dot
    pagesDots[index].classList.add("active");
}

let pageIndex = 0;

nextBtn.addEventListener("click", (e) => {
    if (pageIndex >= pages.length - 1) return;
    if (pageIndex <= 0) prevBtn.classList.remove("disable");

    hide_page(pageIndex, 500);
    show_page(pageIndex + 1, 500);
});

prevBtn.addEventListener("click", (e) => {
    if (pageIndex <= 0) return;
    if (pageIndex >= pages.length - 1) nextBtn.setAttribute("type", "button")
    // nextBtn.classList.remove("disable");

    hide_page(pageIndex, 500);
    show_page(pageIndex - 1, 500);
});

pagesDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        if (index == pageIndex) return;
        // show and hide the switching buttons
        else if (index == 0) prevBtn.classList.add("disable");
        else if (pageIndex == pages.length - 1)
            nextBtn.setAttribute("type", "submit")
            // nextBtn.classList.add("disable");

        if (pageIndex == 0) prevBtn.classList.remove("disable");
        else if (pageIndex == pages.length - 1)
        nextBtn.setAttribute("type", "button")
        // nextBtn.classList.remove("disable");

        // update the pages dots activation
        if (index > pageIndex) {
            for (let i = pageIndex; i < index; i++) {
                setTimeout(() => {
                    pagesDots[i].classList.add("active");
                }, (i - pageIndex) * 50);
                setTimeout(() => {
                    pagesDots[i].classList.remove("active");
                }, (i - pageIndex) * 100);
            }

            pagesDots[index].classList.add("active");
            //
        } else if (index < pageIndex) {
            for (let i = pageIndex; i > index; i--) {
                setTimeout(() => {
                    pagesDots[i].classList.add("active");
                }, (pageIndex - i) * 50);
                setTimeout(() => {
                    pagesDots[i].classList.remove("active");
                }, (pageIndex - i) * 100);
            }

            pagesDots[index].classList.add("active");
            //
        }

        // switch the page
        hide_page(pageIndex, 500);
        show_page(index, 500);
    });
});

//------------------------ range input --------------------------------//
const rangeValueContainer = document.querySelectorAll(
    ".range .value-container"
);
const rangeValue = document.querySelectorAll(".range .value-container .value");
const rangeValueInput = document.querySelectorAll(".range .field input");
const rangeValueProgress = document.querySelectorAll(
    ".range .field .progress-full"
);

rangeValueInput.forEach((input, index) => {
    input.addEventListener("input", () => {
        rangeValue[index].innerHTML = input.value; // set the value

        const valuePersonate =
            (input.value / input.max) *
            window
                .getComputedStyle(rangeValueContainer[index])
                .width.replace("px", "");

        rangeValue[index].style.left = valuePersonate + "px";
        rangeValueProgress[index].style.width = valuePersonate + "px";
    });
});
