import initNavbar from "./navbar.js";

const navbar = new initNavbar();

navbar.init();



// const navbarList = document.querySelector('#navbar__list');
// const navbarItems = document.querySelectorAll('.navbar__item');

// const screenHeight = window.screen.height;

// let sectionPosition = Math.round((window.scrollY + screenHeight) / screenHeight);
// navbarItems[sectionPosition - 1].classList.toggle('active');

// let prevPosition = null;
// let intervalID = null;
// let prevSectionPosition = 1;
// let prevItem = document.querySelector('.active');


// function checkUserPosition() {
//     if (window.scrollY !== prevPosition) {
//         sectionPosition = Math.round((window.scrollY + screenHeight) / screenHeight);
//         if (sectionPosition !== prevSectionPosition) {
//             navbarItems[sectionPosition - 1].classList.toggle('active');
//             if (prevItem && prevItem !== navbarItems[sectionPosition - 1]) prevItem.classList.toggle('active') ;    
//             prevItem = document.querySelector('.active'); 
//         }
//         prevSectionPosition = sectionPosition;
//     }

//     prevPosition = window.scrollY;
// };

// function goToNthSection(e) {
//     e.preventDefault();
//     let blockID = null;
    
//     for (let i = 0; !blockID; i++) {
//         if (e.path[i].matches('.navbar__link')) {
//             blockID = e.path[i].getAttribute('href');
//         }
//     }

//     let scrollTarget = document.querySelector(blockID);
//     scrollTarget.scrollIntoView({
//       behavior: "smooth",
//       block: "start"
//     });


//     intervalID = setInterval(() => checkUserPosition(), 100);
//     setTimeout(() => clearInterval(intervalID), 700);
// };

// document.body.addEventListener('wheel', checkUserPosition);
// navbarList.addEventListener('click', goToNthSection);