window.addEventListener("load", () => {
    let logo = window.document.body.querySelector("#logo");
    let lis = window.document.body.querySelectorAll(".lis");
    let border = window.document.body.querySelector("#border");
    let sectionSelected = window.document.body.querySelector("section.selected");
    let menus = window.document.body.querySelectorAll("nav a.nav-a");
    let sectionElement = window.document.body.querySelectorAll("main > section");
    let currentIndex = 0;
    let body = window.document.body;
    let background = body.querySelector("#background");

    if (!logo.classList.contains("visible")) {
        logo.classList.add("visible");
        if (logo.classList.contains("visible")) {
            for (let i = 0; i < lis.length; i++) {
                lis.item(i).classList.add("visible");
            }
            if (lis.item(3).classList.contains("visible")) {
                border.classList.add("visible");
                if (border.classList.contains("visible")) {
                    sectionSelected.classList.add("visible");
                }
            }
            if (sectionSelected.classList.contains("visible")) {
                for (let i = 0; i < sectionElement.length; i++) {
                    sectionElement[i].style.top = "0.0625rem";
                }
            }
        }
    }


    let count = 0;


    // < 섹션이동 >
    // 휠 제어

    body.addEventListener("wheel", (e) => {
        deltaY(e);
    });


    // 클릭 제어
    for (let i = 0; i < menus.length; i++) {
        menus[i].addEventListener("click", () => {
            currentIndex = parseInt(menus[i].getAttribute("data-num"));
            threeFunc();
        });
    }

    // 세부 functions
    function counting() {
        count++;
    }

    function deltaY(e) {
        counting();

        console.log(count);

        // 아래 이프 문으로 스크롤이 연속으로 되는 것을 결국 방지하는 방법을 찾았다. 완전히 만족스럽진 않지만 대게 만족스러운 결과다.
        if (count > 1) {
            setTimeout(function () {
                count = 0
            }, 800);
            return;
        }

        if (e.deltaY > 0)
            nextSection();

        if (e.deltaY < 0)
            prevSection();
    }

    function nextSection() {
        if (currentIndex === menus.length - 1) {
            return currentIndex;
        }

        currentIndex++;
        threeFunc();
    }

    function prevSection() {
        if (currentIndex === 0) {
            return currentIndex;
        }

        currentIndex--;
        threeFunc();
    }

    // 백그라운드&섹션
    function threeFunc() {
        for (let i = 0; i < menus.length; i++) {
            // 백그라운드
            let video = background.querySelector("video");
            video.style.left = `${((i - currentIndex) * 3.33333) - 30}rem`;
            video.style.transitionTimingFunction = "ease-in-out";
            video.style.transitionDelay = "0s";
            video.style.transitionDuration = "1s";
            // 섹션
            sectionElement[i].style.left = `${(i - currentIndex) * 100}%`;
            sectionElement[i].style.transitionTimingFunction = "ease-in-out";
            sectionElement[i].style.transitionDelay = "0s";
            sectionElement[i].style.transitionDuration = "1s";
            // 선택
            menus[i].classList.remove("selected");
            menus[currentIndex].classList.add("selected");
            sectionElement[i].classList.remove("selected", "visible");
            sectionElement[currentIndex].classList.add("selected", "visible");
        }
    }

    //포폴섹션 바디스크롤 방지
    let scrollable = body.querySelectorAll("div.scrollable");

    for (let i = 0; i < scrollable.length; i++) {
        scrollable[i].addEventListener("wheel", preventBodyScroll, {passive: false});
    }

    function preventBodyScroll(e) {
        e.stopPropagation();
    }

});
