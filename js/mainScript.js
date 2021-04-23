const carouselSlide = document.querySelector(`.pic`);
const carouselImages = document.querySelectorAll(`.pic img`);
const goku = document.querySelector(`.dragon__ball__logo`);
const aura = document.querySelector(`.aura`);
const balls = document.querySelectorAll(`.ball`);
const webDeveloper = document.querySelector(`.web__developer`);
//buttons
const arrLeft = document.querySelector(`.fa-arrow-left`);
const arrRight = document.querySelector(`.fa-arrow-right`);
//
const gitIcon = document.querySelector(`.fa-github`);
const linkedinIcon = document.querySelector(`.fa-linkedin-in`);
const facebookIcon = document.querySelector(`.fa-facebook-square`);
const instaIcon = document.querySelector(`.fa-instagram`);

//counter
let counter = 1;
const size = carouselImages[0].clientWidth;
carouselSlide.style.transform = `translateX(` + -size * counter + `px)`;
//events SLIDER
arrRight.addEventListener(`click`, function () {
  if (counter >= carouselImages.length - 1) return;

  carouselSlide.style.transition = `transform 0.4s ease-in-out`;
  counter++;
  carouselSlide.style.transform = `translateX(` + -size * counter + `px)`;
});
arrLeft.addEventListener(`click`, function () {
  if (counter <= 0) return;
  carouselSlide.style.transition = `transform 0.4s ease-in-out`;
  counter--;
  carouselSlide.style.transform = `translateX(` + -size * counter + `px)`;
});
carouselSlide.addEventListener(`transitionend`, function () {
  console.log(carouselImages[counter]);
  if (carouselImages[counter].id === `lastClone`) {
    carouselSlide.style.transition = `none`;
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = `translateX(` + -size * counter + `px)`;
  }
  if (carouselImages[counter].id === `firsClone`) {
    carouselSlide.style.transition = `none`;
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = `translateX(` + -size * counter + `px)`;
  }
});
// Goku fly
let counterGoku = -108; //needs to be 2
function countDown() {
  counterGoku++;
  if (counterGoku === -10) {
    clearInterval(timerGoku);
    aura.style.display = `block`;
  }
  goku.style.top = `${counterGoku}%`;
}
const timerGoku = setInterval(countDown, 25);

// dragon balls flying in
let ballcounter = 0;
const something = setInterval(balltimer, 150);
function balltimer() {
  ballcounter++;
  if (ballcounter === 8) {
    ballcounter = 0;
  }
  balls.forEach((ball) => {
    ball.style.transform = `scale(1.${ballcounter})`;
  });
}

//adding icons rotation
const iconList = [gitIcon, linkedinIcon, facebookIcon, instaIcon];
iconList.forEach((icon) => {
  icon.addEventListener(`mouseover`, function (e) {
    if (e.currentTarget) {
      icon.classList.add(`rotate-center`);
    }
  });
});
// smooth moving links  HOME, ABOUT ME and PROJECTS to particular direction
// const nav__link = document.querySelectorAll(`.nav__link`);
// nav__link.forEach((link) => {
//   link.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });
// smooth moving links like HOME, ABOUT ME and PROJECTS to particular direction
//thats more efficient way to do because eventListener is on UL not on all elements LI---> its more efficient

document.querySelector(`.header__nav`).addEventListener(`click`, function (e) {
  e.preventDefault();
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

// Implementing Intersection Observer API, Events happening after seeing on window
// obsCallback function will be called each time that observed element is intersecting the root element at the threshold I defined
//Reveal sections
const allSec = document.querySelectorAll(`.allSections`);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //entry.target== current section that im in
  entry.target.classList.add(`slide-top`);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3, //if 30% is visible do smth
});
allSec.forEach(function (section) {
  sectionObserver.observe(section);
});

// map footter
navigator.geolocation.getCurrentPosition(
  //logging when find position
  function (position) {
    //position is an object with all latitude and longitude information
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    const map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.5, -0.09])
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();
  },
  function () {
    //logging when coulnd find position
    alert(`could not get your possition`);
  }
);

//header sticky
const homeContent = document.querySelector(`.home__content`);
const header = document.querySelector(`.header`);
const headerNav = document.querySelector(`.header__nav`);
//
const revealSection2 = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    headerNav.classList.remove(`header-sticky`);
    goku.style.display = `block`;
    aura.style.display = `none`;
    balls.forEach((ball) => {
      ball.style.display = "block";
    });
    document.querySelector(`.header__nav`).style.lineHeight = "6rem";
    document.querySelector(`.nav__bar`).style.height = "6rem";
    document.querySelector(`.nav__bar`).style.minHeight = `12rem`;
  } else {
    //entry.target== current section that im in
    headerNav.classList.add(`header-sticky`);
    goku.style.display = `none`;
    aura.style.display = `none`;
    balls.forEach((ball) => {
      ball.style.display = "none";
    });

    document.querySelector(`.header__nav`).style.lineHeight = "6rem";
    document.querySelector(`.nav__bar`).style.height = "6rem";
    document.querySelector(`.nav__bar`).style.minHeight = `0rem`;
  }
};
const section1Observer = new IntersectionObserver(revealSection2, {
  root: null,
  threshold: 0.01,
});
section1Observer.observe(homeContent);

//cursor
const cursor = document.querySelector(`.cursor`);
document.addEventListener(`mousemove`, function (e) {
  // const { screenX, screenY } = e;
  // console.log(screenX, screenY);
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - 10) + "px;left:" + (e.pageX - 10) + "px;"
    //-10 because i need to center circle by 10 px top and left
  );
});
document.addEventListener(`click`, function () {
  cursor.classList.add(`expand`);
  setTimeout(() => {
    cursor.classList.remove(`expand`);
  }, 500);
});

// burger
const burger = document.querySelector(`.burger`);
const headerNavLi = document.querySelectorAll(`.nav__link`);
console.log(headerNavLi);
burger.addEventListener(`click`, function () {
  document.querySelector(`.nav__bar`).style.display = `none`;
  document.querySelector(`.nav__bar`).classList.toggle(`toggle`);
});

//My current and future projects pic moving in when see project one

const projectOnePic = document.querySelector(`.sec__3__grid--box1`);
const imageDB4 = document.querySelector(`.imageDB4`);
const imageDB5 = document.querySelector(`.imageDB5`);

const revealSection3 = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    imageDB4.style.transform = `translateX(0rem)`;
    imageDB4.style.transition = `0.5s ease-in`;
    imageDB5.style.animation = `opacityTo1 3s ease-in`;
    imageDB5.style.animationFillMode = `forwards`;
  } else {
    return;
  }
};
const section2Observer = new IntersectionObserver(revealSection3, {
  root: null,
  threshold: 0.2,
});
section2Observer.observe(projectOnePic);

//popup

const sendMessage = document.querySelector(`.send__message`);
const exit = document.querySelector(`.exit`);
const footerBtn = document.querySelector(`.footter__button`);
console.log(sendMessage, exit, footerBtn);

footerBtn.addEventListener(`click`, function () {
  sendMessage.style.display = `block`;
});
exit.addEventListener(`click`, function () {
  sendMessage.style.display = `none`;
});
